#!/usr/bin/env node

/**
 * LinkedIn OAuth 2.0 Authentication
 * Implements 3-legged OAuth flow for Community Management API
 * Saves access token to .linkedin-tokens.json for use by posting scripts
 */

require('dotenv').config();
const http = require('http');
const { parse } = require('url');
const crypto = require('crypto');
const fs = require('fs').promises;

// LinkedIn OAuth Configuration
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:3001/oauth/redirect';
// Community Management API scopes (new scopes as of June 2023)
// Note: Community Management API only provides organization scopes, not openid/profile
const SCOPES = 'w_organization_social_feed r_organization_social_feed'; // Required for organization posting

const TOKEN_FILE = '.linkedin-tokens.json';

/**
 * Generate random state for CSRF protection
 */
function generateState() {
  return crypto.randomBytes(16).toString('hex');
}

/**
 * Save tokens to file
 */
async function saveTokens(tokens) {
  const data = {
    ...tokens,
    timestamp: Date.now(),
    expiresAt: Date.now() + (tokens.expires_in * 1000)
  };
  await fs.writeFile(TOKEN_FILE, JSON.stringify(data, null, 2));
  console.log(`✅ Tokens saved to ${TOKEN_FILE}`);
}

/**
 * Exchange authorization code for access token
 */
async function exchangeCodeForToken(code) {
  console.log('\n🔄 Exchanging authorization code for access token...\n');

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI,
    client_id: LINKEDIN_CLIENT_ID,
    client_secret: LINKEDIN_CLIENT_SECRET
  });

  try {
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    const tokens = await response.json();
    console.log('✅ Access token received!');
    console.log(`   Expires in: ${tokens.expires_in} seconds (${Math.floor(tokens.expires_in / 60)} minutes)`);

    return tokens;

  } catch (error) {
    console.error(`❌ Error exchanging code for token: ${error.message}`);
    throw error;
  }
}

/**
 * Get LinkedIn user profile
 */
async function getUserProfile(accessToken) {
  console.log('\n👤 Fetching user profile...\n');

  try {
    const response = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Profile fetch failed: ${error}`);
    }

    const profile = await response.json();
    console.log('✅ Profile fetched successfully!');
    console.log(`   Name: ${profile.name}`);
    console.log(`   Email: ${profile.email}`);
    console.log(`   Sub (User ID): ${profile.sub}`);

    return profile;

  } catch (error) {
    console.error(`❌ Error fetching profile: ${error.message}`);
    throw error;
  }
}

/**
 * Start OAuth flow
 */
async function authenticate() {
  console.log('🔐 LinkedIn OAuth 2.0 Authentication\n');
  console.log('=' .repeat(60));
  console.log(`Client ID: ${LINKEDIN_CLIENT_ID}`);
  console.log(`Redirect URI: ${REDIRECT_URI}`);
  console.log(`Scopes: ${SCOPES}`);
  console.log('=' .repeat(60));
  console.log('');

  const state = generateState();
  let server;

  return new Promise((resolve, reject) => {
    // Create HTTP server to receive OAuth callback
    server = http.createServer(async (req, res) => {
      const { pathname, query } = parse(req.url, true);

      if (pathname === '/oauth/redirect') {
        // Check for errors
        if (query.error) {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end(`
            <html>
              <body style="font-family: Arial; padding: 40px; text-align: center;">
                <h1 style="color: #d32f2f;">❌ Authorization Failed</h1>
                <p>Error: ${query.error}</p>
                <p>Description: ${query.error_description || 'No description'}</p>
                <p>You can close this window.</p>
              </body>
            </html>
          `);
          server.close();
          reject(new Error(`OAuth error: ${query.error}`));
          return;
        }

        // Verify state
        if (query.state !== state) {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end(`
            <html>
              <body style="font-family: Arial; padding: 40px; text-align: center;">
                <h1 style="color: #d32f2f;">❌ Invalid State</h1>
                <p>CSRF validation failed. Please try again.</p>
                <p>You can close this window.</p>
              </body>
            </html>
          `);
          server.close();
          reject(new Error('Invalid state parameter'));
          return;
        }

        // Exchange code for token
        try {
          const tokens = await exchangeCodeForToken(query.code);

          // Skip profile fetch for Community Management API (doesn't have user profile access)
          // We'll get organization info when posting instead

          // Save tokens without profile info
          await saveTokens({
            ...tokens,
            note: 'Community Management API - Use organization pages for posting'
          });

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <html>
              <body style="font-family: Arial; padding: 40px; text-align: center;">
                <h1 style="color: #0a66c2;">✅ Authentication Successful!</h1>
                <p>LinkedIn Community Management API is now connected to aiCMO.</p>
                <p>You can now post to your organization pages!</p>
                <p style="margin-top: 40px; color: #666;">You can close this window and return to the terminal.</p>
              </body>
            </html>
          `);

          server.close();
          resolve(tokens);

        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end(`
            <html>
              <body style="font-family: Arial; padding: 40px; text-align: center;">
                <h1 style="color: #d32f2f;">❌ Authentication Error</h1>
                <p>${error.message}</p>
                <p>You can close this window.</p>
              </body>
            </html>
          `);
          server.close();
          reject(error);
        }
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(3001, () => {
      console.log('🌐 OAuth server started on http://localhost:3001\n');

      // Build authorization URL
      const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('client_id', LINKEDIN_CLIENT_ID);
      authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
      authUrl.searchParams.append('state', state);
      authUrl.searchParams.append('scope', SCOPES);

      console.log('🔓 Opening LinkedIn authorization page in your browser...\n');
      console.log('If the browser does not open automatically, visit this URL:');
      console.log(`\n${authUrl.toString()}\n`);
      console.log('=' .repeat(60));
      console.log('');

      // Open browser (dynamic import for ESM package)
      import('open').then(({ default: open }) => {
        return open(authUrl.toString());
      }).catch((error) => {
        console.error('⚠️  Could not open browser automatically.');
        console.log('Please copy and paste the URL above into your browser.\n');
      });
    });

    // Timeout after 5 minutes
    setTimeout(() => {
      server.close();
      reject(new Error('Authentication timeout'));
    }, 5 * 60 * 1000);
  });
}

// Main execution
async function main() {
  try {
    const tokens = await authenticate();

    console.log('\n\n' + '='.repeat(60));
    console.log('🎉 LinkedIn Authentication Complete!');
    console.log('=' .repeat(60));
    console.log('');
    console.log('Next steps:');
    console.log('  1. Test posting: node scripts/social/post-linkedin-direct.js "Test post"');
    console.log('  2. Cross-post newsletter: node scripts/social/cross-post-newsletter.js --linkedin');
    console.log('');
    console.log(`Token expires in: ${Math.floor(tokens.expires_in / 60)} minutes`);
    console.log('Run this script again when the token expires.');
    console.log('=' .repeat(60) + '\n');

  } catch (error) {
    console.error(`\n❌ Authentication failed: ${error.message}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { authenticate, saveTokens };
