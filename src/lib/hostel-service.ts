import { Client, Databases, Storage, ID, Query } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);
const storage = new Storage(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_HOSTELS = process.env.NEXT_PUBLIC_COLLECTION_HOSTELS!;
const BUCKET_HOSTEL_PHOTOS = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_HOSTEL_PHOTOS!;

// Debug environment variables
console.log('Hostel Service Config:', {
  DATABASE_ID,
  COLLECTION_HOSTELS,
  BUCKET_HOSTEL_PHOTOS,
  hasDatabaseId: !!DATABASE_ID,
  hasCollectionId: !!COLLECTION_HOSTELS,
  hasBucketId: !!BUCKET_HOSTEL_PHOTOS
});

export interface RoomType {
  type: string;
  available: boolean;
  price: number;
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
  status?: 'active' | 'inactive' | 'pending';
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
  createdAt: string;
  updatedAt: string;
}

export class HostelService {
  // Create a new hostel listing
  static async createHostel(hostelData: HostelData): Promise<HostelResponse> {
    try {
      // Ensure galleryImages is properly handled
      const galleryImagesString = hostelData.galleryImages && hostelData.galleryImages.length > 0 
        ? JSON.stringify(hostelData.galleryImages)
        : '[]';
      


      const documentData = {
        hostelId: ID.unique(),
        ownerId: hostelData.ownerId,
        ownerEmail: hostelData.ownerEmail,
        hostelName: hostelData.hostelName,
        description: hostelData.description,
        location: hostelData.location,
        city: hostelData.city,
        area: hostelData.area,
        nearbyLandmark: hostelData.nearbyLandmark || '',
        googleMapsLocation: hostelData.googleMapsLocation || '',
        mainPhoto: hostelData.mainPhoto,
        galleryImages: galleryImagesString,
        ownerName: hostelData.ownerName,
        ownerPhone: hostelData.ownerPhone,
        roomTypes: JSON.stringify(hostelData.roomTypes),
        facilities: JSON.stringify(hostelData.facilities),
        genderSpecific: hostelData.genderSpecific,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };



      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_HOSTELS,
        ID.unique(),
        documentData
      );

      return response as unknown as HostelResponse;
    } catch (error) {
      console.error('Error creating hostel:', error);
      throw error;
    }
  }

  // Get all hostels
  static async getAllHostels(): Promise<HostelListItem[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_HOSTELS
      );

      return response.documents.map((doc: any) => ({
        hostelId: doc.$id,
        hostelName: doc.hostelName,
        description: doc.description,
        city: doc.city,
        area: doc.area,
        nearbyLandmark: doc.nearbyLandmark,
        mainPhoto: doc.mainPhoto,
        galleryImages: doc.galleryImages,
        ownerName: doc.ownerName,
        ownerPhone: doc.ownerPhone,
        ownerEmail: doc.ownerEmail,
        roomTypes: doc.roomTypes,
        facilities: doc.facilities,
        genderSpecific: doc.genderSpecific,
        ownerId: doc.ownerId,
        createdAt: doc.$createdAt,
        updatedAt: doc.$updatedAt
      }));
    } catch (error) {
      console.error('Error fetching hostels:', error);
      throw error;
    }
  }

  // Get hostels by owner
  static async getHostelsByOwner(ownerId: string): Promise<HostelResponse[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_HOSTELS,
        [Query.equal('ownerId', ownerId)]
      );
      return response.documents as unknown as HostelResponse[];
    } catch (error) {
      console.error('Error fetching owner hostels:', error);
      throw error;
    }
  }

  // Get hostel by ID
  static async getHostelById(hostelId: string): Promise<HostelResponse> {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTION_HOSTELS,
        hostelId
      );
      return response as unknown as HostelResponse;
    } catch (error) {
      console.error('Error fetching hostel:', error);
      throw error;
    }
  }

  // Update hostel
  static async updateHostel(hostelId: string, updates: Partial<HostelData>): Promise<HostelResponse> {
    try {
      const updateData: any = {
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      // Convert arrays to JSON strings if they exist
      if (updates.roomTypes) {
        updateData.roomTypes = JSON.stringify(updates.roomTypes);
      }
      if (updates.facilities) {
        updateData.facilities = JSON.stringify(updates.facilities);
      }

      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_HOSTELS,
        hostelId,
        updateData
      );

      return response as unknown as HostelResponse;
    } catch (error) {
      console.error('Error updating hostel:', error);
      throw error;
    }
  }

  // Delete hostel
  static async deleteHostel(hostelId: string): Promise<void> {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_HOSTELS,
        hostelId
      );
    } catch (error) {
      console.error('Error deleting hostel:', error);
      throw error;
    }
  }

  // Upload hostel photo
  static async uploadHostelPhoto(file: File): Promise<string> {
    try {
      const response = await storage.createFile(
        BUCKET_HOSTEL_PHOTOS,
        ID.unique(),
        file
      );

      // Return only the file ID instead of full URL
      return response.$id;
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  }

  // Delete hostel photo
  static async deleteHostelPhoto(fileId: string): Promise<void> {
    try {
      await storage.deleteFile(BUCKET_HOSTEL_PHOTOS, fileId);
    } catch (error) {
      console.error('Error deleting photo:', error);
      throw error;
    }
  }

  // Search hostels
  static async searchHostels(query: string, location?: string): Promise<HostelListItem[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_HOSTELS
      );
      
      // Filter results based on search criteria
      let filteredResults = response.documents;
      
      if (query || location) {
        filteredResults = response.documents.filter((doc: any) => {
          const hostelName = doc.hostelName?.toLowerCase() || '';
          const city = doc.city?.toLowerCase() || '';
          const area = doc.area?.toLowerCase() || '';
          const searchQuery = query.toLowerCase();
          const searchLocation = location?.toLowerCase() || '';
          
          const nameMatch = !query || hostelName.includes(searchQuery);
          const locationMatch = !location || city.includes(searchLocation) || area.includes(searchLocation);
          
          return nameMatch && locationMatch;
        });
      }
      
      return filteredResults.map((doc: any) => ({
        hostelId: doc.$id,
        hostelName: doc.hostelName,
        description: doc.description,
        city: doc.city,
        area: doc.area,
        nearbyLandmark: doc.nearbyLandmark,
        mainPhoto: doc.mainPhoto,
        galleryImages: doc.galleryImages,
        ownerName: doc.ownerName,
        ownerPhone: doc.ownerPhone,
        ownerEmail: doc.ownerEmail,
        roomTypes: doc.roomTypes,
        facilities: doc.facilities,
        genderSpecific: doc.genderSpecific,
        ownerId: doc.ownerId,
        createdAt: doc.$createdAt,
        updatedAt: doc.$updatedAt
      }));
    } catch (error) {
      console.error('Error searching hostels:', error);
      throw error;
    }
  }

  // Get file URL from file ID
  static getFileUrl(fileId: string): string {
    return storage.getFileView(BUCKET_HOSTEL_PHOTOS, fileId).toString();
  }

  // Get file URLs from file IDs array
  static getFileUrls(fileIds: string[]): string[] {
    return fileIds.map(fileId => this.getFileUrl(fileId));
  }
} 