#!/usr/bin/env node

/**
 * Canva Image Generation for Newsletters
 *
 * Automates newsletter image creation using Canva Connect API
 * Generates branded images based on newsletter content
 *
 * Usage:
 *   node scripts/newsletter/generate-images-canva.js [newsletter-md-file]
 *
 * Example:
 *   node scripts/newsletter/generate-images-canva.js campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import yaml from 'yaml';
import { getAccessToken } from '../canva/canva-oauth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Canva API endpoints
const CANVA_API_BASE = 'https://api.canva.com/rest/v1';

// Brand colors for aiCMO
const BRAND_COLORS = {
  crimson: '#C8102E',
  navy: '#012169',
  white: '#FFFFFF',
  lightGray: '#F5F5F5'
};

/**
 * Parse newsletter Markdown file with YAML frontmatter
 */
function parseNewsletterFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Newsletter file not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');

  // Extract YAML frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
  if (!frontmatterMatch) {
    throw new Error('No YAML frontmatter found in newsletter file');
  }

  const frontmatter = yaml.parse(frontmatterMatch[1]);
  const markdown = content.slice(frontmatterMatch[0].length).trim();

  return { frontmatter, markdown };
}

/**
 * Create a design in Canva
 */
async function createDesign(accessToken, title, designType = 'Presentation', width = 600, height = 400) {
  console.log(`🎨 Creating new Canva design: "${title}"`);

  const response = await fetch(`${CANVA_API_BASE}/designs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      design_type: designType,
      title: title,
      width: width,
      height: height
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create design: ${error}`);
  }

  const data = await response.json();
  console.log(`✅ Design created: ${data.design.id}`);
  return data.design;
}

/**
 * Get user profile
 */
async function getUserProfile(accessToken) {
  const response = await fetch(`${CANVA_API_BASE}/users/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get user profile: ${error}`);
  }

  return await response.json();
}

/**
 * List user's designs
 */
async function listDesigns(accessToken, limit = 10) {
  console.log('📋 Fetching your Canva designs...');

  const response = await fetch(`${CANVA_API_BASE}/designs?limit=${limit}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to list designs: ${error}`);
  }

  const data = await response.json();
  return data.items || [];
}

/**
 * Export design as image
 */
async function exportDesign(accessToken, designId, format = 'png') {
  console.log(`📥 Exporting design ${designId} as ${format.toUpperCase()}...`);

  const response = await fetch(`${CANVA_API_BASE}/designs/${designId}/export`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      format: format
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to export design: ${error}`);
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
    const status = await getExportJobStatus(accessToken, jobId);

    if (status.status === 'success') {
      console.log('✅ Export completed successfully!');
      return status;
    }

    if (status.status === 'failed') {
      throw new Error(`Export failed: ${status.error || 'Unknown error'}`);
    }

    // Still in progress
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }

  throw new Error('Export timeout - job took too long to complete');
}

/**
 * Download image from URL
 */
async function downloadImage(url, outputPath) {
  console.log(`📥 Downloading image to: ${outputPath}`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }

  const buffer = await response.buffer();
  fs.writeFileSync(outputPath, buffer);

  console.log(`✅ Image saved: ${outputPath}`);
}

/**
 * Generate newsletter images
 */
async function generateNewsletterImages(newsletterPath) {
  console.log('╔═══════════════════════════════════════════╗');
  console.log('║   Canva Newsletter Image Generator        ║');
  console.log('╚═══════════════════════════════════════════╝');
  console.log('');

  try {
    // Authenticate with Canva
    console.log('🔐 Authenticating with Canva...');
    const accessToken = await getAccessToken();
    console.log('✅ Authentication successful');
    console.log('');

    // Parse newsletter file
    console.log(`📄 Parsing newsletter: ${newsletterPath}`);
    const { frontmatter, markdown } = parseNewsletterFile(newsletterPath);
    console.log(`   Title: ${frontmatter.title}`);
    console.log(`   Issue: ${frontmatter.issue}`);
    console.log('');

    // Get output directory
    const newsletterDir = path.dirname(newsletterPath);
    const assetsDir = path.join(newsletterDir, 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
      console.log(`📁 Created assets directory: ${assetsDir}`);
    }

    // Get user profile
    console.log('👤 Getting user profile...');
    const profile = await getUserProfile(accessToken);
    console.log(`   User: ${profile.display_name || profile.email}`);
    console.log('');

    // List existing designs (for reference)
    console.log('📋 Your recent Canva designs:');
    const designs = await listDesigns(accessToken, 5);
    if (designs.length === 0) {
      console.log('   (No designs found)');
    } else {
      designs.forEach((design, i) => {
        console.log(`   ${i + 1}. ${design.title} (ID: ${design.id})`);
      });
    }
    console.log('');

    // Create a sample design
    console.log('🎨 Creating newsletter header image...');
    const design = await createDesign(
      accessToken,
      `${frontmatter.title} - Header`,
      'Presentation',
      600,
      200
    );
    console.log('');

    console.log('╔═══════════════════════════════════════════╗');
    console.log('║   ✅ Canva Design Created!                ║');
    console.log('╚═══════════════════════════════════════════╝');
    console.log('');
    console.log('📝 Next Steps:');
    console.log('');
    console.log('1. Open your design in Canva:');
    console.log(`   https://www.canva.com/design/${design.id}/edit`);
    console.log('');
    console.log('2. Customize the design with your content:');
    console.log(`   - Title: ${frontmatter.title}`);
    console.log(`   - Brand colors: Crimson Red (${BRAND_COLORS.crimson}), Navy Blue (${BRAND_COLORS.navy})`);
    console.log(`   - Size: 600x200px (header image)`);
    console.log('');
    console.log('3. To export the design programmatically:');
    console.log(`   const job = await exportDesign(accessToken, '${design.id}', 'png');`);
    console.log(`   const result = await waitForExport(accessToken, job.id);`);
    console.log(`   await downloadImage(result.urls[0], '${assetsDir}/header.png');`);
    console.log('');
    console.log('💡 Note: Canva API creates blank designs. You need to add content via:');
    console.log('   - Manual editing in Canva UI');
    console.log('   - Using Canva Templates API (if available)');
    console.log('   - Using Canva Autofill API with brand templates');
    console.log('');

    return {
      design,
      assetsDir
    };

  } catch (error) {
    console.error('');
    console.error('╔═══════════════════════════════════════════╗');
    console.error('║   ❌ Image Generation Failed              ║');
    console.error('╚═══════════════════════════════════════════╝');
    console.error('');
    console.error('Error:', error.message);
    console.error('');
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('❌ Error: No newsletter file specified');
    console.error('');
    console.error('Usage:');
    console.error('  node scripts/newsletter/generate-images-canva.js <newsletter-md-file>');
    console.error('');
    console.error('Example:');
    console.error('  node scripts/newsletter/generate-images-canva.js campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md');
    console.error('');
    process.exit(1);
  }

  const newsletterPath = args[0];

  try {
    await generateNewsletterImages(newsletterPath);
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

// Export functions for use in other scripts
export {
  generateNewsletterImages,
  createDesign,
  exportDesign,
  waitForExport,
  downloadImage,
  getUserProfile,
  listDesigns
};
