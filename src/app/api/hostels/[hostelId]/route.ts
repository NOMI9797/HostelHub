import { NextResponse } from 'next/server';
import { Client, Databases, Query } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_HOSTELS = process.env.NEXT_PUBLIC_COLLECTION_HOSTELS!;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ hostelId: string }> }
) {
  try {
    const { hostelId } = await params;

    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_HOSTELS,
      [Query.equal('hostelId', hostelId)]
    );

    if (response.documents.length === 0) {
      return NextResponse.json(
        { error: 'Hostel not found' },
        { status: 404 }
      );
    }

    const hostel = response.documents[0];

    return NextResponse.json({
      hostelId: hostel.hostelId,
      hostelName: hostel.hostelName,
      description: hostel.description,
      city: hostel.city,
      area: hostel.area,
      nearbyLandmark: hostel.nearbyLandmark,
      mainPhoto: hostel.mainPhoto,
      galleryImages: hostel.galleryImages,
      ownerName: hostel.ownerName,
      ownerPhone: hostel.ownerPhone,
      ownerEmail: hostel.ownerEmail,
      roomTypes: hostel.roomTypes,
      facilities: hostel.facilities,
      genderSpecific: hostel.genderSpecific,
      ownerId: hostel.ownerId,
      createdAt: hostel.$createdAt,
      updatedAt: hostel.$updatedAt
    });
  } catch (error) {
    console.error('Error fetching hostel:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hostel' },
      { status: 500 }
    );
  }
} 