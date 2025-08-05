import { useState, useEffect } from 'react';
import { ImageIcon } from 'lucide-react';

interface HostelGalleryProps {
  mainPhoto: string;
  galleryImages: string[];
  hostelName: string;
}

export default function HostelGallery({ mainPhoto, galleryImages, hostelName }: HostelGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(mainPhoto);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

  // Reset loading and error states when selected image changes
  useEffect(() => {
    setImageLoadErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(selectedImage);
      return newSet;
    });
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(selectedImage);
      return newSet;
    });
  }, [selectedImage]);

  const getFileUrl = (fileId: string) => {
    // Handle empty or invalid file IDs
    if (!fileId || fileId.trim() === '') {
      return '';
    }
    
    // If it's already a full URL (like Unsplash), return it directly
    if (fileId.startsWith('http')) {
      return fileId;
    }
    
    // Use server-side API route to serve images with proper authentication
    return `/api/images/${fileId}`;
  };

  const handleImageError = (imageId: string) => {
    setImageLoadErrors(prev => new Set(prev).add(imageId));
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageId);
      return newSet;
    });
  };

  const handleImageLoad = (imageId: string) => {
    setImageLoadErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageId);
      return newSet;
    });
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageId);
      return newSet;
    });
  };

  const handleImageStartLoad = (imageId: string) => {
    setLoadingImages(prev => new Set(prev).add(imageId));
  };



  const allImages = [mainPhoto, ...galleryImages];

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative">
        {imageLoadErrors.has(selectedImage) ? (
          <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Image not available</p>
              <p className="text-gray-400 text-sm">This image could not be loaded</p>
            </div>
          </div>
        ) : loadingImages.has(selectedImage) ? (
          <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium">Loading image...</p>
            </div>
          </div>
        ) : (
          <img
            src={getFileUrl(selectedImage)}
            alt={hostelName}
            className="w-full h-96 object-cover rounded-xl cursor-pointer transition-transform hover:scale-105"
            onError={() => handleImageError(selectedImage)}
            onLoad={() => handleImageLoad(selectedImage)}
            onLoadStart={() => handleImageStartLoad(selectedImage)}
          />
        )}
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
                {imageLoadErrors.has(imageId) ? (
                  <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-gray-400 text-xs">Not available</p>
                    </div>
                  </div>
                ) : loadingImages.has(imageId) ? (
                  <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <img
                    src={getFileUrl(imageId)}
                    alt={`${hostelName} ${index === 0 ? 'Main Photo' : `Gallery ${index}`}`}
                    className="w-full h-24 object-cover rounded-lg"
                    onError={() => handleImageError(imageId)}
                    onLoad={() => handleImageLoad(imageId)}
                    onLoadStart={() => handleImageStartLoad(imageId)}
                  />
                )}
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