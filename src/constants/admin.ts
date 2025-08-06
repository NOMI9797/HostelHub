// Admin Dashboard Constants
export const ADMIN_TABS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;

export const ADMIN_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;

export const ADMIN_ACTIONS = {
  VIEW: 'view',
  APPROVE: 'approve',
  REJECT: 'reject'
} as const;

// Status Colors and Styles
export const STATUS_STYLES = {
  pending: {
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-300',
    hoverBgColor: 'hover:bg-yellow-50',
    hoverTextColor: 'hover:text-yellow-700'
  },
  approved: {
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-300',
    hoverBgColor: 'hover:bg-green-50',
    hoverTextColor: 'hover:text-green-700'
  },
  rejected: {
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    borderColor: 'border-red-300',
    hoverBgColor: 'hover:bg-red-50',
    hoverTextColor: 'hover:text-red-700'
  }
} as const;

// Admin Page Titles and Descriptions
export const ADMIN_CONTENT = {
  title: 'Admin Dashboard',
  subtitle: 'Review and manage hostel submissions. Approve quality listings and reject those that don\'t meet standards.',
  accessDenied: {
    title: 'Access Denied',
    message: 'You don\'t have permission to access this page.'
  }
} as const; 