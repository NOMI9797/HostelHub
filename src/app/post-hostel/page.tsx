'use client';

import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/appwrite';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import HostelPostingForm from '@/components/hostel/HostelPostingForm';
import Header from '@/components/layout/Header';

export default function PostHostelPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute requiredRole={UserRole.HOSTEL_LISTER}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-16">
          <HostelPostingForm />
        </div>
      </div>
    </ProtectedRoute>
  );
} 