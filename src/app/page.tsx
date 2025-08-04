'use client';

import { Search, MapPin, Star, CheckCircle, Users, Shield, Clock } from 'lucide-react';
import Header from '@/components/layout/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Unified Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm mb-6">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-700 font-medium">Trusted by 10,000+ travelers</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Find Your Perfect
            <span className="block text-blue-600">
              Hostel Experience
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover handpicked hostels with verified reviews and instant booking. 
            <span className="text-blue-600 font-semibold"> Save up to 40%</span> on accommodation.
          </p>

          {/* Professional Search Section */}
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
            <div className="space-y-4">
              {/* Search Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Search by Name */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search hostels..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>

                {/* Search by Location */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter destination..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>

                {/* Search Button */}
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md text-sm">
                  Search Hostels
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex justify-center">
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-all duration-200 flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Use My Location</span>
                </button>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-500 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Secure Booking</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Verified Hostels</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hostels Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Featured Hostels
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              Handpicked accommodations with the highest ratings and best value for money.
            </p>
          </div>

          {/* Empty State - Professional */}
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Coming Soon</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">
              We&apos;re currently curating the best hostels for you. Be the first to discover amazing accommodations when we launch.
            </p>
            <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-700 font-medium">Launching soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Why Choose HostelHub?
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              Experience the difference with our professional hostel booking platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Benefit 1 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Smart Search</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Find the perfect hostel with our intelligent search that matches your preferences and budget.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Secure Booking</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Book with confidence using our secure payment system and verified hostel listings.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Get help anytime with our dedicated customer support team available around the clock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Find Your Perfect Hostel?
            </h2>
            <p className="text-base text-gray-600 mb-6 max-w-xl mx-auto">
              Join thousands of travelers who trust HostelHub for their accommodation needs. 
              Start your journey today.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md">
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
