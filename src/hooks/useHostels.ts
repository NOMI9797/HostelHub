import { useState, useEffect, useCallback } from 'react';
import CachedApiService from '@/lib/cached-api';

export interface Hostel {
  hostelId: string;
  hostelName: string;
  description: string;
  city: string;
  area: string;
  nearbyLandmark: string;
  mainPhoto: string;
  galleryImages: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  roomTypes: string;
  facilities: string;
  genderSpecific: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

interface UseHostelsReturn {
  hostels: Hostel[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  searchHostels: (query: string, location: string) => Promise<void>;
  clearSearch: () => void;
  cacheStats?: { fromCache: boolean; timestamp: number };
}

export const useHostels = (): UseHostelsReturn => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [originalHostels, setOriginalHostels] = useState<Hostel[]>([]);
  const [cacheStats, setCacheStats] = useState<{ fromCache: boolean; timestamp: number } | undefined>();

  const fetchHostels = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await CachedApiService.getHostels();
      setHostels(response.data);
      setOriginalHostels(response.data);
      setCacheStats({ fromCache: response.fromCache, timestamp: response.timestamp });
      
      // Log cache performance
      if (response.fromCache) {
        console.log('🚀 Hostels loaded from cache');
      } else {
        console.log('📡 Hostels fetched from API');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch hostels';
      setError(errorMessage);
      console.error('Error fetching hostels:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchHostels = useCallback(async (query: string, location: string) => {
    try {
      setLoading(true);
      setError(null);

      if (!query && !location) {
        setHostels(originalHostels);
        return;
      }

      const response = await CachedApiService.searchHostels(query, location);
      setHostels(response.data);
      setCacheStats({ fromCache: response.fromCache, timestamp: response.timestamp });
      
      // Log cache performance
      if (response.fromCache) {
        console.log('🚀 Search results loaded from cache');
      } else {
        console.log('📡 Search results fetched from API');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search hostels';
      setError(errorMessage);
      console.error('Error searching hostels:', err);
    } finally {
      setLoading(false);
    }
  }, [originalHostels]);

  const clearSearch = useCallback(() => {
    setHostels(originalHostels);
  }, [originalHostels]);

  const refetch = useCallback(async () => {
    await fetchHostels();
  }, [fetchHostels]);

  useEffect(() => {
    fetchHostels();
  }, [fetchHostels]);

  return {
    hostels,
    loading,
    error,
    refetch,
    searchHostels,
    clearSearch,
    cacheStats
  };
}; 