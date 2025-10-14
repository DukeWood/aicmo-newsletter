#!/usr/bin/env node

/**
 * Generate A4O Framework infographic using Hugging Face Inference API
 *
 * Uses free FLUX.1-schnell model via Hugging Face API
 * Requires free Hugging Face token (get at https://huggingface.co/settings/tokens)
 *
 * Setup:
 * 1. Get token at https://huggingface.co/settings/tokens
 * 2. Add to .env: HUGGING_FACE_TOKEN=hf_your_token_here
 * 3. Run: node scripts/ai-image/generate-a4o-framework.js
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get Hugging Face token from environment
const HF_TOKEN = process.env.HUGGING_FACE_TOKEN;

// Hugging Face API configuration
// Using black-forest-labs/FLUX.1-schnell (fast, high quality)
const MODEL = 'black-forest-labs/FLUX.1-schnell';
const API_URL = `https://api-inference.huggingface.co/models/${MODEL}`;

// Professional prompt for A4O Framework
const PROMPT = `Professional business infographic showing AI Marketing Maturity Framework with four progressive stages or pillars, modern clean corporate design, navy blue #012169 and crimson red #C8102E brand colors, data visualization elements with charts and upward arrows showing progression, minimalist professional layout, high quality photorealistic business presentation style, 1200x675 pixels horizontal format, geometric patterns, corporate professional lighting, sharp crisp details, space for text overlay, enterprise software aesthetic, clean typography areas`;

// Output configuration
const OUTPUT_DIR = path.join(process.cwd(), 'temp');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'a4o-framework.png');

/**
 * Generate image using Hugging Face Inference API
 */
async function generateImage(prompt) {
  console.log('🎨 Generating A4O Framework infographic...');
  console.log('📝 Prompt:', prompt);
  console.log('');

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      inputs: prompt,
      parameters: {
        width: 1200,
        height: 675,
        num_inference_steps: 30,
        guidance_scale: 7.5
      }
    });

    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    };

    // Add authorization if token is provided
    if (HF_TOKEN) {
      headers['Authorization'] = `Bearer ${HF_TOKEN}`;
    }

    const options = {
      method: 'POST',
      headers
    };

    console.log('🔄 Sending request to Hugging Face API...');
    console.log(`📡 Model: ${MODEL}`);
    console.log('');

    const req = https.request(API_URL, options, (res) => {
      const chunks = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          const buffer = Buffer.concat(chunks);

          // Check if response is an error (JSON) or image (binary)
          const contentType = res.headers['content-type'];

          if (contentType && contentType.includes('application/json')) {
            const error = JSON.parse(buffer.toString());
            reject(new Error(`API Error: ${error.error || JSON.stringify(error)}`));
            return;
          }

          resolve(buffer);
        } else {
          try {
            const error = JSON.parse(Buffer.concat(chunks).toString());
            reject(new Error(`API Error (${res.statusCode}): ${error.error || JSON.stringify(error)}`));
          } catch (e) {
            reject(new Error(`API Error (${res.statusCode}): ${res.statusMessage}`));
          }
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Save image to file
 */
function saveImage(buffer, filepath) {
  // Ensure directory exists
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write file
  fs.writeFileSync(filepath, buffer);
  console.log('✅ Image saved successfully!');
  console.log(`📁 File: ${filepath}`);
  console.log('');
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('🚀 A4O Framework Image Generator\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Check for HF token
    if (!HF_TOKEN) {
      console.error('❌ Missing Hugging Face token!');
      console.error('');
      console.error('To generate images, you need a free Hugging Face token.');
      console.error('');
      console.error('Quick Setup (2 minutes):');
      console.error('  1. Go to https://huggingface.co/settings/tokens');
      console.error('  2. Click "New token" → Name: "aiCMO" → Generate');
      console.error('  3. Copy the token (starts with hf_...)');
      console.error('  4. Add to .env file:');
      console.error('     HUGGING_FACE_TOKEN=hf_your_token_here');
      console.error('');
      console.error('Then run this script again.');
      console.error('');
      console.error('📖 See: scripts/ai-image/SETUP_HF_TOKEN.md');
      console.error('');
      process.exit(1);
    }

    // Generate image
    const imageBuffer = await generateImage(PROMPT);

    console.log('✅ Image generated successfully!');
    console.log(`📊 Size: ${(imageBuffer.length / 1024).toFixed(2)} KB`);
    console.log('');

    // Save image
    saveImage(imageBuffer, OUTPUT_FILE);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Complete!');
    console.log('');
    console.log('Next steps:');
    console.log('  1. View image: open', OUTPUT_FILE);
    console.log('  2. Post to Twitter:');
    console.log(`     node scripts/social/post-tweet-with-image.js "Tweet text" ${OUTPUT_FILE}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('');

    if (error.message.includes('Model is currently loading')) {
      console.log('⏳ The model is loading. This can take 1-2 minutes for cold starts.');
      console.log('💡 Try again in a few minutes.');
      console.log('');
    } else if (error.message.includes('rate limit')) {
      console.log('⚠️  Rate limit reached on Hugging Face free tier.');
      console.log('💡 Solutions:');
      console.log('   1. Wait 1 hour and try again');
      console.log('   2. Create a Hugging Face account and add API token to .env');
      console.log('   3. Use Canva workflow as fallback');
      console.log('');
    }

    process.exit(1);
  }
}

// Run
main();
