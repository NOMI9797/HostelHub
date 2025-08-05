'use client';

import { useState, useEffect } from 'react';
import { BarChart3, RefreshCw, Trash2 } from 'lucide-react';
import CachedApiService from '@/lib/cached-api';

interface CacheStats {
  size: number;
  maxSize: number;
  keys: string[];
}

export default function CachePerformance() {
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const updateStats = () => {
    setStats(CachedApiService.getCacheStats());
  };

  const clearCache = () => {
    CachedApiService.clearAllCache();
    updateStats();
  };

  useEffect(() => {
    updateStats();
    const interval = setInterval(updateStats, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200"
        title="Cache Performance"
      >
        <BarChart3 className="w-5 h-5" />
      </button>

      {/* Cache Stats Panel */}
      {isVisible && (
        <div className="absolute bottom-16 right-0 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Cache Performance</h3>
            <div className="flex space-x-2">
              <button
                onClick={updateStats}
                className="p-1 text-gray-500 hover:text-gray-700"
                title="Refresh Stats"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={clearCache}
                className="p-1 text-red-500 hover:text-red-700"
                title="Clear Cache"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {stats && (
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Cache Size:</span>
                <span className="font-medium">{stats.size} / {stats.maxSize}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Usage:</span>
                <span className="font-medium">
                  {Math.round((stats.size / stats.maxSize) * 100)}%
                </span>
              </div>

              {stats.keys.length > 0 && (
                <div className="mt-3">
                  <div className="text-gray-600 mb-1">Cached Keys:</div>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {stats.keys.slice(0, 10).map((key: string, index: number) => (
                      <div key={index} className="text-gray-500 truncate">
                        {key}
                      </div>
                    ))}
                    {stats.keys.length > 10 && (
                      <div className="text-gray-400 text-xs">
                        ... and {stats.keys.length - 10} more
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-3 pt-2 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Cache TTL: 5min (hostels), 10min (details), 2min (search)
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 