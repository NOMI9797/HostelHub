import { CheckCircle, XCircle } from 'lucide-react';
import { TabType } from './AdminTabs';

interface EmptyStateProps {
  activeTab: TabType;
}

export default function EmptyState({ activeTab }: EmptyStateProps) {
  const getEmptyStateInfo = () => {
    switch (activeTab) {
      case 'pending':
        return {
          icon: CheckCircle,
          title: 'No Pending Hostels',
          description: 'All hostel submissions have been reviewed!',
          iconColor: 'text-green-500'
        };
      case 'approved':
        return {
          icon: CheckCircle,
          title: 'No Approved Hostels',
          description: 'No hostels have been approved yet.',
          iconColor: 'text-green-500'
        };
      case 'rejected':
        return {
          icon: XCircle,
          title: 'No Rejected Hostels',
          description: 'No hostels have been rejected yet.',
          iconColor: 'text-red-500'
        };
    }
  };

  const emptyStateInfo = getEmptyStateInfo();
  const Icon = emptyStateInfo.icon;

  return (
    <div className="p-20 text-center">
      <div className="max-w-md mx-auto">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Icon className={`w-12 h-12 ${emptyStateInfo.iconColor}`} />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {emptyStateInfo.title}
        </h3>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          {emptyStateInfo.description}
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto"></div>
      </div>
    </div>
  );
} 