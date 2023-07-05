/// <reference types="@cloudflare/workers-types" />
import { Database } from '../../types/database';
/**
 * The interface for CRUD operations on Workers KV.
 */
export declare class WorkersKV implements Database {
    namespace: KVNamespace;
    constructor(namespace: KVNamespace);
    get: <Type>(key: string) => Promise<Type | null>;
    put: <Type>(key: string, value: Type) => Promise<void>;
    delete: (key: string) => Promise<void>;
}
