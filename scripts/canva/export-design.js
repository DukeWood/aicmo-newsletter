#!/usr/bin/env node

/**
 * Export Canva Design to Image
 *
 * Exports a Canva design by ID to PNG/JPG format
 *
 * Usage:
 *   node scripts/canva/export-design.js <DESIGN_ID> [format] [output-path]
 *
 * Example:
 *   node scripts/canva/export-design.js DAG1wokOYPs png ./temp/event-flyer.png
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import { getAccessToken } from './canva-oauth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Canva API endpoints
const CANVA_API_BASE = 'https://api.canva.com/rest/v1';

/**
 * Export design as image
 */
async function exportDesign(accessToken, designId, format = 'png') {
  console.log(`📤 Starting export for design: ${designId}`);
  console.log(`   Format: ${format.toUpperCase()}`);

  const response = await fetch(`${CANVA_API_BASE}/exports`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      design_id: designId,
      format: {
        type: format
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to start export: ${error}`);
  }

  const data = await response.json();
  console.log(`✅ Export job created: ${data.job.id}`);
  return data.job;
}

/**
 * Get export job status
 */
async function getExportJobStatus(accessToken, jobId) {
  const response = await fetch(`${CANVA_API_BASE}/exports/${jobId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get export status: ${error}`);
  }

  return await response.json();
}

/**
 * Wait for export job to complete
 */
async function waitForExport(accessToken, jobId, maxAttempts = 30, delayMs = 2000) {
  console.log('⏳ Waiting for export to complete...');

  for (let i = 0; i < maxAttempts; i++) {
    const result = await getExportJobStatus(accessToken, jobId);

    if (result.job.status === 'success') {
      console.log('✅ Export completed successfully!');
      return result;
    }

    if (result.job.status === 'failed') {
      throw new Error(`Export failed: ${result.job.error?.message || 'Unknown error'}`);
    }

    // Still in progress
    process.stdout.write('.');
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }

  throw new Error('Export timeout - job took too long to complete');
}

/**
 * Download image from URL
 */
async function downloadImage(url, outputPath) {
  console.log(`\n📥 Downloading image...`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }

  const buffer = await response.buffer();

  // Create directory if it doesn't exist
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, buffer);

  console.log(`✅ Image saved: ${outputPath}`);
  return outputPath;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('❌ Error: No design ID specified');
    console.error('');
    console.error('Usage:');
    console.error('  node scripts/canva/export-design.js <DESIGN_ID> [format] [output-path]');
    console.error('');
    console.error('Example:');
    console.error('  node scripts/canva/export-design.js DAG1wokOYPs png ./temp/event-flyer.png');
    console.error('');
    process.exit(1);
  }

  const designId = args[0];
  const format = args[1] || 'png';
  const outputPath = args[2] || path.join(__dirname, '../../temp', `design-${designId}.${format}`);

  console.log('╔═══════════════════════════════════════════╗');
  console.log('║   Canva Design Exporter                   ║');
  console.log('╚═══════════════════════════════════════════╝');
  console.log('');

  try {
    // Authenticate with Canva
    console.log('🔐 Authenticating with Canva...');
    const accessToken = await getAccessToken();
    console.log('✅ Authentication successful');
    console.log('');

    // Start export
    const job = await exportDesign(accessToken, designId, format);
    console.log('');

    // Wait for completion
    const result = await waitForExport(accessToken, job.id);
    console.log('');

    // Get download URL
    const downloadUrl = result.job.urls[0];
    console.log(`🔗 Download URL: ${downloadUrl}`);
    console.log('');

    // Download image
    const savedPath = await downloadImage(downloadUrl, outputPath);
    console.log('');

    console.log('╔═══════════════════════════════════════════╗');
    console.log('║   ✅ Export Successful!                   ║');
    console.log('╚═══════════════════════════════════════════╝');
    console.log('');
    console.log(`📁 Image saved to: ${savedPath}`);
    console.log('');

    // Return info for programmatic use
    return {
      designId,
      format,
      path: savedPath,
      url: downloadUrl
    };

  } catch (error) {
    console.error('');
    console.error('╔═══════════════════════════════════════════╗');
    console.error('║   ❌ Export Failed                        ║');
    console.error('╚═══════════════════════════════════════════╝');
    console.error('');
    console.error('Error:', error.message);
    console.error('');
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

// Export functions for use in other scripts
export {
  exportDesign,
  waitForExport,
  downloadImage,
  getExportJobStatus
};
