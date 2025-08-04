'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/appwrite';
import { Home as HomeIcon, Globe, Menu, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { user, loading, isAuthenticated, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <>
      <header className="relative bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <HomeIcon className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  HostelHub
                </span>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-gray-300">Next-Gen Hostel Discovery</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                <HomeIcon className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link href="/" className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Hostel Listings</span>
              </Link>
              {!loading && isAuthenticated && (
                <Link href="/dashboard" className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2">
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
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-gray-300 text-sm">Loading...</span>
                </div>
              ) : isAuthenticated ? (
                <button 
                  onClick={handleSignOut}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 transform hover:scale-105"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link href="/auth" className="px-6 py-2.5 text-gray-300 hover:text-white font-medium transition-all duration-300 hover:scale-105">
                    Login
                  </Link>
                  <Link href="/auth" className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:scale-105">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <Menu className="w-6 h-6 text-white" />
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
            className="absolute top-0 right-0 w-64 h-full bg-white/10 backdrop-blur-xl border-l border-white/20 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col h-full">
              {/* Mobile Navigation */}
              <nav className="flex-1 space-y-4">
                <Link href="/" className="flex items-center space-x-3 text-gray-300 hover:text-white font-medium transition-all duration-300">
                  <HomeIcon className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                <Link href="/" className="flex items-center space-x-3 text-gray-300 hover:text-white font-medium transition-all duration-300">
                  <Globe className="w-4 h-4" />
                  <span>Hostel Listings</span>
                </Link>
                {!loading && isAuthenticated && (
                  <Link href="/dashboard" className="flex items-center space-x-3 text-gray-300 hover:text-white font-medium transition-all duration-300">
                    <HomeIcon className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="space-y-3 pt-6 border-t border-white/20">
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-gray-300 text-sm">Loading...</span>
                  </div>
                ) : isAuthenticated ? (
                  <button 
                    onClick={handleSignOut}
                    className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 font-medium"
                  >
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link href="/auth" className="block w-full px-4 py-3 text-gray-300 hover:text-white font-medium transition-all duration-300 text-center">
                      Login
                    </Link>
                    <Link href="/auth" className="block w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium text-center">
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