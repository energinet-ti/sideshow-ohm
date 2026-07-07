import { type Mode, type Theme } from "./themes.ts";
export declare const THEME_TOKEN_NAMES: readonly ["--bg", "--panel", "--surface", "--text", "--muted", "--faint", "--border", "--border-2", "--accent", "--accent-bg", "--hover", "--danger"];
export type ThemeTokenName = (typeof THEME_TOKEN_NAMES)[number];
export type ThemeTokens = Record<ThemeTokenName, string>;
export declare function themeTokens(theme: Theme, mode: Mode): ThemeTokens;
export declare const THEME_DEFAULTS: Record<Mode, ThemeTokens>;
