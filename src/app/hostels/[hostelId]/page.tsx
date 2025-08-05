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
        roomTypes: editForm.roomTypes,
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
    <div className="min-h-screen bg-white">
      <Header />
      
      <div>
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
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
                <div className="flex space-x-3">
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
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className={`grid grid-cols-1 ${isEditing ? 'lg:grid-cols-1' : 'lg:grid-cols-3'} gap-8`}>
            {/* Left Column - Images and Details */}
            <div className={`${isEditing ? 'lg:col-span-1' : 'lg:col-span-2'} space-y-6`}>
              {/* Gallery Component */}
              <HostelGallery 
                mainPhoto={hostel.mainPhoto}
                galleryImages={galleryImages}
                hostelName={hostel.hostelName}
              />

              {/* Hostel Details Component */}
              <HostelDetails 
                hostel={hostel}
                roomTypes={roomTypes}
                facilities={facilities}
              />
            </div>

            {/* Right Column - Contact & Booking (Only when not editing) */}
            {!isEditing && (
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Contact & Booking</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">
                          {hostel.ownerName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{hostel.ownerName}</p>
                        <p className="text-sm text-gray-600">Hostel Owner</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <span className="text-sm">📞</span>
                        <span className="text-sm">{hostel.ownerPhone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <span className="text-sm">📧</span>
                        <span className="text-sm">{hostel.ownerEmail}</span>
                      </div>
                    </div>

                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      Contact Owner
                    </button>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium text-gray-900">{hostel.city}, {hostel.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gender</span>
                      <span className="font-medium text-gray-900">
                        {hostel.genderSpecific === 'co-ed' ? 'Co-ed' : 
                         hostel.genderSpecific === 'boys' ? 'Boys' : 'Girls'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Starting Price</span>
                      <span className="font-medium text-blue-600">
                        PKR {Math.min(...roomTypes.map(rt => rt.price || 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Edit Form Component */}
          {isEditing && editForm && (
            <HostelEditForm
              editForm={editForm}
              setEditForm={setEditForm}
              onSave={handleSave}
              onCancel={handleCancel}
              saving={saving}
            />
          )}
        </div>
      </div>
    </div>
  );
} 