import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export type TabType = 'pending' | 'approved' | 'rejected';

interface AdminTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
}

export default function AdminTabs({ 
  activeTab, 
  onTabChange, 
  pendingCount, 
  approvedCount, 
  rejectedCount 
}: AdminTabsProps) {
  const tabs = [
    {
      id: 'pending' as TabType,
      label: 'Pending',
      count: pendingCount,
      icon: AlertTriangle,
      activeClass: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      inactiveClass: 'text-gray-600 hover:text-yellow-700 hover:bg-yellow-50'
    },
    {
      id: 'approved' as TabType,
      label: 'Approved',
      count: approvedCount,
      icon: CheckCircle,
      activeClass: 'bg-green-100 text-green-800 border-green-300',
      inactiveClass: 'text-gray-600 hover:text-green-700 hover:bg-green-50'
    },
    {
      id: 'rejected' as TabType,
      label: 'Rejected',
      count: rejectedCount,
      icon: XCircle,
      activeClass: 'bg-red-100 text-red-800 border-red-300',
      inactiveClass: 'text-gray-600 hover:text-red-700 hover:bg-red-50'
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`group relative flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 border-2 text-sm ${
                  isActive 
                    ? `${tab.activeClass} shadow-lg scale-105` 
                    : `${tab.inactiveClass} hover:scale-102 hover:shadow-md`
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="text-sm">{tab.label}</span>
                <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
} 