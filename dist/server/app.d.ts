import { Hono } from "hono";
import { type FeedEvent } from "./events.ts";
import { type Store } from "./types.ts";
export type { FeedEvent } from "./events.ts";
export type { Feedback } from "./apiViews.ts";
export type AuthenticateHook = (request: Request) => boolean | Response | Promise<boolean | Response>;
export type BasePathHook = string | ((request: Request) => string | null | undefined);
export type PublicReadMode = "session" | "full";
export interface ViewerChromeOptions {
    themePicker?: boolean;
    docLinks?: boolean;
    claudeConnect?: boolean;
}
export interface AppOptions {
    store: Store;
    viewerHtml: string;
    guideMarkdown: string;
    setupText: string;
    agentHowtoText?: string;
    authenticate?: AuthenticateHook;
    authToken?: string;
    basePath?: BasePathHook;
    publicRead?: PublicReadMode;
    screenshots?: boolean;
    defaultThemeId?: string;
    viewerChrome?: ViewerChromeOptions;
    version?: string;
    upgradeCommand?: string;
    fetchLatestRelease?: () => Promise<LatestRelease | null>;
    onEvent?: (event: FeedEvent) => void;
    maxHoldConnections?: number;
}
export interface LatestRelease {
    version: string;
    notes?: string;
}
export interface CommentWait {
    sessionId?: string;
    surfaceId?: string;
    author?: string;
    afterSeq?: number;
    waitSeconds: number;
}
export declare function createApp({ store, viewerHtml, guideMarkdown, setupText, agentHowtoText, authenticate, authToken, basePath, publicRead, screenshots, defaultThemeId, viewerChrome, version, upgradeCommand, fetchLatestRelease, onEvent, maxHoldConnections, }: AppOptions): Hono<import("hono/types").BlankEnv, import("hono/types").BlankSchema, "/">;
