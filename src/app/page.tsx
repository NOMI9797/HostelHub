'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Shield, CheckCircle, HeadphonesIcon, MapPin as MapPinIcon } from 'lucide-react';
import Header from '@/components/layout/Header';
import HostelCard from '@/components/hostel/HostelCard';
import { HostelService } from '@/lib/hostel-service';

export default function HomePage() {
  const [hostels, setHostels] = useState<Array<{
    hostelId: string;
    hostelName: string;
    city: string;
    area: string;
    mainPhoto: string;
    roomTypes: string;
    facilities: string;
    genderSpecific: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    try {
      setLoading(true);
      const hostelsData = await HostelService.getAllHostels();
      setHostels(hostelsData);
    } catch (error) {
      console.error('Error fetching hostels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const searchResults = await HostelService.searchHostels(searchQuery, searchLocation);
      setHostels(searchResults);
    } catch (error) {
      console.error('Error searching hostels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // For now, just show a message. In a real app, you'd reverse geocode this
          alert('Location detected! This feature will be implemented soon.');
        },
        () => {
          alert('Unable to get your location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect Hostel
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover amazing hostels with verified listings, secure booking, and 24/7 support. 
            Your next adventure starts here.
          </p>

          {/* Search Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search hostels..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter destination..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold"
                >
                  Search Hostels
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleUseMyLocation}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Use My Location</span>
                </button>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mt-8">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Secure Booking</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Verified Hostels</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <HeadphonesIcon className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hostels Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Hostels
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked accommodations with the highest ratings and best value for money.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Hostels...</h3>
              <p className="text-gray-600">Finding the best accommodations for you.</p>
            </div>
          ) : hostels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostels.map((hostel) => (
                <HostelCard key={hostel.hostelId} hostel={hostel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We&apos;re currently curating the best hostels for you. Be the first to discover amazing accommodations when we launch.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose HostelHub?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the best in hostel accommodation with our comprehensive platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Secure & Verified</h3>
              <p className="text-gray-600 text-sm">
                All hostels are verified and bookings are secure with our trusted platform.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Best Value</h3>
              <p className="text-gray-600 text-sm">
                Find the best prices and value for money with our curated selection.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">
                Get help anytime with our round-the-clock customer support team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Find Your Perfect Hostel?
            </h2>
            <p className="text-gray-600 mb-6">
              Join thousands of travelers who trust HostelHub for their accommodation needs.
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold">
              Start Exploring
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
