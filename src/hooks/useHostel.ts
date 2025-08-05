import { useState, useEffect, useCallback } from 'react';
import CachedApiService from '@/lib/cached-api';

export interface HostelDetails {
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

interface UseHostelReturn {
  hostel: HostelDetails | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  cacheStats?: { fromCache: boolean; timestamp: number };
}

export const useHostel = (hostelId: string): UseHostelReturn => {
  const [hostel, setHostel] = useState<HostelDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cacheStats, setCacheStats] = useState<{ fromCache: boolean; timestamp: number } | undefined>();

  const fetchHostel = useCallback(async () => {
    if (!hostelId) {
      setError('Hostel ID is required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await CachedApiService.getHostel(hostelId);
      setHostel(response.data);
      setCacheStats({ fromCache: response.fromCache, timestamp: response.timestamp });
      
      // Log cache performance
      if (response.fromCache) {
        console.log('🚀 Hostel details loaded from cache');
      } else {
        console.log('📡 Hostel details fetched from API');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch hostel details';
      setError(errorMessage);
      console.error('Error fetching hostel:', err);
    } finally {
      setLoading(false);
    }
  }, [hostelId]);

  const refetch = useCallback(async () => {
    await fetchHostel();
  }, [fetchHostel]);

  useEffect(() => {
    fetchHostel();
  }, [fetchHostel]);

  return {
    hostel,
    loading,
    error,
    refetch,
    cacheStats
  };
}; 