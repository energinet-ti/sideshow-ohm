import type { Hono } from "hono";
import type { CommentWait, Feedback } from "./app.ts";
import { type Asset, type AssetKind, type Comment, type Store, type Post, type Surface } from "./types.ts";
type FlowResult<T> = Promise<{
    post: T;
    userFeedback?: Feedback[];
} | {
    error: string;
    status: number;
}>;
export interface McpDeps {
    store: Store;
    basePath?: (request: Request) => string;
    publishPost(input: {
        surfaces: Surface[];
        title?: string;
        session?: string;
        sessionTitle?: string;
        agent?: string;
    }): FlowResult<Post>;
    revisePost(id: string, patch: {
        surfaces?: Surface[];
        title?: string;
    }): FlowResult<Post>;
    appendPostSurface(id: string, surface: Surface, pos?: {
        before?: string;
        after?: string;
    }): FlowResult<Post>;
    replacePostSurface(id: string, target: string, replacement: {
        surface?: Surface;
        content?: string;
        kits?: unknown;
    }): FlowResult<Post>;
    removePostSurface(id: string, target: string): FlowResult<Post>;
    reorderPostSurfaces(id: string, order: (string | number)[]): FlowResult<Post>;
    createComment(input: {
        text: string;
        surface?: string;
        author: string;
    }): Promise<{
        comment: Comment;
        userFeedback?: Feedback[];
    } | {
        error: string;
        status: number;
    }>;
    waitForComments(q: CommentWait): Promise<{
        comments: Comment[];
        lastSeq: number;
    }>;
    uploadAsset(input: {
        data: Uint8Array;
        contentType: string;
        filename?: string;
        kind?: AssetKind;
        session?: string;
    }): Promise<{
        asset: Omit<Asset, "data">;
    } | {
        error: string;
        status: number;
    }>;
    guide: string;
}
export declare const coerceParts: (raw: unknown) => Promise<Surface[]>;
export declare function registerMcp(app: Hono, deps: McpDeps): void;
export {};
