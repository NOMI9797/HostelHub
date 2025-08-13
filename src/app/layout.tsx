import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "HostelHub - Find Your Perfect Hostel Accommodation",
    template: "%s | HostelHub"
  },
  description: "Discover and book verified hostels near universities and institutions. Find affordable, safe, and comfortable accommodation with HostelHub - your trusted hostel booking platform.",
  keywords: ["hostel", "accommodation", "student housing", "university hostel", "budget accommodation", "hostel booking", "student living"],
  authors: [{ name: "HostelHub Team" }],
  creator: "HostelHub",
  publisher: "HostelHub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.hostelhub.pro'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.hostelhub.pro',
    title: 'HostelHub - Find Your Perfect Hostel Accommodation',
    description: 'Discover and book verified hostels near universities and institutions. Find affordable, safe, and comfortable accommodation.',
    siteName: 'HostelHub',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HostelHub - Hostel Booking Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HostelHub - Find Your Perfect Hostel Accommodation',
    description: 'Discover and book verified hostels near universities and institutions.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code here
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Mobile-specific meta tags for better AdSense compatibility */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HostelHub" />
        <meta name="application-name" content="HostelHub" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* Ensure proper mobile rendering */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
        
        {/* AdSense script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5489167867153548"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
        <GoogleAnalytics />
        <GoogleTagManager />
      </body>
    </html>
  );
}
