'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/lib/auth-context';
import { HostelService, HostelData, RoomType } from '@/lib/hostel-service';
import { 
  Building2, 
  MapPin, 
  Camera, 
  Phone, 
  Mail, 
  Users, 
  CheckCircle,
  X,
  Upload,
  Plus,
  Trash2
} from 'lucide-react';

const FACILITIES = [
  { id: 'mess', label: 'Mess / Meal Included', icon: '🍽️' },
  { id: 'attachedBathroom', label: 'Attached Bathroom', icon: '🚿' },
  { id: 'wifi', label: 'WiFi', icon: '📶' },
  { id: 'electricityBackup', label: 'Electricity Backup / UPS', icon: '⚡' },
  { id: 'ac', label: 'Air Conditioning (AC)', icon: '❄️' },
  { id: 'cleaning', label: 'Room Cleaning Service', icon: '🧹' },
  { id: 'cctv', label: 'Security Cameras (CCTV)', icon: '📹' },
  { id: 'laundry', label: 'Laundry Service', icon: '👕' },
  { id: 'parking', label: 'Parking Space', icon: '🚗' },
  { id: 'generator', label: 'Generator / Solar Backup', icon: '🔋' },
  { id: 'bed', label: 'Bed / Mattress Provided', icon: '🛏️' },
  { id: 'studyTable', label: 'Study Table', icon: '📚' },
  { id: 'cupboard', label: 'Cupboard / Closet', icon: '🗄️' },
  { id: 'tvLounge', label: 'Shared TV Lounge', icon: '📺' },
];

const ROOM_TYPES = [
  { type: '1-Seater', defaultPrice: 15000 },
  { type: '2-Seater', defaultPrice: 12000 },
  { type: '3-Seater', defaultPrice: 10000 },
  { type: '4-Seater', defaultPrice: 8000 },
];

// Helper function to get file URL
const getFileUrl = (fileId: string) => {
  return `https://fra.cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_HOSTEL_PHOTOS}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};

export default function HostelPostingForm() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    hostelName: '',
    description: '',
    location: '',
    city: '',
    area: '',
    nearbyLandmark: '',
    googleMapsLocation: '',
    mainPhoto: '',
    galleryImages: [] as string[],
    ownerName: '',
    ownerPhone: '',
    roomTypes: ROOM_TYPES.map(rt => ({
      type: rt.type,
      available: false,
      price: rt.defaultPrice
    })) as RoomType[],
    facilities: [] as string[],
    genderSpecific: 'co-ed' as 'boys' | 'girls' | 'co-ed',
  });

  // File upload states
  const [mainPhotoFile, setMainPhotoFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRoomTypeChange = (index: number, field: 'available' | 'price', value: any) => {
    const updatedRoomTypes = [...formData.roomTypes];
    updatedRoomTypes[index] = {
      ...updatedRoomTypes[index],
      [field]: field === 'available' ? value : parseInt(value)
    };
    setFormData(prev => ({
      ...prev,
      roomTypes: updatedRoomTypes
    }));
  };

  const handleFacilityToggle = (facilityId: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facilityId)
        ? prev.facilities.filter(f => f !== facilityId)
        : [...prev.facilities, facilityId]
    }));
  };

  const handleMainPhotoUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const photoUrl = await HostelService.uploadHostelPhoto(file);
      setFormData(prev => ({ ...prev, mainPhoto: photoUrl }));
      setMainPhotoFile(file);
      setUploadProgress(100);
      
      setTimeout(() => setUploadProgress(0), 1000);
    } catch (error) {
      console.error('Error uploading main photo:', error);
      setMessage('Failed to upload main photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGalleryUpload = async (files: FileList) => {
    try {
      setIsLoading(true);
      setUploadProgress(0);
      
      const maxImages = parseInt(process.env.NEXT_PUBLIC_MAX_GALLERY_IMAGES || '10');
      const allowedTypes = (process.env.NEXT_PUBLIC_ALLOWED_IMAGE_TYPES || 'image/jpeg,image/png,image/webp').split(',');
      
      const validFiles = Array.from(files).filter(file => 
        allowedTypes.includes(file.type) && 
        file.size <= parseInt(process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE || '5242880')
      );

      if (validFiles.length + formData.galleryImages.length > maxImages) {
        setMessage(`Maximum ${maxImages} gallery images allowed.`);
        return;
      }

      const uploadedUrls: string[] = [];
      
      for (let i = 0; i < validFiles.length; i++) {
        const photoUrl = await HostelService.uploadHostelPhoto(validFiles[i]);
        uploadedUrls.push(photoUrl);
        
        setUploadProgress(((i + 1) / validFiles.length) * 100);
      }

      setFormData(prev => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...uploadedUrls]
      }));
      
      setGalleryFiles(prev => [...prev, ...validFiles]);
    } catch (error) {
      console.error('Error uploading gallery images:', error);
      setMessage('Failed to upload gallery images. Please try again.');
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index)
    }));
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setMessage('Please log in to post a hostel.');
      return;
    }

    if (!formData.mainPhoto) {
      setMessage('Please upload a main photo.');
      return;
    }

    if (formData.roomTypes.every(rt => !rt.available)) {
      setMessage('Please select at least one available room type.');
      return;
    }

    try {
      setIsLoading(true);
      setMessage('');

      const hostelData: HostelData = {
        ownerId: user.userId!,
        ownerEmail: user.email!,
        hostelName: formData.hostelName,
        description: formData.description,
        location: formData.location,
        city: formData.city,
        area: formData.area,
        nearbyLandmark: formData.nearbyLandmark,
        googleMapsLocation: formData.googleMapsLocation,
        mainPhoto: formData.mainPhoto,
        galleryImages: formData.galleryImages,
        ownerName: formData.ownerName,
        ownerPhone: formData.ownerPhone,
        roomTypes: formData.roomTypes,
        facilities: formData.facilities,
        genderSpecific: formData.genderSpecific,
      };



      await HostelService.createHostel(hostelData);
      
      setMessage('Hostel posted successfully! Redirecting to your listings...');
      
      // Reset form
      setFormData({
        hostelName: '',
        description: '',
        location: '',
        city: '',
        area: '',
        nearbyLandmark: '',
        googleMapsLocation: '',
        mainPhoto: '',
        galleryImages: [],
        ownerName: '',
        ownerPhone: '',
        roomTypes: ROOM_TYPES.map(rt => ({
          type: rt.type,
          available: false,
          price: rt.defaultPrice
        })),
        facilities: [],
        genderSpecific: 'co-ed',
      });
      
      setMainPhotoFile(null);
      setGalleryFiles([]);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
      
    } catch (error) {
      console.error('Error posting hostel:', error);
      setMessage('Failed to post hostel. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Post a New Hostel</h1>
          <p className="text-gray-600 text-sm sm:text-base">Create a new hostel listing to attract travelers and grow your business.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>Basic Information</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Hostel Name *</label>
                <input
                  type="text"
                  required
                  value={formData.hostelName}
                  onChange={(e) => handleInputChange('hostelName', e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter hostel name"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter city"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Description *</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your hostel (1-2 paragraphs)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Area *</label>
                <input
                  type="text"
                  required
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter area"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nearby Landmark</label>
                <input
                  type="text"
                  value={formData.nearbyLandmark}
                  onChange={(e) => handleInputChange('nearbyLandmark', e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Near University, Mall, etc."
                />
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Camera className="w-5 h-5 text-blue-600" />
              <span>Photos</span>
            </h2>
            
            {/* Main Photo */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Main Photo *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                 {formData.mainPhoto ? (
                   <div className="space-y-4">
                     <img 
                       src={getFileUrl(formData.mainPhoto)}
                       alt="Main photo" 
                       className="w-32 h-32 object-cover rounded-lg mx-auto"
                     />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, mainPhoto: '' }));
                        setMainPhotoFile(null);
                      }}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove Photo
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Click to upload main photo</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleMainPhotoUpload(file);
                      }}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Choose File
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Images */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Gallery Images (Optional - Max {process.env.NEXT_PUBLIC_MAX_GALLERY_IMAGES || 10})
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) handleGalleryUpload(files);
                  }}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Add Gallery Images
                </button>
              </div>
              
                             {formData.galleryImages.length > 0 && (
                 <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                   {formData.galleryImages.map((imageId, index) => (
                     <div key={index} className="relative">
                       <img 
                         src={getFileUrl(imageId)}
                         alt={`Gallery ${index + 1}`} 
                         className="w-full h-24 object-cover rounded-lg"
                       />
                       <button
                         type="button"
                         onClick={() => removeGalleryImage(index)}
                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                       >
                         <X className="w-3 h-3" />
                       </button>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          </div>

          {/* Owner Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Owner Details</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Owner Name *</label>
                <input
                  type="text"
                  required
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter owner name"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.ownerPhone}
                  onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>

          {/* Room Types & Prices */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Room Types & Prices</h2>
            
            <div className="space-y-4">
              {formData.roomTypes.map((roomType, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={roomType.available}
                      onChange={(e) => handleRoomTypeChange(index, 'available', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="font-medium text-gray-900">{roomType.type}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:ml-auto">
                    <input
                      type="number"
                      value={roomType.price}
                      onChange={(e) => handleRoomTypeChange(index, 'price', e.target.value)}
                      className="w-20 sm:w-24 p-2 bg-white border border-gray-200 rounded text-gray-900"
                      placeholder="Price"
                      min="0"
                    />
                    <span className="text-gray-600 text-sm">PKR/month</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Facilities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FACILITIES.map((facility) => (
                <label key={facility.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.facilities.includes(facility.id)}
                    onChange={() => handleFacilityToggle(facility.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-lg">{facility.icon}</span>
                  <span className="text-gray-900">{facility.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender Specific */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Gender Specific</h2>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              {['boys', 'girls', 'co-ed'].map((gender) => (
                <label key={gender} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="genderSpecific"
                    value={gender}
                    checked={formData.genderSpecific === gender}
                    onChange={(e) => handleInputChange('genderSpecific', e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-900 capitalize">{gender}</span>
                </label>
              ))}
            </div>
          </div>



          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Post Hostel</span>
                </>
              )}
            </button>
          </div>

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-lg ${
              message.includes('successfully') 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          {/* Upload Progress */}
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 