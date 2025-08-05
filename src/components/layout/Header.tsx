'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Home as HomeIcon, Menu, CheckCircle } from 'lucide-react';
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
            <header className="relative bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <HomeIcon className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
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
            <nav className="hidden md:flex items-center space-x-12">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <HomeIcon className="w-4 h-4" />
                </div>
                <span>Home</span>
              </Link>
              {!loading && isAuthenticated && (
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 group">
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                    <HomeIcon className="w-4 h-4" />
                  </div>
                  <span>Dashboard</span>
                </Link>
              )}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-6">
              {loading ? (
                // Loading state
                <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                  <span className="text-gray-600 text-sm font-medium">Loading...</span>
                </div>
              ) : isAuthenticated ? (
                <button 
                  onClick={handleSignOut}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link href="/auth" className="px-6 py-3 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105">
                    Login
                  </Link>
                  <Link href="/auth" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-xl hover:bg-gray-100 transition-all duration-300"
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
                  <Link href="/dashboard" className="flex items-center space-x-4 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 p-3 rounded-xl hover:bg-purple-50">
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                      <HomeIcon className="w-5 h-5" />
                    </div>
                    <span>Dashboard</span>
                  </Link>
                )}
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="space-y-4 pt-8 border-t border-gray-100">
                {loading ? (
                  <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-xl">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                    <span className="text-gray-600 text-sm font-medium">Loading...</span>
                  </div>
                ) : isAuthenticated ? (
                  <button 
                    onClick={handleSignOut}
                    className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg"
                  >
                    Sign Out
                  </button>
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