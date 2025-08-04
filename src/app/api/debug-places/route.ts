import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'API key not found in environment variables',
        hasApiKey: false 
      }, { status: 500 });
    }

    // Check API key format
    const apiKeyInfo = {
      hasApiKey: true,
      keyLength: apiKey.length,
      keyPrefix: apiKey.substring(0, 10) + '...',
      keySuffix: '...' + apiKey.substring(apiKey.length - 4)
    };

    // Test with a simple query
    const testQuery = 'Islamabad';
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(testQuery)}&types=cities&key=${apiKey}&components=country:pk`;

    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json({
      apiKeyInfo,
      requestUrl: url.replace(apiKey, 'API_KEY_HIDDEN'),
      responseStatus: response.status,
      responseData: data,
      suggestions: {
        status: data.status,
        message: data.error_message || 'Success',
        predictions: data.predictions?.length || 0,
        sample: data.predictions?.[0]?.description || 'None'
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Debug failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 