'use client';

import Script from 'next/script';

export default function GoogleAdsense() {
  return (
    <Script
      id="google-adsense"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5489167867153548"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
} 