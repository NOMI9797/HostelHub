import { NextResponse } from 'next/server';
import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_HOSTELS = process.env.NEXT_PUBLIC_COLLECTION_HOSTELS!;

export async function GET() {
  try {
    // Use public access to read hostels without authentication
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_HOSTELS
    );

    const hostels = response.documents.map((doc: Record<string, unknown>) => ({
      hostelId: doc.hostelId,
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

    return NextResponse.json(hostels);
  } catch (error) {
    console.error('Error fetching hostels:', error);
    
    // Return empty array instead of error to prevent frontend issues
    return NextResponse.json([]);
  }
} 