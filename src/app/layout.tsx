import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import CachePerformance from "@/components/CachePerformance";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HostelHub - Find Your Perfect Hostel",
  description: "Discover and book the best hostels worldwide. Connect with travelers and find affordable accommodation.",
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
      </body>
    </html>
  );
}
