import { globalCache, CACHE_KEYS, CACHE_TTL } from './cache';
import { Hostel } from '@/hooks/useHostels';

export interface CachedApiResponse<T> {
  data: T;
  fromCache: boolean;
  timestamp: number;
}

class CachedApiService {
  // Get all hostels with caching
  static async getHostels(): Promise<CachedApiResponse<Hostel[]>> {
    const cacheKey = CACHE_KEYS.HOSTELS;
    
    // Check cache first
    const cachedData = globalCache.get<Hostel[]>(cacheKey);
    if (cachedData) {
      return {
        data: cachedData,
        fromCache: true,
        timestamp: Date.now()
      };
    }

    // Fetch from API if not in cache
    try {
      const response = await fetch('/api/hostels');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Cache the result
      globalCache.set(cacheKey, data, CACHE_TTL.HOSTELS);
      
      return {
        data,
        fromCache: false,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error fetching hostels:', error);
      throw error;
    }
  }

  // Get individual hostel with caching
  static async getHostel(hostelId: string): Promise<CachedApiResponse<Hostel>> {
    const cacheKey = CACHE_KEYS.HOSTEL_DETAILS(hostelId);
    
    // Check cache first
    const cachedData = globalCache.get<Hostel>(cacheKey);
    if (cachedData) {
      return {
        data: cachedData,
        fromCache: true,
        timestamp: Date.now()
      };
    }

    // Fetch from API if not in cache
    try {
      const response = await fetch(`/api/hostels/${hostelId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Hostel not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Cache the result
      globalCache.set(cacheKey, data, CACHE_TTL.HOSTEL_DETAILS);
      
      return {
        data,
        fromCache: false,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error fetching hostel:', error);
      throw error;
    }
  }

  // Search hostels with caching
  static async searchHostels(query: string, location: string): Promise<CachedApiResponse<Hostel[]>> {
    const cacheKey = CACHE_KEYS.SEARCH_RESULTS(query, location);
    
    // Check cache first
    const cachedData = globalCache.get<Hostel[]>(cacheKey);
    if (cachedData) {
      return {
        data: cachedData,
        fromCache: true,
        timestamp: Date.now()
      };
    }

    // Fetch all hostels and filter (since we don't have a search API endpoint)
    try {
      const allHostelsResponse = await this.getHostels();
      const allHostels = allHostelsResponse.data;
      
      // Filter based on search criteria
      const filteredHostels = allHostels.filter((hostel) => {
        const matchesQuery = !query || 
          hostel.hostelName.toLowerCase().includes(query.toLowerCase()) ||
          hostel.description.toLowerCase().includes(query.toLowerCase()) ||
          hostel.city.toLowerCase().includes(query.toLowerCase()) ||
          hostel.area.toLowerCase().includes(query.toLowerCase());
        
        const matchesLocation = !location ||
          hostel.city.toLowerCase().includes(location.toLowerCase()) ||
          hostel.area.toLowerCase().includes(location.toLowerCase()) ||
          hostel.nearbyLandmark.toLowerCase().includes(location.toLowerCase());
        
        return matchesQuery && matchesLocation;
      });
      
      // Cache the search results
      globalCache.set(cacheKey, filteredHostels, CACHE_TTL.SEARCH_RESULTS);
      
      return {
        data: filteredHostels,
        fromCache: false,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error searching hostels:', error);
      throw error;
    }
  }

  // Invalidate cache for specific keys
  static invalidateHostels(): void {
    globalCache.delete(CACHE_KEYS.HOSTELS);
  }

  static invalidateHostel(hostelId: string): void {
    globalCache.delete(CACHE_KEYS.HOSTEL_DETAILS(hostelId));
  }

  static invalidateSearchResults(query: string, location: string): void {
    globalCache.delete(CACHE_KEYS.SEARCH_RESULTS(query, location));
  }

  // Clear all cache
  static clearAllCache(): void {
    globalCache.clear();
  }

  // Get cache statistics
  static getCacheStats() {
    return globalCache.getStats();
  }
}

export default CachedApiService; 