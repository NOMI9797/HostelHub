'use client';

import { useState } from 'react';
import { Shield } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/appwrite';
import { TabType } from './AdminTabs';
import { useAdmin } from '@/hooks/useAdmin';
import AdminStats from './AdminStats';
import AdminTabs from './AdminTabs';
import SectionHeader from './SectionHeader';
import HostelCard from './HostelCard';
import EmptyState from './EmptyState';
import LoadingSpinner from '../LoadingSpinner';
import Header from '../layout/Header';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  
  const {
    pendingHostels,
    approvedHostels,
    rejectedHostels,
    loading,
    processing,
    handleApprove,
    handleReject,
    handleViewHostel
  } = useAdmin();

  // Check if user is super admin
  if (user?.role !== UserRole.SUPER_ADMIN) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don&apos;t have permission to access this page.</p>
        </div>
      </div>
    );
  }

  // Get current tab hostels
  const getCurrentTabHostels = () => {
    switch (activeTab) {
      case 'pending':
        return pendingHostels;
      case 'approved':
        return approvedHostels;
      case 'rejected':
        return rejectedHostels;
      default:
        return pendingHostels;
    }
  };

  const currentTabHostels = getCurrentTabHostels();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Main Header */}
      <Header />
      
      {/* Admin Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4 sm:py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <div className="ml-3 sm:ml-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="mb-12">
          <AdminStats
            pendingCount={pendingHostels.length}
            approvedCount={approvedHostels.length}
            rejectedCount={rejectedHostels.length}
          />
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <AdminTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            pendingCount={pendingHostels.length}
            approvedCount={approvedHostels.length}
            rejectedCount={rejectedHostels.length}
          />
        </div>

        {/* Hostels List */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <SectionHeader activeTab={activeTab} count={currentTabHostels.length} />

          {loading ? (
            <div className="p-16 text-center">
              <LoadingSpinner />
              <p className="text-gray-600 mt-6 text-lg">Loading hostels...</p>
            </div>
          ) : currentTabHostels.length === 0 ? (
            <EmptyState activeTab={activeTab} />
          ) : (
            <div className="divide-y divide-gray-100/50">
              {currentTabHostels.map((hostel) => (
                <HostelCard
                  key={hostel.$id}
                  hostel={hostel}
                  activeTab={activeTab}
                  processing={processing}
                  onView={handleViewHostel}
                  onApprove={(hostelId) => handleApprove(hostelId, user.$id)}
                  onReject={(hostelId) => handleReject(hostelId, user.$id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 