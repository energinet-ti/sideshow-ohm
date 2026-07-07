export type FeedEvent = {
    type: "session-created" | "session-updated" | "session-deleted";
    id: string;
} | {
    type: "post-created" | "post-updated";
    id: string;
    sessionId: string;
    version: number;
} | {
    type: "post-deleted";
    id: string;
    sessionId: string;
} | {
    type: "comment-created";
    id: string;
    sessionId: string;
    surfaceId: string | null;
    seq: number;
} | {
    type: "comment-deleted";
    id: string;
    sessionId: string;
} | {
    type: "theme-changed";
    id: string;
} | {
    type: "trace-updated";
    sessionId: string;
    count: number;
};
type Listener = (event: FeedEvent) => void;
export declare class EventBus {
    private listeners;
    broadcast(event: FeedEvent): void;
    subscribe(fn: Listener): () => boolean;
}
export {};
