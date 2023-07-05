/**
 * The interface for CRUD operations on Workers KV.
 */
export class WorkersKV {
    namespace;
    constructor(namespace) {
        this.namespace = namespace;
    }
    get = async (key) => {
        const value = await this.namespace.get(key, {
            type: 'json',
            cacheTtl: 60,
        });
        return value;
    };
    put = async (key, value) => {
        await this.namespace.put(key, JSON.stringify(value));
    };
    delete = async (key) => {
        await this.namespace.delete(key);
    };
}
//# sourceMappingURL=workers-kv.js.map