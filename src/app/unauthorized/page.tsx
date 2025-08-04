'use client';

import { Home as HomeIcon, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
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
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Error Icon */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Error Text */}
          <h2 className="text-2xl font-bold text-white mb-4">
            Access Denied
          </h2>

          <p className="text-gray-300 leading-relaxed mb-8">
            You don&apos;t have permission to access this page. This feature is only available to users with the appropriate role.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link 
              href="/"
              className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:scale-105"
            >
              <div className="flex items-center justify-center space-x-2">
                <HomeIcon className="w-4 h-4" />
                <span>Go to Home</span>
              </div>
            </Link>
            
            <Link 
              href="/dashboard"
              className="block w-full py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-medium border border-white/20"
            >
              <div className="flex items-center justify-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 