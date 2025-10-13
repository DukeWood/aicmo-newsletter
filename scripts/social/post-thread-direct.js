#!/usr/bin/env node

/**
 * Direct Twitter Thread Posting
 * Posts multiple connected tweets as a thread using Twitter API v2
 */

require('dotenv').config();
const crypto = require('crypto');
const https = require('https');

/**
 * Generate OAuth 1.0a signature
 */
function generateOAuthSignature(method, url, params, consumerSecret, tokenSecret) {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  const signatureBase = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(sortedParams)}`;
  const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;

  const signature = crypto
    .createHmac('sha1', signingKey)
    .update(signatureBase)
    .digest('base64');

  return signature;
}

/**
 * Post a single tweet (with optional reply_to)
 */
async function postTweet(text, replyToId = null) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.TWITTER_API_KEY;
    const apiSecret = process.env.TWITTER_API_SECRET;
    const accessToken = process.env.TWITTER_ACCESS_TOKEN;
    const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

    if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret) {
      return reject(new Error('Twitter API credentials not configured in .env'));
    }

    if (text.length > 280) {
      return reject(new Error(`Tweet text too long: ${text.length} characters (max 280)`));
    }

    const method = 'POST';
    const url = 'https://api.twitter.com/2/tweets';
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = crypto.randomBytes(32).toString('base64').replace(/\W/g, '');

    const oauthParams = {
      oauth_consumer_key: apiKey,
      oauth_token: accessToken,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: timestamp,
      oauth_nonce: nonce,
      oauth_version: '1.0'
    };

    const signature = generateOAuthSignature(method, url, oauthParams, apiSecret, accessTokenSecret);
    oauthParams.oauth_signature = signature;

    const authHeader = 'OAuth ' + Object.keys(oauthParams)
      .map(key => `${encodeURIComponent(key)}="${encodeURIComponent(oauthParams[key])}"`)
      .join(', ');

    const bodyData = { text };
    if (replyToId) {
      bodyData.reply = { in_reply_to_tweet_id: replyToId };
    }

    const body = JSON.stringify(bodyData);

    const options = {
      hostname: 'api.twitter.com',
      path: '/2/tweets',
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (res.statusCode === 201) {
            resolve(response);
          } else {
            reject(new Error(`Twitter API error: ${res.statusCode} - ${JSON.stringify(response)}`));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(body);
    req.end();
  });
}

/**
 * Post a thread of connected tweets
 */
async function postThread(tweets) {
  console.log(`🧵 Posting Twitter thread (${tweets.length} tweets)...\n`);

  const results = [];
  let previousTweetId = null;

  for (let i = 0; i < tweets.length; i++) {
    const text = tweets[i];

    console.log(`📝 Tweet ${i + 1}/${tweets.length}:`);
    console.log(`"${text}"`);
    console.log(`📊 Character count: ${text.length}/280\n`);

    try {
      const result = await postTweet(text, previousTweetId);
      previousTweetId = result.data.id;

      console.log(`✅ Tweet ${i + 1} posted successfully!`);
      console.log(`📊 Tweet ID: ${result.data.id}`);
      console.log(`🔗 Tweet URL: https://twitter.com/user/status/${result.data.id}\n`);

      results.push(result);

      // Wait between tweets
      if (i < tweets.length - 1) {
        console.log('⏱️  Waiting 2 seconds before next tweet...\n');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`❌ Failed to post tweet ${i + 1}: ${error.message}\n`);
      throw error;
    }
  }

  console.log(`\n🎉 Thread posted successfully!`);
  console.log(`📊 Total tweets: ${results.length}`);
  console.log(`🔗 First tweet: https://twitter.com/user/status/${results[0].data.id}\n`);

  return results;
}

// CLI Handler
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('📘 Twitter Thread Posting\n');
    console.log('Usage:');
    console.log('  node post-thread-direct.js thread.json\n');
    console.log('JSON Format:');
    console.log('  {');
    console.log('    "tweets": [');
    console.log('      "First tweet in thread",');
    console.log('      "Second tweet in thread",');
    console.log('      "Third tweet in thread"');
    console.log('    ]');
    console.log('  }\n');
    console.log('Example:');
    console.log('  node post-thread-direct.js my-thread.json\n');
    process.exit(1);
  }

  const threadFile = args[0];

  try {
    const fs = require('fs').promises;
    const content = await fs.readFile(threadFile, 'utf8');
    const data = JSON.parse(content);

    if (!data.tweets || !Array.isArray(data.tweets)) {
      throw new Error('JSON file must contain a "tweets" array');
    }

    if (data.tweets.length === 0) {
      throw new Error('Thread must contain at least one tweet');
    }

    await postThread(data.tweets);
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { postThread };
