'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/appwrite';
import { Home as HomeIcon, Building2, Users, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signUpWithGoogle } = useAuth();

  const handleSignUp = async () => {
    if (!selectedRole) {
      alert('Please select a role first');
      return;
    }

    setIsLoading(true);
    try {
      await signUpWithGoogle(selectedRole);
    } catch (error) {
      console.error('Sign up failed:', error);
      alert('Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                  <HomeIcon className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">
                  HostelHub
                </span>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-gray-600 font-medium">Next-Gen Hostel Discovery</span>
                </div>
              </div>
            </Link>
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2 border border-blue-200 mb-6">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">Join HostelHub</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welcome to HostelHub
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Choose your role and start your journey with secure Google authentication
            </p>
          </div>

          {/* Role Selection */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Select Your Role
            </h2>
            
            <div className="space-y-4">
              {/* Hostel Lister Option */}
              <button
                onClick={() => setSelectedRole(UserRole.HOSTEL_LISTER)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedRole === UserRole.HOSTEL_LISTER
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedRole === UserRole.HOSTEL_LISTER
                      ? 'bg-blue-600'
                      : 'bg-gray-100'
                  }`}>
                    <Building2 className={`w-5 h-5 ${
                      selectedRole === UserRole.HOSTEL_LISTER ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold text-gray-900">Hostel Lister</h3>
                    <p className="text-gray-600 text-sm">
                      Post, manage, and edit hostel listings
                    </p>
                  </div>
                </div>
              </button>

              {/* Room Seeker Option */}
              <button
                onClick={() => setSelectedRole(UserRole.ROOM_SEEKER)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedRole === UserRole.ROOM_SEEKER
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedRole === UserRole.ROOM_SEEKER
                      ? 'bg-purple-600'
                      : 'bg-gray-100'
                  }`}>
                    <Users className={`w-5 h-5 ${
                      selectedRole === UserRole.ROOM_SEEKER ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold text-gray-900">Room Seeker</h3>
                    <p className="text-gray-600 text-sm">
                      Browse, search, and save hostel listings
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSignUp}
            disabled={!selectedRole || isLoading}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
              selectedRole && !isLoading
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing up...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Sign up with Google</span>
              </div>
            )}
          </button>

          {/* Terms */}
          <p className="text-center text-gray-500 text-sm mt-6">
            By signing up, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 