import { z } from "zod";
export declare const MCP_SERVER_INFO: {
    name: string;
    version: string;
};
export declare const MCP_INSTRUCTIONS: string;
export declare const MCP_TOOL_DESCRIPTIONS: {
    readonly publishPostHttp: `Publish a post to the user's sideshow workspace. A post is an ordered list of surfaces (${string}). Returns the post id, view URL, sessionId, and the new surface ids (use them to target a surface for later edits without a get_post round-trip) \u2014 pass sessionId as \`session\` on later calls. On your first publish, pass sessionTitle naming the task. If the result includes userFeedback, those are new comments from the user. Call get_design_guide first if you have not this session.`;
    readonly publishPostStdio: `Publish a post to the user's sideshow workspace. A post is an ordered list of surfaces (${string}). Returns the post id, view URL, and the new surface ids (use them to target a surface for later edits without a get_post round-trip). On your first publish, pass sessionTitle naming the task. If the result includes userFeedback, those are new comments from the user. Call get_design_guide first if you have not this session.`;
    readonly updatePost: "Revise a post in place (same card, new version). Prefer this over publishing a near-duplicate. Pass the full replacement surfaces array. Returns the new surface ids (use them to target a surface for later edits without a get_post round-trip). If the result includes userFeedback, read it.";
    readonly listPostsHttp: "List posts — pass a session id to scope, or omit for all sessions. Returns lean post rows with surfaces as `{id, kind, index}` metadata (no surface bodies).";
    readonly listPostsStdio: "List posts in this conversation's session. Returns lean post rows with surfaces as `{id, kind, index}` metadata (no surface bodies).";
    readonly getPost: "Fetch a single post by id — returns the full post object including surfaces (with their ids and 0-based indexes), version, and history. Use this to recover surface ids (or indexes) for per-surface operations (edit_surface, remove_surface, reorder_surfaces) after a context compaction, or to inspect a post's current state before editing.";
    readonly publishSurfaceHttp: `Deprecated alias of publish_post \u2014 Publish a post to the user's sideshow workspace. A post is an ordered list of surfaces (${string}). Returns the post id, view URL, and sessionId \u2014 pass sessionId as \`session\` on later calls. On your first publish, pass sessionTitle naming the task. If the result includes userFeedback, those are new comments from the user. Call get_design_guide first if you have not this session.`;
    readonly publishSurfaceStdio: `Deprecated alias of publish_post \u2014 Publish a post to the user's sideshow workspace. A post is an ordered list of surfaces (${string}). Returns the post id and view URL. On your first publish, pass sessionTitle naming the task. If the result includes userFeedback, those are new comments from the user. Call get_design_guide first if you have not this session.`;
    readonly updateSurface: "Deprecated alias of update_post — Revise a post in place (same card, new version). Prefer this over publishing a near-duplicate. Pass the full replacement surfaces array. If the result includes userFeedback, read it.";
    readonly publishSnippet: "Publish an HTML snippet — sugar for a post with one html surface. Send a body fragment only. Returns the id, view URL, and sessionId. Pass sessionTitle on first publish. Prefer publish_post when you want a diff or multiple surfaces.";
    readonly updateSnippet: "Revise an html snippet in place — sugar for update_post with one html surface.";
    readonly waitForFeedback: "Block until the user comments on this session in their browser (or the timeout passes). Returns new comments since the agent last received feedback on any channel. Use timeoutSeconds 0 for a non-blocking check.";
    readonly replyToUser: "Post a short reply under a post's comment thread. Use to acknowledge feedback or explain a revision.";
    readonly listSurfacesHttp: "Deprecated alias of list_posts — List posts; pass a session id to scope, or omit for all sessions. Returns lean post rows with surfaces as `{id, kind, index}` metadata (no surface bodies).";
    readonly listSurfacesStdio: "Deprecated alias of list_posts — List posts in this conversation's session. Returns lean post rows with surfaces as `{id, kind, index}` metadata (no surface bodies).";
    readonly uploadAsset: "Upload a binary asset (image, trace file, any file) and get back its id and URL. base64-encode the bytes in `data` (MCP carries no binary). Then reference it: put {kind:'image', assetId} or {kind:'trace', assetId} in a post's surfaces, or embed the returned url in an html surface (<img src=\"...\">). Pass the same session id you publish with so the asset is grouped and cleaned up with it.";
    readonly uploadAssetStdio: "Upload a binary asset (image, trace file, any file) and get back its id and URL. base64-encode the bytes in `data`. Then reference it: put {kind:'image', assetId} or {kind:'trace', assetId} in a post's surfaces, or embed the returned url in an html surface (<img src=\"...\">). Attached to this conversation's session.";
    readonly getDesignGuide: "Fetch the design contract: post surfaces, html fragment rules, theme CSS variables, CDN allowlist, and the interactivity bridge. Call once per session before publishing.";
    readonly addSurface: "Append a surface to an existing post (same card, new version). Optionally pass before/after (surface id or 0-based index) to control insert position; default is append at the end. If the result includes userFeedback, read it.";
    readonly editSurface: "Replace or content-edit a single surface in a post (same card, new version). Pass `surface` for a full replacement, or `content` for a content-only update that preserves the surface kind and extra fields (language, cols, layout, etc.). `target` is a surface id or 0-based index. If the result includes userFeedback, read it.";
    readonly removeSurface: "Remove a single surface from a post (same card, new version). `target` is a surface id or 0-based index. Rejects if it's the last surface (posts need at least one). If the result includes userFeedback, read it.";
    readonly reorderSurfaces: "Reorder the surfaces in a post (same card, new version). Pass an array of surface ids or 0-based indices in the desired order; the length must match the current surface count. If the result includes userFeedback, read it.";
};
export declare const HTTP_MCP_TOOLS: readonly [{
    readonly name: "publish_post";
    readonly description: `Publish a post to the user's sideshow workspace. A post is an ordered list of surfaces (${string}). Returns the post id, view URL, sessionId, and the new surface ids (use them to target a surface for later edits without a get_post round-trip) \u2014 pass sessionId as \`session\` on later calls. On your first publish, pass sessionTitle naming the task. If the result includes userFeedback, those are new comments from the user. Call get_design_guide first if you have not this session.`;
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly title: {
                readonly type: "string";
                readonly description: string;
            };
            readonly surfaces: {
                readonly type: "array";
                readonly description: string;
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly kind: {
                            readonly type: "string";
                            readonly enum: ["html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code", ...("html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code")[]];
                        };
                        readonly html: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly kits: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly description: string;
                        };
                        readonly markdown: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly mermaid: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly patch: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly files: {
                            readonly type: "array";
                            readonly description: string;
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly filename: {
                                        readonly type: "string";
                                    };
                                    readonly before: {
                                        readonly type: "string";
                                    };
                                    readonly after: {
                                        readonly type: "string";
                                    };
                                    readonly language: {
                                        readonly type: "string";
                                    };
                                };
                                readonly required: readonly ["filename", "before", "after"];
                            };
                        };
                        readonly layout: {
                            readonly type: "string";
                            readonly enum: readonly ["unified", "split"];
                        };
                        readonly assetId: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly alt: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly caption: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly title: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly text: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly cols: {
                            readonly type: "number";
                            readonly description: string;
                        };
                        readonly data: {
                            readonly description: string;
                        };
                        readonly code: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly language: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly lineStart: {
                            readonly type: "number";
                            readonly description: string;
                        };
                        readonly steps: {
                            readonly type: "array";
                            readonly description: string;
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly type: "string";
                                        readonly description: string;
                                    };
                                    readonly kind: {
                                        readonly type: "string";
                                        readonly description: string;
                                    };
                                    readonly detail: {
                                        readonly type: "string";
                                        readonly description: string;
                                    };
                                    readonly ts: {
                                        readonly type: "string";
                                        readonly description: string;
                                    };
                                };
                                readonly required: readonly ["label"];
                            };
                        };
                    };
                    readonly required: readonly ["kind"];
                };
            };
            readonly session: {
                readonly type: "string";
                readonly description: string;
            };
            readonly sessionTitle: {
                readonly type: "string";
                readonly description: string;
            };
            readonly agent: {
                readonly type: "string";
                readonly description: string;
            };
        };
        readonly required: readonly ["title", "surfaces"];
    };
}, {
    readonly name: "update_post";
    readonly description: "Revise a post in place (same card, new version). Prefer this over publishing a near-duplicate. Pass the full replacement surfaces array. Returns the new surface ids (use them to target a surface for later edits without a get_post round-trip). If the result includes userFeedback, read it.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: string;
            };
            readonly surfaces: {
                readonly type: "array";
                readonly description: string;
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly kind: {
                            readonly type: "string";
                            readonly enum: ["html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code", ...("html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code")[]];
                        };
                        readonly html: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly kits: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly description: string;
                        };
                        readonly markdown: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly mermaid: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly patch: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly files: {
                            readonly type: "array";
                            readonly description: string;
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly filename: {
                                        readonly type: "string";
                                    };
                                    readonly before: {
                                        readonly type: "string";
                                    };
                                    readonly after: {
                                        readonly type: "string";
                                    };
                                    readonly language: {
                                        readonly type: "string";
                                    };
                                };
                                readonly required: readonly ["filename", "before", "after"];
                            };
                        };
                        readonly layout: {
                            readonly type: "string";
                            readonly enum: readonly ["unified", "split"];
                        };
                        readonly assetId: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly alt: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly caption: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly title: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly text: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly cols: {
                            readonly type: "number";
                            readonly description: string;
                        };
                        readonly data: {
                            readonly description: string;
                        };
                        readonly code: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly language: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly lineStart: {
                            readonly type: "number";
                            readonly description: string;
                        };
                        readonly steps: {
                            readonly type: "array";
                            readonly description: string;
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly type: "string";
                                        readonly description: string;
                                    };
                                    readonly kind: {
                                        readonly type: "string";
                                        readonly description: string;
                                    };
                                    readonly detail: {
                                        readonly type: "string";
                                        readonly description: string;
                                    };
                                    readonly ts: {
                                        readonly type: "string";
                                        readonly description: string;
                                    };
                                };
                                readonly required: readonly ["label"];
                            };
                        };
                    };
                    readonly required: readonly ["kind"];
                };
            };
            readonly title: {
                readonly type: "string";
                readonly description: string;
            };
        };
        readonly required: readonly ["id"];
    };
}, {
    readonly name: "list_posts";
    readonly description: "List posts — pass a session id to scope, or omit for all sessions. Returns lean post rows with surfaces as `{id, kind, index}` metadata (no surface bodies).";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly session: {
                readonly type: "string";
                readonly description: "Optional session id to scope the list";
            };
        };
    };
}, {
    readonly name: "get_post";
    readonly description: "Fetch a single post by id — returns the full post object including surfaces (with their ids and 0-based indexes), version, and history. Use this to recover surface ids (or indexes) for per-surface operations (edit_surface, remove_surface, reorder_surfaces) after a context compaction, or to inspect a post's current state before editing.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: string;
            };
        };
        readonly required: readonly ["id"];
    };
}, {
    readonly name: "publish_surface";
    readonly description: `Deprecated alias of publish_post \u2014 Publish a post to the user's sideshow workspace. A post is an ordered list of surfaces (${string}). Returns the post id, view URL, and sessionId \u2014 pass sessionId as \`session\` on later calls. On your first publish, pass sessionTitle naming the task. If the result includes userFeedback, those are new comments from the user. Call get_design_guide first if you have not this session.`;
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly title: {
                readonly type: "string";
                readonly description: string;
            };
            readonly parts: {
                readonly type: "array";
                readonly description: string;
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly kind: {
                            readonly type: "string";
                            readonly enum: ["html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code", ...("html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code")[]];
                        };
                        readonly html: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly kits: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly description: string;
                        };
                        readonly markdown: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly mermaid: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly patch: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly files: {
                            readonly type: "array";
                            readonly description: string;
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly filename: {
                                        readonly type: "string";
                                    };
                                    readonly before: {
                                        readonly type: "string";
                                    };
                                    readonly after: {
                                        readonly type: "string";
                                    };
                                    readonly language: {
                                        readonly type: "string";
                                    };
                                };
                                readonly required: readonly ["filename", "before", "after"];
                            };
                        };
                        readonly layout: {
                            readonly type: "string";
                            readonly enum: readonly ["unified", "split"];
                        };
                        readonly assetId: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly alt: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly caption: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly title: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly text: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly cols: {
                            readonly type: "number";
                            readonly description: string;
                        };
                        readonly data: {
                            readonly description: string;
                        };
                        readonly code: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly language: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly lineStart: {
                            readonly type: "number";
                            readonly description: string;
                        };
                        readonly steps: {
                            readonly type: "array";
                            readonly description: string;
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly type: "string";
                                        readonly description: string;
                                    };
                                    readonly kind: {
                                        readonly type: "string";
                                        readonly description: string;
                                    };
                                    readonly detail: {
                                        readonly type: "string";
                                        readonly description: string;
                                    };
                                    readonly ts: {
                                        readonly type: "string";
                                        readonly description: string;
                                    };
                                };
                                readonly required: readonly ["label"];
                            };
                        };
                    };
                    readonly required: readonly ["kind"];
                };
            };
            readonly session: {
                readonly type: "string";
                readonly description: string;
            };
            readonly sessionTitle: {
                readonly type: "string";
                readonly description: string;
            };
            readonly agent: {
                readonly type: "string";
                readonly description: string;
            };
        };
        readonly required: readonly ["title", "parts"];
    };
}, {
    readonly name: "update_surface";
    readonly description: "Deprecated alias of update_post — Revise a post in place (same card, new version). Prefer this over publishing a near-duplicate. Pass the full replacement surfaces array. If the result includes userFeedback, read it.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: string;
            };
            readonly parts: {
                readonly type: "array";
                readonly description: string;
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly kind: {
                            readonly type: "string";
                            readonly enum: ["html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code", ...("html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code")[]];
                        };
                        readonly html: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly kits: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly description: string;
                        };
                        readonly markdown: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly mermaid: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly patch: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly files: {
                            readonly type: "array";
                            readonly description: string;
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly filename: {
                                        readonly type: "string";
                                    };
                                    readonly before: {
                                        readonly type: "string";
                                    };
                                    readonly after: {
                                        readonly type: "string";
                                    };
                                    readonly language: {
                                        readonly type: "string";
                                    };
                                };
                                readonly required: readonly ["filename", "before", "after"];
                            };
                        };
                        readonly layout: {
                            readonly type: "string";
                            readonly enum: readonly ["unified", "split"];
                        };
                        readonly assetId: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly alt: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly caption: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly title: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly text: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly cols: {
                            readonly type: "number";
                            readonly description: string;
                        };
                        readonly data: {
                            readonly description: string;
                        };
                        readonly code: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly language: {
                            readonly type: "string";
                            readonly description: string;
                        };
                        readonly lineStart: {
                            readonly type: "number";
                            readonly description: string;
                        };
                        readonly steps: {
                            readonly type: "array";
                            readonly description: string;
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly type: "string";
                                        readonly description: string;
                                    };
                                    readonly kind: {
                                        readonly type: "string";
                                        readonly description: string;
                                    };
                                    readonly detail: {
                                        readonly type: "string";
                                        readonly description: string;
                                    };
                                    readonly ts: {
                                        readonly type: "string";
                                        readonly description: string;
                                    };
                                };
                                readonly required: readonly ["label"];
                            };
                        };
                    };
                    readonly required: readonly ["kind"];
                };
            };
            readonly title: {
                readonly type: "string";
                readonly description: string;
            };
        };
        readonly required: readonly ["id"];
    };
}, {
    readonly name: "publish_snippet";
    readonly description: "Publish an HTML snippet — sugar for a post with one html surface. Send a body fragment only. Returns the id, view URL, and sessionId. Pass sessionTitle on first publish. Prefer publish_post when you want a diff or multiple surfaces.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly title: {
                readonly type: "string";
                readonly description: "Short human-readable title";
            };
            readonly html: {
                readonly type: "string";
                readonly description: string;
            };
            readonly kits: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: string;
            };
            readonly session: {
                readonly type: "string";
                readonly description: string;
            };
            readonly sessionTitle: {
                readonly type: "string";
                readonly description: "Session name (first publish only)";
            };
            readonly agent: {
                readonly type: "string";
                readonly description: string;
            };
        };
        readonly required: readonly ["title", "html"];
    };
}, {
    readonly name: "update_snippet";
    readonly description: "Revise an html snippet in place — sugar for update_post with one html surface.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly description: "Surface id";
            };
            readonly html: {
                readonly type: "string";
                readonly description: "Replacement HTML body fragment";
            };
            readonly kits: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: string;
            };
            readonly title: {
                readonly type: "string";
                readonly description: string;
            };
        };
        readonly required: readonly ["id"];
    };
}, {
    readonly name: "wait_for_feedback";
    readonly description: "Block until the user comments on this session in their browser (or the timeout passes). Returns new comments since the agent last received feedback on any channel. Use timeoutSeconds 0 for a non-blocking check.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly session: {
                readonly type: "string";
                readonly description: "Session id to watch";
            };
            readonly afterSeq: {
                readonly type: "number";
                readonly description: string;
            };
            readonly timeoutSeconds: {
                readonly type: "number";
                readonly description: `${string} (default 60)`;
            };
        };
        readonly required: readonly ["session"];
    };
}, {
    readonly name: "reply_to_user";
    readonly description: "Post a short reply under a post's comment thread. Use to acknowledge feedback or explain a revision.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly postId: {
                readonly type: "string";
                readonly description: "Post whose comment thread to reply in";
            };
            readonly surfaceId: {
                readonly type: "string";
                readonly description: "Deprecated alias of postId";
            };
            readonly message: {
                readonly type: "string";
                readonly description: string;
            };
            readonly author: {
                readonly type: "string";
                readonly description: "Your agent name (default \"agent\"; \"user\" is reserved and coerced to \"agent\")";
            };
        };
        readonly required: readonly ["message"];
    };
}, {
    readonly name: "list_surfaces";
    readonly description: "Deprecated alias of list_posts — List posts; pass a session id to scope, or omit for all sessions. Returns lean post rows with surfaces as `{id, kind, index}` metadata (no surface bodies).";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly session: {
                readonly type: "string";
                readonly description: "Optional session id to scope the list";
            };
        };
    };
}, {
    readonly name: "upload_asset";
    readonly description: "Upload a binary asset (image, trace file, any file) and get back its id and URL. base64-encode the bytes in `data` (MCP carries no binary). Then reference it: put {kind:'image', assetId} or {kind:'trace', assetId} in a post's surfaces, or embed the returned url in an html surface (<img src=\"...\">). Pass the same session id you publish with so the asset is grouped and cleaned up with it.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: string;
            };
            readonly contentType: {
                readonly type: "string";
                readonly description: string;
            };
            readonly filename: {
                readonly type: "string";
                readonly description: string;
            };
            readonly kind: {
                readonly type: "string";
                readonly enum: readonly ["image", "trace", "file"];
                readonly description: string;
            };
            readonly session: {
                readonly type: "string";
                readonly description: string;
            };
        };
        readonly required: readonly ["data", "contentType"];
    };
}, {
    readonly name: "get_design_guide";
    readonly description: "Fetch the design contract: post surfaces, html fragment rules, theme CSS variables, CDN allowlist, and the interactivity bridge. Call once per session before publishing.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {};
    };
}, {
    readonly name: "add_surface";
    readonly description: "Append a surface to an existing post (same card, new version). Optionally pass before/after (surface id or 0-based index) to control insert position; default is append at the end. If the result includes userFeedback, read it.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly postId: {
                readonly type: "string";
                readonly description: string;
            };
            readonly surface: {
                readonly type: "object";
                readonly properties: {
                    readonly kind: {
                        readonly type: "string";
                        readonly enum: ["html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code", ...("html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code")[]];
                    };
                    readonly html: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly kits: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: string;
                    };
                    readonly markdown: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly mermaid: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly patch: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly files: {
                        readonly type: "array";
                        readonly description: string;
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly filename: {
                                    readonly type: "string";
                                };
                                readonly before: {
                                    readonly type: "string";
                                };
                                readonly after: {
                                    readonly type: "string";
                                };
                                readonly language: {
                                    readonly type: "string";
                                };
                            };
                            readonly required: readonly ["filename", "before", "after"];
                        };
                    };
                    readonly layout: {
                        readonly type: "string";
                        readonly enum: readonly ["unified", "split"];
                    };
                    readonly assetId: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly alt: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly caption: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly title: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly text: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly cols: {
                        readonly type: "number";
                        readonly description: string;
                    };
                    readonly data: {
                        readonly description: string;
                    };
                    readonly code: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly language: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly lineStart: {
                        readonly type: "number";
                        readonly description: string;
                    };
                    readonly steps: {
                        readonly type: "array";
                        readonly description: string;
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly label: {
                                    readonly type: "string";
                                    readonly description: string;
                                };
                                readonly kind: {
                                    readonly type: "string";
                                    readonly description: string;
                                };
                                readonly detail: {
                                    readonly type: "string";
                                    readonly description: string;
                                };
                                readonly ts: {
                                    readonly type: "string";
                                    readonly description: string;
                                };
                            };
                            readonly required: readonly ["label"];
                        };
                    };
                };
                readonly required: readonly ["kind"];
            };
            readonly before: {
                readonly type: "string";
                readonly description: string;
            };
            readonly after: {
                readonly type: "string";
                readonly description: string;
            };
        };
        readonly required: readonly ["postId", "surface"];
    };
}, {
    readonly name: "edit_surface";
    readonly description: "Replace or content-edit a single surface in a post (same card, new version). Pass `surface` for a full replacement, or `content` for a content-only update that preserves the surface kind and extra fields (language, cols, layout, etc.). `target` is a surface id or 0-based index. If the result includes userFeedback, read it.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly postId: {
                readonly type: "string";
                readonly description: string;
            };
            readonly target: {
                readonly type: "string";
                readonly description: string;
            };
            readonly surface: {
                readonly type: "object";
                readonly properties: {
                    readonly kind: {
                        readonly type: "string";
                        readonly enum: ["html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code", ...("html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code")[]];
                    };
                    readonly html: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly kits: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: string;
                    };
                    readonly markdown: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly mermaid: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly patch: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly files: {
                        readonly type: "array";
                        readonly description: string;
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly filename: {
                                    readonly type: "string";
                                };
                                readonly before: {
                                    readonly type: "string";
                                };
                                readonly after: {
                                    readonly type: "string";
                                };
                                readonly language: {
                                    readonly type: "string";
                                };
                            };
                            readonly required: readonly ["filename", "before", "after"];
                        };
                    };
                    readonly layout: {
                        readonly type: "string";
                        readonly enum: readonly ["unified", "split"];
                    };
                    readonly assetId: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly alt: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly caption: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly title: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly text: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly cols: {
                        readonly type: "number";
                        readonly description: string;
                    };
                    readonly data: {
                        readonly description: string;
                    };
                    readonly code: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly language: {
                        readonly type: "string";
                        readonly description: string;
                    };
                    readonly lineStart: {
                        readonly type: "number";
                        readonly description: string;
                    };
                    readonly steps: {
                        readonly type: "array";
                        readonly description: string;
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly label: {
                                    readonly type: "string";
                                    readonly description: string;
                                };
                                readonly kind: {
                                    readonly type: "string";
                                    readonly description: string;
                                };
                                readonly detail: {
                                    readonly type: "string";
                                    readonly description: string;
                                };
                                readonly ts: {
                                    readonly type: "string";
                                    readonly description: string;
                                };
                            };
                            readonly required: readonly ["label"];
                        };
                    };
                };
                readonly required: readonly ["kind"];
            };
            readonly content: {
                readonly type: "string";
                readonly description: "Raw content to slot into the existing surface's content field";
            };
            readonly kits: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: string;
            };
        };
        readonly required: readonly ["postId", "target"];
    };
}, {
    readonly name: "remove_surface";
    readonly description: "Remove a single surface from a post (same card, new version). `target` is a surface id or 0-based index. Rejects if it's the last surface (posts need at least one). If the result includes userFeedback, read it.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly postId: {
                readonly type: "string";
                readonly description: string;
            };
            readonly target: {
                readonly type: "string";
                readonly description: string;
            };
        };
        readonly required: readonly ["postId", "target"];
    };
}, {
    readonly name: "reorder_surfaces";
    readonly description: "Reorder the surfaces in a post (same card, new version). Pass an array of surface ids or 0-based indices in the desired order; the length must match the current surface count. If the result includes userFeedback, read it.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly postId: {
                readonly type: "string";
                readonly description: string;
            };
            readonly order: {
                readonly type: "array";
                readonly items: {
                    readonly oneOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "number";
                    }];
                };
                readonly description: "Surface ids or 0-based indices in the desired order";
            };
        };
        readonly required: readonly ["postId", "order"];
    };
}];
export declare const STDIO_MCP_INPUT_SCHEMAS: {
    readonly publishPost: {
        readonly title: z.ZodString;
        readonly surfaces: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<["html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code", ...("html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code")[]]>;
            html: z.ZodOptional<z.ZodString>;
            kits: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            markdown: z.ZodOptional<z.ZodString>;
            mermaid: z.ZodOptional<z.ZodString>;
            patch: z.ZodOptional<z.ZodString>;
            files: z.ZodOptional<z.ZodArray<z.ZodObject<{
                filename: z.ZodString;
                before: z.ZodString;
                after: z.ZodString;
                language: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }, {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }>, "many">>;
            layout: z.ZodOptional<z.ZodEnum<["unified", "split"]>>;
            assetId: z.ZodOptional<z.ZodString>;
            alt: z.ZodOptional<z.ZodString>;
            caption: z.ZodOptional<z.ZodString>;
            title: z.ZodOptional<z.ZodString>;
            steps: z.ZodOptional<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                kind: z.ZodOptional<z.ZodString>;
                detail: z.ZodOptional<z.ZodString>;
                ts: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }, {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }>, "many">>;
            text: z.ZodOptional<z.ZodString>;
            cols: z.ZodOptional<z.ZodNumber>;
            data: z.ZodOptional<z.ZodUnknown>;
            code: z.ZodOptional<z.ZodString>;
            language: z.ZodOptional<z.ZodString>;
            lineStart: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
            html?: string | undefined;
            markdown?: string | undefined;
            mermaid?: string | undefined;
            code?: string | undefined;
            patch?: string | undefined;
            text?: string | undefined;
            data?: unknown;
            kits?: string[] | undefined;
            assetId?: string | undefined;
            files?: {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }[] | undefined;
            layout?: "unified" | "split" | undefined;
            alt?: string | undefined;
            caption?: string | undefined;
            steps?: {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }[] | undefined;
            title?: string | undefined;
            cols?: number | undefined;
            language?: string | undefined;
            lineStart?: number | undefined;
        }, {
            kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
            html?: string | undefined;
            markdown?: string | undefined;
            mermaid?: string | undefined;
            code?: string | undefined;
            patch?: string | undefined;
            text?: string | undefined;
            data?: unknown;
            kits?: string[] | undefined;
            assetId?: string | undefined;
            files?: {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }[] | undefined;
            layout?: "unified" | "split" | undefined;
            alt?: string | undefined;
            caption?: string | undefined;
            steps?: {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }[] | undefined;
            title?: string | undefined;
            cols?: number | undefined;
            language?: string | undefined;
            lineStart?: number | undefined;
        }>, "many">;
        readonly sessionTitle: z.ZodOptional<z.ZodString>;
    };
    readonly updatePost: {
        readonly id: z.ZodString;
        readonly surfaces: z.ZodOptional<z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<["html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code", ...("html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code")[]]>;
            html: z.ZodOptional<z.ZodString>;
            kits: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            markdown: z.ZodOptional<z.ZodString>;
            mermaid: z.ZodOptional<z.ZodString>;
            patch: z.ZodOptional<z.ZodString>;
            files: z.ZodOptional<z.ZodArray<z.ZodObject<{
                filename: z.ZodString;
                before: z.ZodString;
                after: z.ZodString;
                language: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }, {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }>, "many">>;
            layout: z.ZodOptional<z.ZodEnum<["unified", "split"]>>;
            assetId: z.ZodOptional<z.ZodString>;
            alt: z.ZodOptional<z.ZodString>;
            caption: z.ZodOptional<z.ZodString>;
            title: z.ZodOptional<z.ZodString>;
            steps: z.ZodOptional<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                kind: z.ZodOptional<z.ZodString>;
                detail: z.ZodOptional<z.ZodString>;
                ts: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }, {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }>, "many">>;
            text: z.ZodOptional<z.ZodString>;
            cols: z.ZodOptional<z.ZodNumber>;
            data: z.ZodOptional<z.ZodUnknown>;
            code: z.ZodOptional<z.ZodString>;
            language: z.ZodOptional<z.ZodString>;
            lineStart: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
            html?: string | undefined;
            markdown?: string | undefined;
            mermaid?: string | undefined;
            code?: string | undefined;
            patch?: string | undefined;
            text?: string | undefined;
            data?: unknown;
            kits?: string[] | undefined;
            assetId?: string | undefined;
            files?: {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }[] | undefined;
            layout?: "unified" | "split" | undefined;
            alt?: string | undefined;
            caption?: string | undefined;
            steps?: {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }[] | undefined;
            title?: string | undefined;
            cols?: number | undefined;
            language?: string | undefined;
            lineStart?: number | undefined;
        }, {
            kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
            html?: string | undefined;
            markdown?: string | undefined;
            mermaid?: string | undefined;
            code?: string | undefined;
            patch?: string | undefined;
            text?: string | undefined;
            data?: unknown;
            kits?: string[] | undefined;
            assetId?: string | undefined;
            files?: {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }[] | undefined;
            layout?: "unified" | "split" | undefined;
            alt?: string | undefined;
            caption?: string | undefined;
            steps?: {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }[] | undefined;
            title?: string | undefined;
            cols?: number | undefined;
            language?: string | undefined;
            lineStart?: number | undefined;
        }>, "many">>;
        readonly title: z.ZodOptional<z.ZodString>;
    };
    readonly getPost: {
        readonly id: z.ZodString;
    };
    readonly publishSurface: {
        readonly title: z.ZodString;
        readonly parts: z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<["html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code", ...("html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code")[]]>;
            html: z.ZodOptional<z.ZodString>;
            kits: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            markdown: z.ZodOptional<z.ZodString>;
            mermaid: z.ZodOptional<z.ZodString>;
            patch: z.ZodOptional<z.ZodString>;
            files: z.ZodOptional<z.ZodArray<z.ZodObject<{
                filename: z.ZodString;
                before: z.ZodString;
                after: z.ZodString;
                language: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }, {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }>, "many">>;
            layout: z.ZodOptional<z.ZodEnum<["unified", "split"]>>;
            assetId: z.ZodOptional<z.ZodString>;
            alt: z.ZodOptional<z.ZodString>;
            caption: z.ZodOptional<z.ZodString>;
            title: z.ZodOptional<z.ZodString>;
            steps: z.ZodOptional<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                kind: z.ZodOptional<z.ZodString>;
                detail: z.ZodOptional<z.ZodString>;
                ts: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }, {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }>, "many">>;
            text: z.ZodOptional<z.ZodString>;
            cols: z.ZodOptional<z.ZodNumber>;
            data: z.ZodOptional<z.ZodUnknown>;
            code: z.ZodOptional<z.ZodString>;
            language: z.ZodOptional<z.ZodString>;
            lineStart: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
            html?: string | undefined;
            markdown?: string | undefined;
            mermaid?: string | undefined;
            code?: string | undefined;
            patch?: string | undefined;
            text?: string | undefined;
            data?: unknown;
            kits?: string[] | undefined;
            assetId?: string | undefined;
            files?: {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }[] | undefined;
            layout?: "unified" | "split" | undefined;
            alt?: string | undefined;
            caption?: string | undefined;
            steps?: {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }[] | undefined;
            title?: string | undefined;
            cols?: number | undefined;
            language?: string | undefined;
            lineStart?: number | undefined;
        }, {
            kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
            html?: string | undefined;
            markdown?: string | undefined;
            mermaid?: string | undefined;
            code?: string | undefined;
            patch?: string | undefined;
            text?: string | undefined;
            data?: unknown;
            kits?: string[] | undefined;
            assetId?: string | undefined;
            files?: {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }[] | undefined;
            layout?: "unified" | "split" | undefined;
            alt?: string | undefined;
            caption?: string | undefined;
            steps?: {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }[] | undefined;
            title?: string | undefined;
            cols?: number | undefined;
            language?: string | undefined;
            lineStart?: number | undefined;
        }>, "many">;
        readonly sessionTitle: z.ZodOptional<z.ZodString>;
    };
    readonly updateSurface: {
        readonly id: z.ZodString;
        readonly parts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            kind: z.ZodEnum<["html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code", ...("html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code")[]]>;
            html: z.ZodOptional<z.ZodString>;
            kits: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            markdown: z.ZodOptional<z.ZodString>;
            mermaid: z.ZodOptional<z.ZodString>;
            patch: z.ZodOptional<z.ZodString>;
            files: z.ZodOptional<z.ZodArray<z.ZodObject<{
                filename: z.ZodString;
                before: z.ZodString;
                after: z.ZodString;
                language: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }, {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }>, "many">>;
            layout: z.ZodOptional<z.ZodEnum<["unified", "split"]>>;
            assetId: z.ZodOptional<z.ZodString>;
            alt: z.ZodOptional<z.ZodString>;
            caption: z.ZodOptional<z.ZodString>;
            title: z.ZodOptional<z.ZodString>;
            steps: z.ZodOptional<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                kind: z.ZodOptional<z.ZodString>;
                detail: z.ZodOptional<z.ZodString>;
                ts: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }, {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }>, "many">>;
            text: z.ZodOptional<z.ZodString>;
            cols: z.ZodOptional<z.ZodNumber>;
            data: z.ZodOptional<z.ZodUnknown>;
            code: z.ZodOptional<z.ZodString>;
            language: z.ZodOptional<z.ZodString>;
            lineStart: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
            html?: string | undefined;
            markdown?: string | undefined;
            mermaid?: string | undefined;
            code?: string | undefined;
            patch?: string | undefined;
            text?: string | undefined;
            data?: unknown;
            kits?: string[] | undefined;
            assetId?: string | undefined;
            files?: {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }[] | undefined;
            layout?: "unified" | "split" | undefined;
            alt?: string | undefined;
            caption?: string | undefined;
            steps?: {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }[] | undefined;
            title?: string | undefined;
            cols?: number | undefined;
            language?: string | undefined;
            lineStart?: number | undefined;
        }, {
            kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
            html?: string | undefined;
            markdown?: string | undefined;
            mermaid?: string | undefined;
            code?: string | undefined;
            patch?: string | undefined;
            text?: string | undefined;
            data?: unknown;
            kits?: string[] | undefined;
            assetId?: string | undefined;
            files?: {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }[] | undefined;
            layout?: "unified" | "split" | undefined;
            alt?: string | undefined;
            caption?: string | undefined;
            steps?: {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }[] | undefined;
            title?: string | undefined;
            cols?: number | undefined;
            language?: string | undefined;
            lineStart?: number | undefined;
        }>, "many">>;
        readonly title: z.ZodOptional<z.ZodString>;
    };
    readonly publishSnippet: {
        readonly title: z.ZodString;
        readonly html: z.ZodString;
        readonly kits: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        readonly sessionTitle: z.ZodOptional<z.ZodString>;
    };
    readonly updateSnippet: {
        readonly id: z.ZodString;
        readonly html: z.ZodOptional<z.ZodString>;
        readonly kits: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        readonly title: z.ZodOptional<z.ZodString>;
    };
    readonly waitForFeedback: {
        readonly timeoutSeconds: z.ZodOptional<z.ZodNumber>;
    };
    readonly replyToUser: {
        readonly postId: z.ZodOptional<z.ZodString>;
        readonly surfaceId: z.ZodOptional<z.ZodString>;
        readonly message: z.ZodString;
    };
    readonly uploadAsset: {
        readonly data: z.ZodString;
        readonly contentType: z.ZodString;
        readonly filename: z.ZodOptional<z.ZodString>;
        readonly kind: z.ZodOptional<z.ZodEnum<["image", "trace", "file"]>>;
    };
    readonly addSurface: {
        readonly postId: z.ZodString;
        readonly surface: z.ZodObject<{
            kind: z.ZodEnum<["html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code", ...("html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code")[]]>;
            html: z.ZodOptional<z.ZodString>;
            kits: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            markdown: z.ZodOptional<z.ZodString>;
            mermaid: z.ZodOptional<z.ZodString>;
            patch: z.ZodOptional<z.ZodString>;
            files: z.ZodOptional<z.ZodArray<z.ZodObject<{
                filename: z.ZodString;
                before: z.ZodString;
                after: z.ZodString;
                language: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }, {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }>, "many">>;
            layout: z.ZodOptional<z.ZodEnum<["unified", "split"]>>;
            assetId: z.ZodOptional<z.ZodString>;
            alt: z.ZodOptional<z.ZodString>;
            caption: z.ZodOptional<z.ZodString>;
            title: z.ZodOptional<z.ZodString>;
            steps: z.ZodOptional<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                kind: z.ZodOptional<z.ZodString>;
                detail: z.ZodOptional<z.ZodString>;
                ts: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }, {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }>, "many">>;
            text: z.ZodOptional<z.ZodString>;
            cols: z.ZodOptional<z.ZodNumber>;
            data: z.ZodOptional<z.ZodUnknown>;
            code: z.ZodOptional<z.ZodString>;
            language: z.ZodOptional<z.ZodString>;
            lineStart: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
            html?: string | undefined;
            markdown?: string | undefined;
            mermaid?: string | undefined;
            code?: string | undefined;
            patch?: string | undefined;
            text?: string | undefined;
            data?: unknown;
            kits?: string[] | undefined;
            assetId?: string | undefined;
            files?: {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }[] | undefined;
            layout?: "unified" | "split" | undefined;
            alt?: string | undefined;
            caption?: string | undefined;
            steps?: {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }[] | undefined;
            title?: string | undefined;
            cols?: number | undefined;
            language?: string | undefined;
            lineStart?: number | undefined;
        }, {
            kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
            html?: string | undefined;
            markdown?: string | undefined;
            mermaid?: string | undefined;
            code?: string | undefined;
            patch?: string | undefined;
            text?: string | undefined;
            data?: unknown;
            kits?: string[] | undefined;
            assetId?: string | undefined;
            files?: {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }[] | undefined;
            layout?: "unified" | "split" | undefined;
            alt?: string | undefined;
            caption?: string | undefined;
            steps?: {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }[] | undefined;
            title?: string | undefined;
            cols?: number | undefined;
            language?: string | undefined;
            lineStart?: number | undefined;
        }>;
        readonly before: z.ZodOptional<z.ZodString>;
        readonly after: z.ZodOptional<z.ZodString>;
    };
    readonly editSurface: {
        readonly postId: z.ZodString;
        readonly target: z.ZodString;
        readonly surface: z.ZodOptional<z.ZodObject<{
            kind: z.ZodEnum<["html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code", ...("html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code")[]]>;
            html: z.ZodOptional<z.ZodString>;
            kits: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            markdown: z.ZodOptional<z.ZodString>;
            mermaid: z.ZodOptional<z.ZodString>;
            patch: z.ZodOptional<z.ZodString>;
            files: z.ZodOptional<z.ZodArray<z.ZodObject<{
                filename: z.ZodString;
                before: z.ZodString;
                after: z.ZodString;
                language: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }, {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }>, "many">>;
            layout: z.ZodOptional<z.ZodEnum<["unified", "split"]>>;
            assetId: z.ZodOptional<z.ZodString>;
            alt: z.ZodOptional<z.ZodString>;
            caption: z.ZodOptional<z.ZodString>;
            title: z.ZodOptional<z.ZodString>;
            steps: z.ZodOptional<z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                kind: z.ZodOptional<z.ZodString>;
                detail: z.ZodOptional<z.ZodString>;
                ts: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }, {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }>, "many">>;
            text: z.ZodOptional<z.ZodString>;
            cols: z.ZodOptional<z.ZodNumber>;
            data: z.ZodOptional<z.ZodUnknown>;
            code: z.ZodOptional<z.ZodString>;
            language: z.ZodOptional<z.ZodString>;
            lineStart: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
            html?: string | undefined;
            markdown?: string | undefined;
            mermaid?: string | undefined;
            code?: string | undefined;
            patch?: string | undefined;
            text?: string | undefined;
            data?: unknown;
            kits?: string[] | undefined;
            assetId?: string | undefined;
            files?: {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }[] | undefined;
            layout?: "unified" | "split" | undefined;
            alt?: string | undefined;
            caption?: string | undefined;
            steps?: {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }[] | undefined;
            title?: string | undefined;
            cols?: number | undefined;
            language?: string | undefined;
            lineStart?: number | undefined;
        }, {
            kind: "html" | "diff" | "image" | "trace" | "markdown" | "terminal" | "mermaid" | "json" | "code";
            html?: string | undefined;
            markdown?: string | undefined;
            mermaid?: string | undefined;
            code?: string | undefined;
            patch?: string | undefined;
            text?: string | undefined;
            data?: unknown;
            kits?: string[] | undefined;
            assetId?: string | undefined;
            files?: {
                filename: string;
                before: string;
                after: string;
                language?: string | undefined;
            }[] | undefined;
            layout?: "unified" | "split" | undefined;
            alt?: string | undefined;
            caption?: string | undefined;
            steps?: {
                label: string;
                kind?: string | undefined;
                detail?: string | undefined;
                ts?: string | undefined;
            }[] | undefined;
            title?: string | undefined;
            cols?: number | undefined;
            language?: string | undefined;
            lineStart?: number | undefined;
        }>>;
        readonly content: z.ZodOptional<z.ZodString>;
        readonly kits: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    };
    readonly removeSurface: {
        readonly postId: z.ZodString;
        readonly target: z.ZodString;
    };
    readonly reorderSurfaces: {
        readonly postId: z.ZodString;
        readonly order: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
    };
};
