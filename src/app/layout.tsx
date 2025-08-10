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
  title: "HostelHub - Student Hostel Accommodation Platform in Pakistan",
  description: "Pakistan's leading platform for student hostel accommodations. Find verified, affordable, and quality hostels near your educational institution. Safe and trusted student housing solutions.",
  keywords: "student hostels, hostel accommodation, Pakistan hostels, student housing, university accommodation, college hostels, safe student hostels",
  authors: [{ name: "HostelHub Team" }],
  creator: "HostelHub",
  publisher: "HostelHub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "HostelHub - Student Hostel Accommodation Platform",
    description: "Find verified student hostels across Pakistan. Safe, affordable, and trusted accommodation for students.",
    url: "https://www.hostelhub.pro",
    siteName: "HostelHub",
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "add-your-google-site-verification-here",
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
