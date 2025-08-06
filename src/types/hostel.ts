// Hostel-related type definitions

// Add HostelStatus enum
export enum HostelStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface RoomType {
  type: string;
  available: boolean;
  price: number | null;
}

export interface HostelData {
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
  galleryImages?: string[];
  ownerName: string;
  ownerPhone: string;
  roomTypes: RoomType[];
  facilities: string[];
  genderSpecific: 'boys' | 'girls' | 'co-ed';
  status?: HostelStatus;
  submittedAt?: string;
  approvedAt?: string;
  approvedBy?: string;
  rejectionReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HostelResponse {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  hostelId: string;
  ownerId: string;
  ownerEmail: string;
  hostelName: string;
  description: string;
  location: string;
  city: string;
  area: string;
  nearbyLandmark: string;
  googleMapsLocation: string;
  mainPhoto: string;
  galleryImages: string;
  ownerName: string;
  ownerPhone: string;
  roomTypes: string;
  facilities: string;
  genderSpecific: string;
  status: string;
  submittedAt: string;
  approvedAt: string;
  approvedBy: string;
  rejectionReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface HostelListItem {
  hostelId: string;
  hostelName: string;
  description: string;
  city: string;
  area: string;
  nearbyLandmark: string;
  mainPhoto: string;
  galleryImages: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  roomTypes: string;
  facilities: string;
  genderSpecific: string;
  ownerId: string;
  status: string;
  submittedAt: string;
  approvedAt: string;
  approvedBy: string;
  rejectionReason: string;
  createdAt: string;
  updatedAt: string;
}

// For database operations (when data comes as JSON strings)
export interface HostelDataFromDB {
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
  status?: HostelStatus;
  submittedAt?: string;
  approvedAt?: string;
  approvedBy?: string;
  rejectionReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Edit form data interface
export interface EditFormData {
  hostelName: string;
  description: string;
  city: string;
  area: string;
  nearbyLandmark: string;
  ownerName: string;
  ownerPhone: string;
  genderSpecific: 'boys' | 'girls' | 'co-ed';
  roomTypes: Array<{type: string; available: boolean; price: number | null}>;
  facilities: string[];
  galleryImages: string[];
} 