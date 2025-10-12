#!/usr/bin/env node

/**
 * Post to Twitter/X
 * Creates tweets from newsletter content or custom messages
 * Uses @mbelinky/x-mcp-server via Twitter API
 */

require('dotenv').config();
const fs = require('fs').promises;

/**
 * Post a single tweet
 * @param {string} text - Tweet text (max 280 characters)
 * @param {string[]} mediaUrls - Optional array of image URLs
 * @returns {Promise<object>} Tweet response data
 */
async function postTweet(text, mediaUrls = []) {
  console.log('🐦 Posting to Twitter/X...\n');

  // Validate text length
  if (text.length > 280) {
    throw new Error(`Tweet text too long: ${text.length} characters (max 280)`);
  }

  // Check if Twitter credentials are configured
  const requiredEnvVars = [
    'TWITTER_API_KEY',
    'TWITTER_API_SECRET',
    'TWITTER_ACCESS_TOKEN',
    'TWITTER_ACCESS_TOKEN_SECRET'
  ];

  const missing = requiredEnvVars.filter(envVar => !process.env[envVar] || process.env[envVar].startsWith('your-'));

  if (missing.length > 0) {
    console.error('❌ Missing Twitter API credentials:');
    missing.forEach(envVar => console.error(`   - ${envVar}`));
    console.error('\nPlease configure these in your .env file.');
    console.error('Get credentials at: https://developer.twitter.com\n');
    throw new Error('Twitter API credentials not configured');
  }

  console.log('📝 Tweet content:');
  console.log(`"${text}"`);
  console.log(`\n📊 Character count: ${text.length}/280`);

  if (mediaUrls.length > 0) {
    console.log(`\n🖼️  Media attachments: ${mediaUrls.length}`);
    mediaUrls.forEach((url, i) => console.log(`   ${i + 1}. ${url}`));
  }

  // NOTE: Actual posting requires MCP server integration
  // This is a template - actual implementation would use MCP protocol
  console.log('\n⚠️  NOTE: This script requires MCP server to be running');
  console.log('   Twitter MCP server: npx -y @mbelinky/x-mcp-server');
  console.log('   See SOCIAL_MEDIA_SETUP.md for configuration\n');

  // Placeholder for MCP integration
  const tweetData = {
    text,
    mediaUrls,
    status: 'pending_mcp_integration',
    timestamp: new Date().toISOString()
  };

  console.log('✅ Tweet prepared successfully\n');

  return tweetData;
}

/**
 * Post a thread (multiple connected tweets)
 * @param {string[]} tweets - Array of tweet texts
 * @returns {Promise<object[]>} Array of tweet responses
 */
async function postThread(tweets) {
  console.log(`🧵 Posting Twitter thread (${tweets.length} tweets)...\n`);

  const results = [];

  for (let i = 0; i < tweets.length; i++) {
    console.log(`Tweet ${i + 1}/${tweets.length}:`);
    const result = await postTweet(tweets[i]);
    results.push(result);

    // Add slight delay between tweets in a thread
    if (i < tweets.length - 1) {
      console.log('⏱️  Waiting 2 seconds before next tweet...\n');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log(`✅ Thread of ${tweets.length} tweets prepared\n`);

  return results;
}

/**
 * Generate tweet from newsletter content
 * @param {string} newsletterPath - Path to newsletter markdown file
 * @returns {Promise<string>} Generated tweet text
 */
async function generateTweetFromNewsletter(newsletterPath) {
  console.log(`📰 Generating tweet from newsletter: ${newsletterPath}\n`);

  try {
    const content = await fs.readFile(newsletterPath, 'utf8');

    // Extract title (first # heading)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : 'New Newsletter';

    // Extract TL;DR or first paragraph
    const tldrMatch = content.match(/\*\*TL;DR:\*\*\s+(.+?)(?:\n\n|\*\*)/s);
    const summary = tldrMatch ? tldrMatch[1].trim().substring(0, 200) : '';

    // Generate tweet
    const tweet = `${title}\n\n${summary}...\n\nRead more: https://ai.cmo.so/newsletter`;

    console.log('✅ Tweet generated from newsletter\n');

    return tweet;
  } catch (error) {
    console.error(`❌ Error reading newsletter: ${error.message}\n`);
    throw error;
  }
}

// CLI Handler
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    if (command === 'tweet') {
      // Post a single tweet
      const text = args[1];
      if (!text) {
        console.error('❌ Please provide tweet text');
        console.log('\nUsage: node post-to-twitter.js tweet "Your tweet text here"\n');
        process.exit(1);
      }
      await postTweet(text);

    } else if (command === 'thread') {
      // Post a thread from JSON file
      const threadFile = args[1];
      if (!threadFile) {
        console.error('❌ Please provide thread JSON file path');
        console.log('\nUsage: node post-to-twitter.js thread path/to/thread.json\n');
        process.exit(1);
      }
      const threadData = JSON.parse(await fs.readFile(threadFile, 'utf8'));
      await postThread(threadData.tweets);

    } else if (command === 'newsletter') {
      // Generate and post tweet from newsletter
      const newsletterPath = args[1] || 'campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md';
      const tweetText = await generateTweetFromNewsletter(newsletterPath);
      await postTweet(tweetText);

    } else {
      console.log('📘 Twitter/X Posting Script\n');
      console.log('Usage:');
      console.log('  node post-to-twitter.js tweet "Your tweet text"');
      console.log('  node post-to-twitter.js thread path/to/thread.json');
      console.log('  node post-to-twitter.js newsletter [path/to/newsletter.md]\n');
      console.log('Examples:');
      console.log('  node post-to-twitter.js tweet "Check out our latest newsletter! 🚀"');
      console.log('  node post-to-twitter.js newsletter campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md\n');
    }
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { postTweet, postThread, generateTweetFromNewsletter };
