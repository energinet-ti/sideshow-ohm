// One bus per app instance. On Cloudflare, each workspace is a single Durable
// Object running one app, so in-memory listeners are correct there too —
// a module-level singleton would leak events across workspaces sharing an isolate.
export class EventBus {
    listeners = new Set();
    broadcast(event) {
        for (const fn of this.listeners)
            fn(event);
    }
    subscribe(fn) {
        this.listeners.add(fn);
        return () => this.listeners.delete(fn);
    }
}
