'use client';

import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/appwrite';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import HostelListerPanel from '@/components/dashboard/HostelListerPanel';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { Users } from 'lucide-react';
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
  console.log('Dashboard - Is Super Admin:', user?.role === UserRole.SUPER_ADMIN);

  return (
    <ProtectedRoute>
      {user && user.role === UserRole.SUPER_ADMIN ? (
        <AdminDashboard />
      ) : user && user.role === UserRole.HOSTEL_LISTER ? (
        <HostelListerPanel user={user} onSignOut={handleSignOut} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          {/* Unified Header */}
          <Header />

          {/* Main Content */}
          <div className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
            <div className="max-w-5xl mx-auto">
              {/* Dashboard Welcome Section */}
              <div className="text-center mb-20">
                <div className="relative mb-12">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-xl"></div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 animate-fade-in">
                  Your Room Seeker Dashboard
                </h1>
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100 mb-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Hostels</h3>
                      <p className="text-gray-600">Explore verified hostels near your institution</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Favorites</h3>
                      <p className="text-gray-600">Bookmark hostels you&apos;re interested in</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Owners</h3>
                      <p className="text-gray-600">Connect directly with hostel owners</p>
                    </div>
                  </div>
                </div>
                <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
                  Welcome to your personalized dashboard! Start exploring hostels and find your perfect accommodation.
                </p>
              </div>

              {/* Quick Actions Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Searches</h2>
                  <p className="text-gray-600">Your recent hostel searches will appear here</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Saved Hostels</h2>
                  <p className="text-gray-600">Your bookmarked hostels will be listed here</p>
                </div>
              </div>

              {/* Inspirational Quotes Section */}
              <div className="mb-20">
                <h2 className="text-4xl font-bold text-center mb-16">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ✨ Inspirational Quotes for Hostel Life
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Quote 1 */}
                  <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-white/20">
                    <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🏠</div>
                    <blockquote className="text-xl text-gray-800 italic mb-6 leading-relaxed font-medium">
                      &quot;Home is not a place, it&apos;s a feeling. And sometimes that feeling comes from the friends you make in hostels.&quot;
                    </blockquote>
                    <div className="text-sm text-gray-500 font-medium">- Anonymous Traveler</div>
                  </div>

                  {/* Quote 2 */}
                  <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-white/20">
                    <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">👥</div>
                    <blockquote className="text-xl text-gray-800 italic mb-6 leading-relaxed font-medium">
                      &quot;The best hostel mates become lifelong friends. You start as strangers sharing a room, you end as family sharing memories.&quot;
                    </blockquote>
                    <div className="text-sm text-gray-500 font-medium">- Hostel Wisdom</div>
                  </div>

                  {/* Quote 3 */}
                  <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-white/20">
                    <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🌟</div>
                    <blockquote className="text-xl text-gray-800 italic mb-6 leading-relaxed font-medium">
                      &quot;In hostels, you don&apos;t just find a place to sleep, you find stories, adventures, and friendships that last forever.&quot;
                    </blockquote>
                    <div className="text-sm text-gray-500 font-medium">- Backpacker&apos;s Heart</div>
                  </div>

                  {/* Quote 4 */}
                  <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-white/20">
                    <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">💫</div>
                    <blockquote className="text-xl text-gray-800 italic mb-6 leading-relaxed font-medium">
                      &quot;Hostel life teaches you that the world is full of amazing people, and every stranger is just a friend you haven&apos;t met yet.&quot;
                    </blockquote>
                    <div className="text-sm text-gray-500 font-medium">- Global Nomad</div>
                  </div>
                </div>
              </div>

              {/* What's Coming Section */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl mb-16 border border-white/20">
                <h2 className="text-3xl font-bold text-center mb-12">
                                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      🎯 What&apos;s Coming to Your Dashboard
                    </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group flex items-start space-x-6 p-6 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">Smart Hostel Discovery</h3>
                      <p className="text-gray-600 leading-relaxed">AI-powered recommendations based on your preferences and budget</p>
                    </div>
                  </div>
                  <div className="group flex items-start space-x-6 p-6 rounded-2xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">Roommate Matching</h3>
                      <p className="text-gray-600 leading-relaxed">Find compatible roommates based on lifestyle and preferences</p>
                    </div>
                  </div>
                  <div className="group flex items-start space-x-6 p-6 rounded-2xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-violet-50 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">Virtual Tours</h3>
                      <p className="text-gray-600 leading-relaxed">Explore hostels with 360° virtual tours before booking</p>
                    </div>
                  </div>
                  <div className="group flex items-start space-x-6 p-6 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">4</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">Community Features</h3>
                      <p className="text-gray-600 leading-relaxed">Connect with fellow students and share experiences</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stay Connected Section */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-12 shadow-2xl border border-white/20 backdrop-blur-sm">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    📧 Stay Connected
                  </h2>
                  <p className="text-gray-700 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
                    Be the first to know when your dashboard goes live! We&apos;ll notify you about new features and updates.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-6 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg shadow-lg"
                    />
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105">
                      Notify Me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
} 