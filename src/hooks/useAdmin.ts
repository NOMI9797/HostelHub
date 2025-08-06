import { useState, useEffect } from 'react';
import { HostelResponse } from '@/types/hostel';
import { HostelService } from '@/lib/hostel-service';
import { CacheInvalidationService } from '@/lib/cache-invalidation';

export function useAdmin() {
  const [pendingHostels, setPendingHostels] = useState<HostelResponse[]>([]);
  const [allHostels, setAllHostels] = useState<HostelResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [pendingData, allData] = await Promise.all([
        HostelService.getPendingHostels(),
        HostelService.getAllHostelsForAdmin()
      ]);
      setPendingHostels(pendingData);
      setAllHostels(allData);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleApprove = async (hostelId: string, adminUserId: string) => {
    try {
      setProcessing(hostelId);
      await HostelService.approveHostel(hostelId, adminUserId);
      await CacheInvalidationService.invalidateOnHostelUpdate(hostelId);
      await loadAllData(); // Refresh data
    } catch (error) {
      console.error('Error approving hostel:', error);
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (hostelId: string, adminUserId: string, reason?: string) => {
    try {
      setProcessing(hostelId);
      await HostelService.rejectHostel(hostelId, adminUserId, reason);
      await CacheInvalidationService.invalidateOnHostelUpdate(hostelId);
      await loadAllData(); // Refresh data
    } catch (error) {
      console.error('Error rejecting hostel:', error);
    } finally {
      setProcessing(null);
    }
  };

  const handleViewHostel = (hostelId: string) => {
    window.open(`/hostels/${hostelId}`, '_blank');
  };

  // Calculate statistics
  const approvedHostels = allHostels.filter(hostel => hostel.status === 'approved');
  const rejectedHostels = allHostels.filter(hostel => hostel.status === 'rejected');

  return {
    pendingHostels,
    allHostels,
    approvedHostels,
    rejectedHostels,
    loading,
    processing,
    handleApprove,
    handleReject,
    handleViewHostel,
    loadAllData
  };
} 