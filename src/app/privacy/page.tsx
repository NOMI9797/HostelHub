'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Database, Users } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                <p className="text-gray-600 text-lg">How we collect, use, and protect your information</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="space-y-8">
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <Lock className="w-6 h-6 text-blue-600" />
                    <span>Introduction</span>
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    At HostelHub, we are committed to protecting your privacy and ensuring the security of your personal information. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our hostel 
                    booking platform.
                  </p>
                </section>

                {/* Information We Collect */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <Database className="w-6 h-6 text-blue-600" />
                    <span>Information We Collect</span>
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Name and contact information (email, phone number)</li>
                        <li>Account credentials and profile information</li>
                        <li>Payment and billing information</li>
                        <li>Communication preferences</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Information</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>IP address and device information</li>
                        <li>Browser type and version</li>
                        <li>Pages visited and time spent on our platform</li>
                        <li>Search queries and booking history</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* How We Use Information */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <Eye className="w-6 h-6 text-blue-600" />
                    <span>How We Use Your Information</span>
                  </h2>
                  <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>To provide and maintain our hostel booking services</li>
                      <li>To process bookings and payments</li>
                      <li>To communicate with you about your account and bookings</li>
                      <li>To improve our platform and user experience</li>
                      <li>To send promotional offers and updates (with your consent)</li>
                      <li>To comply with legal obligations and prevent fraud</li>
                    </ul>
                  </div>
                </section>

                {/* Information Sharing */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <Users className="w-6 h-6 text-blue-600" />
                    <span>Information Sharing</span>
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>With hostel owners to facilitate bookings</li>
                    <li>With payment processors to complete transactions</li>
                    <li>With service providers who assist in our operations</li>
                    <li>When required by law or to protect our rights</li>
                    <li>With your explicit consent</li>
                  </ul>
                </section>

                {/* Data Security */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <span>Data Security</span>
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, 
                    and regular security assessments.
                  </p>
                </section>

                {/* Cookies and Tracking */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We use cookies and similar technologies to enhance your experience on our platform. These technologies help us:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Remember your preferences and login information</li>
                    <li>Analyze website traffic and usage patterns</li>
                    <li>Provide personalized content and advertisements</li>
                    <li>Improve our services and user experience</li>
                  </ul>
                </section>

                {/* Your Rights */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Access and review your personal information</li>
                    <li>Update or correct inaccurate information</li>
                    <li>Request deletion of your personal data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent for data processing</li>
                  </ul>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Email:</strong> privacy@hostelhub.com<br />
                      <strong>Address:</strong> HostelHub Privacy Team<br />
                      <strong>Phone:</strong> +92-XXX-XXXXXXX
                    </p>
                  </div>
                </section>

                {/* Updates to Policy */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                    Privacy Policy on this page and updating the &quot;Last Updated&quot; date. We encourage you to review this Privacy 
                    Policy periodically.
                  </p>
                  <p className="text-gray-600 text-sm mt-4">
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 