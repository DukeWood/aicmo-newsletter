#!/usr/bin/env node

/**
 * All-in-one script: Generate image with AI + Post to Twitter
 *
 * Usage:
 *   node scripts/ai-image/generate-and-post.js "prompt" "tweet text"
 *
 * Example:
 *   node scripts/ai-image/generate-and-post.js \
 *     "Modern tech event flyer for AI Meets Web3" \
 *     "🤖 Event announcement! #AIMarketing"
 *
 * Prerequisites:
 *   - Hugging Face MCP configured in .claude/mcp-config.json
 *   - Twitter credentials in .env
 *   - Claude Code running with MCP enabled
 */

import { TwitterApi } from 'twitter-api-v2';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get Twitter credentials from environment
const {
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET
} = process.env;

// Validate credentials
if (!TWITTER_API_KEY || !TWITTER_API_SECRET || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_TOKEN_SECRET) {
  console.error('❌ Missing Twitter credentials in .env file');
  console.error('Required variables:');
  console.error('  - TWITTER_API_KEY');
  console.error('  - TWITTER_API_SECRET');
  console.error('  - TWITTER_ACCESS_TOKEN');
  console.error('  - TWITTER_ACCESS_TOKEN_SECRET');
  process.exit(1);
}

// Initialize Twitter client
const client = new TwitterApi({
  appKey: TWITTER_API_KEY,
  appSecret: TWITTER_API_SECRET,
  accessToken: TWITTER_ACCESS_TOKEN,
  accessSecret: TWITTER_ACCESS_TOKEN_SECRET,
});

/**
 * Post tweet with image
 */
async function postTweetWithImage(tweetText, imagePath) {
  try {
    // Upload media
    console.log('📤 Uploading image to Twitter...');
    const mediaId = await client.v1.uploadMedia(imagePath);
    console.log('✅ Image uploaded successfully!');

    // Post tweet with media
    console.log('📝 Posting tweet...');
    const tweet = await client.v2.tweet({
      text: tweetText,
      media: { media_ids: [mediaId] }
    });

    console.log('✅ Tweet posted successfully!');
    console.log(`📊 Tweet ID: ${tweet.data.id}`);
    console.log(`🔗 Tweet URL: https://twitter.com/user/status/${tweet.data.id}`);

    return tweet.data;
  } catch (error) {
    console.error('❌ Error posting tweet:', error);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: node scripts/ai-image/generate-and-post.js <prompt> <tweet-text>');
    console.log('');
    console.log('Example:');
    console.log('  node scripts/ai-image/generate-and-post.js \\');
    console.log('    "Modern tech event flyer for AI Meets Web3" \\');
    console.log('    "🤖 Event announcement! #AIMarketing"');
    console.log('');
    console.log('Note: Image generation via Hugging Face MCP must be done through Claude Code.');
    console.log('This script is designed to work after Claude Code generates the image.');
    process.exit(1);
  }

  const [imagePrompt, tweetText] = args;

  console.log('🚀 AI Image Generation + Twitter Posting Workflow\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('📋 Prompt:', imagePrompt);
  console.log('📝 Tweet:', tweetText);
  console.log('');

  // Step 1: Generate image via Hugging Face MCP (through Claude Code)
  console.log('⚠️  IMPORTANT: Image generation via Hugging Face MCP');
  console.log('    This script requires Claude Code to generate the image first.');
  console.log('');
  console.log('    Ask Claude Code:');
  console.log(`    "Generate an image: ${imagePrompt}"`);
  console.log('');
  console.log('    Then provide the generated image path when prompted.');
  console.log('');

  // For now, this is a placeholder for future integration
  // In the future, we could integrate with MCP SDK to call Hugging Face directly

  const imagePath = args[2]; // Optional third argument for image path

  if (!imagePath) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('💡 Workflow:');
    console.log('   1. Ask Claude Code to generate the image with your prompt');
    console.log('   2. Once generated, run this command again with the image path:');
    console.log('');
    console.log(`      node scripts/ai-image/generate-and-post.js \\`);
    console.log(`        "${imagePrompt}" \\`);
    console.log(`        "${tweetText}" \\`);
    console.log(`        ./temp/generated/your-image.png`);
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    process.exit(0);
  }

  // Step 2: Verify image exists
  console.log(`📁 Checking image: ${imagePath}`);

  if (!fs.existsSync(imagePath)) {
    console.error(`❌ Image not found: ${imagePath}`);
    console.error('Please provide a valid image path.');
    process.exit(1);
  }

  console.log('✅ Image found!\n');

  // Step 3: Post to Twitter
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('📱 Posting to Twitter...\n');

  await postTweetWithImage(tweetText, imagePath);

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Complete! Image generated and posted to Twitter.');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Run main function
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
