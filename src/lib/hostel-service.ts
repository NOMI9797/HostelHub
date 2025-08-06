import { Client, Databases, Storage, ID, Query } from 'appwrite';
import { HostelData, HostelResponse, HostelListItem } from '@/types/hostel';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// Public client for non-authenticated access
const publicClient = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);
const publicDatabases = new Databases(publicClient);
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
  price: number | null;
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
        status: 'pending', // Always start as pending
        submittedAt: new Date().toISOString(),
        approvedAt: '',
        approvedBy: '',
        rejectionReason: '',
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

  // Get all hostels (public view - only approved)
  static async getAllHostels(): Promise<HostelListItem[]> {
    try {
      // Try public access first (for non-authenticated users)
      try {
        const response = await publicDatabases.listDocuments(
          DATABASE_ID,
          COLLECTION_HOSTELS,
          [Query.equal('status', 'approved')] // Only show approved hostels
        );

        return response.documents.map((doc: Record<string, unknown>) => ({
          hostelId: doc.hostelId as string,
          hostelName: doc.hostelName as string,
          description: doc.description as string,
          city: doc.city as string,
          area: doc.area as string,
          nearbyLandmark: doc.nearbyLandmark as string,
          mainPhoto: doc.mainPhoto as string,
          galleryImages: doc.galleryImages as string,
          ownerName: doc.ownerName as string,
          ownerPhone: doc.ownerPhone as string,
          ownerEmail: doc.ownerEmail as string,
          roomTypes: doc.roomTypes as string,
          facilities: doc.facilities as string,
          genderSpecific: doc.genderSpecific as string,
          ownerId: doc.ownerId as string,
          status: doc.status as string,
          submittedAt: doc.submittedAt as string,
          approvedAt: doc.approvedAt as string,
          approvedBy: doc.approvedBy as string,
          rejectionReason: doc.rejectionReason as string,
          createdAt: doc.$createdAt as string,
          updatedAt: doc.$updatedAt as string
        }));
      } catch {
        console.log('Public access failed, trying authenticated access...');
        
        // Fallback to authenticated access
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_HOSTELS,
          [Query.equal('status', 'approved')] // Only show approved hostels
        );

        return response.documents.map((doc: Record<string, unknown>) => ({
          hostelId: doc.hostelId as string,
          hostelName: doc.hostelName as string,
          description: doc.description as string,
          city: doc.city as string,
          area: doc.area as string,
          nearbyLandmark: doc.nearbyLandmark as string,
          mainPhoto: doc.mainPhoto as string,
          galleryImages: doc.galleryImages as string,
          ownerName: doc.ownerName as string,
          ownerPhone: doc.ownerPhone as string,
          ownerEmail: doc.ownerEmail as string,
          roomTypes: doc.roomTypes as string,
          facilities: doc.facilities as string,
          genderSpecific: doc.genderSpecific as string,
          ownerId: doc.ownerId as string,
          status: doc.status as string,
          submittedAt: doc.submittedAt as string,
          approvedAt: doc.approvedAt as string,
          approvedBy: doc.approvedBy as string,
          rejectionReason: doc.rejectionReason as string,
          createdAt: doc.$createdAt as string,
          updatedAt: doc.$updatedAt as string
        }));
      }
    } catch (error) {
      console.error('Error fetching hostels:', error);
      throw error;
    }
  }

  // Get pending hostels (admin only)
  static async getPendingHostels(): Promise<HostelResponse[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_HOSTELS,
        [Query.equal('status', 'pending')]
      );
      return response.documents as unknown as HostelResponse[];
    } catch (error) {
      console.error('Error fetching pending hostels:', error);
      throw error;
    }
  }

  // Get all hostels for admin (including all statuses)
  static async getAllHostelsForAdmin(): Promise<HostelResponse[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_HOSTELS
      );
      return response.documents as unknown as HostelResponse[];
    } catch (error) {
      console.error('Error fetching all hostels for admin:', error);
      throw error;
    }
  }

  // Approve hostel (admin only)
  static async approveHostel(hostelId: string, adminUserId: string): Promise<void> {
    try {
      // First find the document by hostelId
      const findResponse = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_HOSTELS,
        [Query.equal('hostelId', hostelId)]
      );
      
      if (findResponse.documents.length === 0) {
        throw new Error('Hostel not found');
      }
      
      const documentId = findResponse.documents[0].$id;
      const currentHostel = findResponse.documents[0];
      
      // Prepare update data with fallbacks for missing fields
      const updateData: Record<string, string | number | boolean> = {
        status: 'approved',
        approvedAt: new Date().toISOString(),
        approvedBy: adminUserId,
        rejectionReason: '',
        updatedAt: new Date().toISOString()
      };

      // Add submittedAt if it doesn't exist (for existing hostels)
      if (!currentHostel.submittedAt) {
        updateData.submittedAt = currentHostel.createdAt || new Date().toISOString();
      }

      // Add other missing fields with defaults
      if (!currentHostel.approvedAt) {
        updateData.approvedAt = '';
      }
      if (!currentHostel.approvedBy) {
        updateData.approvedBy = '';
      }
      if (!currentHostel.rejectionReason) {
        updateData.rejectionReason = '';
      }
      
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_HOSTELS,
        documentId,
        updateData
      );
    } catch (error) {
      console.error('Error approving hostel:', error);
      throw error;
    }
  }

  // Reject hostel (admin only)
  static async rejectHostel(hostelId: string, adminUserId: string, reason?: string): Promise<void> {
    try {
      // First find the document by hostelId
      const findResponse = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_HOSTELS,
        [Query.equal('hostelId', hostelId)]
      );
      
      if (findResponse.documents.length === 0) {
        throw new Error('Hostel not found');
      }
      
      const documentId = findResponse.documents[0].$id;
      const currentHostel = findResponse.documents[0];
      
      // Prepare update data with fallbacks for missing fields
      const updateData: Record<string, string | number | boolean> = {
        status: 'rejected',
        approvedAt: '',
        approvedBy: '',
        rejectionReason: reason || '',
        updatedAt: new Date().toISOString()
      };

      // Add submittedAt if it doesn't exist (for existing hostels)
      if (!currentHostel.submittedAt) {
        updateData.submittedAt = currentHostel.createdAt || new Date().toISOString();
      }

      // Add other missing fields with defaults
      if (!currentHostel.approvedAt) {
        updateData.approvedAt = '';
      }
      if (!currentHostel.approvedBy) {
        updateData.approvedBy = '';
      }
      if (!currentHostel.rejectionReason) {
        updateData.rejectionReason = '';
      }
      
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_HOSTELS,
        documentId,
        updateData
      );
    } catch (error) {
      console.error('Error rejecting hostel:', error);
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
      // Try public access first (for non-authenticated users)
      try {
        const response = await publicDatabases.listDocuments(
          DATABASE_ID,
          COLLECTION_HOSTELS,
          [Query.equal('hostelId', hostelId)]
        );
        
        if (response.documents.length === 0) {
          throw new Error('Hostel not found');
        }
        
        return response.documents[0] as unknown as HostelResponse;
      } catch {
        console.log('Public access failed for hostel details, trying authenticated access...');
        
        // Fallback to authenticated access
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_HOSTELS,
          [Query.equal('hostelId', hostelId)]
        );
        
        if (response.documents.length === 0) {
          throw new Error('Hostel not found');
        }
        
        return response.documents[0] as unknown as HostelResponse;
      }
    } catch (error) {
      console.error('Error fetching hostel:', error);
      throw error;
    }
  }

  // Update hostel
  static async updateHostel(hostelId: string, updates: Partial<HostelData>): Promise<HostelResponse> {
    try {
      // First find the document by hostelId
      const findResponse = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_HOSTELS,
        [Query.equal('hostelId', hostelId)]
      );
      
      if (findResponse.documents.length === 0) {
        throw new Error('Hostel not found');
      }
      
      const documentId = findResponse.documents[0].$id;
      
      const updateData: Record<string, unknown> = {
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
      if (updates.galleryImages) {
        updateData.galleryImages = JSON.stringify(updates.galleryImages);
      }

      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_HOSTELS,
        documentId,
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
      // First find the document by hostelId
      const findResponse = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_HOSTELS,
        [Query.equal('hostelId', hostelId)]
      );
      
      if (findResponse.documents.length === 0) {
        throw new Error('Hostel not found');
      }
      
      const documentId = findResponse.documents[0].$id;
      
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_HOSTELS,
        documentId
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

  // Search hostels (only approved hostels)
  static async searchHostels(query: string, location?: string): Promise<HostelListItem[]> {
    try {
      // Try public access first (for non-authenticated users)
      let response;
      try {
        response = await publicDatabases.listDocuments(
          DATABASE_ID,
          COLLECTION_HOSTELS,
          [Query.equal('status', 'approved')] // Only search approved hostels
        );
      } catch {
        console.log('Public access failed for search, trying authenticated access...');
        response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_HOSTELS,
          [Query.equal('status', 'approved')] // Only search approved hostels
        );
      }
      
      // Filter results based on search criteria
      let filteredResults = response.documents;
      
      if (query || location) {
        filteredResults = response.documents.filter((doc: Record<string, unknown>) => {
          const hostelName = (doc.hostelName as string)?.toLowerCase() || '';
          const city = (doc.city as string)?.toLowerCase() || '';
          const area = (doc.area as string)?.toLowerCase() || '';
          const searchQuery = query.toLowerCase();
          const searchLocation = location?.toLowerCase() || '';
          
          const nameMatch = !query || hostelName.includes(searchQuery);
          const locationMatch = !location || city.includes(searchLocation) || area.includes(searchLocation);
          
          return nameMatch && locationMatch;
        });
      }
      
      return filteredResults.map((doc: Record<string, unknown>) => ({
        hostelId: (doc.hostelId || doc.$id) as string,
        hostelName: doc.hostelName as string,
        description: doc.description as string,
        city: doc.city as string,
        area: doc.area as string,
        nearbyLandmark: doc.nearbyLandmark as string,
        mainPhoto: doc.mainPhoto as string,
        galleryImages: doc.galleryImages as string,
        ownerName: doc.ownerName as string,
        ownerPhone: doc.ownerPhone as string,
        ownerEmail: doc.ownerEmail as string,
        roomTypes: doc.roomTypes as string,
        facilities: doc.facilities as string,
        genderSpecific: doc.genderSpecific as string,
        ownerId: doc.ownerId as string,
        status: doc.status as string,
        submittedAt: doc.submittedAt as string,
        approvedAt: doc.approvedAt as string,
        approvedBy: doc.approvedBy as string,
        rejectionReason: doc.rejectionReason as string,
        createdAt: doc.$createdAt as string,
        updatedAt: doc.$updatedAt as string
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