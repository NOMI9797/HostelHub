import { Metadata } from 'next';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard - HostelHub',
  description: 'Manage hostel submissions, approve quality listings, and maintain content standards on HostelHub.',
  keywords: 'admin dashboard, hostel management, content moderation, hostel approval, HostelHub admin',
  robots: 'noindex, nofollow', // Admin pages should not be indexed
  openGraph: {
    title: 'Admin Dashboard - HostelHub',
    description: 'Manage hostel submissions and maintain content quality.',
    type: 'website',
  },
};

export default function AdminPage() {
  return <AdminDashboard />;
} 