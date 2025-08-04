import { useState, useEffect, useCallback } from 'react';

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
}

export const useHostels = (): UseHostelsReturn => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [originalHostels, setOriginalHostels] = useState<Hostel[]>([]);

  const fetchHostels = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/hostels');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setHostels(data);
      setOriginalHostels(data);
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

      const filteredHostels = originalHostels.filter((hostel) => {
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

      setHostels(filteredHostels);
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
    clearSearch
  };
}; 