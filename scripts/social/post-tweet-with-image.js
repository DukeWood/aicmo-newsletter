#!/usr/bin/env node

/**
 * Post Tweet with Image to Twitter/X
 *
 * Posts a tweet with an attached image using Twitter API v2
 *
 * Usage:
 *   node scripts/social/post-tweet-with-image.js "Tweet text" ./path/to/image.png
 *
 * Example:
 *   node scripts/social/post-tweet-with-image.js "Check out our event!" ./temp/event-flyer.png
 */

import 'dotenv/config';
import fs from 'fs';
import { TwitterApi } from 'twitter-api-v2';

// Twitter API credentials from environment
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

/**
 * Upload media to Twitter
 */
async function uploadMedia(imagePath) {
  console.log(`📤 Uploading media: ${imagePath}`);

  if (!fs.existsSync(imagePath)) {
    throw new Error(`Image file not found: ${imagePath}`);
  }

  const mediaId = await client.v1.uploadMedia(imagePath);
  console.log(`✅ Media uploaded: ${mediaId}`);

  return mediaId;
}

/**
 * Post tweet with media
 */
async function postTweetWithMedia(tweetText, mediaId) {
  console.log(`📝 Posting tweet with media...`);

  const tweet = await client.v2.tweet({
    text: tweetText,
    media: {
      media_ids: [mediaId]
    }
  });

  console.log(`✅ Tweet posted successfully!`);
  console.log(`📊 Tweet ID: ${tweet.data.id}`);
  console.log(`🔗 Tweet URL: https://twitter.com/user/status/${tweet.data.id}`);

  return tweet;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('❌ Error: Missing arguments');
    console.error('');
    console.error('Usage:');
    console.error('  node scripts/social/post-tweet-with-image.js "Tweet text" ./path/to/image.png');
    console.error('');
    console.error('Example:');
    console.error('  node scripts/social/post-tweet-with-image.js "Check out our event! 🚀" ./temp/event-flyer.png');
    console.error('');
    process.exit(1);
  }

  const tweetText = args[0];
  const imagePath = args[1];

  console.log('╔═══════════════════════════════════════════╗');
  console.log('║   Twitter Post with Image                 ║');
  console.log('╚═══════════════════════════════════════════╝');
  console.log('');
  console.log(`📝 Tweet text: ${tweetText}`);
  console.log(`🖼️  Image: ${imagePath}`);
  console.log('');

  try {
    // Upload media
    const mediaId = await uploadMedia(imagePath);
    console.log('');

    // Post tweet
    const tweet = await postTweetWithMedia(tweetText, mediaId);
    console.log('');

    console.log('╔═══════════════════════════════════════════╗');
    console.log('║   ✅ Tweet Posted Successfully!           ║');
    console.log('╚═══════════════════════════════════════════╝');
    console.log('');

    return tweet;

  } catch (error) {
    console.error('');
    console.error('╔═══════════════════════════════════════════╗');
    console.error('║   ❌ Failed to Post Tweet                 ║');
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
  uploadMedia,
  postTweetWithMedia
};
