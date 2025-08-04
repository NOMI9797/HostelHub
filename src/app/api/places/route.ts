import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const input = searchParams.get('input');
    const types = searchParams.get('types');
    
    if (!input || !types) {
      return NextResponse.json(
        { error: 'Missing required parameters: input and types' },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Places API key not configured' },
        { status: 500 }
      );
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=${types}&key=${apiKey}&components=country:pk`;

    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in places API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch places data' },
      { status: 500 }
    );
  }
} 