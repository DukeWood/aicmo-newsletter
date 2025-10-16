#!/usr/bin/env node

/**
 * Quick LinkedIn Posting Script
 * Convenience wrapper for posting to LinkedIn
 * Similar to tweet.js for easy command-line posting
 */

const { postText } = require('./post-to-linkedin.cjs');

async function main() {
  const text = process.argv.slice(2).join(' ');

  if (!text) {
    console.log('📘 Quick LinkedIn Post\n');
    console.log('Usage:');
    console.log('  node post-linkedin-direct.js "Your post text here"\n');
    console.log('Examples:');
    console.log('  node post-linkedin-direct.js "Excited to share our latest blog post! #Marketing"');
    console.log('  node post-linkedin-direct.js "New product launch coming soon 🚀 #ProductLaunch"\n');
    console.log('Note: Authenticate first with: node scripts/social/linkedin-oauth.js\n');
    process.exit(1);
  }

  try {
    await postText(text);
    process.exit(0);
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

main();
