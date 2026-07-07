// Shared data model — no runtime imports, safe for any platform.
// A post is an ordered list of surfaces. Each surface declares its own kind;
// the post itself is kind-agnostic. An `html` surface is arbitrary agent
// markup rendered in an opaque-origin iframe. Rich text/code kinds are structured
// data rendered into sandboxed documents; image/trace/json stay as data rendered
// natively by the trusted viewer. A snippet is just a post with one html surface;
// a diagram-with-its-diff is `[html, diff]`.
// The canonical, ordered list of every surface kind — the single source of
// truth. `SurfaceKind` derives from it, and the MCP tool schemas (mcpSpec.ts)
// build their `kind` enums from it, so a kind can't be added to the model
// without the MCP tier advertising it too (the gap that left `json`/`code`
// publishable over CLI/REST but invisible to MCP). The per-kind FIELD schemas
// in postSurfaces.ts and mcpSpec.ts are still hand-written; test/mcpSpec.test.ts
// guards that every kind here round-trips through both the MCP schema and the
// validator with its fields, so neither half can silently fall behind.
export const SURFACE_KINDS = [
    "html",
    "diff",
    "image",
    "trace",
    "markdown",
    "terminal",
    "mermaid",
    "json",
    "code",
];
export const SURFACE_KIND_METADATA = {
    html: { contentField: "html", sandboxed: true },
    diff: { contentField: "patch", sandboxed: true, frameClass: "diffframe" },
    image: { sandboxed: false },
    trace: { sandboxed: false },
    markdown: { contentField: "markdown", sandboxed: true, frameClass: "mdframe" },
    terminal: { contentField: "text", sandboxed: true, frameClass: "termframe" },
    mermaid: { contentField: "mermaid", sandboxed: true, frameClass: "mermaidframe" },
    json: { contentField: "data", sandboxed: false },
    code: { contentField: "code", sandboxed: true, frameClass: "codeframe" },
};
export const SURFACE_KIND_LIST = SURFACE_KINDS.join(", ");
export const SANDBOXED_SURFACE_KINDS = SURFACE_KINDS.filter((kind) => SURFACE_KIND_METADATA[kind].sandboxed);
export const NATIVE_SURFACE_KINDS = SURFACE_KINDS.filter((kind) => !SURFACE_KIND_METADATA[kind].sandboxed);
export const SURFACE_CONTENT_FIELDS = Object.fromEntries(SURFACE_KINDS.flatMap((kind) => {
    const meta = SURFACE_KIND_METADATA[kind];
    const field = "contentField" in meta ? meta.contentField : undefined;
    return field ? [[kind, field]] : [];
}));
export const SURFACE_FRAME_CLASSES = Object.fromEntries(SURFACE_KINDS.flatMap((kind) => {
    const meta = SURFACE_KIND_METADATA[kind];
    const frameClass = "frameClass" in meta ? meta.frameClass : undefined;
    return frameClass ? [[kind, frameClass]] : [];
}));
export function isSurfaceKind(kind) {
    return typeof kind === "string" && Object.hasOwn(SURFACE_KIND_METADATA, kind);
}
export function isSandboxedSurfaceKind(kind) {
    return isSurfaceKind(kind) && SURFACE_KIND_METADATA[kind].sandboxed;
}
export const HISTORY_LIMIT = 20;
// SQLite terminates a TEXT value at the first embedded NUL byte, while the JSON
// store preserves it — so the two stores would diverge on a NUL. A NUL has no
// place in a title/comment/label anyway, so both stores strip it from stored
// text (removing the byte, not truncating), keeping them in lockstep. Returns
// the input untouched when there's nothing to strip, so the common path is free.
const NUL_CHAR = String.fromCharCode(0);
export function stripNul(s) {
    // replaceAll with a string (not a RegExp literal) keeps the control char out
    // of the source; the includes guard keeps the common no-NUL path free.
    return (typeof s === "string" && s.includes(NUL_CHAR) ? s.replaceAll(NUL_CHAR, "") : s);
}
// stripNul applied to a trace step, rebuilding it so absent optional keys stay
// absent (a `{kind: undefined}` key would itself diverge: the JSON store keeps
// it, SqlStore drops it).
export function stripNulStep(s) {
    const out = { label: stripNul(s.label) };
    if (s.kind !== undefined)
        out.kind = stripNul(s.kind);
    if (s.detail !== undefined)
        out.detail = stripNul(s.detail);
    if (s.ts !== undefined)
        out.ts = s.ts;
    return out;
}
// Per-asset upload cap (enforced at the HTTP/MCP edge → 413) and the workspace-wide
// budget the store evicts down to. One Durable Object holds the whole workspace, so
// the budget sits well under its ~10 GB SQLite ceiling.
export const MAX_ASSET_BYTES = 5 * 1024 * 1024;
export const MAX_WORKSPACE_ASSET_BYTES = 2 * 1024 * 1024 * 1024;
// Short, unguessable id: 8 random bytes (64 bits) as 11 url-safe base64 chars —
// YouTube-video-id sized. These double as bearer capabilities: in publicRead
// mode `/s/:id` and `/api/{sessions,surfaces}/:id` are reachable without the
// workspace token, so the id IS the share secret and must resist enumeration. 64
// bits (~1.8e19) is far past sweepable; the old `randomUUID().split("-")[0]`
// kept only the first 32-bit segment (~4e9), brute-forceable in about an hour.
// (Assets use a separate content-hash id, not this.) btoa is a global in both
// Node and Workers, same as the atob the asset path already relies on.
export const newId = () => {
    let id = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(8))))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    // Ids are used as CLI positional args and path segments. A leading "-" or
    // "_" makes node:util parseArgs treat them as options ("Unknown option '-6'"
    // for an id like "-6K4AJsKD4M"), so swap a leading separator for an
    // alphanumeric. Collision risk is negligible (the remaining ~10 chars hold
    // ~8e17 possibilities).
    if (id[0] === "-" || id[0] === "_")
        id = "0" + id.slice(1);
    return id;
};
// Content-addressed asset id: the lowercase hex SHA-256 of the bytes. Because
// it depends only on the content, an agent can derive `/a/:id` from the bytes
// alone — no upload round-trip — and write the URL into a surface before (or
// while) the upload lands. Identical uploads collapse to one stored blob.
// Uses Web Crypto (a global on Node ≥20 and Workers) to stay runtime-agnostic.
export async function hashAssetId(data) {
    // Copy into a fresh ArrayBuffer-backed view: digest wants a definite
    // ArrayBuffer, and this also avoids the SharedArrayBuffer-backed lib type.
    const digest = await crypto.subtle.digest("SHA-256", new Uint8Array(data));
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
// Assign a stable id to every surface that lacks one, preserving existing ids.
// Called by the stores on create/update so all persisted surfaces are
// addressable. Per-surface flow functions call this after mutating a single
// surface so untouched surfaces keep their ids.
export function normalizeSurfaceIds(surfaces) {
    return surfaces.map((s) => (s.id ? s : { ...s, id: newId() }));
}
// A snippet is sugar for a single html surface; this bridges the legacy
// `{ html }` shape (CLI `publish`, `POST /api/snippets`) to the surfaces model.
// An optional `kits` list opts the surface into style/behavior bundles (kits.ts).
export const htmlSurface = (html, kits) => ({
    kind: "html",
    html,
    ...(Array.isArray(kits) && kits.length > 0
        ? { kits: kits.filter((k) => typeof k === "string") }
        : {}),
});
// The combined byte weight of a post's surfaces, for size limits. image/trace
// surfaces are tiny (refs + inline steps) — the asset bytes they point at are
// bounded separately by MAX_ASSET_BYTES, not this post cap.
export function surfacesByteLength(surfaces) {
    let n = 0;
    for (const p of surfaces) {
        if (p.kind === "html")
            n += p.html.length;
        else if (p.kind === "diff") {
            n += p.patch?.length ?? 0;
            for (const f of p.files ?? [])
                n += f.before.length + f.after.length;
        }
        else if (p.kind === "image") {
            n += p.assetId.length + (p.alt?.length ?? 0) + (p.caption?.length ?? 0);
        }
        else if (p.kind === "markdown") {
            n += p.markdown.length;
        }
        else if (p.kind === "terminal") {
            n += p.text.length + (p.title?.length ?? 0);
        }
        else if (p.kind === "mermaid") {
            n += p.mermaid.length;
        }
        else if (p.kind === "json") {
            n += JSON.stringify(p.data).length;
        }
        else if (p.kind === "code") {
            n +=
                p.code.length + (p.language?.length ?? 0) + (p.title?.length ?? 0) + (p.lineStart ? 4 : 0);
        }
        else {
            n += (p.assetId?.length ?? 0) + (p.title?.length ?? 0);
            for (const s of p.steps ?? []) {
                n += s.label.length + (s.kind?.length ?? 0) + (s.detail?.length ?? 0);
            }
        }
    }
    return n;
}
// Collect the asset ids an ordered surfaces list references (image/trace surfaces).
// Used to keep referenced assets out of eviction's first wave. Note: assets
// embedded by raw URL inside html markup are invisible here — touch-on-serve
// keeps those warm instead.
export function collectAssetIds(surfaces, out) {
    for (const p of surfaces) {
        if (p.kind === "image")
            out.add(p.assetId);
        else if (p.kind === "trace" && p.assetId)
            out.add(p.assetId);
    }
}
// Pick the assets to evict so `incomingBytes` fits under `budget`. Oldest
// (lastAccessedAt) first, but unreferenced assets go before referenced ones —
// a live embed is only evicted as a last resort, once unreferenced candidates
// are exhausted. Returns the ids to remove (possibly empty).
export function selectEvictions(candidates, incomingBytes, budget) {
    let total = candidates.reduce((sum, c) => sum + c.byteLength, 0);
    if (total + incomingBytes <= budget)
        return [];
    const order = [...candidates].sort((a, b) => {
        if (a.referenced !== b.referenced)
            return a.referenced ? 1 : -1;
        return a.lastAccessedAt.localeCompare(b.lastAccessedAt);
    });
    const evict = [];
    for (const c of order) {
        if (total + incomingBytes <= budget)
            break;
        evict.push(c.id);
        total -= c.byteLength;
    }
    return evict;
}
