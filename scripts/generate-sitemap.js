#!/usr/bin/env node

/**
 * Sitemap Generator for HostelHub
 * Run this script to update your sitemap.xml
 * Usage: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.hostelhub.pro';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

// Define your routes with their priorities and change frequencies
const routes = [
  {
    path: '/',
    priority: '1.00',
    changefreq: 'daily',
    description: 'Homepage'
  },
  {
    path: '/about',
    priority: '0.80',
    changefreq: 'monthly',
    description: 'About Us'
  },
  {
    path: '/contact',
    priority: '0.80',
    changefreq: 'monthly',
    description: 'Contact'
  },
  {
    path: '/explore-hostels',
    priority: '0.90',
    changefreq: 'daily',
    description: 'Explore Hostels'
  },
  {
    path: '/post-hostel',
    priority: '0.70',
    changefreq: 'monthly',
    description: 'Post Hostel'
  },
  {
    path: '/auth',
    priority: '0.70',
    changefreq: 'monthly',
    description: 'Authentication'
  },
  {
    path: '/privacy',
    priority: '0.30',
    changefreq: 'yearly',
    description: 'Privacy Policy'
  },
  {
    path: '/terms',
    priority: '0.30',
    changefreq: 'yearly',
    description: 'Terms of Service'
  }
];

function generateSitemap() {
  const currentDate = new Date().toISOString();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!-- HostelHub Sitemap - Auto-generated on ${new Date().toLocaleDateString()} -->

`;

  routes.forEach(route => {
    sitemap += `<url>
  <loc>${BASE_URL}${route.path}</loc>
  <lastmod>${currentDate}</lastmod>
  <changefreq>${route.changefreq}</changefreq>
  <priority>${route.priority}</priority>
</url>

`;
  });

  sitemap += '</urlset>';

  // Write the sitemap file
  try {
    fs.writeFileSync(SITEMAP_PATH, sitemap);
    console.log('✅ Sitemap generated successfully!');
    console.log(`📁 Location: ${SITEMAP_PATH}`);
    console.log(`🌐 Accessible at: ${BASE_URL}/sitemap.xml`);
    console.log(`📅 Generated on: ${new Date().toLocaleString()}`);
    console.log(`🔗 Total routes: ${routes.length}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
}

// Run the generator
if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap, routes }; 