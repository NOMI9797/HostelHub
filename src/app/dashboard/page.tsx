'use client';

import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/appwrite';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import HostelListerPanel from '@/components/dashboard/HostelListerPanel';
import { Users, Settings } from 'lucide-react';
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          {/* Unified Header */}
          <Header />

          {/* Main Content */}
          <div className="relative py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Welcome Section */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Welcome to Your Dashboard
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Discover and save amazing hostels for your next adventure
                </p>
              </div>

              {/* Dashboard Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {/* Room Seeker Dashboard */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 lg:p-8 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Saved Hostels</h3>
                  </div>
                  <p className="text-gray-300 mb-6">
                    View and manage your saved hostel listings for future trips.
                  </p>
                  <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium">
                    View Saved
                  </button>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 lg:p-8 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Browse Hostels</h3>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Discover new hostels and find the perfect accommodation for your travels.
                  </p>
                  <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 font-medium">
                    Browse Now
                  </button>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 lg:p-8 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Preferences</h3>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Customize your search preferences and notification settings.
                  </p>
                  <button className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 font-medium">
                    Manage Preferences
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