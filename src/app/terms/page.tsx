'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, Scale, Gavel } from 'lucide-react';

export default function TermsOfServicePage() {
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
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
                <p className="text-gray-600 text-lg">Terms and conditions for using HostelHub</p>
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
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                    <span>Acceptance of Terms</span>
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    By accessing and using HostelHub, you accept and agree to be bound by the terms and provision of this agreement. 
                    If you do not agree to abide by the above, please do not use this service.
                  </p>
                </section>

                {/* Service Description */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <Scale className="w-6 h-6 text-blue-600" />
                    <span>Service Description</span>
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    HostelHub is a platform that connects students and travelers with hostel accommodations. Our services include:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Hostel listing and discovery</li>
                    <li>Booking management and reservations</li>
                    <li>Payment processing</li>
                    <li>Communication between hosts and guests</li>
                    <li>Review and rating system</li>
                  </ul>
                </section>

                {/* User Responsibilities */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <Gavel className="w-6 h-6 text-blue-600" />
                    <span>User Responsibilities</span>
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">For Hostel Owners</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Provide accurate and up-to-date information about your hostel</li>
                        <li>Maintain the quality and safety standards as advertised</li>
                        <li>Respond promptly to booking requests and inquiries</li>
                        <li>Honor confirmed bookings and reservations</li>
                        <li>Comply with local laws and regulations</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">For Guests</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Provide accurate personal information</li>
                        <li>Respect hostel rules and policies</li>
                        <li>Pay for services as agreed</li>
                        <li>Treat hostel property with care</li>
                        <li>Communicate any issues promptly</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Booking and Payment */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking and Payment Terms</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Booking Process</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Bookings are confirmed upon payment receipt</li>
                        <li>Prices are subject to change without notice</li>
                        <li>All payments are processed securely through our platform</li>
                        <li>Refunds are subject to hostel cancellation policies</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Cancellation Policy</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Cancellation policies vary by hostel</li>
                        <li>Refunds are processed according to individual hostel policies</li>
                        <li>Service fees may be non-refundable</li>
                        <li>Contact hostel owners directly for specific cancellation terms</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Prohibited Activities */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <span>Prohibited Activities</span>
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Users are prohibited from:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Providing false or misleading information</li>
                    <li>Engaging in fraudulent activities</li>
                    <li>Harassing or discriminating against other users</li>
                    <li>Violating any applicable laws or regulations</li>
                    <li>Attempting to circumvent our security measures</li>
                    <li>Using the platform for illegal purposes</li>
                  </ul>
                </section>

                {/* Intellectual Property */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The HostelHub platform, including its design, content, and functionality, is protected by intellectual property laws. 
                    Users retain ownership of their content but grant us a license to use it for platform operations.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>You retain ownership of your hostel listings and content</li>
                    <li>We may use your content to promote our platform</li>
                    <li>You grant us a non-exclusive license to display your content</li>
                    <li>You are responsible for ensuring you have rights to all content you post</li>
                  </ul>
                </section>

                {/* Limitation of Liability */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                  <p className="text-gray-700 leading-relaxed">
                    HostelHub acts as a platform connecting hosts and guests. We are not responsible for the quality of accommodations, 
                    the conduct of users, or any disputes between hosts and guests. Our liability is limited to the amount paid for our services.
                  </p>
                </section>

                {/* Privacy and Data */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Protection</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We are committed to protecting your privacy. Our data collection and usage practices are outlined in our Privacy Policy, 
                    which is incorporated into these Terms of Service by reference.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    By using our platform, you consent to our collection and use of your information as described in our Privacy Policy.
                  </p>
                </section>

                {/* Termination */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Termination</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We reserve the right to terminate or suspend accounts that violate these terms. Users may also terminate their accounts 
                    at any time by contacting our support team.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>We may terminate accounts for violations of these terms</li>
                    <li>Termination may result in loss of access to our services</li>
                    <li>Outstanding payments must be settled before account termination</li>
                    <li>Some information may be retained for legal compliance</li>
                  </ul>
                </section>

                {/* Changes to Terms */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update these Terms of Service from time to time. We will notify users of significant changes via email or 
                    through our platform. Continued use of our services after changes constitutes acceptance of the new terms.
                  </p>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                  <p className="text-gray-700 leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Email:</strong> legal@hostelhub.com<br />
                      <strong>Address:</strong> HostelHub Legal Team<br />
                      <strong>Phone:</strong> +92-XXX-XXXXXXX
                    </p>
                  </div>
                </section>

                {/* Governing Law */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
                  <p className="text-gray-700 leading-relaxed">
                    These Terms of Service are governed by the laws of Pakistan. Any disputes arising from these terms or the use of 
                    our platform will be resolved in the courts of Pakistan.
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