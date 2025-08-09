'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { ArrowLeft, Users, Target, Award, Heart, Globe, Building2, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div>
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center space-x-3 mb-3">
              <Link 
                href="/"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">About HostelHub</h1>
                <p className="text-gray-600 text-lg">Connecting students with quality hostel accommodations</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Mission Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                To revolutionize the hostel booking experience by providing a seamless platform that connects students 
                with quality, affordable accommodations while empowering hostel owners to showcase their properties effectively.
              </p>
            </div>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Our Story</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                HostelHub was born from the recognition that students often struggle to find reliable, 
                affordable hostel accommodations. We understand the challenges of moving to a new city 
                for education and the importance of finding a comfortable place to call home.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Our platform bridges the gap between students and hostel owners, creating a trusted 
                community where quality accommodations meet affordability.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To become the leading platform for student accommodation in Pakistan, known for 
                reliability, transparency, and exceptional user experience. We envision a future 
                where every student can easily find their perfect accommodation.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                We&apos;re committed to continuous innovation and expanding our services to meet the 
                evolving needs of students and hostel owners across the country.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-gray-600">The principles that guide everything we do</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Trust & Reliability</h3>
                <p className="text-gray-600 text-sm">
                  We verify all hostels and maintain high standards to ensure our users can trust our platform.
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Community First</h3>
                <p className="text-gray-600 text-sm">
                  We prioritize building a strong community of students and hostel owners who support each other.
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Assurance</h3>
                <p className="text-gray-600 text-sm">
                  We maintain strict quality standards and regularly review hostels to ensure the best experience.
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Student-Centric</h3>
                <p className="text-gray-600 text-sm">
                  Every feature and decision is made with students&apos; needs and comfort in mind.
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Affordability</h3>
                <p className="text-gray-600 text-sm">
                  We believe quality accommodation should be accessible to all students regardless of budget.
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600 text-sm">
                  We continuously innovate to provide the best possible platform and user experience.
                </p>
              </div>
            </div>
          </div>

          {/* Our Impact Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-12 mb-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Making Student Housing{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Accessible
                </span>
              </h2>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Our platform has transformed the way students find accommodation, making it easier, safer, and more reliable than ever before. We continue to innovate and expand our services to meet the evolving needs of Pakistan&apos;s student community.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="text-2xl font-bold text-blue-600 mb-2">100%</div>
                  <div className="text-gray-600">Verified Hostels</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="text-2xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-gray-600">Support Available</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="text-2xl font-bold text-blue-600 mb-2">Free</div>
                  <div className="text-gray-600">Student Registration</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">HostelHub by the Numbers</h2>
              <p className="text-blue-100">Our impact in the student accommodation space</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-blue-100 text-sm">Hostels Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">1,000+</div>
                <div className="text-blue-100 text-sm">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10+</div>
                <div className="text-blue-100 text-sm">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 