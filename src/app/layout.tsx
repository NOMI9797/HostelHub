import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import CachePerformance from "@/components/CachePerformance";
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ErrorBoundary>
          <AuthProvider>
            {children}
            <Footer />
            <CachePerformance />
          </AuthProvider>
        </ErrorBoundary>
        <GoogleAnalytics />
        <GoogleTagManager />
      </body>
    </html>
  );
}
