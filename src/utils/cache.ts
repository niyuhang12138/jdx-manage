class Cache<K extends string> {
    private instance;

    constructor(type: 'local' | 'session' = 'local') {
        this.instance = type === 'local' ? localStorage : sessionStorage;
    }

    get<T>(key: K): T | undefined {
        const value = this.instance.getItem(key);
        if (value) {
            try {
                return JSON.parse(value) as T;
            } catch {
                return value as T;
            }
        } else return void 0;
    }

    set<T>(key: K, value: T): void {
        if (typeof value === 'object' && value !== null) {
            this.instance.setItem(key, JSON.stringify(value));
        } else {
            this.instance.setItem(key, value as string);
        }
    }

    remove(key: K): void {
        this.instance.removeItem(key);
    }

    has(key: K): boolean {
        return !!this.instance.getItem(key);
    }
}

type LocalCacheKey = 'token' | 'login-account';

export const localCache = new Cache<LocalCacheKey>('local');
