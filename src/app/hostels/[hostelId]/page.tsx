'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  X,
  Plus,
  Upload
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

interface EditFormData {
  hostelName: string;
  description: string;
  city: string;
  area: string;
  nearbyLandmark: string;
  ownerName: string;
  ownerPhone: string;
  genderSpecific: 'boys' | 'girls' | 'co-ed';
  roomTypes: Array<{type: string; available: boolean; price: number}>;
  facilities: string[];
  galleryImages: string[];
}

// Helper function to get file URL
const getFileUrl = (fileId: string) => {
  return HostelService.getFileUrl(fileId);
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
  const [editForm, setEditForm] = useState<EditFormData | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>(hostel?.mainPhoto || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Update selected image when hostel data loads
  useEffect(() => {
    if (hostel) {
      setSelectedImage(hostel.mainPhoto);
    }
  }, [hostel]);

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
        genderSpecific: hostel.genderSpecific as 'boys' | 'girls' | 'co-ed',
        roomTypes: JSON.parse(hostel.roomTypes),
        facilities: JSON.parse(hostel.facilities),
        galleryImages: JSON.parse(hostel.galleryImages),
      });
    }
  }, [searchParams, hostel, editForm]);

  // Check if current user is the owner and if we're in dashboard mode
  const isOwner = user?.userId === hostel?.ownerId;
  const isFromDashboard = searchParams.get('edit') === 'true';
  


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
              genderSpecific: hostel.genderSpecific as 'boys' | 'girls' | 'co-ed',
      roomTypes: JSON.parse(hostel.roomTypes),
      facilities: JSON.parse(hostel.facilities),
      galleryImages: JSON.parse(hostel.galleryImages),
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

  const handleGalleryImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    try {
      const uploadPromises = Array.from(files).map(file => 
        HostelService.uploadHostelPhoto(file)
      );
      const newImageIds = await Promise.all(uploadPromises);
      
      setEditForm((prev: any) => ({
        ...prev,
        galleryImages: [...(prev.galleryImages || []), ...newImageIds]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setEditForm((prev: any) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleRoomTypeChange = (index: number, field: string, value: string | number | boolean) => {
          setEditForm((prev: EditFormData | null) => {
        if (!prev) return prev;
        return {
          ...prev,
          roomTypes: prev.roomTypes.map((rt, i: number) => 
            i === index ? { ...rt, [field]: value } : rt
          )
        };
      });
  };

  const handleAddRoomType = () => {
    setEditForm((prev: any) => ({
      ...prev,
      roomTypes: [...prev.roomTypes, { type: '', available: true, price: 0 }]
    }));
  };

  const handleRemoveRoomType = (index: number) => {
    setEditForm((prev: any) => ({
      ...prev,
      roomTypes: prev.roomTypes.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleFacilityToggle = (facility: string) => {
    setEditForm((prev: any) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f: string) => f !== facility)
        : [...prev.facilities, facility]
    }));
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
          <div className={`grid grid-cols-1 ${isEditing ? 'lg:grid-cols-1' : 'lg:grid-cols-3'} gap-8`}>
            {/* Left Column - Images and Details */}
            <div className={`${isEditing ? 'lg:col-span-1' : 'lg:col-span-2'} space-y-6`}>
              {/* Main Image */}
              <div className="relative">
                <img
                  src={getFileUrl(selectedImage)}
                  alt={hostel.hostelName}
                  className="w-full h-96 object-cover rounded-xl cursor-pointer transition-transform hover:scale-105"
                  onError={(e) => {
                    console.error('Main image failed to load:', selectedImage);
                    e.currentTarget.style.display = 'none';
                  }}
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery ({galleryImages.length + 1} images)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Main Image Thumbnail */}
                    <div 
                      className={`relative cursor-pointer group transition-all duration-200 ${
                        selectedImage === hostel.mainPhoto ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'
                      }`}
                      onClick={() => setSelectedImage(hostel.mainPhoto)}
                    >
                      <img
                        src={getFileUrl(hostel.mainPhoto)}
                        alt="Main Photo"
                        className="w-full h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Main Photo
                        </span>
                      </div>
                    </div>
                    
                    {/* Gallery Images */}
                    {galleryImages.map((imageId: string, index: number) => (
                      <div 
                        key={index}
                        className={`relative cursor-pointer group transition-all duration-200 ${
                          selectedImage === imageId ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'
                        }`}
                        onClick={() => setSelectedImage(imageId)}
                      >
                        <img
                          src={getFileUrl(imageId)}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            View
                          </span>
                        </div>
                      </div>
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

          {/* Edit Form - Full Width (Outside Grid) */}
          {isEditing && editForm && (
            <div className="mt-8">
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg w-full">
                <div className="flex items-center space-x-3 mb-8">
                  <Edit className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Edit Hostel Details</h3>
                </div>
                
                <div className="space-y-8">
                  {/* Basic Information Section */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Basic Information
                    </h4>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Hostel Name</label>
                        <input
                          type="text"
                          value={editForm.hostelName}
                          onChange={(e) => setEditForm({...editForm, hostelName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 text-base"
                          placeholder="Enter hostel name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Description</label>
                        <textarea
                          value={editForm.description}
                          onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white resize-none text-gray-900 placeholder-gray-500 text-base"
                          placeholder="Describe your hostel"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Gender Specific</label>
                        <select
                          value={editForm.genderSpecific}
                          onChange={(e) => setEditForm({...editForm, genderSpecific: e.target.value as 'boys' | 'girls' | 'co-ed'})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                        >
                          <option value="boys">Boys</option>
                          <option value="girls">Girls</option>
                          <option value="co-ed">Co-ed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Location Information Section */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                      Location Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">City</label>
                        <input
                          type="text"
                          value={editForm.city}
                          onChange={(e) => setEditForm({...editForm, city: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 text-base"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Area</label>
                        <input
                          type="text"
                          value={editForm.area}
                          onChange={(e) => setEditForm({...editForm, area: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 text-base"
                          placeholder="Enter area"
                        />
                      </div>
                      <div className="md:col-span-2 lg:col-span-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Nearby Landmark</label>
                        <input
                          type="text"
                          value={editForm.nearbyLandmark}
                          onChange={(e) => setEditForm({...editForm, nearbyLandmark: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 text-base"
                          placeholder="Enter nearby landmark"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information Section */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                      Contact Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Owner Name</label>
                        <input
                          type="text"
                          value={editForm.ownerName}
                          onChange={(e) => setEditForm({...editForm, ownerName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 text-base"
                          placeholder="Enter owner name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Owner Phone</label>
                        <input
                          type="text"
                          value={editForm.ownerPhone}
                          onChange={(e) => setEditForm({...editForm, ownerPhone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 text-base"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Gallery Images Section */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                      <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                      Gallery Images
                    </h4>
                    <div className="space-y-6">
                      {/* Current Images */}
                      {editForm.galleryImages && editForm.galleryImages.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                          {editForm.galleryImages.map((imageId: string, index: number) => (
                            <div key={index} className="relative group">
                              <img
                                src={getFileUrl(imageId)}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg shadow-sm"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveGalleryImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Upload New Images */}
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-white">
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleGalleryImageUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingImages}
                          className="flex items-center justify-center space-x-3 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          <Upload className="w-6 h-6" />
                          <span className="font-medium">{uploadingImages ? 'Uploading...' : 'Add Gallery Images'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Room Types Section */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xl font-semibold text-gray-900 flex items-center">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                        Room Types & Pricing
                      </h4>
                      <button
                        type="button"
                        onClick={handleAddRoomType}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-2 shadow-sm"
                      >
                        <Plus className="w-5 h-5" />
                        <span>Add Room</span>
                      </button>
                    </div>
                    <div className="space-y-5">
                      {editForm.roomTypes && editForm.roomTypes.map((roomType: {type: string; available: boolean; price: number}, index: number) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            <div className="md:col-span-2 lg:col-span-2">
                              <label className="block text-sm font-semibold text-gray-700 mb-3">Room Type</label>
                              <input
                                type="text"
                                value={roomType.type}
                                onChange={(e) => handleRoomTypeChange(index, 'type', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-base"
                                placeholder="e.g., Single Room, Double Room, etc."
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-3">Price (PKR)</label>
                              <input
                                type="number"
                                value={roomType.price}
                                onChange={(e) => handleRoomTypeChange(index, 'price', Number(e.target.value))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-base"
                                placeholder="0"
                              />
                            </div>
                            <div className="flex items-end space-x-4">
                              <label className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  checked={roomType.available}
                                  onChange={(e) => handleRoomTypeChange(index, 'available', e.target.checked)}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-5 h-5"
                                />
                                <span className="text-sm font-semibold text-gray-700">Available</span>
                              </label>
                              <button
                                type="button"
                                onClick={() => handleRemoveRoomType(index)}
                                className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Facilities Section */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                      <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                      Facilities
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                      {Object.keys(FACILITY_ICONS).map((facility) => {
                        const Icon = FACILITY_ICONS[facility];
                        const isSelected = editForm.facilities.includes(facility);
                        return (
                          <button
                            key={facility}
                            type="button"
                            onClick={() => handleFacilityToggle(facility)}
                            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                              isSelected
                                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex flex-col items-center space-y-3">
                              <Icon className={`w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                              <span className="text-sm font-medium text-center">
                                {facility.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 