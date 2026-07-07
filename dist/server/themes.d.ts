export interface Accent {
    bg: string;
    text: string;
    border: string;
}
export interface Palette {
    bg: string;
    panel: string;
    surface: string;
    text: string;
    muted: string;
    faint: string;
    border: string;
    border2: string;
    hover: string;
    info: Accent;
    success: Accent;
    warning: Accent;
    danger: Accent;
}
export interface Theme {
    id: string;
    label: string;
    shiki: {
        light: string;
        dark: string;
    };
    light: Palette;
    dark: Palette;
}
export type Mode = "light" | "dark";
export declare function viewerVars(p: Palette): Record<string, string>;
export declare function schemeCss(light: Record<string, string>, dark: Record<string, string>, mode?: Mode): string;
export declare function viewerThemeCss(t: Theme, mode?: Mode): string;
export declare function tokenThemeCss(t: Theme, mode?: Mode): string;
export declare const THEMES: Theme[];
export declare const DEFAULT_THEME_ID = "github";
export declare function themeById(id: string | null | undefined): Theme;
export declare const themeOptions: () => {
    id: string;
    label: string;
}[];
