import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not found' }, { status: 500 });
    }

    // Try to get project info using a different API endpoint
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=test&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json({
      apiKeyExists: true,
      keyLength: apiKey.length,
      responseStatus: response.status,
      googleResponse: data,
      suggestions: [
        "1. Check if you're in the correct Google Cloud project",
        "2. Enable Places API in the project",
        "3. Verify billing is linked to the correct project",
        "4. Check API key restrictions"
      ]
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Check failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 