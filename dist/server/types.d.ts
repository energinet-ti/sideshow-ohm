export interface Session {
    id: string;
    agent: string;
    title: string | null;
    cwd: string | null;
    createdAt: string;
    lastActiveAt: string;
    agentSeq: number;
}
export declare const SURFACE_KINDS: readonly ["html", "diff", "image", "trace", "markdown", "terminal", "mermaid", "json", "code"];
export type SurfaceKind = (typeof SURFACE_KINDS)[number];
export type SurfaceContentField = "html" | "markdown" | "mermaid" | "patch" | "text" | "data" | "code";
export interface SurfaceKindMetadata {
    contentField?: SurfaceContentField;
    sandboxed: boolean;
    frameClass?: string;
}
export declare const SURFACE_KIND_METADATA: {
    readonly html: {
        readonly contentField: "html";
        readonly sandboxed: true;
    };
    readonly diff: {
        readonly contentField: "patch";
        readonly sandboxed: true;
        readonly frameClass: "diffframe";
    };
    readonly image: {
        readonly sandboxed: false;
    };
    readonly trace: {
        readonly sandboxed: false;
    };
    readonly markdown: {
        readonly contentField: "markdown";
        readonly sandboxed: true;
        readonly frameClass: "mdframe";
    };
    readonly terminal: {
        readonly contentField: "text";
        readonly sandboxed: true;
        readonly frameClass: "termframe";
    };
    readonly mermaid: {
        readonly contentField: "mermaid";
        readonly sandboxed: true;
        readonly frameClass: "mermaidframe";
    };
    readonly json: {
        readonly contentField: "data";
        readonly sandboxed: false;
    };
    readonly code: {
        readonly contentField: "code";
        readonly sandboxed: true;
        readonly frameClass: "codeframe";
    };
};
export declare const SURFACE_KIND_LIST: string;
export declare const SANDBOXED_SURFACE_KINDS: ("html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code")[];
export declare const NATIVE_SURFACE_KINDS: ("html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code")[];
export declare const SURFACE_CONTENT_FIELDS: Partial<Record<SurfaceKind, SurfaceContentField>>;
export declare const SURFACE_FRAME_CLASSES: Partial<Record<SurfaceKind, string>>;
export declare function isSurfaceKind(kind: unknown): kind is SurfaceKind;
export declare function isSandboxedSurfaceKind(kind: unknown): kind is SurfaceKind;
export interface HtmlSurface {
    kind: "html";
    html: string;
    kits?: string[];
}
export interface MarkdownSurface {
    kind: "markdown";
    markdown: string;
}
export interface MermaidSurface {
    kind: "mermaid";
    mermaid: string;
}
export interface DiffFile {
    filename: string;
    before: string;
    after: string;
    language?: string;
}
export interface DiffSurface {
    kind: "diff";
    patch?: string;
    files?: DiffFile[];
    layout?: "unified" | "split";
}
export interface ImageSurface {
    kind: "image";
    assetId: string;
    alt?: string;
    caption?: string;
}
export interface TraceStep {
    label: string;
    kind?: string;
    detail?: string;
    ts?: string;
}
export interface TraceSurface {
    kind: "trace";
    steps?: TraceStep[];
    assetId?: string;
    title?: string;
}
export interface TerminalSurface {
    kind: "terminal";
    text: string;
    cols?: number;
    title?: string;
}
export interface JsonSurface {
    kind: "json";
    data: unknown;
}
export interface CodeSurface {
    kind: "code";
    code: string;
    language?: string;
    title?: string;
    lineStart?: number;
}
export type Surface = (HtmlSurface & {
    id?: string;
}) | (DiffSurface & {
    id?: string;
}) | (ImageSurface & {
    id?: string;
}) | (TraceSurface & {
    id?: string;
}) | (MarkdownSurface & {
    id?: string;
}) | (TerminalSurface & {
    id?: string;
}) | (MermaidSurface & {
    id?: string;
}) | (JsonSurface & {
    id?: string;
}) | (CodeSurface & {
    id?: string;
});
export interface PostVersion {
    version: number;
    title: string;
    surfaces: Surface[];
    at: string;
}
export interface Post {
    id: string;
    sessionId: string;
    title: string;
    surfaces: Surface[];
    createdAt: string;
    updatedAt: string;
    version: number;
    history: PostVersion[];
}
export type CommentAnchor = {
    kind: "point";
    surfaceIndex: number;
    surfaceId?: string;
    surfaceKind?: SurfaceKind;
    postVersion: number;
    x: number;
    y: number;
} | {
    kind: "rect";
    surfaceIndex: number;
    surfaceId?: string;
    surfaceKind?: SurfaceKind;
    postVersion: number;
    x: number;
    y: number;
    w: number;
    h: number;
} | {
    kind: "lineRange";
    surfaceIndex: number;
    surfaceId?: string;
    surfaceKind?: SurfaceKind;
    postVersion: number;
    startLine: number;
    endLine: number;
    file?: string;
};
export interface Comment {
    id: string;
    seq: number;
    sessionId: string;
    postId: string | null;
    postTitle: string | null;
    author: string;
    text: string;
    createdAt: string;
    anchor?: CommentAnchor;
}
export type AssetKind = "image" | "trace" | "file";
export interface Asset {
    id: string;
    sessionId: string;
    kind: AssetKind;
    contentType: string;
    byteLength: number;
    filename: string | null;
    data: Uint8Array;
    createdAt: string;
    lastAccessedAt: string;
}
export interface CreateAssetInput {
    sessionId: string;
    kind: AssetKind;
    contentType: string;
    filename?: string;
    data: Uint8Array;
}
export interface CreateSessionInput {
    agent: string;
    title?: string;
    cwd?: string;
}
export interface CreatePostInput {
    sessionId: string;
    title?: string;
    surfaces: Surface[];
}
export interface UpdatePostInput {
    title?: string;
    surfaces?: Surface[];
}
export interface CreateCommentInput {
    sessionId: string;
    postId?: string;
    author: string;
    text: string;
    anchor?: CommentAnchor;
}
export interface CommentQuery {
    sessionId?: string;
    postId?: string;
    afterSeq?: number;
}
export interface Store {
    listSessions(): Promise<Session[]>;
    getSession(id: string): Promise<Session | null>;
    createSession(input: CreateSessionInput): Promise<Session>;
    renameSession(id: string, title: string): Promise<Session | null>;
    removeSession(id: string): Promise<boolean>;
    markAgentSeen(sessionId: string, seq: number): Promise<void>;
    getSetting(key: string): Promise<string | null>;
    setSetting(key: string, value: string): Promise<void>;
    listPosts(sessionId?: string): Promise<Post[]>;
    /** The N most-recently-updated posts across all sessions (newest first). */
    listRecentPosts(limit: number): Promise<Post[]>;
    getPost(id: string): Promise<Post | null>;
    createPost(input: CreatePostInput): Promise<Post | null>;
    updatePost(id: string, patch: UpdatePostInput): Promise<Post | null>;
    removePost(id: string): Promise<boolean>;
    listComments(query: CommentQuery): Promise<Comment[]>;
    createComment(input: CreateCommentInput): Promise<Comment | null>;
    removeComment(id: string): Promise<Comment | null>;
    listTrace(sessionId: string): Promise<TraceStep[]>;
    setTrace(sessionId: string, steps: TraceStep[]): Promise<void>;
    putAsset(input: CreateAssetInput): Promise<Asset | null>;
    getAsset(id: string): Promise<Asset | null>;
    touchAsset(id: string): Promise<void>;
    listAssets(sessionId: string): Promise<Asset[]>;
    removeAsset(id: string): Promise<boolean>;
    isAssetReferenced(id: string): Promise<boolean>;
}
export type SqlStorageValue = ArrayBuffer | string | number | null;
export interface SqlStorageCursor {
    toArray(): Record<string, SqlStorageValue>[];
    one(): Record<string, SqlStorageValue>;
}
export interface SqlStorage {
    exec(query: string, ...bindings: SqlStorageValue[]): SqlStorageCursor;
}
export interface WorkspaceSnapshot {
    sessions: Session[];
    posts?: Post[];
    /** @deprecated Use `posts`; kept so external migration helpers that still read/write snapshots as `surfaces` do not break. */
    surfaces?: Post[];
    comments: Comment[];
    traces: {
        sessionId: string;
        steps: TraceStep[];
    }[];
    assets: Asset[];
    settings: {
        key: string;
        value: string;
    }[];
}
export declare const HISTORY_LIMIT = 20;
export declare function stripNul<T extends string | null | undefined>(s: T): T;
export declare function stripNulStep(s: TraceStep): TraceStep;
export declare const MAX_ASSET_BYTES: number;
export declare const MAX_WORKSPACE_ASSET_BYTES: number;
export declare const newId: () => string;
export declare function hashAssetId(data: Uint8Array): Promise<string>;
export declare function normalizeSurfaceIds(surfaces: Surface[]): Surface[];
export declare const htmlSurface: (html: string, kits?: unknown) => HtmlSurface;
export declare function surfacesByteLength(surfaces: Surface[]): number;
export declare function collectAssetIds(surfaces: Surface[], out: Set<string>): void;
export interface EvictionCandidate {
    id: string;
    byteLength: number;
    lastAccessedAt: string;
    referenced: boolean;
}
export declare function selectEvictions(candidates: EvictionCandidate[], incomingBytes: number, budget: number): string[];
