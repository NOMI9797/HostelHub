'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Shield, CheckCircle, HeadphonesIcon, MapPin as MapPinIcon, RefreshCw, Sparkles, TrendingUp, Users2, Star } from 'lucide-react';
import Header from '@/components/layout/Header';
import HostelCard from '@/components/hostel/HostelCard';
import { useHostels } from '@/hooks/useHostels';

export default function HomePage() {
  const { hostels, loading, searchHostels, clearSearch, refetch } = useHostels();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Animation trigger on page load
  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  const handleRefresh = async () => {
    await refetch();
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[90vh] flex items-center">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl transform rotate-45 animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-32 w-12 h-12 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-lg transform rotate-12 animate-float-slow"></div>
        
        {/* Animated blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full mix-blend-multiply filter blur-xl animate-blob-enhanced"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full mix-blend-multiply filter blur-xl animate-blob-enhanced animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-pink-200/40 to-indigo-200/40 rounded-full mix-blend-multiply filter blur-xl animate-blob-enhanced animation-delay-4000"></div>
        
        {/* Sparkle effects */}
        <div className="absolute top-20 left-1/4 animate-sparkle">
          <Sparkles className="w-6 h-6 text-blue-400/60" />
        </div>
        <div className="absolute bottom-20 right-1/4 animate-sparkle animation-delay-1000">
          <Sparkles className="w-4 h-4 text-purple-400/60" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-sparkle animation-delay-3000">
          <Sparkles className="w-5 h-5 text-pink-400/60" />
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            {/* Animated badge */}
            <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200/50 mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">Pakistan&apos;s #1 Hostel Platform</span>
              <Star className="w-4 h-4 text-yellow-500 ml-2" />
            </div>
            
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              Find Your Perfect
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-gradient-x"> Hostel</span>
            </h1>
            
            <p className={`text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              Discover amazing hostels across Pakistan. Book affordable, comfortable accommodations with ease.
            </p>
            
            {/* Stats badges */}
            <div className={`flex flex-wrap justify-center items-center gap-6 mb-12 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
                <Users2 className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-gray-700">10K+ Students</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-semibold text-gray-700">Verified Hostels</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
                <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm font-semibold text-gray-700">Instant Booking</span>
              </div>
            </div>
            
            {/* Transparent Search Section */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-transparent rounded-2xl p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Search Input */}
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      placeholder="Search hostels..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-lg"
                    />
                  </div>
                  
                  {/* Location Input */}
                  <div className="relative group">
                    <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      placeholder="Location..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-lg"
                    />
                  </div>
                  
                  {/* Show All Button */}
                  <button 
                    onClick={handleShowAll}
                    className="bg-white text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-all duration-200 font-semibold shadow-md hover:shadow-lg border-2 border-blue-200 hover:border-blue-300"
                  >
                    Show All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Space Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advertisement Space</h3>
              <p className="text-gray-600 mb-4">Perfect location for your ads and promotions</p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-dashed border-blue-200">
                <p className="text-blue-600 font-medium">Your Ad Content Here</p>
                <p className="text-sm text-blue-500 mt-1">728x90 or 300x250 recommended</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hostels Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
                      <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  {isFiltered ? 'Search Results' : 'Featured Hostels'}
                </div>
                {!isFiltered && (
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors disabled:opacity-50"
                    title="Refresh to check for new hostels"
                  >
                    <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                )}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {isFiltered ? 'Search Results' : 'Featured Hostels'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {isFiltered 
                  ? `Found ${hostels.length} hostel${hostels.length !== 1 ? 's' : ''} matching your search criteria`
                  : 'Discover our top-rated hostels with excellent amenities and prime locations across Pakistan'
                }
              </p>
            </div>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin mx-auto mb-6"></div>
                <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto absolute top-0 left-1/2 transform -translate-x-1/2"></div>
              </div>
              <p className="text-lg text-gray-600 font-medium">
                {isFiltered ? 'Searching for perfect matches...' : 'Loading amazing hostels...'}
              </p>
            </div>
          ) : hostels.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hostels.slice(0, 6).map((hostel) => (
                  <HostelCard key={hostel.hostelId} hostel={hostel} />
                ))}
              </div>
              
              {/* Explore All Hostels Button */}
              {!isFiltered && hostels.length > 6 && (
                <div className="text-center mt-12">
                  <Link
                    href="/explore-hostels"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <span>Explore All Hostels</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <p className="text-gray-600 mt-4">
                    Discover {hostels.length - 6} more amazing hostels
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {isFiltered ? 'No Hostels Found' : 'No Hostels Available'}
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                {isFiltered 
                  ? 'No hostels match your search criteria. Try adjusting your search terms or explore all available hostels.'
                  : 'We&apos;re working on bringing you amazing hostel listings. Check back soon!'
                }
              </p>
              {isFiltered && (
                <button
                  onClick={handleShowAll}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Show All Hostels
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Trust & Quality Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Trusted by Students & Travelers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands who choose HostelHub for safe, affordable, and verified accommodations across Pakistan
            </p>
          </div>
          
          {/* Trust Indicators in a Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Verified & Safe</h3>
              <p className="text-gray-600 leading-relaxed">
                Every hostel undergoes strict verification. We ensure safety, cleanliness, and quality standards for your peace of mind.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Booking</h3>
              <p className="text-gray-600 leading-relaxed">
                Book your preferred hostel instantly with secure payment options. Get immediate confirmation and detailed booking information.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HeadphonesIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our dedicated support team is available round-the-clock to assist with bookings, inquiries, and any concerns you may have.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Made with Love Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-12 relative overflow-hidden border border-white/30">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              <div className="absolute top-4 left-4 w-16 h-16 bg-pink-300 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 right-4 w-20 h-20 bg-red-300 rounded-full blur-xl"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-rose-300 rounded-full blur-lg"></div>
            </div>
            
            <div className="relative z-10">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-400/80 to-red-500/80 rounded-full shadow-lg mb-4 backdrop-blur-sm">
                  <span className="text-white text-2xl">❤️</span>
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Made with{' '}
                <span className="bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                  Love
                </span>
              </h2>
              
              <p className="text-xl text-gray-700 mb-6">
                by{' '}
                <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  SYNTAX
                </span>
              </p>
              
              <div className="max-w-md mx-auto">
                <p className="text-gray-600 leading-relaxed">
                  Crafted with passion and dedication by the SYNTAX team. 
                  We believe in creating solutions that make a difference in students&apos; lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
