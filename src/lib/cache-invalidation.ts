import CachedApiService from './cached-api';

export class CacheInvalidationService {
  // Invalidate all hostel-related cache when a new hostel is created
  static invalidateOnHostelCreate(): void {
    CachedApiService.invalidateHostels();
    console.log('🗑️ Cache invalidated: New hostel created');
  }

  // Invalidate specific hostel and all hostels cache when a hostel is updated
  static invalidateOnHostelUpdate(hostelId: string): void {
    CachedApiService.invalidateHostel(hostelId);
    CachedApiService.invalidateHostels();
    console.log(`🗑️ Cache invalidated: Hostel ${hostelId} updated`);
  }

  // Invalidate specific hostel and all hostels cache when a hostel is deleted
  static invalidateOnHostelDelete(hostelId: string): void {
    CachedApiService.invalidateHostel(hostelId);
    CachedApiService.invalidateHostels();
    console.log(`🗑️ Cache invalidated: Hostel ${hostelId} deleted`);
  }

  // Invalidate search results when hostels are modified
  static invalidateSearchResults(): void {
    // Note: We can't invalidate specific search results without knowing the queries
    // So we'll clear all cache to ensure fresh data
    CachedApiService.clearAllCache();
    console.log('🗑️ All cache cleared: Search results may be stale');
  }

  // Invalidate user-specific hostel cache
  static invalidateUserHostels(userId: string): void {
    CachedApiService.invalidateHostels();
    console.log(`🗑️ Cache invalidated: User ${userId} hostels updated`);
  }

  // Clear all cache (use sparingly)
  static clearAllCache(): void {
    CachedApiService.clearAllCache();
    console.log('🗑️ All cache cleared');
  }

  // Get cache statistics for debugging
  static getCacheStats() {
    return CachedApiService.getCacheStats();
  }
}

export default CacheInvalidationService; 