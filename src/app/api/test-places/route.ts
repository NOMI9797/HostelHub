import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not found' }, { status: 500 });
    }

    // Test with a simple query
    const testQuery = 'Islamabad';
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(testQuery)}&types=cities&key=${apiKey}&components=country:pk`;

    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json({
      status: data.status,
      message: data.error_message || 'Success',
      predictions: data.predictions?.length || 0,
      sample: data.predictions?.[0]?.description || 'None'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Test failed', details: error }, { status: 500 });
  }
} 