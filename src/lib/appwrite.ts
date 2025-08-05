import { Client, Account, Databases, OAuthProvider, Query } from 'appwrite';

// Appwrite client configuration
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);

// Database and collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const COLLECTION_ID = process.env.NEXT_PUBLIC_COLLECTION_USERS!;

// User roles
export enum UserRole {
  HOSTEL_LISTER = 'HostelLister',
  ROOM_SEEKER = 'RoomSeeker'
}

// User interface
export interface User {
  $id: string;
  userId: string;
  email: string;
  role: UserRole;
  name?: string;
  $createdAt: string;
  $updatedAt: string;
}

// Authentication functions
export const authService = {
  // Test database connection
  async testDatabaseConnection() {
    try {
      console.log('Testing database connection...');
      console.log('Database ID:', DATABASE_ID);
      console.log('Collection ID:', COLLECTION_ID);
      
      // Try to list documents to test permissions
      const documents = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      console.log('Database connection successful, found documents:', documents.total);
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  },

  // Sign up with Google OAuth
  async signUpWithGoogle(_role: UserRole) {
    try {
      // Role is stored in sessionStorage and used in auth callback
      const session = await account.createOAuth2Session(
        OAuthProvider.Google,
        `${window.location.origin}/auth/callback`,
        `${window.location.origin}/auth/callback`
      );
      return session;
    } catch {
      console.error('Google OAuth error');
      throw new Error('Google OAuth failed');
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const user = await account.get();
      return user;
    } catch {
      return null;
    }
  },

  // Get user data from database
  async getUserData(userId: string): Promise<User | null> {
    try {
      console.log('Getting user data for userId:', userId);
      
      // Search for user document by userId attribute
      const userData = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          // Query to find document where userId matches
          Query.equal('userId', userId)
        ]
      );
      
      console.log('User data query result:', userData);
      
      if (userData.documents.length > 0) {
        const user = userData.documents[0] as unknown as User;
        console.log('Found user data:', user);
        return user;
      }
      
      console.log('No user document found for userId:', userId);
      return null;
    } catch {
      console.error('Error fetching user data');
      return null;
    }
  },

  // Create user document in database
  async createUserDocument(userId: string, email: string, role: UserRole) {
    try {
      console.log('Creating user document with:', { userId, email, role });
      console.log('Database ID:', DATABASE_ID);
      console.log('Collection ID:', COLLECTION_ID);
      
      const userData = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        'unique()', // Let Appwrite generate a unique ID
        {
          userId,
          email,
          role
        }
      );
      console.log('User document created successfully:', userData);
      return userData;
    } catch {
      console.error('Error creating user document');
      throw new Error('Failed to create user document');
    }
  },

  // Sign out
  async signOut() {
    try {
      await account.deleteSession('current');
    } catch {
      console.error('Sign out error');
    }
  },

  // Check if user is authenticated
  async isAuthenticated() {
    try {
      const user = await account.get();
      return !!user;
    } catch {
      return false;
    }
  },

  // Refresh session
  async refreshSession() {
    try {
      const session = await account.updateSession('current');
      return session;
    } catch {
      console.error('Session refresh error');
      throw new Error('Session refresh failed');
    }
  },

  // Get session info
  async getSessionInfo() {
    try {
      const session = await account.getSession('current');
      return session;
    } catch {
      return null;
    }
  }
}; 