interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

interface CacheConfig {
  defaultTTL: number; // Default time to live in milliseconds (5 minutes)
  maxSize: number; // Maximum number of items in cache
}

class CacheManager {
  private cache = new Map<string, CacheItem<unknown>>();
  private config: CacheConfig;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      defaultTTL: 5 * 60 * 1000, // 5 minutes
      maxSize: 100,
      ...config
    };
  }

  // Set a value in cache
  set<T>(key: string, data: T, ttl?: number): void {
    // Remove oldest items if cache is full
    if (this.cache.size >= this.config.maxSize) {
      this.evictOldest();
    }

    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.config.defaultTTL
    };

    this.cache.set(key, item);
  }

  // Get a value from cache
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if item has expired
    if (this.isExpired(item)) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  // Check if a key exists and is not expired
  has(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }

    if (this.isExpired(item)) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  // Remove a specific key
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  // Clear all cache
  clear(): void {
    this.cache.clear();
  }

  // Get cache size
  size(): number {
    return this.cache.size;
  }

  // Get cache statistics
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      keys: Array.from(this.cache.keys())
    };
  }

  // Check if item is expired
  private isExpired(item: CacheItem<unknown>): boolean {
    return Date.now() - item.timestamp > item.ttl;
  }

  // Remove oldest items when cache is full
  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, item] of this.cache.entries()) {
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }
}

// Create a singleton instance for global use
export const globalCache = new CacheManager();

// Cache keys constants
export const CACHE_KEYS = {
  HOSTELS: 'hostels',
  HOSTEL_DETAILS: (id: string) => `hostel-${id}`,
  SEARCH_RESULTS: (query: string, location: string) => `search-${query}-${location}`,
  USER_HOSTELS: (userId: string) => `user-hostels-${userId}`
} as const;

// Cache TTL constants (in milliseconds)
export const CACHE_TTL = {
  HOSTELS: 5 * 60 * 1000, // 5 minutes
  HOSTEL_DETAILS: 10 * 60 * 1000, // 10 minutes
  SEARCH_RESULTS: 2 * 60 * 1000, // 2 minutes
  USER_HOSTELS: 3 * 60 * 1000 // 3 minutes
} as const;

export default CacheManager; 