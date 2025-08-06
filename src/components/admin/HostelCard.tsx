import { Eye, CheckCircle, XCircle, Clock, MapPin, Users } from 'lucide-react';
import { HostelResponse } from '@/types/hostel';
import { TabType } from './AdminTabs';
import { HostelService } from '@/lib/hostel-service';
import LoadingSpinner from '../LoadingSpinner';

interface HostelCardProps {
  hostel: HostelResponse;
  activeTab: TabType;
  processing: string | null;
  onView: (hostelId: string) => void;
  onApprove: (hostelId: string) => void;
  onReject: (hostelId: string) => void;
}

export default function HostelCard({ 
  hostel, 
  activeTab, 
  processing, 
  onView, 
  onApprove, 
  onReject 
}: HostelCardProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Date not available';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Date not available';
    }
  };

  const getStatusInfo = () => {
    switch (activeTab) {
      case 'pending':
        return {
          icon: Clock,
          label: 'Pending Review',
          className: 'bg-yellow-100 text-yellow-800',
          date: `Submitted: ${formatDate(hostel.submittedAt)}`
        };
      case 'approved':
        return {
          icon: CheckCircle,
          label: 'Approved',
          className: 'bg-green-100 text-green-800',
          date: `Approved: ${formatDate(hostel.approvedAt)}`
        };
      case 'rejected':
        return {
          icon: XCircle,
          label: 'Rejected',
          className: 'bg-red-100 text-red-800',
          date: `Rejected: ${formatDate(hostel.updatedAt)}`
        };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-blue-200/50 overflow-hidden">
      {/* Status Badge - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${statusInfo.className} shadow-lg`}>
          <StatusIcon className="w-3 h-3 mr-1.5" />
          {statusInfo.label}
        </span>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Left Section - Image and Basic Info */}
          <div className="flex-shrink-0 lg:w-80">
            <div className="flex items-start space-x-4 sm:space-x-6">
              {/* Hostel Image */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  {hostel.mainPhoto && hostel.mainPhoto !== '' ? (
                    <img 
                      src={HostelService.getFileUrl(hostel.mainPhoto)} 
                      alt={hostel.hostelName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full flex items-center justify-center ${hostel.mainPhoto && hostel.mainPhoto !== '' ? 'hidden' : ''}`}>
                    <MapPin className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors duration-300 line-clamp-2">
                  {hostel.hostelName}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {hostel.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Details and Actions */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col h-full">
              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Location</p>
                    <p className="text-sm font-medium text-gray-900 break-words">
                      {hostel.location || `${hostel.city}, ${hostel.area}` || 'Location not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Gender</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {hostel.genderSpecific}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Landmark</p>
                    <p className="text-sm font-medium text-gray-900 break-words">
                      {hostel.nearbyLandmark || 'No landmark'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Owner</p>
                    <p className="text-sm font-medium text-gray-900">
                      {hostel.ownerName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rejection Reason */}
              {activeTab === 'rejected' && hostel.rejectionReason && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-red-800 mb-1">Rejection Reason</p>
                      <p className="text-sm text-red-700">{hostel.rejectionReason}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-auto">
                <button
                  onClick={() => onView(hostel.hostelId)}
                  className="group/btn inline-flex items-center px-3 sm:px-5 py-2 sm:py-2.5 border border-gray-300 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                  View Details
                </button>
                
                {/* Pending Hostels - Show both Approve and Reject */}
                {activeTab === 'pending' && (
                  <>
                    <button
                      onClick={() => onApprove(hostel.hostelId)}
                      disabled={processing === hostel.hostelId}
                      className="group/btn inline-flex items-center px-3 sm:px-5 py-2 sm:py-2.5 border border-transparent text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105"
                    >
                      {processing === hostel.hostelId ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                          Approve
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => onReject(hostel.hostelId)}
                      disabled={processing === hostel.hostelId}
                      className="group/btn inline-flex items-center px-3 sm:px-5 py-2 sm:py-2.5 border border-gray-300 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl text-gray-700 bg-white hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      {processing === hostel.hostelId ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                          Reject
                        </>
                      )}
                    </button>
                  </>
                )}

                {/* Approved Hostels - Show Reject button to change status */}
                {activeTab === 'approved' && (
                  <button
                    onClick={() => onReject(hostel.hostelId)}
                    disabled={processing === hostel.hostelId}
                    className="group/btn inline-flex items-center px-3 sm:px-5 py-2 sm:py-2.5 border border-red-300 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl text-red-700 bg-red-50 hover:bg-red-100 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    {processing === hostel.hostelId ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                        Reject
                      </>
                    )}
                  </button>
                )}

                {/* Rejected Hostels - Show Approve button to change status */}
                {activeTab === 'rejected' && (
                  <button
                    onClick={() => onApprove(hostel.hostelId)}
                    disabled={processing === hostel.hostelId}
                    className="group/btn inline-flex items-center px-3 sm:px-5 py-2 sm:py-2.5 border border-transparent text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105"
                  >
                    {processing === hostel.hostelId ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                        Approve
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 