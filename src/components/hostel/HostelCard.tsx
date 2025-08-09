'use client';

import { Building2, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

interface RoomType {
  type: string;
  price: number;
  available: boolean;
}

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
    ownerName: string;
    ownerPhone: string;
    ownerEmail: string;
  };
}

// Helper function to get file URL
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

export default function HostelCard({ hostel }: HostelCardProps) {
  // Parse room types to get available room types count
  let roomTypes: RoomType[] = [];
  let availableRoomTypes = 0;
  
  try {
    roomTypes = JSON.parse(hostel.roomTypes || '[]');
    
    // Filter only available rooms
    const availableRooms = roomTypes.filter((rt: RoomType) => rt.available && rt.price > 0);
    availableRoomTypes = availableRooms.length;
  } catch (error) {
    console.error('Error parsing room types for', hostel.hostelName, ':', error);
    roomTypes = [];
    availableRoomTypes = 0;
  }

  // Parse facilities to count them
  let facilities: string[] = [];
  let facilityCount = 0;
  
  try {
    facilities = JSON.parse(hostel.facilities || '[]');
    facilityCount = facilities.length;
  } catch (error) {
    console.error('Error parsing facilities:', error);
    facilities = [];
    facilityCount = 0;
  }

  return (
    <Link href={`/hostels/${hostel.hostelId}`}>
      <div 
        className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
        data-tracking="hostel-card"
        data-hostel-id={hostel.hostelId}
        data-hostel-name={hostel.hostelName}
        data-hostel-location={`${hostel.city}, ${hostel.area}`}
        onClick={() => {
          // Push to dataLayer for GTM
          window.dataLayer?.push({
            'event': 'hostel_view',
            'hostel_data': {
              'id': hostel.hostelId,
              'name': hostel.hostelName,
              'location': `${hostel.city}, ${hostel.area}`
            }
          });
        }}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={getFileUrl(hostel.mainPhoto)}
            alt={hostel.hostelName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              // Fallback to a placeholder image if the main image fails to load
              e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop';
              e.currentTarget.onerror = null; // Prevent infinite loop
            }}
            onLoad={(e) => {
              // Remove any error styling if image loads successfully
              e.currentTarget.classList.remove('bg-gray-100');
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Gender Badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
            <span className="text-xs font-semibold text-gray-700">
              {hostel.genderSpecific === 'co-ed' ? 'Co-ed' : 
               hostel.genderSpecific === 'boys' ? 'Boys' : 'Girls'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Hostel Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
            {hostel.hostelName}
          </h3>

          {/* Location */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {hostel.area}, {hostel.city}
            </span>
          </div>

          {/* Contact Information Row */}
          <div className="mb-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-700">Contact:</span>
                <span className="text-sm text-gray-600">{hostel.ownerName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-700">Phone:</span>
                <span className="text-sm text-gray-900 font-medium">{hostel.ownerPhone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-700">Email:</span>
                <span className="text-sm text-gray-900 font-medium truncate">{hostel.ownerEmail}</span>
              </div>
            </div>
          </div>

          {/* Facilities and Room Types Row */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {availableRoomTypes > 0 ? (
                  `${availableRoomTypes} room type${availableRoomTypes !== 1 ? 's' : ''} available`
                ) : roomTypes.length > 0 ? (
                  'Rooms not currently available'
                ) : (
                  'No room types configured'
                )}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
              <Building2 className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700 font-medium">
                {facilityCount} facilities
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 