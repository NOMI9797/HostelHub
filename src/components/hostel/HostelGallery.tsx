import { useState } from 'react';
import { HostelService } from '@/lib/hostel-service';

interface HostelGalleryProps {
  mainPhoto: string;
  galleryImages: string[];
  hostelName: string;
}

export default function HostelGallery({ mainPhoto, galleryImages, hostelName }: HostelGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(mainPhoto);

  const getFileUrl = (fileId: string) => {
    // If it's already a full URL (like Unsplash), return it directly
    if (fileId.startsWith('http')) {
      return fileId;
    }
    // Otherwise, use HostelService
    return HostelService.getFileUrl(fileId);
  };

  const allImages = [mainPhoto, ...galleryImages];

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative">
        <img
          src={getFileUrl(selectedImage)}
          alt={hostelName}
          className="w-full h-96 object-cover rounded-xl cursor-pointer transition-transform hover:scale-105"
          onError={(e) => {
            // Fallback to a placeholder image if the main image fails to load
            e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop';
          }}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-sm font-medium text-gray-700">
            {selectedImage === mainPhoto ? 'Main Photo' : 'Gallery'}
          </span>
        </div>
      </div>

      {/* Gallery Thumbnails */}
      {allImages.length > 1 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Gallery ({allImages.length} images)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allImages.map((imageId, index) => (
              <div 
                key={index}
                className={`relative cursor-pointer group transition-all duration-200 ${
                  selectedImage === imageId ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'
                }`}
                onClick={() => setSelectedImage(imageId)}
              >
                <img
                  src={getFileUrl(imageId)}
                  alt={`${hostelName} ${index === 0 ? 'Main Photo' : `Gallery ${index}`}`}
                  className="w-full h-24 object-cover rounded-lg"
                  onError={(e) => {
                    // Fallback to a placeholder image if the thumbnail fails to load
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=100&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {index === 0 ? 'Main Photo' : 'View'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 