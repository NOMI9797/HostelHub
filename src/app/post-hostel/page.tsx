'use client';

import { UserRole } from '@/lib/appwrite';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import HostelPostingForm from '@/components/hostel/HostelPostingForm';
import Header from '@/components/layout/Header';

export default function PostHostelPage() {
  // User authentication is handled in HostelPostingForm component

  return (
    <ProtectedRoute requiredRole={UserRole.HOSTEL_LISTER}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div>
          {/* Page Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Post a New Hostel</h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Create a comprehensive hostel listing to attract travelers and grow your business. 
                  Fill in all the details to showcase your hostel effectively.
                </p>
              </div>
            </div>
          </div>
          
          {/* Form Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HostelPostingForm />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 