'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Save, X, Trash2, Building2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import { useAuth } from '@/lib/auth-context';
import { HostelService } from '@/lib/hostel-service';
import HostelGallery from '@/components/hostel/HostelGallery';
import HostelDetails from '@/components/hostel/HostelDetails';
import HostelEditForm from '@/components/hostel/HostelEditForm';
import { HostelDataFromDB, EditFormData } from '@/types/hostel';
import { parseHostelData, initializeEditForm } from '@/utils/hostel-utils';
import { useHostel } from '@/hooks/useHostel';
import CacheInvalidationService from '@/lib/cache-invalidation';

export default function HostelDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const hostelId = params.hostelId as string;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<EditFormData | null>(null);
  const [saving, setSaving] = useState(false);

  // Use custom hook for data fetching
  const { hostel: hostelData, loading, error, refetch } = useHostel(hostelId);
  const hostel = hostelData as unknown as HostelDataFromDB | null;

  // Check if edit mode should be enabled (for form initialization only)
  useEffect(() => {
    const editMode = searchParams.get('edit') === 'true';
    
    // Initialize edit form if edit mode is enabled and hostel data is available
    if (editMode && hostel && !editForm) {
      setEditForm(initializeEditForm(hostel));
    }
  }, [searchParams, hostel, editForm]);

  // Check if current user is the owner and if we're in dashboard mode
  const isOwner = user?.userId === hostel?.ownerId;
  const isFromDashboard = searchParams.get('edit') === 'true';

  const handleEdit = () => {
    if (!hostel) return;
    setEditForm(initializeEditForm(hostel));
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!hostel || !editForm) return;
    
    setSaving(true);
    try {
      const updatedHostel = {
        hostelName: editForm.hostelName,
        description: editForm.description,
        city: editForm.city,
        area: editForm.area,
        nearbyLandmark: editForm.nearbyLandmark,
        ownerName: editForm.ownerName,
        ownerPhone: editForm.ownerPhone,
        genderSpecific: editForm.genderSpecific,
        roomTypes: editForm.roomTypes.map(rt => ({
          ...rt,
          type: rt.type.replace(/Seater/g, 'Bed') // Replace Seater with Bed
        })),
        facilities: editForm.facilities,
        galleryImages: editForm.galleryImages,
      };

      await HostelService.updateHostel(hostel.hostelId!, updatedHostel);
      
      // Invalidate cache for this hostel and all hostels
      CacheInvalidationService.invalidateOnHostelUpdate(hostel.hostelId!);
      
      // Refetch hostel data to update the UI
      await refetch();
      setIsEditing(false);
      setEditForm(null);
    } catch (error) {
      console.error('Error updating hostel:', error);
      alert('Failed to update hostel. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm(null);
  };

  const handleDelete = async () => {
    if (!hostel || !confirm('Are you sure you want to delete this hostel? This action cannot be undone.')) {
      return;
    }

    try {
      await HostelService.deleteHostel(hostel.hostelId!);
      
      // Invalidate cache for this hostel and all hostels
      CacheInvalidationService.invalidateOnHostelDelete(hostel.hostelId!);
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Error deleting hostel:', error);
      alert('Failed to delete hostel. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div>
          {/* Page Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Loading Hostel Details</h1>
                <p className="text-gray-600 text-lg">Please wait while we fetch the information.</p>
              </div>
            </div>
          </div>
          
          {/* Loading Content */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Building2 className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Hostel Details...</h3>
              <p className="text-gray-600">Please wait while we fetch the information.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !hostel) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div>
          {/* Page Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Hostel Not Found</h1>
                <p className="text-gray-600 text-lg">The hostel you are looking for does not exist.</p>
              </div>
            </div>
          </div>
          
          {/* Error Content */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Building2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hostel Not Found</h3>
              <p className="text-gray-600 mb-6">{error || 'The hostel you are looking for does not exist.'}</p>
              <Link 
                href="/"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Parse data - hostel data comes as strings from Appwrite
  const { roomTypes, facilities, galleryImages } = parseHostelData(hostel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      <div className="relative">
        {/* Simple Professional Page Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center space-x-3 mb-3">
                  <Link 
                    href="/"
                    className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Hostels</span>
                  </Link>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{hostel.hostelName}</h1>
                <p className="text-gray-600 text-lg">{hostel.city}, {hostel.area}</p>
              </div>
              
              {/* Action Buttons (Owner Only) */}
              {isOwner && isFromDashboard && (
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  {!isEditing ? (
                    <>
                      <button
                        onClick={handleEdit}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={handleDelete}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'Saving...' : 'Save'}</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Main Content with Enhanced Layout */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className={`grid grid-cols-1 ${isEditing ? 'lg:grid-cols-1' : 'lg:grid-cols-3'} gap-12`}>
            {/* Left Column - Images and Details */}
            <div className={`${isEditing ? 'lg:col-span-1' : 'lg:col-span-2'} space-y-8`}>
              {/* Gallery Component with Enhanced Styling */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <HostelGallery 
                  mainPhoto={hostel.mainPhoto}
                  galleryImages={galleryImages}
                  hostelName={hostel.hostelName}
                />
              </div>

              {/* Hostel Details Component with Enhanced Styling */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <HostelDetails 
                  hostel={hostel}
                  roomTypes={roomTypes}
                  facilities={facilities}
                />
              </div>
            </div>

            {/* Right Column - Contact & Booking (Only when not editing) */}
            {!isEditing && (
              <div className="space-y-8">
                {/* Enhanced Contact Information */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold text-sm">📞</span>
                    </span>
                    Contact & Booking
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">
                          {hostel.ownerName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{hostel.ownerName}</p>
                        <p className="text-gray-600">Hostel Owner</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-blue-600 text-lg">📞</span>
                        <div>
                          <p className="text-sm text-gray-600">Phone Number</p>
                          <p className="font-semibold text-gray-900">{hostel.ownerPhone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-blue-600 text-lg">📧</span>
                        <div>
                          <p className="text-sm text-gray-600">Email Address</p>
                          <p className="font-semibold text-gray-900">{hostel.ownerEmail}</p>
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105">
                      Contact Owner
                    </button>
                  </div>
                </div>

                {/* Enhanced Quick Info */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold text-sm">ℹ️</span>
                    </span>
                    Quick Info
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium">Location</span>
                      <span className="font-bold text-gray-900 text-right max-w-[60%]">
                        {hostel.city}, {hostel.area}
                        {hostel.nearbyLandmark && (
                          <div className="text-sm text-gray-600 font-normal mt-1">
                            Near {hostel.nearbyLandmark}
                          </div>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium">Gender</span>
                      <span className="font-bold text-gray-900">
                        {hostel.genderSpecific === 'co-ed' ? 'Co-ed' : 
                         hostel.genderSpecific === 'boys' ? 'Boys' : 'Girls'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Features Section */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-bold text-sm">⭐</span>
                    </span>
                    Why Choose This Hostel?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Prime location near universities</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">24/7 security and maintenance</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">High-speed internet included</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Flexible payment options</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Edit Form Component */}
          {isEditing && editForm && (
            <div className="mt-12">
              <HostelEditForm
                editForm={editForm}
                setEditForm={setEditForm}
                onSave={handleSave}
                onCancel={handleCancel}
                saving={saving}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 