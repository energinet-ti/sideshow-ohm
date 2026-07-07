import type { Comment, CommentAnchor, Post, Session, Surface } from "./types.ts";
export interface Feedback {
    postId: string | null;
    postTitle: string | null;
    surfaceId: string | null;
    surfaceTitle: string | null;
    text: string;
    at: string;
    anchor?: CommentAnchor;
}
export declare const surfaceRef: (surface: Pick<Surface, "id" | "kind">, index: number) => {
    id: string | undefined;
    kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
    index: number;
};
export declare const fullSurfaceView: (surface: Surface, index: number) => {
    index: number;
    kind: "html";
    html: string;
    kits?: string[];
    id?: string;
} | {
    index: number;
    kind: "diff";
    patch?: string;
    files?: import("./types.ts").DiffFile[];
    layout?: "unified" | "split";
    id?: string;
} | {
    index: number;
    kind: "image";
    assetId: string;
    alt?: string;
    caption?: string;
    id?: string;
} | {
    index: number;
    kind: "trace";
    steps?: import("./types.ts").TraceStep[];
    assetId?: string;
    title?: string;
    id?: string;
} | {
    index: number;
    kind: "markdown";
    markdown: string;
    id?: string;
} | {
    index: number;
    kind: "terminal";
    text: string;
    cols?: number;
    title?: string;
    id?: string;
} | {
    index: number;
    kind: "mermaid";
    mermaid: string;
    id?: string;
} | {
    index: number;
    kind: "json";
    data: unknown;
    id?: string;
} | {
    index: number;
    kind: "code";
    code: string;
    language?: string;
    title?: string;
    lineStart?: number;
    id?: string;
};
export declare const sessionListSurfaceView: (surface: Surface, index: number) => {
    id: string | undefined;
    kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
    index: number;
} | {
    index: number;
    kind: "html";
    html: string;
    kits?: string[];
    id?: string;
} | {
    index: number;
    kind: "diff";
    patch?: string;
    files?: import("./types.ts").DiffFile[];
    layout?: "unified" | "split";
    id?: string;
} | {
    index: number;
    kind: "image";
    assetId: string;
    alt?: string;
    caption?: string;
    id?: string;
} | {
    index: number;
    kind: "trace";
    steps?: import("./types.ts").TraceStep[];
    assetId?: string;
    title?: string;
    id?: string;
} | {
    index: number;
    kind: "markdown";
    markdown: string;
    id?: string;
} | {
    index: number;
    kind: "terminal";
    text: string;
    cols?: number;
    title?: string;
    id?: string;
} | {
    index: number;
    kind: "mermaid";
    mermaid: string;
    id?: string;
} | {
    index: number;
    kind: "json";
    data: unknown;
    id?: string;
} | {
    index: number;
    kind: "code";
    code: string;
    language?: string;
    title?: string;
    lineStart?: number;
    id?: string;
};
export declare const postWriteView: (post: Post) => {
    id: string;
    sessionId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    surfaces: {
        id: string | undefined;
        kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
        index: number;
    }[];
};
export declare const postDetailView: (post: Post) => {
    surfaces: ({
        index: number;
        kind: "html";
        html: string;
        kits?: string[];
        id?: string;
    } | {
        index: number;
        kind: "diff";
        patch?: string;
        files?: import("./types.ts").DiffFile[];
        layout?: "unified" | "split";
        id?: string;
    } | {
        index: number;
        kind: "image";
        assetId: string;
        alt?: string;
        caption?: string;
        id?: string;
    } | {
        index: number;
        kind: "trace";
        steps?: import("./types.ts").TraceStep[];
        assetId?: string;
        title?: string;
        id?: string;
    } | {
        index: number;
        kind: "markdown";
        markdown: string;
        id?: string;
    } | {
        index: number;
        kind: "terminal";
        text: string;
        cols?: number;
        title?: string;
        id?: string;
    } | {
        index: number;
        kind: "mermaid";
        mermaid: string;
        id?: string;
    } | {
        index: number;
        kind: "json";
        data: unknown;
        id?: string;
    } | {
        index: number;
        kind: "code";
        code: string;
        language?: string;
        title?: string;
        lineStart?: number;
        id?: string;
    })[];
    history: {
        surfaces: ({
            index: number;
            kind: "html";
            html: string;
            kits?: string[];
            id?: string;
        } | {
            index: number;
            kind: "diff";
            patch?: string;
            files?: import("./types.ts").DiffFile[];
            layout?: "unified" | "split";
            id?: string;
        } | {
            index: number;
            kind: "image";
            assetId: string;
            alt?: string;
            caption?: string;
            id?: string;
        } | {
            index: number;
            kind: "trace";
            steps?: import("./types.ts").TraceStep[];
            assetId?: string;
            title?: string;
            id?: string;
        } | {
            index: number;
            kind: "markdown";
            markdown: string;
            id?: string;
        } | {
            index: number;
            kind: "terminal";
            text: string;
            cols?: number;
            title?: string;
            id?: string;
        } | {
            index: number;
            kind: "mermaid";
            mermaid: string;
            id?: string;
        } | {
            index: number;
            kind: "json";
            data: unknown;
            id?: string;
        } | {
            index: number;
            kind: "code";
            code: string;
            language?: string;
            title?: string;
            lineStart?: number;
            id?: string;
        })[];
        version: number;
        title: string;
        at: string;
    }[];
    id: string;
    sessionId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    version: number;
};
export declare const sessionPostListRowView: (post: Post) => {
    id: string;
    sessionId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    surfaces: ({
        id: string | undefined;
        kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
        index: number;
    } | {
        index: number;
        kind: "html";
        html: string;
        kits?: string[];
        id?: string;
    } | {
        index: number;
        kind: "diff";
        patch?: string;
        files?: import("./types.ts").DiffFile[];
        layout?: "unified" | "split";
        id?: string;
    } | {
        index: number;
        kind: "image";
        assetId: string;
        alt?: string;
        caption?: string;
        id?: string;
    } | {
        index: number;
        kind: "trace";
        steps?: import("./types.ts").TraceStep[];
        assetId?: string;
        title?: string;
        id?: string;
    } | {
        index: number;
        kind: "markdown";
        markdown: string;
        id?: string;
    } | {
        index: number;
        kind: "terminal";
        text: string;
        cols?: number;
        title?: string;
        id?: string;
    } | {
        index: number;
        kind: "mermaid";
        mermaid: string;
        id?: string;
    } | {
        index: number;
        kind: "json";
        data: unknown;
        id?: string;
    } | {
        index: number;
        kind: "code";
        code: string;
        language?: string;
        title?: string;
        lineStart?: number;
        id?: string;
    })[];
    parts: ({
        id: string | undefined;
        kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
        index: number;
    } | {
        index: number;
        kind: "html";
        html: string;
        kits?: string[];
        id?: string;
    } | {
        index: number;
        kind: "diff";
        patch?: string;
        files?: import("./types.ts").DiffFile[];
        layout?: "unified" | "split";
        id?: string;
    } | {
        index: number;
        kind: "image";
        assetId: string;
        alt?: string;
        caption?: string;
        id?: string;
    } | {
        index: number;
        kind: "trace";
        steps?: import("./types.ts").TraceStep[];
        assetId?: string;
        title?: string;
        id?: string;
    } | {
        index: number;
        kind: "markdown";
        markdown: string;
        id?: string;
    } | {
        index: number;
        kind: "terminal";
        text: string;
        cols?: number;
        title?: string;
        id?: string;
    } | {
        index: number;
        kind: "mermaid";
        mermaid: string;
        id?: string;
    } | {
        index: number;
        kind: "json";
        data: unknown;
        id?: string;
    } | {
        index: number;
        kind: "code";
        code: string;
        language?: string;
        title?: string;
        lineStart?: number;
        id?: string;
    })[];
};
export declare const mcpPostListRowView: (post: Pick<Post, "id" | "sessionId" | "title" | "version" | "updatedAt"> & {
    surfaces: Pick<Surface, "id" | "kind">[];
}) => {
    id: string;
    sessionId: string;
    title: string;
    version: number;
    updatedAt: string;
    surfaces: {
        id: string | undefined;
        kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
        index: number;
    }[];
};
export declare const recentSurfacePreviewView: (surface: Surface, index: number) => {
    index: number;
    kind: "html";
    html: string;
    kits?: string[];
    id?: string;
    truncated?: true;
} | {
    index: number;
    kind: "diff";
    patch?: string;
    files?: import("./types.ts").DiffFile[];
    layout?: "unified" | "split";
    id?: string;
    truncated?: true;
} | {
    index: number;
    kind: "image";
    assetId: string;
    alt?: string;
    caption?: string;
    id?: string;
    truncated?: true;
} | {
    index: number;
    kind: "trace";
    steps?: import("./types.ts").TraceStep[];
    assetId?: string;
    title?: string;
    id?: string;
    truncated?: true;
} | {
    index: number;
    kind: "markdown";
    markdown: string;
    id?: string;
    truncated?: true;
} | {
    index: number;
    kind: "terminal";
    text: string;
    cols?: number;
    title?: string;
    id?: string;
    truncated?: true;
} | {
    index: number;
    kind: "mermaid";
    mermaid: string;
    id?: string;
    truncated?: true;
} | {
    index: number;
    kind: "json";
    data: unknown;
    id?: string;
    truncated?: true;
} | {
    index: number;
    kind: "code";
    code: string;
    language?: string;
    title?: string;
    lineStart?: number;
    id?: string;
    truncated?: true;
};
export declare const recentPostRowView: (post: Post, session: Session | null | undefined) => {
    id: string;
    sessionId: string;
    sessionTitle: string | null;
    agent: string | null;
    title: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    surfaces: ({
        index: number;
        kind: "html";
        html: string;
        kits?: string[];
        id?: string;
        truncated?: true;
    } | {
        index: number;
        kind: "diff";
        patch?: string;
        files?: import("./types.ts").DiffFile[];
        layout?: "unified" | "split";
        id?: string;
        truncated?: true;
    } | {
        index: number;
        kind: "image";
        assetId: string;
        alt?: string;
        caption?: string;
        id?: string;
        truncated?: true;
    } | {
        index: number;
        kind: "trace";
        steps?: import("./types.ts").TraceStep[];
        assetId?: string;
        title?: string;
        id?: string;
        truncated?: true;
    } | {
        index: number;
        kind: "markdown";
        markdown: string;
        id?: string;
        truncated?: true;
    } | {
        index: number;
        kind: "terminal";
        text: string;
        cols?: number;
        title?: string;
        id?: string;
        truncated?: true;
    } | {
        index: number;
        kind: "mermaid";
        mermaid: string;
        id?: string;
        truncated?: true;
    } | {
        index: number;
        kind: "json";
        data: unknown;
        id?: string;
        truncated?: true;
    } | {
        index: number;
        kind: "code";
        code: string;
        language?: string;
        title?: string;
        lineStart?: number;
        id?: string;
        truncated?: true;
    })[];
    parts: ({
        index: number;
        kind: "html";
        html: string;
        kits?: string[];
        id?: string;
        truncated?: true;
    } | {
        index: number;
        kind: "diff";
        patch?: string;
        files?: import("./types.ts").DiffFile[];
        layout?: "unified" | "split";
        id?: string;
        truncated?: true;
    } | {
        index: number;
        kind: "image";
        assetId: string;
        alt?: string;
        caption?: string;
        id?: string;
        truncated?: true;
    } | {
        index: number;
        kind: "trace";
        steps?: import("./types.ts").TraceStep[];
        assetId?: string;
        title?: string;
        id?: string;
        truncated?: true;
    } | {
        index: number;
        kind: "markdown";
        markdown: string;
        id?: string;
        truncated?: true;
    } | {
        index: number;
        kind: "terminal";
        text: string;
        cols?: number;
        title?: string;
        id?: string;
        truncated?: true;
    } | {
        index: number;
        kind: "mermaid";
        mermaid: string;
        id?: string;
        truncated?: true;
    } | {
        index: number;
        kind: "json";
        data: unknown;
        id?: string;
        truncated?: true;
    } | {
        index: number;
        kind: "code";
        code: string;
        language?: string;
        title?: string;
        lineStart?: number;
        id?: string;
        truncated?: true;
    })[];
    partKinds: ("html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code")[];
};
export declare const feedbackView: (comment: Comment) => Feedback;
export declare const sessionRowView: (session: Session, postCount: number) => {
    postCount: number;
    surfaceCount: number;
    id: string;
    agent: string;
    title: string | null;
    cwd: string | null;
    createdAt: string;
    lastActiveAt: string;
    agentSeq: number;
};
