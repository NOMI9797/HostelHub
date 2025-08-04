'use client';

import { Building2, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

interface HostelCardProps {
  hostel: {
    hostelId: string;
    hostelName: string;
    city: string;
    area: string;
    mainPhoto: string;
    roomTypes: string;
    facilities: string;
    genderSpecific: string;
  };
}

// Helper function to get file URL
const getFileUrl = (fileId: string) => {
  // If it's already a full URL (like Unsplash), return it directly
  if (fileId.startsWith('http')) {
    return fileId;
  }
  // Otherwise, construct Appwrite URL
  return `https://fra.cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_HOSTEL_PHOTOS}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};

export default function HostelCard({ hostel }: HostelCardProps) {
  // Parse room types to get the lowest price
  const roomTypes = JSON.parse(hostel.roomTypes || '[]') as Array<{price: number; available: boolean}>;
  const lowestPrice = roomTypes.length > 0 
    ? Math.min(...roomTypes.map((rt) => rt.price || 0))
    : 0;

  // Parse facilities to count them
  const facilities = JSON.parse(hostel.facilities || '[]') as string[];
  const facilityCount = facilities.length;

  return (
    <Link href={`/hostels/${hostel.hostelId}`}>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group cursor-pointer">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={getFileUrl(hostel.mainPhoto)}
            alt={hostel.hostelName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              // Fallback to a placeholder image if the main image fails to load
              e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop';
            }}
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-xs font-medium text-gray-700">
              {hostel.genderSpecific === 'co-ed' ? 'Co-ed' : 
               hostel.genderSpecific === 'boys' ? 'Boys' : 'Girls'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Hostel Name */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
            {hostel.hostelName}
          </h3>

          {/* Location */}
          <div className="flex items-center space-x-1 mb-3">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {hostel.area}, {hostel.city}
            </span>
          </div>

          {/* Price and Facilities */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-blue-600">
                PKR {lowestPrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">/month</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Building2 className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {facilityCount} facilities
              </span>
            </div>
          </div>

          {/* Room Types Available */}
                          <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {roomTypes.filter((rt) => rt.available).length} room types available
                    </span>
                  </div>
                </div>
        </div>
      </div>
    </Link>
  );
} 