import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { TabType } from './AdminTabs';

interface SectionHeaderProps {
  activeTab: TabType;
  count: number;
}

export default function SectionHeader({ activeTab, count }: SectionHeaderProps) {
  const getHeaderInfo = () => {
    switch (activeTab) {
      case 'pending':
        return {
          icon: AlertTriangle,
          title: `Pending Hostels (${count})`,
          description: 'Review these hostel submissions and decide whether to approve or reject them.',
          iconColor: 'text-yellow-500'
        };
      case 'approved':
        return {
          icon: CheckCircle,
          title: `Approved Hostels (${count})`,
          description: 'These hostels have been approved and are now visible to the public.',
          iconColor: 'text-green-500'
        };
      case 'rejected':
        return {
          icon: XCircle,
          title: `Rejected Hostels (${count})`,
          description: 'These hostels were rejected and are not visible to the public.',
          iconColor: 'text-red-500'
        };
    }
  };

  const headerInfo = getHeaderInfo();
  const Icon = headerInfo.icon;

  return (
    <div className="px-10 py-8 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-white/50">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Icon className={`w-8 h-8 mr-4 ${headerInfo.iconColor}`} />
            {headerInfo.title}
          </h2>
          <p className="text-gray-600 mt-3 text-lg max-w-3xl">{headerInfo.description}</p>
        </div>
        <div className="hidden md:block">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
            <Icon className={`w-8 h-8 ${headerInfo.iconColor}`} />
          </div>
        </div>
      </div>
    </div>
  );
} 