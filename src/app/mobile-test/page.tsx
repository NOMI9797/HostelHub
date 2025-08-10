import Link from 'next/link';

export default function MobileTestPage() {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Mobile Test Page</h1>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="font-semibold text-blue-900">Basic Elements Test</h2>
            <p className="text-blue-700 text-sm">This page tests basic mobile rendering.</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="font-semibold text-green-900">Responsive Test</h2>
            <p className="text-green-700 text-sm">Check if this adapts to mobile screens.</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h2 className="font-semibold text-purple-900">Touch Targets</h2>
            <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium">
              Test Button (44px height)
            </button>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h2 className="font-semibold text-orange-900">Text Rendering</h2>
            <p className="text-orange-700 text-sm">
              This text should be clearly readable on mobile devices without any rendering issues.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 