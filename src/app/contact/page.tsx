'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageSquare, Send } from 'lucide-react';

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
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="booking">Booking Issues</option>
                    <option value="hostel">Hostel Listing</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
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
                      <p className="text-gray-600">info@hostelhub.com</p>
                      <p className="text-gray-600">support@hostelhub.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                      <p className="text-gray-600">+92-XXX-XXXXXXX</p>
                      <p className="text-gray-600">+92-XXX-XXXXXXX</p>
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

              {/* Social Media */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
                <p className="text-blue-100 mb-6">Stay updated with the latest news and offers</p>
                
                <div className="grid grid-cols-2 gap-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 