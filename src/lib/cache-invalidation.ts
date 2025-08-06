import CachedApiService from './cached-api';

// Import the cache event emitter
import { cacheEventEmitter } from '@/hooks/useHostels';

export class CacheInvalidationService {
  // Invalidate all hostel-related cache when a new hostel is created
  static invalidateOnHostelCreate(): void {
    // Clear all cache to ensure fresh data for all users
    CachedApiService.clearAllCache();
    console.log('🗑️ All cache cleared: New hostel created');
    // Force emit with a small delay to ensure cache is cleared first
    setTimeout(() => {
      cacheEventEmitter.emit();
    }, 100);
  }

  // Invalidate specific hostel and all hostels cache when a hostel is updated
  static invalidateOnHostelUpdate(hostelId: string): void {
    CachedApiService.invalidateHostel(hostelId);
    CachedApiService.invalidateHostels();
    console.log(`🗑️ Cache invalidated: Hostel ${hostelId} updated`);
    cacheEventEmitter.emit();
  }

  // Invalidate specific hostel and all hostels cache when a hostel is deleted
  static invalidateOnHostelDelete(hostelId: string): void {
    CachedApiService.invalidateHostel(hostelId);
    CachedApiService.invalidateHostels();
    console.log(`🗑️ Cache invalidated: Hostel ${hostelId} deleted`);
    cacheEventEmitter.emit();
  }

  // Invalidate search results when hostels are modified
  static invalidateSearchResults(): void {
    // Note: We can't invalidate specific search results without knowing the queries
    // So we'll clear all cache to ensure fresh data
    CachedApiService.clearAllCache();
    console.log('🗑️ All cache cleared: Search results may be stale');
    cacheEventEmitter.emit();
  }

  // Invalidate user-specific hostel cache
  static invalidateUserHostels(userId: string): void {
    CachedApiService.invalidateHostels();
    console.log(`🗑️ Cache invalidated: User ${userId} hostels updated`);
    cacheEventEmitter.emit();
  }

  // Clear all cache (use sparingly)
  static clearAllCache(): void {
    CachedApiService.clearAllCache();
    console.log('🗑️ All cache cleared');
    cacheEventEmitter.emit();
  }

  // Get cache statistics for debugging
  static getCacheStats() {
    return CachedApiService.getCacheStats();
  }
}

export default CacheInvalidationService; 