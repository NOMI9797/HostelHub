import { useState, useEffect, useCallback } from 'react';

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
}

export const useHostel = (hostelId: string): UseHostelReturn => {
  const [hostel, setHostel] = useState<HostelDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHostel = useCallback(async () => {
    if (!hostelId) {
      setError('Hostel ID is required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/hostels/${hostelId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Hostel not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setHostel(data);
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
    refetch
  };
}; 