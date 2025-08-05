import { HostelDataFromDB, EditFormData } from '@/types/hostel';

// Parse hostel data from database format
export const parseHostelData = (hostel: HostelDataFromDB) => {
  let galleryImages: string[] = [];
  try {
    galleryImages = (hostel.galleryImages ? JSON.parse(hostel.galleryImages) : []) as string[];
  } catch (error) {
    console.error('Error parsing galleryImages:', error);
    galleryImages = [];
  }
  
  let roomTypes: Array<{type: string; available: boolean; price: number}> = [];
  try {
    roomTypes = (hostel.roomTypes ? JSON.parse(hostel.roomTypes) : []) as Array<{type: string; available: boolean; price: number}>;
  } catch (error) {
    console.error('Error parsing roomTypes:', error);
    roomTypes = [];
  }
  
  let facilities: string[] = [];
  try {
    facilities = (hostel.facilities ? JSON.parse(hostel.facilities) : []) as string[];
  } catch (error) {
    console.error('Error parsing facilities:', error);
    facilities = [];
  }
  
  return {
    roomTypes,
    facilities,
    galleryImages
  };
};

// Initialize edit form from hostel data
export const initializeEditForm = (hostel: HostelDataFromDB): EditFormData => {
  const { roomTypes, facilities, galleryImages } = parseHostelData(hostel);
  
  return {
    hostelName: hostel.hostelName,
    description: hostel.description,
    city: hostel.city,
    area: hostel.area,
    nearbyLandmark: hostel.nearbyLandmark || '',
    ownerName: hostel.ownerName,
    ownerPhone: hostel.ownerPhone,
    genderSpecific: hostel.genderSpecific as 'boys' | 'girls' | 'co-ed',
    roomTypes,
    facilities,
    galleryImages,
  };
};

// Get minimum price from room types
export const getMinimumPrice = (roomTypes: Array<{price: number}>) => {
  if (!roomTypes || roomTypes.length === 0) return 0;
  return Math.min(...roomTypes.map(rt => rt.price || 0));
};

// Format price with locale
export const formatPrice = (price: number) => {
  return `PKR ${price.toLocaleString()}`;
};

// Get gender display text
export const getGenderDisplay = (gender: string) => {
  switch (gender) {
    case 'co-ed': return 'Co-ed';
    case 'boys': return 'Boys';
    case 'girls': return 'Girls';
    default: return gender;
  }
};

// Validate hostel data
export const validateHostelData = (data: Partial<EditFormData>) => {
  const errors: string[] = [];
  
  if (!data.hostelName?.trim()) errors.push('Hostel name is required');
  if (!data.description?.trim()) errors.push('Description is required');
  if (!data.city?.trim()) errors.push('City is required');
  if (!data.area?.trim()) errors.push('Area is required');
  if (!data.ownerName?.trim()) errors.push('Owner name is required');
  if (!data.ownerPhone?.trim()) errors.push('Owner phone is required');
  
  return errors;
}; 