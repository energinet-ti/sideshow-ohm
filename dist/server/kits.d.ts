export interface Kit {
    id: string;
    label: string;
    summary: string;
    classes: string;
    css: string;
    js?: string;
}
export declare const KITS: Kit[];
export declare const isKnownKit: (id: unknown) => id is string;
export declare const KIT_IDS: string[];
export declare const kitSummaries: () => {
    id: string;
    label: string;
    summary: string;
    classes: string;
}[];
export declare function kitAssets(ids: readonly string[] | undefined): {
    css: string;
    js: string;
};
