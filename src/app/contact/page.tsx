'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';

export default function ContactPage() {
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
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
                <p className="text-gray-600 text-lg">Get in touch with our team</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Details */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                      <p className="text-gray-600">nomiahmed307@gmail.com</p>
                      <p className="text-gray-600">nomiahmed307@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                      <p className="text-gray-600">03121281801</p>
                      <p className="text-gray-600">03121281801</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                      <p className="text-gray-600">
                        HostelHub Headquarters<br />
                        Islamabad, Pakistan<br />
                        Postal Code: 44000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">How do I list my hostel on HostelHub?</h3>
                    <p className="text-gray-600 text-sm">
                      Sign up as a Hostel Lister, complete your profile, and submit your hostel details. Our team will review and approve your listing.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">How can I book a hostel?</h3>
                    <p className="text-gray-600 text-sm">
                      Browse our listings, select your preferred hostel, and contact the owner directly through our platform.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">What if I have a complaint?</h3>
                    <p className="text-gray-600 text-sm">
                      Contact our support team immediately. We take all complaints seriously and will work to resolve issues promptly.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
                    <p className="text-gray-600 text-sm">
                      Refund policies vary by hostel. Please check with the individual hostel owner for their specific cancellation and refund terms.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Social Media & Additional Info */}
            <div className="space-y-8">
              {/* Social Media */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
                <p className="text-blue-100 mb-6">Stay updated with the latest news and offers</p>
                
                <div className="grid grid-cols-1 gap-4">
                  <a href="#" className="bg-white/20 rounded-lg p-4 text-center hover:bg-white/30 transition-colors">
                    <div className="font-semibold">Facebook</div>
                    <div className="text-blue-100 text-sm">@HostelHub</div>
                  </a>
                  <a href="#" className="bg-white/20 rounded-lg p-4 text-center hover:bg-white/30 transition-colors">
                    <div className="font-semibold">Instagram</div>
                    <div className="text-blue-100 text-sm">@HostelHub</div>
                  </a>
                  <a href="#" className="bg-white/20 rounded-lg p-4 text-center hover:bg-white/30 transition-colors">
                    <div className="font-semibold">Twitter</div>
                    <div className="text-blue-100 text-sm">@HostelHub</div>
                  </a>
                  <a href="#" className="bg-white/20 rounded-lg p-4 text-center hover:bg-white/30 transition-colors">
                    <div className="font-semibold">LinkedIn</div>
                    <div className="text-blue-100 text-sm">@HostelHub</div>
                  </a>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Contact</h2>
                <p className="text-gray-600 mb-4">Need immediate assistance? Reach out to us directly:</p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">nomiahmed307@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-sm text-gray-600">03121281801</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 