#!/usr/bin/env node

/**
 * Direct Twitter API v2 Posting
 * Posts tweets directly using Twitter API v2 with OAuth 1.0a
 */

require('dotenv').config();
const crypto = require('crypto');
const https = require('https');

/**
 * Generate OAuth 1.0a signature
 */
function generateOAuthSignature(method, url, params, consumerSecret, tokenSecret) {
  // Sort parameters
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  // Create signature base string
  const signatureBase = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(sortedParams)}`;

  // Create signing key
  const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;

  // Generate signature
  const signature = crypto
    .createHmac('sha1', signingKey)
    .update(signatureBase)
    .digest('base64');

  return signature;
}

/**
 * Post tweet using Twitter API v2
 */
async function postTweet(text) {
  return new Promise((resolve, reject) => {
    console.log('🐦 Posting to Twitter/X...\n');

    // Validate credentials
    const apiKey = process.env.TWITTER_API_KEY;
    const apiSecret = process.env.TWITTER_API_SECRET;
    const accessToken = process.env.TWITTER_ACCESS_TOKEN;
    const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

    if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret) {
      return reject(new Error('Twitter API credentials not configured in .env'));
    }

    // Validate text length
    if (text.length > 280) {
      return reject(new Error(`Tweet text too long: ${text.length} characters (max 280)`));
    }

    console.log('📝 Tweet content:');
    console.log(`"${text}"`);
    console.log(`\n📊 Character count: ${text.length}/280\n`);

    // OAuth 1.0a parameters
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

    // Generate signature
    const signature = generateOAuthSignature(method, url, oauthParams, apiSecret, accessTokenSecret);
    oauthParams.oauth_signature = signature;

    // Build Authorization header
    const authHeader = 'OAuth ' + Object.keys(oauthParams)
      .map(key => `${encodeURIComponent(key)}="${encodeURIComponent(oauthParams[key])}"`)
      .join(', ');

    // Request body
    const body = JSON.stringify({ text });

    // Make request
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

    console.log('🚀 Sending request to Twitter API...\n');

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (res.statusCode === 201) {
            console.log('✅ Tweet posted successfully!\n');
            console.log('📊 Tweet ID:', response.data.id);
            console.log('🔗 Tweet URL:', `https://twitter.com/user/status/${response.data.id}\n`);
            resolve(response);
          } else {
            console.error('❌ Twitter API error:', res.statusCode);
            console.error('Response:', JSON.stringify(response, null, 2), '\n');
            reject(new Error(`Twitter API error: ${res.statusCode} - ${JSON.stringify(response)}`));
          }
        } catch (error) {
          console.error('❌ Failed to parse response:', data, '\n');
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request failed:', error.message, '\n');
      reject(error);
    });

    req.write(body);
    req.end();
  });
}

// CLI Handler
async function main() {
  const args = process.argv.slice(2);
  const text = args.join(' ');

  if (!text) {
    console.log('📘 Direct Twitter Posting Script\n');
    console.log('Usage:');
    console.log('  node post-tweet-direct.js "Your tweet text here"\n');
    console.log('Example:');
    console.log('  node post-tweet-direct.js "Test tweet from aiCMO! 🚀 #AIMarketing"\n');
    process.exit(1);
  }

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

module.exports = { postTweet };
