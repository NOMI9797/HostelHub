import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface AdminStatsProps {
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
}

export default function AdminStats({ pendingCount, approvedCount, rejectedCount }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {/* Pending Review Card */}
      <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative flex items-center">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <Clock className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="ml-4 sm:ml-6">
            <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Pending Review</p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">{pendingCount}</p>
            <p className="text-xs text-gray-500 mt-1">Awaiting approval</p>
          </div>
        </div>
      </div>

      {/* Total Approved Card */}
      <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative flex items-center">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="ml-4 sm:ml-6">
            <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Approved</p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">{approvedCount}</p>
            <p className="text-xs text-gray-500 mt-1">Live on platform</p>
          </div>
        </div>
      </div>

      {/* Total Rejected Card */}
      <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative flex items-center">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <XCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="ml-4 sm:ml-6">
            <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Rejected</p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">{rejectedCount}</p>
            <p className="text-xs text-gray-500 mt-1">Not meeting standards</p>
          </div>
        </div>
      </div>
    </div>
  );
} 