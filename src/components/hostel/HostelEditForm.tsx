import { useRef, useState } from 'react';
import { Edit, Plus, X, Upload } from 'lucide-react';
import { HostelService } from '@/lib/hostel-service';
import { EditFormData } from '@/types/hostel';
import { FACILITY_ICONS, GENDER_OPTIONS } from '@/constants/facilities';

interface HostelEditFormProps {
  editForm: EditFormData;
  setEditForm: (form: EditFormData) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}

export default function HostelEditForm({ 
  editForm, 
  setEditForm, 
  onSave, 
  onCancel, 
  saving 
}: HostelEditFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImages, setUploadingImages] = useState(false);

  const handleGalleryImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    try {
      const uploadPromises = Array.from(files).map(file => 
        HostelService.uploadHostelPhoto(file)
      );
      const newImageIds = await Promise.all(uploadPromises);
      
      setEditForm({
        ...editForm,
        galleryImages: [...editForm.galleryImages, ...newImageIds]
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setEditForm({
      ...editForm,
      galleryImages: editForm.galleryImages.filter((_, i) => i !== index)
    });
  };

  const handleRoomTypeChange = (index: number, field: string, value: string | number | boolean) => {
    setEditForm({
      ...editForm,
      roomTypes: editForm.roomTypes.map((rt, i) => 
        i === index ? { ...rt, [field]: value } : rt
      )
    });
  };

  const handleAddRoomType = () => {
    setEditForm({
      ...editForm,
      roomTypes: [...editForm.roomTypes, { type: '', available: true, price: 0 }]
    });
  };

  const handleRemoveRoomType = (index: number) => {
    setEditForm({
      ...editForm,
      roomTypes: editForm.roomTypes.filter((_, i) => i !== index)
    });
  };

  const handleFacilityToggle = (facility: string) => {
    setEditForm({
      ...editForm,
      facilities: editForm.facilities.includes(facility)
        ? editForm.facilities.filter(f => f !== facility)
        : [...editForm.facilities, facility]
    });
  };

  return (
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
                  {GENDER_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
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
                  {editForm.galleryImages.map((imageId, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={HostelService.getFileUrl(imageId)}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Upload New Images */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                  className="flex items-center space-x-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Upload className="w-5 h-5" />
                  <span>{uploadingImages ? 'Uploading...' : 'Add Gallery Images'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Room Types & Pricing Section */}
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
              {editForm.roomTypes && editForm.roomTypes.map((roomType, index) => (
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

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
} 