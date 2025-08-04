'use client';

import { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, 
  Building2, 
  Plus, 
  Settings, 
  Users, 
  BarChart3, 
  Menu,
  Sparkles,
  CheckCircle,
  Star,
  MapPin,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { HostelService, HostelResponse } from '@/lib/hostel-service';

interface HostelListerPanelProps {
  user: {
    email?: string;
    role?: string;
    userId?: string;
  } | null;
  onSignOut: () => void;
}

export default function HostelListerPanel({ user, onSignOut }: HostelListerPanelProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [postedHostels, setPostedHostels] = useState<HostelResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, color: 'blue' },
    { id: 'post-hostel', label: 'Post a Hostel', icon: Plus, color: 'green' },
    { id: 'posted-hostels', label: 'Posted Hostels', icon: Building2, color: 'purple' },
    { id: 'bookings', label: 'Bookings', icon: Users, color: 'pink' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'orange' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'gray' },
  ];

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      pink: 'bg-pink-100 text-pink-600',
      orange: 'bg-orange-100 text-orange-600',
      gray: 'bg-gray-100 text-gray-600',
    };
    return colors[color as keyof typeof colors] || 'bg-blue-100 text-blue-600';
  };

  const fetchPostedHostels = async () => {
    if (!user?.userId) return;
    
    setLoading(true);
    try {
      const hostels = await HostelService.getHostelsByOwner(user.userId);
      setPostedHostels(hostels);
    } catch (error) {
      console.error('Error fetching posted hostels:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'posted-hostels') {
      fetchPostedHostels();
    }
  }, [activeTab, user?.userId]);

  const handleDeleteHostel = async (hostelId: string) => {
    if (!confirm('Are you sure you want to delete this hostel? This action cannot be undone.')) {
      return;
    }

    try {
      await HostelService.deleteHostel(hostelId);
      // Refresh the list after deletion
      fetchPostedHostels();
    } catch (error) {
      console.error('Error deleting hostel:', error);
      alert('Failed to delete hostel. Please try again.');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome, {user?.email}</h2>
              <p className="text-gray-600 mb-6">Manage your hostel business and connect with travelers worldwide.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
                  <div className="text-gray-600 text-sm">Active Listings</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
                  <div className="text-gray-600 text-sm">Total Bookings</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900 mb-1">$0</div>
                  <div className="text-gray-600 text-sm">Revenue</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200">
                  <Plus className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 font-medium">Add New Hostel</span>
                </button>
                <button className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'post-hostel':
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Post a New Hostel</h2>
            <p className="text-gray-600 mb-8">Create a new hostel listing to attract travelers and grow your business.</p>
            
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Plus className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to Post Your Hostel?</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Fill out the comprehensive form to create your hostel listing with all the details travelers need.
              </p>
              <button 
                onClick={() => window.location.href = '/post-hostel'}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold"
              >
                Start Posting
              </button>
            </div>
          </div>
        );
      
      case 'posted-hostels':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Posted Hostels</h2>
                  <p className="text-gray-600">Manage your hostel listings and view their performance.</p>
                </div>
                <button 
                  onClick={() => window.location.href = '/post-hostel'}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New</span>
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Building2 className="w-8 h-8 text-blue-600 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Your Hostels...</h3>
                  <p className="text-gray-600">Fetching your posted hostels.</p>
                </div>
              ) : postedHostels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {postedHostels.map((hostel) => (
                    <div key={hostel.hostelId} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200">
                      <div className="relative">
                        <img
                          src={HostelService.getFileUrl(hostel.mainPhoto)}
                          alt={hostel.hostelName}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 right-3 flex space-x-2">
                          <button
                            onClick={() => router.push(`/hostels/${hostel.hostelId}`)}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-all duration-200"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-gray-700" />
                          </button>
                          <button
                            onClick={() => router.push(`/hostels/${hostel.hostelId}?edit=true`)}
                            className="p-2 bg-blue-500/90 backdrop-blur-sm rounded-lg hover:bg-blue-500 transition-all duration-200"
                            title="Edit Hostel"
                          >
                            <Edit className="w-4 h-4 text-white" />
                          </button>
                          <button
                            onClick={() => handleDeleteHostel(hostel.hostelId)}
                            className="p-2 bg-red-500/90 backdrop-blur-sm rounded-lg hover:bg-red-500 transition-all duration-200"
                            title="Delete Hostel"
                          >
                            <Trash2 className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{hostel.hostelName}</h3>
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{hostel.city}, {hostel.area}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Status:</span> {hostel.status}
                          </div>
                          <div className="text-sm text-gray-500">
                            Posted {new Date(hostel.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Building2 className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">No Hostels Posted Yet</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    Start by creating your first hostel listing to attract travelers and grow your business.
                  </p>
                  <button 
                    onClick={() => window.location.href = '/post-hostel'}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold"
                  >
                    Create First Listing
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'bookings':
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bookings</h2>
            <p className="text-gray-600 mb-8">View and manage bookings for your hostels.</p>
            
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Bookings Yet</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Bookings will appear here once travelers start booking your hostels.
              </p>
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h2>
            <p className="text-gray-600 mb-8">Track your hostel performance and business metrics.</p>
            
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <BarChart3 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Coming Soon</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Detailed analytics and insights will be available once you have active listings.
              </p>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
            <p className="text-gray-600 mb-8">Manage your account settings and preferences.</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive updates about bookings and inquiries</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm">
                  Enable
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Profile Information</h3>
                  <p className="text-sm text-gray-600">Update your business details</p>
                </div>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 text-sm">
                  Edit
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Unified Header */}
      <Header />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-16 left-0 bottom-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className={`w-8 h-8 ${getIconColor(item.color)} rounded-lg flex items-center justify-center`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Info */}
          <div className="p-6 border-t border-gray-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <p className="text-gray-900 font-medium text-sm mb-1">{user?.email}</p>
              <p className="text-gray-600 text-xs">Hostel Lister</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 pt-16">
        {/* Page Title */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              {menuItems.find(item => item.id === activeTab)?.label}
            </h1>
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
} 