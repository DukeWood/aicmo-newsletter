#!/usr/bin/env node

/**
 * Upload Newsletter Images to Cloudinary
 * Uploads all newsletter assets and returns CDN URLs
 */

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const assetsDir = path.join(__dirname, '../../campaigns/weekly-newsletter/issue-01/assets');
const iconsDir = path.join(assetsDir, 'icons');

// Main images to upload
const mainImages = [
  'newsletter-header.png',
  'ai-growth-stats.png',
  'traditional-decline.png',
  'case-study-emma.png',
  'cta-button-geo-audit.png'
];

// Icon images
const iconImages = [
  'youtube-icon.png',
  'x-icon.png',
  'linkedin-icon.png',
  'whatsapp-icon.jpg',
  'discord-icon.png'
];

async function uploadImage(filePath, publicId, folder) {
  try {
    console.log(`📤 Uploading ${path.basename(filePath)}...`);

    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      folder: folder,
      overwrite: true,
      resource_type: 'image',
      format: 'png' // Convert all to PNG for consistency
    });

    console.log(`✅ Uploaded: ${result.secure_url}`);
    return result.secure_url;

  } catch (error) {
    console.error(`❌ Error uploading ${filePath}:`, error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting Cloudinary Upload...\n');

  const urls = {
    main: {},
    icons: {}
  };

  // Upload main images
  console.log('📋 Uploading main images...\n');
  for (const image of mainImages) {
    const filePath = path.join(assetsDir, image);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${image} - file not found`);
      continue;
    }

    const publicId = path.parse(image).name;
    const url = await uploadImage(filePath, publicId, 'newsletter/issue-01');
    urls.main[image] = url;
  }

  console.log('\n📋 Uploading icon images...\n');

  // Upload icons
  for (const icon of iconImages) {
    const filePath = path.join(iconsDir, icon);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${icon} - file not found`);
      continue;
    }

    const publicId = path.parse(icon).name;
    const url = await uploadImage(filePath, publicId, 'newsletter/issue-01/icons');
    urls.icons[icon] = url;
  }

  // Display all URLs
  console.log('\n\n✅ All images uploaded successfully!\n');
  console.log('=' .repeat(80));
  console.log('CDN URLs for Newsletter:');
  console.log('=' .repeat(80));

  console.log('\n📸 Main Images:\n');
  Object.entries(urls.main).forEach(([filename, url]) => {
    console.log(`${filename}:`);
    console.log(`  ${url}\n`);
  });

  console.log('🎨 Icons:\n');
  Object.entries(urls.icons).forEach(([filename, url]) => {
    console.log(`${filename}:`);
    console.log(`  ${url}\n`);
  });

  console.log('=' .repeat(80));

  // Save URLs to a file for reference
  const urlsFile = path.join(assetsDir, 'cloudinary-urls.json');
  fs.writeFileSync(urlsFile, JSON.stringify(urls, null, 2));
  console.log(`\n💾 URLs saved to: ${urlsFile}\n`);

  return urls;
}

if (require.main === module) {
  main()
    .then(() => {
      console.log('🎉 Upload complete!');
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { uploadImage };
