'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { useHostels } from '@/hooks/useHostels';
import HostelCard from '@/components/hostel/HostelCard';

export default function HostelSearch() {
  const { hostels, loading, error, searchHostels, clearSearch } = useHostels();
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

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchLocation('');
    setIsFiltered(false);
    clearSearch();
  };

  const handleShowAll = () => {
    handleClearSearch();
  };

  return (
    <div className="w-full">
      {/* Search Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search hostels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Location Input */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchLocation && (
              <button
                onClick={() => setSearchLocation('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
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

      {/* Results Section */}
      <div className="text-center mb-8">
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

      {/* Loading State */}
      {loading && (
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
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-12 h-12 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Hostels</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Results Grid */}
      {!loading && !error && hostels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostels.map((hostel) => (
            <HostelCard key={hostel.hostelId} hostel={hostel} />
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && !error && hostels.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {isFiltered ? 'No Hostels Found' : 'No Hostels Available'}
          </h3>
          <p className="text-gray-600 mb-4">
            {isFiltered 
              ? 'No hostels match your search criteria. Try adjusting your search terms or click "Show All" to see all available hostels.'
              : 'Check back soon for amazing hostel listings!'
            }
          </p>
          {isFiltered && (
            <button
              onClick={handleShowAll}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              Show All Hostels
            </button>
          )}
        </div>
      )}
    </div>
  );
} 