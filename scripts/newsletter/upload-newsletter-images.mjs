#!/usr/bin/env node

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const manualNewslettersDir = path.join(__dirname, '../../campaigns/weekly-newsletter/issue-01/assets/manual_newsletters');

// Images to upload
const images = [
  'seo-vs-geo-comparison.png',
  'competitive-threat-matrix.png',
  'five-pillars-geo.png',
  '90-day-roadmap.png',
  'cover-invisible-to-ai.png'
];

async function uploadImage(filename) {
  const filePath = path.join(manualNewslettersDir, filename);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filename}`);
    return null;
  }

  try {
    console.log(`📤 Uploading ${filename}...`);

    const result = await cloudinary.uploader.upload(filePath, {
      public_id: `newsletter/invisible-to-ai/${filename.replace('.png', '')}`,
      folder: '',
      overwrite: true,
      resource_type: 'image'
    });

    console.log(`✅ ${filename}: ${result.secure_url}`);
    return {
      filename,
      url: result.secure_url,
      width: result.width,
      height: result.height
    };
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting Cloudinary upload...\n');
  console.log(`Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}\n`);

  const results = [];

  for (const image of images) {
    const result = await uploadImage(image);
    if (result) {
      results.push(result);
    }
  }

  console.log('\n📊 Upload Summary:');
  console.log('===================\n');

  results.forEach(r => {
    console.log(`${r.filename}:`);
    console.log(`  URL: ${r.url}`);
    console.log(`  Size: ${r.width}×${r.height}px\n`);
  });

  // Save URLs to JSON file
  const outputPath = path.join(manualNewslettersDir, 'cloudinary-urls.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`💾 Saved URLs to: cloudinary-urls.json`);
}

main().catch(console.error);
