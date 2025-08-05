'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService, UserRole } from '@/lib/appwrite';
import { Home as HomeIcon, CheckCircle, AlertCircle } from 'lucide-react';

export default function AuthCallback() {
  const router = useRouter();
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

    } catch {
      console.error('Auth callback error');
      setStatus('error');
      setMessage('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-md w-full">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <HomeIcon className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Status Icon */}
          <div className="mb-6">
            {status === 'loading' && (
              <div className="w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            )}
            {status === 'success' && (
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            )}
            {status === 'error' && (
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            )}
          </div>

          {/* Status Text */}
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {status === 'loading' && 'Authenticating...'}
            {status === 'success' && 'Welcome to HostelHub!'}
            {status === 'error' && 'Authentication Failed'}
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {status === 'loading' && 'Please wait while we complete your authentication.'}
            {status === 'success' && message}
            {status === 'error' && message}
          </p>

          {/* Action Button for Error */}
          {status === 'error' && (
            <button
              onClick={() => router.push('/auth')}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 