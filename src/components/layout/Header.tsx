'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/appwrite';
import { Home as HomeIcon, Menu, Users, MessageSquare, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { loading, isAuthenticated, signOut, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <>
            <header className="bg-white/70 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <HomeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">HostelHub</h1>
                <p className="text-xs text-gray-500">Trusted Hostels</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105">
                <HomeIcon className="w-4 h-4" />
                <span>Home</span>
              </Link>
              {!loading && isAuthenticated && (
                <>
                  {user?.role !== UserRole.SUPER_ADMIN && (
                    <Link href="/dashboard" className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105">
                      <HomeIcon className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  )}
                  {user?.role === UserRole.SUPER_ADMIN && (
                    <Link href="/admin" className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-purple-600 font-medium transition-all duration-300 hover:scale-105">
                      <Shield className="w-4 h-4" />
                      <span>Admin</span>
                    </Link>
                  )}
                </>
              )}
              
              <Link href="/about" className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105">
                <Users className="w-4 h-4" />
                <span>About Us</span>
              </Link>
              
              <Link href="/contact" className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105">
                <MessageSquare className="w-4 h-4" />
                <span>Contact</span>
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {loading ? (
                <div className="flex items-center space-x-2 px-4 py-2 text-gray-500">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                  <span className="text-sm">Loading...</span>
                </div>
              ) : isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user?.role || 'User'}</span>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="px-4 py-2 text-gray-600 hover:text-red-600 font-medium transition-all duration-300 hover:scale-105"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/auth" className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105">
                    Login
                  </Link>
                  <Link href="/auth" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg font-medium transition-all duration-300 hover:scale-105">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="absolute top-0 right-0 w-72 h-full bg-white/95 backdrop-blur-md border-l border-gray-100 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-xl hover:bg-gray-100 transition-all duration-300"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col h-full">
              {/* Mobile Navigation */}
              <nav className="flex-1 space-y-6">
                <Link href="/" className="flex items-center space-x-4 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 p-3 rounded-xl hover:bg-blue-50">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <HomeIcon className="w-5 h-5" />
                  </div>
                  <span>Home</span>
                </Link>

                {!loading && isAuthenticated && (
                  <>
                    {user?.role !== UserRole.SUPER_ADMIN && (
                      <Link href="/dashboard" className="flex items-center space-x-4 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 p-3 rounded-xl hover:bg-purple-50">
                        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                          <HomeIcon className="w-5 h-5" />
                        </div>
                        <span>Dashboard</span>
                      </Link>
                    )}
                    {user?.role === UserRole.SUPER_ADMIN && (
                      <Link href="/admin" className="flex items-center space-x-4 text-gray-700 hover:text-purple-600 font-semibold transition-all duration-300 p-3 rounded-xl hover:bg-purple-50">
                        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                          <Shield className="w-5 h-5" />
                        </div>
                        <span>Admin</span>
                      </Link>
                    )}
                  </>
                )}

                {/* Mobile Pages */}
                <div className="space-y-2">
                  <Link href="/about" className="flex items-center space-x-4 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 p-3 rounded-xl hover:bg-green-50">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <span>About Us</span>
                  </Link>
                  
                  <Link href="/contact" className="flex items-center space-x-4 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 p-3 rounded-xl hover:bg-orange-50">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <span>Contact</span>
                  </Link>
                </div>
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="space-y-4 pt-8 border-t border-gray-100">
                {loading ? (
                  <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-xl">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                    <span className="text-gray-600 text-sm font-medium">Loading...</span>
                  </div>
                ) : isAuthenticated ? (
                  <>
                    {/* Mobile User Info */}
                    <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-xl">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">
                          {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm font-medium">{user?.role || 'User'}</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleSignOut}
                      className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth" className="block w-full px-6 py-4 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 text-center rounded-xl hover:bg-gray-50">
                      Login
                    </Link>
                    <Link href="/auth" className="block w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg text-center">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 