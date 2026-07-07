import { SqlStore } from "./sqlStore.ts";
import type { SqlStorage } from "./types.ts";
export declare function createSqliteStorage(path?: string): SqlStorage;
export declare function migrateJsonToSqlite(sqlite: SqlStore, jsonPath: string): Promise<void>;
