'use client';

import Link from 'next/link';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">HostelHub</h3>
                <p className="text-gray-400 text-xs">Trusted Hostels</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed max-w-sm">
              Connecting students with quality, affordable hostel accommodations across Pakistan. 
              Your trusted partner for finding the perfect place to call home.
            </p>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Mail className="w-3 h-3" />
                <span>Syntax.ai.dev@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Phone className="w-3 h-3" />
                <span>03121281801</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <MapPin className="w-3 h-3" />
                <span>Islamabad, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/auth" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Legal</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                Instagram
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} HostelHub. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs mt-2 md:mt-0">
            Made by <span className="text-blue-400">SYNTAX</span>
          </p>
        </div>
      </div>
    </footer>
  );
} 