import { type Surface } from "./types.ts";
export interface SurfaceParseResult {
    surfaces: Surface[];
    parts: Surface[];
    errors: string[];
}
export declare const coerceSurfaces: (raw: unknown) => Promise<Surface[]>;
export declare function validateSurfaces(raw: unknown): Promise<{
    ok: true;
    surfaces: Surface[];
    parts: Surface[];
} | {
    ok: false;
    error: string;
}>;
