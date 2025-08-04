'use client';

import { useState } from 'react';
import { 
  Home as HomeIcon, 
  Building2, 
  Plus, 
  Settings, 
  Users, 
  BarChart3, 
  Menu,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';

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

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, color: 'blue' },
    { id: 'post-hostel', label: 'Post a Hostel', icon: Plus, color: 'green' },
    { id: 'my-listings', label: 'My Listings', icon: Building2, color: 'purple' },
    { id: 'bookings', label: 'Bookings', icon: Users, color: 'pink' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'orange' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'gray' },
  ];

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      pink: 'bg-pink-500',
      orange: 'bg-orange-500',
      gray: 'bg-gray-500',
    };
    return colors[color as keyof typeof colors] || 'bg-blue-500';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Welcome, {user?.email}</h2>
              <p className="text-gray-300 mb-6">Manage your hostel business and connect with travelers worldwide.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white/5 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-white mb-2">0</div>
                  <div className="text-gray-300">Active Listings</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-white mb-2">0</div>
                  <div className="text-gray-300">Total Bookings</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-white mb-2">$0</div>
                  <div className="text-gray-300">Revenue</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'post-hostel':
        return (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Post a New Hostel</h2>
            <p className="text-gray-300 mb-8">Create a new hostel listing to attract travelers and grow your business.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Hostel Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter hostel name"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Location</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Monthly Price</label>
                <input 
                  type="number" 
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter monthly price"
                />
              </div>
              
              <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium">
                Create Hostel Listing
              </button>
            </div>
          </div>
        );
      
      case 'my-listings':
        return (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">My Hostel Listings</h2>
            <p className="text-gray-300 mb-8">Manage your existing hostel listings and view their performance.</p>
            
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Listings Yet</h3>
              <p className="text-gray-300 mb-6">You haven&apos;t posted any hostels yet. Start by creating your first listing!</p>
              <button 
                onClick={() => setActiveTab('post-hostel')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium"
              >
                Post Your First Hostel
              </button>
            </div>
          </div>
        );
      
      case 'bookings':
        return (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Bookings</h2>
            <p className="text-gray-300 mb-8">View and manage bookings for your hostels.</p>
            
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Bookings Yet</h3>
              <p className="text-gray-300">Bookings will appear here once travelers start booking your hostels.</p>
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Analytics</h2>
            <p className="text-gray-300 mb-8">Track your hostel performance and business metrics.</p>
            
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Analytics Coming Soon</h3>
              <p className="text-gray-300">Detailed analytics and insights will be available once you have active listings.</p>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
            <p className="text-gray-300 mb-8">Manage your account settings and preferences.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  value={user?.email || ''}
                  disabled
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Role</label>
                <input 
                  type="text" 
                  value="Hostel Lister"
                  disabled
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-gray-400"
                />
              </div>
              
              <button 
                onClick={onSignOut}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/20">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <HomeIcon className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  HostelHub
                </span>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-gray-300">Next-Gen Hostel Discovery</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-white/20 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className={`w-8 h-8 ${getIconColor(item.color)} rounded-lg flex items-center justify-center`}>
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Info */}
          <div className="p-6 border-t border-white/20">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <p className="text-white font-medium text-sm mb-1">{user?.email}</p>
              <p className="text-gray-300 text-xs">Hostel Lister</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Unified Header */}
        <Header />
        
        {/* Page Title */}
        <div className="p-4 border-b border-white/20">
          <h1 className="text-xl font-semibold text-white">
            {menuItems.find(item => item.id === activeTab)?.label}
          </h1>
        </div>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
} 