'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService, UserRole } from '@/lib/appwrite';
import { Home as HomeIcon, CheckCircle, AlertCircle } from 'lucide-react';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    handleAuthCallback();
  }, []);

  const handleAuthCallback = async () => {
    try {
      // Test database connection first
      const dbConnected = await authService.testDatabaseConnection();
      if (!dbConnected) {
        setStatus('error');
        setMessage('Database connection failed. Please check your configuration.');
        return;
      }

      // Get user data from Appwrite (this will work after OAuth)
      const user = await authService.getCurrentUser();
      if (!user) {
        setStatus('error');
        setMessage('Failed to get user data. Please try again.');
        return;
      }

      // Check if user document already exists
      let userData = null;
      try {
        userData = await authService.getUserData(user.$id);
      } catch (error) {
        console.log('User document not found, will create it now');
      }
      
      if (!userData) {
        try {
          // Get the selected role from sessionStorage
          const selectedRole = sessionStorage.getItem('selectedRole') as UserRole || UserRole.ROOM_SEEKER;
          console.log('Auth Callback - Selected role from sessionStorage:', selectedRole);
          
          // Create user document with the selected role
          await authService.createUserDocument(user.$id, user.email, selectedRole);
          console.log('Auth Callback - User document created successfully');
          
          userData = await authService.getUserData(user.$id);
          console.log('Auth Callback - User data after creation:', userData);
          
          // Clear the stored role
          sessionStorage.removeItem('selectedRole');
        } catch (createError) {
          console.error('Failed to create user document:', createError);
          console.error('Error details:', {
            userId: user.$id,
            email: user.email,
            selectedRole: sessionStorage.getItem('selectedRole'),
            databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            collectionId: process.env.NEXT_PUBLIC_COLLECTION_USERS
          });
          setStatus('error');
          setMessage(`Failed to create user profile: ${(createError as Error).message || 'Unknown error'}`);
          return;
        }
      }

      setStatus('success');
      setMessage('Authentication successful! Redirecting...');

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);

    } catch (error) {
      console.error('Auth callback error:', error);
      setStatus('error');
      setMessage('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 max-w-md w-full mx-4">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <HomeIcon className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Status Icon */}
          <div className="mb-6">
            {status === 'loading' && (
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            )}
            {status === 'success' && (
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            )}
            {status === 'error' && (
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
            )}
          </div>

          {/* Status Text */}
          <h2 className="text-2xl font-bold text-white mb-4">
            {status === 'loading' && 'Authenticating...'}
            {status === 'success' && 'Welcome to HostelHub!'}
            {status === 'error' && 'Authentication Failed'}
          </h2>

          <p className="text-gray-300 leading-relaxed">
            {status === 'loading' && 'Please wait while we complete your authentication.'}
            {status === 'success' && message}
            {status === 'error' && message}
          </p>

          {/* Action Button for Error */}
          {status === 'error' && (
            <button
              onClick={() => router.push('/auth')}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:scale-105"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 