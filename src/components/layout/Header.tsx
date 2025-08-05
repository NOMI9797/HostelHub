'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Home as HomeIcon, Globe, Menu, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { loading, isAuthenticated, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <>
      <header className="relative bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 ebg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                  <HomeIcon className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  HostelHub
                </span>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-gray-600 font-medium">Trusted Hostel Booking</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                <HomeIcon className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Hostel Listings</span>
              </Link>
              {!loading && isAuthenticated && (
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                  <HomeIcon className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
              )}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {loading ? (
                // Loading state
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                  <span className="text-gray-600 text-sm">Loading...</span>
                </div>
              ) : isAuthenticated ? (
                <button 
                  onClick={handleSignOut}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link href="/auth" className="px-6 py-2.5 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105">
                    Login
                  </Link>
                  <Link href="/auth" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-medium shadow-sm hover:shadow-md transform hover:scale-105">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              <Menu className="w-6 h-6 text-gray-700" />
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
            className="absolute top-0 right-0 w-64 h-full bg-white border-l border-gray-200 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col h-full">
              {/* Mobile Navigation */}
              <nav className="flex-1 space-y-4">
                <Link href="/" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300">
                  <HomeIcon className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                <Link href="/" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300">
                  <Globe className="w-4 h-4" />
                  <span>Hostel Listings</span>
                </Link>
                {!loading && isAuthenticated && (
                  <Link href="/dashboard" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300">
                    <HomeIcon className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                    <span className="text-gray-600 text-sm">Loading...</span>
                  </div>
                ) : isAuthenticated ? (
                  <button 
                    onClick={handleSignOut}
                    className="w-full px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 font-medium"
                  >
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link href="/auth" className="block w-full px-4 py-3 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 text-center">
                      Login
                    </Link>
                    <Link href="/auth" className="block w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-medium text-center">
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