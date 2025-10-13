#!/usr/bin/env node

/**
 * Convenience wrapper for Twitter posting
 * Simple command-line interface for quick tweets
 */

require('dotenv').config();
const { postTweet } = require('./post-tweet-direct.js');

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('📘 Quick Twitter Posting\n');
    console.log('Usage:');
    console.log('  tweet "Your message here"\n');
    console.log('Examples:');
    console.log('  tweet "Just shipped a new feature! 🚀"');
    console.log('  tweet "Check out our latest newsletter at https://ai.cmo.so/newsletter #AIMarketing"\n');
    console.log('Tips:');
    console.log('  - Keep it under 280 characters');
    console.log('  - Use 1-2 emojis maximum');
    console.log('  - Include 2-3 relevant hashtags');
    console.log('  - Add a link for traffic\n');
    process.exit(1);
  }

  const text = args.join(' ');

  try {
    await postTweet(text);
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
