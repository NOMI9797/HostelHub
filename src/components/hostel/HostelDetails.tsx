import { MapPin, Phone, Mail, Users } from 'lucide-react';
import { getGenderDisplay, getMinimumPrice, formatPrice } from '@/utils/hostel-utils';
import { HostelDataFromDB } from '@/types/hostel';

interface HostelDetailsProps {
  hostel: HostelDataFromDB;
  roomTypes: Array<{type: string; available: boolean; price: number | null}>;
  facilities: string[];
}

export default function HostelDetails({ hostel, roomTypes, facilities }: HostelDetailsProps) {
  const minPrice = getMinimumPrice(roomTypes);

  return (
    <div className="space-y-8">
      {/* Hostel Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
          <div className="flex-1 mb-4 lg:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{hostel.hostelName}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-600 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm md:text-base">{hostel.city}, {hostel.area}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span className="text-sm md:text-base">{getGenderDisplay(hostel.genderSpecific)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">{hostel.description}</p>
      </div>

      {/* Room Types & Pricing */}
      {roomTypes.filter(rt => rt.available).length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Room Types & Pricing</h2>
          <div className="space-y-4">
            {roomTypes.filter(rt => rt.available).map((roomType, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg">{roomType.type.replace(/Seater/g, 'Bed')}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span className={roomType.available ? 'text-green-600' : 'text-red-600'}>
                      {roomType.available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-base md:text-lg font-bold text-blue-600">{formatPrice(roomType.price)}</div>
                  <div className="text-sm text-gray-600">per month</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Facilities */}
      {facilities.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Facilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {facilities.map((facility) => (
              <div key={facility} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 capitalize text-sm md:text-base">{facility.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 text-sm md:text-base break-words">{hostel.ownerName}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 text-sm md:text-base break-words">{hostel.ownerPhone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 text-sm md:text-base break-words">{hostel.ownerEmail}</span>
          </div>
          {hostel.nearbyLandmark && (
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <span className="text-gray-700 text-sm md:text-base break-words">Near {hostel.nearbyLandmark}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 