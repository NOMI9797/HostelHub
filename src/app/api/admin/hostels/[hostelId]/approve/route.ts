import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases, Query } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_HOSTELS = process.env.NEXT_PUBLIC_COLLECTION_HOSTELS!;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ hostelId: string }> }
) {
  try {
    const { hostelId } = await params;
    const { adminUserId } = await request.json();

    if (!adminUserId) {
      return NextResponse.json({ error: 'Admin user ID is required' }, { status: 400 });
    }

    // First find the document by hostelId
    const findResponse = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_HOSTELS,
      [Query.equal('hostelId', hostelId)]
    );
    
    if (findResponse.documents.length === 0) {
      return NextResponse.json({ error: 'Hostel not found' }, { status: 404 });
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
    
    // Update the hostel status to approved
    await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_HOSTELS,
      documentId,
      updateData
    );

    return NextResponse.json({ success: true, message: 'Hostel approved successfully' });
  } catch (error) {
    console.error('Error approving hostel:', error);
    return NextResponse.json({ error: 'Failed to approve hostel' }, { status: 500 });
  }
} 