'use client';

import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/appwrite';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import HostelListerPanel from '@/components/dashboard/HostelListerPanel';
import { Users, Settings, Search, MapPin, Star } from 'lucide-react';
import Header from '@/components/layout/Header';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  // Debug: Log user data
  console.log('Dashboard - User data:', user);
  console.log('Dashboard - User role:', user?.role);
  console.log('Dashboard - Is Hostel Lister:', user?.role === UserRole.HOSTEL_LISTER);

  return (
    <ProtectedRoute>
      {user && user.role === UserRole.HOSTEL_LISTER ? (
        <HostelListerPanel user={user} onSignOut={handleSignOut} />
      ) : (
        <div className="min-h-screen bg-white">
          {/* Unified Header */}
          <Header />

          {/* Main Content */}
          <div className="relative py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {/* Welcome Section */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Welcome to Your Dashboard
                </h1>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  Discover and save amazing hostels for your next adventure
                </p>
              </div>

              {/* Dashboard Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Saved Hostels */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Saved Hostels</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    View and manage your saved hostel listings for future trips.
                  </p>
                  <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium text-sm">
                    View Saved
                  </button>
                </div>

                {/* Browse Hostels */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Search className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Browse Hostels</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Discover new hostels and find the perfect accommodation for your travels.
                  </p>
                  <button className="w-full py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium text-sm">
                    Browse Now
                  </button>
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Settings className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Preferences</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Customize your search preferences and notification settings.
                  </p>
                  <button className="w-full py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium text-sm">
                    Manage Preferences
                  </button>
                </div>
              </div>

              {/* Quick Actions Section */}
              <div className="mt-12 bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">Find Hostels Near Me</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700 font-medium">View Recent Searches</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
} 