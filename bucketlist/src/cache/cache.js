class InMemoryCache {
    constructor() {
        this.cache = new Map();
    }

    // Set a value with optional TTL (in milliseconds)
    set(key, value, ttl = null) {
        const expires = ttl ? Date.now() + ttl : null;
        this.cache.set(key, { value, expires });
    }

    // Get a value from the cache
    get(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;

        // Check if the item has expired
        if (cached.expires && cached.expires < Date.now()) {
            this.cache.delete(key);
            return null;
        }

        return cached.value;
    }

    // Check if a key exists and is not expired
    has(key) {
        const cached = this.cache.get(key);
        if (!cached) return false;

        if (cached.expires && cached.expires < Date.now()) {
            this.cache.delete(key);
            return false;
        }

        return true;
    }

    // Delete a specific key from the cache
    delete(key) {
        this.cache.delete(key);
    }

    // Clear the entire cache
    clear() {
        this.cache.clear();
    }

    // Get the current size of the cache
    size() {
        return this.cache.size;
    }
}

const cache = new InMemoryCache();

export default cache;
