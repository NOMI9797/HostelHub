'use client';

import { useState, useEffect } from 'react';
import { Search, Shield, CheckCircle, HeadphonesIcon, MapPin as MapPinIcon } from 'lucide-react';
import Header from '@/components/layout/Header';
import HostelCard from '@/components/hostel/HostelCard';
import { useHostels } from '@/hooks/useHostels';

export default function HomePage() {
  const { hostels, loading, searchHostels, clearSearch } = useHostels();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  // Auto-search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery || searchLocation) {
        searchHostels(searchQuery, searchLocation);
        setIsFiltered(true);
      } else if (isFiltered) {
        clearSearch();
        setIsFiltered(false);
      }
    }, 500); // 500ms delay to avoid too many API calls

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchLocation, searchHostels, clearSearch, isFiltered]);

  const handleShowAll = () => {
    setSearchQuery('');
    setSearchLocation('');
    setIsFiltered(false);
    clearSearch();
  };

  // Manual refresh function for cache invalidation (available for future use)
  // const handleRefresh = async () => {
  //   await refetch();
  // };



  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="text-blue-600"> Hostel</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover amazing hostels across Pakistan. Book affordable, comfortable accommodations 
              for students and travelers with ease.
            </p>
            
            {/* Search Section */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search hostels..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  
                  {/* Location Input */}
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Location..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  
                  {/* Show All Button */}
                  <button 
                    onClick={handleShowAll}
                    className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                  >
                    Show All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hostels Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isFiltered ? 'Search Results' : 'Featured Hostels'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isFiltered 
                ? `Found ${hostels.length} hostel${hostels.length !== 1 ? 's' : ''} matching your search.`
                : 'Discover our top-rated hostels with excellent amenities and locations'
              }
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isFiltered ? 'Searching...' : 'Loading Hostels...'}
              </h3>
              <p className="text-gray-600">
                {isFiltered ? 'Finding hostels matching your criteria.' : 'Finding the best accommodations for you.'}
              </p>
            </div>
          ) : hostels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostels.map((hostel) => (
                <HostelCard key={hostel.hostelId} hostel={hostel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isFiltered ? 'No Hostels Found' : 'No Hostels Available'}
              </h3>
              <p className="text-gray-600">
                {isFiltered 
                  ? 'No hostels match your search criteria. Try adjusting your search terms or click "Show All" to see all available hostels.'
                  : 'Check back soon for amazing hostel listings!'
                }
              </p>
              {isFiltered && (
                <button
                  onClick={handleShowAll}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                  Show All Hostels
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose HostelHub?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make finding and booking hostels simple, secure, and affordable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Hostels</h3>
              <p className="text-gray-600">
                All hostels are verified and meet our quality standards
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Simple and secure booking process with instant confirmation
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer support for all your needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Find Your Perfect Hostel?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students and travelers who trust HostelHub for their accommodation needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium">
              Browse Hostels
            </button>
            <button className="border border-blue-600 text-blue-600 py-3 px-8 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium">
              List Your Hostel
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
