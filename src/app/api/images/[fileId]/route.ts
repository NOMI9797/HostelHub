import { NextRequest, NextResponse } from 'next/server';
import { Client, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const storage = new Storage(client);
const BUCKET_HOSTEL_PHOTOS = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_HOSTEL_PHOTOS!;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params;
    
    if (!fileId) {
      return new NextResponse('File ID is required', { status: 400 });
    }

    // Get the file from Appwrite storage
    const file = await storage.getFile(BUCKET_HOSTEL_PHOTOS, fileId);
    
    // Get the file view URL
    const fileUrl = storage.getFileView(BUCKET_HOSTEL_PHOTOS, fileId).toString();
    
    // Fetch the image from Appwrite
    const response = await fetch(fileUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    
    // Get the image buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Return the image with proper headers
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': file.mimeType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Image not found', { status: 404 });
  }
} 