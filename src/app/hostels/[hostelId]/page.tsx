'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  Users, 
  Star, 
  ArrowLeft,
  Clock,
  Wifi,
  Car,
  Utensils,
  Bed,
  Tv,
  Shield,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { HostelService } from '@/lib/hostel-service';
import { useAuth } from '@/lib/auth-context';

// Interface for hostel data as it comes from Appwrite (with JSON strings)
interface HostelDataFromDB {
  hostelId?: string;
  ownerId: string;
  ownerEmail: string;
  hostelName: string;
  description: string;
  location: string;
  city: string;
  area: string;
  nearbyLandmark?: string;
  googleMapsLocation?: string;
  mainPhoto: string;
  galleryImages: string; // JSON string from Appwrite
  ownerName: string;
  ownerPhone: string;
  roomTypes: string; // JSON string from Appwrite
  facilities: string; // JSON string from Appwrite
  genderSpecific: 'boys' | 'girls' | 'co-ed';
  status?: 'active' | 'inactive' | 'pending';
  createdAt?: string;
  updatedAt?: string;
}

// Helper function to get file URL
const getFileUrl = (fileId: string) => {
  return `https://fra.cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_HOSTEL_PHOTOS}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};

// Facility icons mapping
const FACILITY_ICONS: { [key: string]: React.ComponentType<{ className?: string }> } = {
  wifi: Wifi,
  parking: Car,
  mess: Utensils,
  bed: Bed,
  tvLounge: Tv,
  cctv: Shield,
  cleaning: Clock,
  laundry: Clock,
  generator: Shield,
  electricityBackup: Shield,
  ac: Building2,
  attachedBathroom: Building2,
  studyTable: Building2,
  cupboard: Building2,
};

export default function HostelDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const hostelId = params.hostelId as string;
  
  const [hostel, setHostel] = useState<HostelDataFromDB | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const fetchHostelDetails = useCallback(async () => {
    try {
      setLoading(true);
      const hostelData = await HostelService.getHostelById(hostelId);
      if (hostelData) {
        setHostel(hostelData as unknown as HostelDataFromDB);
      } else {
        setError('Hostel not found');
      }
    } catch (error) {
      console.error('Error fetching hostel details:', error);
      setError('Failed to load hostel details');
    } finally {
      setLoading(false);
    }
  }, [hostelId]);

  useEffect(() => {
    if (hostelId) {
      fetchHostelDetails();
    }
  }, [hostelId, fetchHostelDetails]);

  // Check if edit mode should be enabled (for form initialization only)
  useEffect(() => {
    const editMode = searchParams.get('edit') === 'true';
    
    // Initialize edit form if edit mode is enabled and hostel data is available
    if (editMode && hostel && !editForm) {
      setEditForm({
        hostelName: hostel.hostelName,
        description: hostel.description,
        city: hostel.city,
        area: hostel.area,
        nearbyLandmark: hostel.nearbyLandmark || '',
        ownerName: hostel.ownerName,
        ownerPhone: hostel.ownerPhone,
        genderSpecific: hostel.genderSpecific,
        roomTypes: JSON.parse(hostel.roomTypes),
        facilities: JSON.parse(hostel.facilities),
      });
    }
  }, [searchParams, hostel, editForm]);

  // Check if current user is the owner and if we're in dashboard mode
  const isOwner = user?.userId === hostel?.ownerId;
  const isFromDashboard = searchParams.get('edit') === 'true';
  
  // Debug logging
  console.log('Debug values:', {
    isOwner,
    isFromDashboard,
    isEditing,
    hasEditForm: !!editForm,
    userUserId: user?.userId,
    hostelOwnerId: hostel?.ownerId,
    searchParamsEdit: searchParams.get('edit')
  });

  const handleEdit = () => {
    if (!hostel) return;
    
    setEditForm({
      hostelName: hostel.hostelName,
      description: hostel.description,
      city: hostel.city,
      area: hostel.area,
      nearbyLandmark: hostel.nearbyLandmark || '',
      ownerName: hostel.ownerName,
      ownerPhone: hostel.ownerPhone,
      genderSpecific: hostel.genderSpecific,
      roomTypes: JSON.parse(hostel.roomTypes),
      facilities: JSON.parse(hostel.facilities),
    });
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
      };

      await HostelService.updateHostel(hostel.hostelId!, updatedHostel);
      
      // Update local state with the new data
      const updatedHostelData = {
        ...hostel,
        ...updatedHostel,
        roomTypes: JSON.stringify(updatedHostel.roomTypes),
        facilities: JSON.stringify(updatedHostel.facilities),
      };
      
      setHostel(updatedHostelData as unknown as HostelDataFromDB);
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
    // Keep the edit parameter in URL to maintain dashboard mode
    // router.replace(`/hostels/${hostelId}`);
  };

  const handleDelete = async () => {
    if (!hostel || !confirm('Are you sure you want to delete this hostel? This action cannot be undone.')) {
      return;
    }

    try {
      await HostelService.deleteHostel(hostel.hostelId!);
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
        <div className="pt-16">
          <div className="max-w-5xl mx-auto p-6">
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
        <div className="pt-16">
          <div className="max-w-5xl mx-auto p-6">
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
  const roomTypes = (hostel.roomTypes ? JSON.parse(hostel.roomTypes) : []) as Array<{type: string; available: boolean; price: number}>;
  const facilities = (hostel.facilities ? JSON.parse(hostel.facilities) : []) as string[];
  const galleryImages = (hostel.galleryImages ? JSON.parse(hostel.galleryImages) : []) as string[];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-5xl mx-auto p-6">
          {/* Back Button */}
          <div className="mb-6">
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Hostels</span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image */}
              <div className="relative">
                <img
                  src={getFileUrl(hostel.mainPhoto)}
                  alt={hostel.hostelName}
                  className="w-full h-96 object-cover rounded-xl"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-medium text-gray-700">
                    {hostel.genderSpecific === 'co-ed' ? 'Co-ed' : 
                     hostel.genderSpecific === 'boys' ? 'Boys' : 'Girls'}
                  </span>
                </div>
              </div>

              {/* Gallery Images */}
              {galleryImages.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryImages.map((imageId: string, index: number) => (
                      <img
                        key={index}
                        src={getFileUrl(imageId)}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About this Hostel</h3>
                <p className="text-gray-600 leading-relaxed">{hostel.description}</p>
              </div>

              {/* Room Types */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Types & Pricing</h3>
                <div className="space-y-3">
                  {roomTypes.map((roomType: {type: string; available: boolean; price: number}, index: number) => (
                    <div key={index} className={`p-4 rounded-lg border ${roomType.available ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div>
                          <h4 className="font-medium text-gray-900">{roomType.type}</h4>
                          <p className="text-sm text-gray-600">Shared accommodation</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-lg font-bold text-blue-600">PKR {roomType.price?.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">per month</div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          roomType.available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {roomType.available ? 'Available' : 'Not Available'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Facilities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {facilities.map((facility: string) => {
                    const IconComponent = FACILITY_ICONS[facility] || Building2;
                    return (
                      <div key={facility} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-700 capitalize">
                          {facility.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Contact & Booking */}
            <div className="space-y-6">
              {/* Hostel Info Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 relative">
                {/* Action Buttons Section */}
                {isOwner && isFromDashboard && (
                  <div className="flex justify-end mb-6">
                    <div className="flex space-x-3">
                      {!isEditing ? (
                        <>
                          <button
                            onClick={handleEdit}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 shadow-md"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center space-x-2 shadow-md"
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
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2 disabled:opacity-50 shadow-md"
                          >
                            <Save className="w-4 h-4" />
                            <span>{saving ? 'Saving...' : 'Save'}</span>
                          </button>
                          <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center space-x-2 shadow-md"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Hostel Name Section */}
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{hostel.hostelName}</h2>
                </div>
                
                <div className="flex items-center space-x-1 mb-4">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{hostel.area}, {hostel.city}</span>
                </div>

                {hostel.nearbyLandmark && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Nearby:</span> {hostel.nearbyLandmark}
                    </p>
                  </div>
                )}

                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">New Listing</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{facilities.length} facilities</span>
                </div>

                <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Contact Owner
                </button>
              </div>

              {/* Edit Form */}
              {isEditing && editForm && (
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Edit className="w-5 h-5 text-blue-600" />
                    <span>Edit Hostel Details</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hostel Name</label>
                      <input
                        type="text"
                        value={editForm.hostelName}
                        onChange={(e) => setEditForm({...editForm, hostelName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        placeholder="Enter hostel name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white resize-none"
                        placeholder="Describe your hostel"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          value={editForm.city}
                          onChange={(e) => setEditForm({...editForm, city: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                        <input
                          type="text"
                          value={editForm.area}
                          onChange={(e) => setEditForm({...editForm, area: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          placeholder="Enter area"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nearby Landmark</label>
                      <input
                        type="text"
                        value={editForm.nearbyLandmark}
                        onChange={(e) => setEditForm({...editForm, nearbyLandmark: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        placeholder="Enter nearby landmark"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
                        <input
                          type="text"
                          value={editForm.ownerName}
                          onChange={(e) => setEditForm({...editForm, ownerName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          placeholder="Enter owner name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Owner Phone</label>
                        <input
                          type="text"
                          value={editForm.ownerPhone}
                          onChange={(e) => setEditForm({...editForm, ownerPhone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender Specific</label>
                      <select
                        value={editForm.genderSpecific}
                        onChange={(e) => setEditForm({...editForm, genderSpecific: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      >
                        <option value="boys">Boys</option>
                        <option value="girls">Girls</option>
                        <option value="co-ed">Co-ed</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Owner Contact Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Owner</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">{hostel.ownerName}</p>
                      <p className="text-sm text-gray-600">Hostel Owner</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">{hostel.ownerPhone}</p>
                      <p className="text-sm text-gray-600">Phone Number</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">{hostel.ownerEmail}</p>
                      <p className="text-sm text-gray-600">Email Address</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Call Now
                  </button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender</span>
                    <span className="font-medium text-gray-900 capitalize">{hostel.genderSpecific}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Rooms</span>
                    <span className="font-medium text-gray-900">
                      {roomTypes.filter((rt: {available: boolean}) => rt.available).length} types
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Starting Price</span>
                    <span className="font-medium text-blue-600">
                      PKR {Math.min(...roomTypes.map((rt: {price: number}) => rt.price || 0)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 