import { type Mode } from "./themes.ts";
import type { CodeSurface, DiffSurface, MarkdownSurface, TerminalSurface } from "./types.ts";
export type RenderedSurface = {
    body: string;
    css: string;
};
export type RenderOpts = {
    theme?: string;
    mode?: Mode;
};
export declare function renderMarkdown(part: MarkdownSurface, opts?: RenderOpts): Promise<RenderedSurface>;
export declare function renderTerminal(part: TerminalSurface): RenderedSurface;
export declare function renderCode(part: CodeSurface, opts?: RenderOpts): Promise<RenderedSurface>;
export declare function renderDiff(part: DiffSurface, opts?: RenderOpts): Promise<RenderedSurface>;
