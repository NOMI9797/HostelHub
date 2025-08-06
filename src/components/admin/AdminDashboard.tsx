'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/appwrite';
import { HostelService } from '@/lib/hostel-service';
import { HostelResponse } from '@/types/hostel';
import { Shield, Clock, CheckCircle, XCircle, AlertTriangle, Eye } from 'lucide-react';
import Header from '@/components/layout/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import CacheInvalidationService from '@/lib/cache-invalidation';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [pendingHostels, setPendingHostels] = useState<HostelResponse[]>([]);
  const [allHostels, setAllHostels] = useState<HostelResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role === UserRole.SUPER_ADMIN) {
      loadAllData();
    }
  }, [user]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [pendingHostels, allHostels] = await Promise.all([
        HostelService.getPendingHostels(),
        HostelService.getAllHostelsForAdmin()
      ]);
      setPendingHostels(pendingHostels);
      setAllHostels(allHostels);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };



  const handleApprove = async (hostelId: string) => {
    if (!user?.$id) return;
    
    try {
      setProcessing(hostelId);
      await HostelService.approveHostel(hostelId, user.$id);
      
      // Invalidate cache so homepage shows the approved hostel immediately
      CacheInvalidationService.invalidateOnHostelUpdate(hostelId);
      
      await loadAllData(); // Reload all data to update statistics
    } catch (error) {
      console.error('Error approving hostel:', error);
      alert('Failed to approve hostel. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (hostelId: string) => {
    if (!user?.$id) return;
    
    const reason = prompt('Please provide a reason for rejection (optional):');
    
    try {
      setProcessing(hostelId);
      await HostelService.rejectHostel(hostelId, user.$id, reason || undefined);
      
      // Invalidate cache so homepage reflects the rejection immediately
      CacheInvalidationService.invalidateOnHostelUpdate(hostelId);
      
      await loadAllData(); // Reload all data to update statistics
    } catch (error) {
      console.error('Error rejecting hostel:', error);
      alert('Failed to reject hostel. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  const handleViewHostel = (hostelId: string) => {
    // Open hostel details in a new tab
    window.open(`/hostels/${hostelId}`, '_blank');
  };

  // Calculate statistics
  const approvedHostels = allHostels.filter(hostel => hostel.status === 'approved');
  const rejectedHostels = allHostels.filter(hostel => hostel.status === 'rejected');

  // Check if user is super admin
  if (user?.role !== UserRole.SUPER_ADMIN) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don&apos;t have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
                      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Review and manage hostel submissions. Approve quality listings and reject those that don&apos;t meet standards.
            </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{pendingHostels.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Approved</p>
                <p className="text-2xl font-bold text-gray-900">{approvedHostels.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{rejectedHostels.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Hostels */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mr-3" />
              Pending Hostels ({pendingHostels.length})
            </h2>
            <p className="text-gray-600 mt-2">Review these hostel submissions and decide whether to approve or reject them.</p>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <LoadingSpinner />
              <p className="text-gray-600 mt-4">Loading pending hostels...</p>
            </div>
          ) : pendingHostels.length === 0 ? (
            <div className="p-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pending Hostels</h3>
              <p className="text-gray-600">All hostel submissions have been reviewed!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {pendingHostels.map((hostel) => (
                <div key={hostel.$id} className="p-8 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {hostel.mainPhoto && (
                            <img 
                              src={HostelService.getFileUrl(hostel.mainPhoto)} 
                              alt={hostel.hostelName}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {hostel.hostelName}
                          </h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {hostel.description}
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-900">Location:</span>
                              <p className="text-gray-600">{hostel.city}, {hostel.area}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">Owner:</span>
                              <p className="text-gray-600">{hostel.ownerName}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">Contact:</span>
                              <p className="text-gray-600">{hostel.ownerPhone}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">Gender:</span>
                              <p className="text-gray-600 capitalize">{hostel.genderSpecific}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                              <Clock className="w-4 h-4 mr-1" />
                              Pending Review
                            </span>
                            <span className="text-sm text-gray-500 ml-3">
                              Submitted: {new Date(hostel.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 mt-6 lg:mt-0 lg:ml-6">
                      <button
                        onClick={() => handleViewHostel(hostel.hostelId)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </button>
                      
                      <button
                        onClick={() => handleApprove(hostel.hostelId)}
                        disabled={processing === hostel.hostelId}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {processing === hostel.hostelId ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleReject(hostel.hostelId)}
                        disabled={processing === hostel.hostelId}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {processing === hostel.hostelId ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 