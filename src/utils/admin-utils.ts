import { HostelResponse } from '@/types/hostel';
import { TabType } from '@/components/admin/AdminTabs';

/**
 * Get hostels for a specific tab
 */
export function getHostelsByTab(
  hostels: HostelResponse[],
  tab: TabType
): HostelResponse[] {
  switch (tab) {
    case 'pending':
      return hostels.filter(hostel => hostel.status === 'pending');
    case 'approved':
      return hostels.filter(hostel => hostel.status === 'approved');
    case 'rejected':
      return hostels.filter(hostel => hostel.status === 'rejected');
    default:
      return hostels;
  }
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return 'Invalid Date';
  }
}

/**
 * Get status display information
 */
export function getStatusInfo(status: string, tab: TabType) {
  const baseInfo = {
    pending: {
      label: 'Pending Review',
      dateField: 'submittedAt',
      datePrefix: 'Submitted'
    },
    approved: {
      label: 'Approved',
      dateField: 'approvedAt',
      datePrefix: 'Approved'
    },
    rejected: {
      label: 'Rejected',
      dateField: 'updatedAt',
      datePrefix: 'Rejected'
    }
  };

  return baseInfo[tab] || baseInfo.pending;
}

/**
 * Validate admin permissions
 */
export function validateAdminAccess(userRole?: string): boolean {
  return userRole === 'super_admin';
}

/**
 * Get hostel statistics
 */
export function getHostelStats(hostels: HostelResponse[]) {
  return {
    total: hostels.length,
    pending: hostels.filter(h => h.status === 'pending').length,
    approved: hostels.filter(h => h.status === 'approved').length,
    rejected: hostels.filter(h => h.status === 'rejected').length
  };
} 