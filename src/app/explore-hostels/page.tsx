'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import HostelCard from '@/components/hostel/HostelCard';
import { useHostels } from '@/hooks/useHostels';

export default function ExploreHostelsPage() {
  const { hostels, loading, error } = useHostels();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const hostelsPerPage = 6;

  // Filter hostels based on search criteria
  const filteredHostels = hostels.filter(hostel => {
    const matchesSearch = hostel.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hostel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hostel.area.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = !searchLocation || 
                           hostel.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
                           hostel.area.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesGender = !selectedGender || hostel.genderSpecific === selectedGender;
    
    return matchesSearch && matchesLocation && matchesGender;
  });

  // Handle search
  const handleSearch = () => {
    setIsFiltered(true);
  };

  // Handle show all
  const handleShowAll = () => {
    setSearchTerm('');
    setSearchLocation('');
    setSelectedGender('');
    setIsFiltered(false);
    setCurrentPage(1);
  };

  // Auto-search on filter changes
  useEffect(() => {
    if (searchTerm || searchLocation || selectedGender) {
      setIsFiltered(true);
      setCurrentPage(1);
    } else {
      setIsFiltered(false);
      setCurrentPage(1);
    }
  }, [searchTerm, searchLocation, selectedGender]);

  // Pagination logic
  const totalPages = Math.ceil(filteredHostels.length / hostelsPerPage);
  const startIndex = (currentPage - 1) * hostelsPerPage;
  const endIndex = startIndex + hostelsPerPage;
  const currentHostels = filteredHostels.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-3 mb-2">
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Explore All Hostels</h1>
        </div>
      </div>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-transparent rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="md:col-span-2">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search by hostel name, city, or area..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-lg"
                  />
                </div>
              </div>

              {/* Location Input */}
              <div className="relative group">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-lg"
                />
              </div>

              {/* Gender Filter */}
              <div className="relative group">
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-gray-900 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-lg"
                >
                  <option value="">All Genders</option>
                  <option value="boys">Boys Only</option>
                  <option value="girls">Girls Only</option>
                  <option value="co-ed">Co-ed</option>
                </select>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handleSearch}
                className="flex-1 bg-white text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-all duration-200 font-semibold shadow-md hover:shadow-lg border-2 border-blue-200 hover:border-blue-300"
              >
                Search Hostels
              </button>
              {(isFiltered || searchTerm || searchLocation || selectedGender) && (
                <button
                  onClick={handleShowAll}
                  className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                >
                  Show All
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
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
          ) : error ? (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="w-16 h-16 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Hostels</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We encountered an error while loading the hostels. Please try refreshing the page.
              </p>
            </div>
          ) : filteredHostels.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentHostels.map((hostel) => (
                  <HostelCard key={hostel.hostelId} hostel={hostel} />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <div className="flex items-center justify-center space-x-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    
                    {/* Page Numbers */}
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                  
                  {/* Page Info */}
                  <div className="text-center mt-4 text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredHostels.length)} of {filteredHostels.length} hostels
                  </div>
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
                   className="bg-blue-600 text-white py-3 px-8 rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                 >
                   Show All Hostels
                 </button>
               )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 