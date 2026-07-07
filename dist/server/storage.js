import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { collectAssetIds, hashAssetId, HISTORY_LIMIT, htmlSurface, MAX_WORKSPACE_ASSET_BYTES, newId, normalizeSurfaceIds, selectEvictions, stripNul, stripNulStep, } from "./types.js";
const clone = (value) => structuredClone(value);
const cloneOrNull = (value) => value == null ? null : clone(value);
function liftSnippet(s) {
    return {
        id: s.id,
        sessionId: s.sessionId,
        title: s.title,
        surfaces: [htmlSurface(s.html)],
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
        version: s.version,
        history: (s.history ?? []).map((h) => ({
            version: h.version,
            title: h.title,
            surfaces: [htmlSurface(h.html)],
            at: h.at,
        })),
    };
}
function liftComment(c) {
    return {
        id: c.id,
        seq: c.seq,
        sessionId: c.sessionId,
        postId: c.postId ?? c.surfaceId ?? c.snippetId ?? null,
        postTitle: c.postTitle ?? c.surfaceTitle ?? c.snippetTitle ?? null,
        author: c.author,
        text: c.text,
        createdAt: c.createdAt,
        ...(c.anchor && { anchor: c.anchor }),
    };
}
function liftPost(s) {
    return {
        id: s.id,
        sessionId: s.sessionId,
        title: s.title,
        surfaces: s.surfaces ?? s.parts ?? [],
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
        version: s.version,
        history: (s.history ?? []).map((h) => ({
            version: h.version,
            title: h.title,
            surfaces: h.surfaces ?? h.parts ?? [],
            at: h.at,
        })),
    };
}
export class JsonFileStore {
    sessions = new Map();
    surfaces = new Map();
    comments = [];
    assets = new Map();
    trace = new Map();
    lastSeq = 0;
    settings = new Map();
    loaded = false;
    // Cached set of asset ids referenced by any live surface (current or a
    // historical version of any post). Built lazily and maintained incrementally
    // — createPost/updatePost add to it, removes invalidate it — so isAssetReferenced
    // (hit on every /a/:id miss) and putAsset's eviction scan don't re-walk every
    // post on each call. Correct because post history is append-only: a surface
    // only ever moves INTO history, so an asset id once referenced stays
    // referenced until the whole post (and its history) is deleted, at which point
    // we invalidate and recompute from scratch.
    assetRefCache;
    loadPromise = null;
    writeQueue = Promise.resolve();
    filePath;
    constructor(filePath) {
        this.filePath = filePath;
    }
    async load() {
        if (this.loaded)
            return;
        this.loadPromise ??= this.loadFromDisk().catch((err) => {
            this.loadPromise = null;
            throw err;
        });
        await this.loadPromise;
    }
    async loadFromDisk() {
        try {
            const raw = await readFile(this.filePath, "utf8");
            const data = JSON.parse(raw);
            // agentSeq arrived after 0.2.0 — default it for data files written before
            for (const s of data.sessions ?? []) {
                this.sessions.set(s.id, { ...s, agentSeq: s.agentSeq ?? 0 });
            }
            // Prefer the surfaces array; fall back to lifting legacy snippets.
            if (data.surfaces) {
                for (const s of data.surfaces)
                    this.surfaces.set(s.id, liftPost(s));
            }
            else if (data.snippets) {
                for (const s of data.snippets)
                    this.surfaces.set(s.id, liftSnippet(s));
            }
            // Ensure every surface has a stable id (one-time migration for data
            // written before surface ids existed). Cheap: only mutates surfaces
            // that lack an id, and persists on the next write.
            for (const p of this.surfaces.values()) {
                p.surfaces = normalizeSurfaceIds(p.surfaces);
                for (const h of p.history)
                    h.surfaces = normalizeSurfaceIds(h.surfaces);
            }
            this.comments = (data.comments ?? []).map(liftComment);
            for (const a of data.assets ?? []) {
                this.assets.set(a.id, {
                    ...a,
                    data: new Uint8Array(Buffer.from(a.data, "base64")),
                    lastAccessedAt: a.lastAccessedAt ?? a.createdAt,
                });
            }
            for (const [sid, steps] of Object.entries(data.trace ?? {}))
                this.trace.set(sid, steps);
            this.lastSeq = data.lastSeq ?? 0;
            for (const [k, v] of Object.entries(data.settings ?? {}))
                this.settings.set(k, v);
        }
        catch (err) {
            if (err?.code !== "ENOENT")
                throw err;
        }
        this.loaded = true;
    }
    persist() {
        const data = JSON.stringify({
            sessions: [...this.sessions.values()],
            surfaces: [...this.surfaces.values()],
            comments: this.comments,
            assets: [...this.assets.values()].map((a) => ({
                ...a,
                data: Buffer.from(a.data).toString("base64"),
            })),
            trace: Object.fromEntries(this.trace),
            lastSeq: this.lastSeq,
            settings: Object.fromEntries(this.settings),
        }, null, 2);
        this.writeQueue = this.writeQueue.then(async () => {
            await mkdir(dirname(this.filePath), { recursive: true });
            const tmp = `${this.filePath}.tmp`;
            await writeFile(tmp, data, "utf8");
            await rename(tmp, this.filePath);
        });
        return this.writeQueue;
    }
    // Snapshot the whole workspace for a one-time backend migration (→ SqlStore.
    // importBoard). The method name predates the workspace terminology; keep it as
    // public API. Returns live references — fine for a read-once-then-import
    // migration, which never mutates the store afterward.
    async exportBoard() {
        await this.load();
        return {
            sessions: [...this.sessions.values()],
            posts: [...this.surfaces.values()],
            surfaces: [...this.surfaces.values()],
            comments: this.comments,
            assets: [...this.assets.values()],
            traces: [...this.trace.entries()].map(([sessionId, steps]) => ({ sessionId, steps })),
            settings: [...this.settings.entries()].map(([key, value]) => ({ key, value })),
        };
    }
    // --- sessions ---
    async listSessions() {
        await this.load();
        return [...this.sessions.values()]
            .map(clone)
            .sort((a, b) => b.lastActiveAt.localeCompare(a.lastActiveAt));
    }
    async getSession(id) {
        await this.load();
        return cloneOrNull(this.sessions.get(id));
    }
    async createSession(input) {
        await this.load();
        const now = new Date().toISOString();
        const session = {
            id: newId(),
            agent: stripNul(input.agent).trim() || "agent",
            title: stripNul(input.title)?.trim() || null,
            cwd: stripNul(input.cwd ?? null),
            createdAt: now,
            lastActiveAt: now,
            agentSeq: 0,
        };
        this.sessions.set(session.id, session);
        await this.persist();
        return clone(session);
    }
    async renameSession(id, title) {
        await this.load();
        const session = this.sessions.get(id);
        if (!session)
            return null;
        session.title = stripNul(title).trim() || null;
        await this.persist();
        return clone(session);
    }
    async removeSession(id) {
        await this.load();
        if (!this.sessions.delete(id))
            return false;
        for (const [postId, post] of this.surfaces) {
            if (post.sessionId === id)
                this.surfaces.delete(postId);
        }
        this.comments = this.comments.filter((c) => c.sessionId !== id);
        this.trace.delete(id);
        // Assets are content-addressed and may be referenced across sessions, so a
        // session only takes its OWN assets down with it, and only those no live
        // surface still points at (referencedAssetIds is computed after the above
        // deletes, so it reflects survivors only).
        this.invalidateAssetRefs();
        const referenced = this.referencedAssetIds();
        for (const [aid, asset] of this.assets) {
            if (asset.sessionId === id && !referenced.has(aid))
                this.assets.delete(aid);
        }
        await this.persist();
        return true;
    }
    touch(sessionId) {
        const session = this.sessions.get(sessionId);
        if (session)
            session.lastActiveAt = new Date().toISOString();
    }
    async markAgentSeen(sessionId, seq) {
        await this.load();
        const session = this.sessions.get(sessionId);
        if (!session || seq <= session.agentSeq)
            return;
        session.agentSeq = seq;
        await this.persist();
    }
    // --- settings ---
    async getSetting(key) {
        await this.load();
        return this.settings.get(key) ?? null;
    }
    async setSetting(key, value) {
        await this.load();
        this.settings.set(stripNul(key), stripNul(value));
        await this.persist();
    }
    // --- surfaces ---
    async listPosts(sessionId) {
        await this.load();
        const all = [...this.surfaces.values()].filter((s) => sessionId === undefined || s.sessionId === sessionId);
        return all.map(clone).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }
    async listRecentPosts(limit) {
        await this.load();
        return [...this.surfaces.values()]
            .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
            .slice(0, limit)
            .map(clone);
    }
    async getPost(id) {
        await this.load();
        return cloneOrNull(this.surfaces.get(id));
    }
    async createPost(input) {
        await this.load();
        if (!this.sessions.has(input.sessionId))
            return null;
        const now = new Date().toISOString();
        const post = {
            id: newId(),
            sessionId: input.sessionId,
            title: stripNul(input.title)?.trim() || "Untitled",
            surfaces: normalizeSurfaceIds(clone(input.surfaces)),
            createdAt: now,
            updatedAt: now,
            version: 1,
            history: [],
        };
        this.surfaces.set(post.id, post);
        this.touch(input.sessionId);
        this.addAssetRefs(input.surfaces);
        await this.persist();
        return clone(post);
    }
    async updatePost(id, patch) {
        await this.load();
        const post = this.surfaces.get(id);
        if (!post)
            return null;
        post.history.push({
            version: post.version,
            title: post.title,
            surfaces: clone(post.surfaces),
            at: post.updatedAt,
        });
        if (post.history.length > HISTORY_LIMIT)
            post.history.shift();
        if (patch.title !== undefined)
            post.title = stripNul(patch.title).trim() || post.title;
        if (patch.surfaces !== undefined)
            post.surfaces = normalizeSurfaceIds(clone(patch.surfaces));
        post.version += 1;
        post.updatedAt = new Date().toISOString();
        this.touch(post.sessionId);
        if (patch.surfaces !== undefined)
            this.addAssetRefs(patch.surfaces);
        await this.persist();
        return clone(post);
    }
    async removePost(id) {
        await this.load();
        const post = this.surfaces.get(id);
        if (!post)
            return false;
        this.surfaces.delete(id);
        this.comments = this.comments.filter((c) => c.postId !== id);
        this.invalidateAssetRefs();
        await this.persist();
        return true;
    }
    // --- comments ---
    async listComments(query) {
        await this.load();
        return this.comments
            .filter((c) => (query.sessionId === undefined || c.sessionId === query.sessionId) &&
            (query.postId === undefined || c.postId === query.postId) &&
            (query.afterSeq === undefined || c.seq > query.afterSeq))
            .map(clone);
    }
    async createComment(input) {
        await this.load();
        if (!this.sessions.has(input.sessionId))
            return null;
        const post = input.postId ? this.surfaces.get(input.postId) : null;
        const comment = {
            id: newId(),
            seq: ++this.lastSeq,
            sessionId: input.sessionId,
            postId: post?.id ?? null,
            postTitle: post?.title ?? null,
            author: stripNul(input.author).trim() || "user",
            text: stripNul(input.text),
            createdAt: new Date().toISOString(),
            ...(input.anchor && { anchor: input.anchor }),
        };
        this.comments.push(comment);
        this.touch(input.sessionId);
        await this.persist();
        return clone(comment);
    }
    async removeComment(id) {
        await this.load();
        const idx = this.comments.findIndex((c) => c.id === id);
        if (idx < 0)
            return null;
        const [comment] = this.comments.splice(idx, 1);
        this.touch(comment.sessionId);
        await this.persist();
        return clone(comment);
    }
    // --- trace ---
    async listTrace(sessionId) {
        await this.load();
        return clone(this.trace.get(sessionId) ?? []);
    }
    async setTrace(sessionId, steps) {
        await this.load();
        if (steps.length === 0)
            this.trace.delete(sessionId);
        else
            this.trace.set(sessionId, steps.map(stripNulStep));
        await this.persist();
    }
    // --- assets ---
    referencedAssetIds() {
        if (this.assetRefCache)
            return this.assetRefCache;
        const out = new Set();
        for (const s of this.surfaces.values()) {
            collectAssetIds(s.surfaces, out);
            for (const h of s.history)
                collectAssetIds(h.surfaces, out);
        }
        this.assetRefCache = out;
        return out;
    }
    // Fold a freshly-written surfaces list into the cache. If the cache hasn't
    // been built yet, skip — the next referencedAssetIds() walks the in-memory
    // posts and picks it up. Only mutates a populated cache.
    addAssetRefs(surfaces) {
        if (this.assetRefCache)
            collectAssetIds(surfaces, this.assetRefCache);
    }
    invalidateAssetRefs() {
        this.assetRefCache = undefined;
    }
    async putAsset(input) {
        await this.load();
        if (!this.sessions.has(input.sessionId))
            return null;
        // Content-addressed: identical bytes dedupe to the existing blob (idempotent
        // upload), keeping its original session and createdAt; we just warm it.
        const id = await hashAssetId(input.data);
        const existing = this.assets.get(id);
        if (existing) {
            existing.lastAccessedAt = new Date().toISOString();
            this.touch(input.sessionId);
            await this.persist();
            return clone(existing);
        }
        const referenced = this.referencedAssetIds();
        const candidates = [...this.assets.values()].map((a) => ({
            id: a.id,
            byteLength: a.byteLength,
            lastAccessedAt: a.lastAccessedAt,
            referenced: referenced.has(a.id),
        }));
        for (const id of selectEvictions(candidates, input.data.byteLength, MAX_WORKSPACE_ASSET_BYTES)) {
            this.assets.delete(id);
        }
        const now = new Date().toISOString();
        const asset = {
            id,
            sessionId: input.sessionId,
            kind: input.kind,
            contentType: stripNul(input.contentType),
            byteLength: input.data.byteLength,
            filename: stripNul(input.filename ?? null),
            data: new Uint8Array(input.data),
            createdAt: now,
            lastAccessedAt: now,
        };
        this.assets.set(asset.id, asset);
        this.touch(input.sessionId);
        await this.persist();
        return clone(asset);
    }
    async getAsset(id) {
        await this.load();
        return cloneOrNull(this.assets.get(id));
    }
    async touchAsset(id) {
        await this.load();
        const asset = this.assets.get(id);
        if (!asset)
            return;
        asset.lastAccessedAt = new Date().toISOString();
        await this.persist();
    }
    async listAssets(sessionId) {
        await this.load();
        return [...this.assets.values()].filter((a) => a.sessionId === sessionId).map(clone);
    }
    async removeAsset(id) {
        await this.load();
        if (!this.assets.delete(id))
            return false;
        await this.persist();
        return true;
    }
    async isAssetReferenced(id) {
        await this.load();
        return this.referencedAssetIds().has(id);
    }
}
