import { useState } from 'react';

interface HostelGalleryProps {
  mainPhoto: string;
  galleryImages: string[];
  hostelName: string;
}

export default function HostelGallery({ mainPhoto, galleryImages, hostelName }: HostelGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(mainPhoto);



  const allImages = [mainPhoto, ...galleryImages];

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative">
        <img
          src={selectedImage.startsWith('http') ? selectedImage : `/api/images/${selectedImage}`}
          alt={hostelName}
          className="w-full h-96 object-cover rounded-xl cursor-pointer transition-transform hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&crop=center';
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
                  src={imageId.startsWith('http') ? imageId : `/api/images/${imageId}`}
                  alt={`${hostelName} ${index === 0 ? 'Main Photo' : `Gallery ${index}`}`}
                  className="w-full h-24 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=100&fit=crop';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 