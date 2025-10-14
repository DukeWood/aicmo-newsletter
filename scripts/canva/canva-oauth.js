#!/usr/bin/env node

/**
 * Canva OAuth 2.0 Authentication Helper
 *
 * Handles OAuth flow for Canva Connect API with PKCE (Proof Key for Code Exchange)
 * Stores tokens securely for reuse across scripts
 *
 * Usage:
 *   node scripts/canva/canva-oauth.js
 *
 * Follow the prompts to complete OAuth flow and generate access/refresh tokens
 */

import 'dotenv/config';
import express from 'express';
import crypto from 'crypto';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import open from 'open';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CLIENT_ID = process.env.CANVA_CLIENT_ID;
const CLIENT_SECRET = process.env.CANVA_CLIENT_SECRET;
const REDIRECT_URI = process.env.CANVA_REDIRECT_URI || 'http://127.0.0.1:3001/oauth/redirect';
const TOKEN_FILE = path.join(__dirname, '../../.canva-tokens.json');

// Canva OAuth endpoints
const CANVA_AUTH_URL = 'https://www.canva.com/api/oauth/authorize';
const CANVA_TOKEN_URL = 'https://api.canva.com/rest/v1/oauth/token';

// Required scopes for newsletter design automation
const SCOPES = [
  'design:content:read',
  'design:content:write',
  'design:meta:read',
  'asset:read',
  'asset:write',
  'profile:read'
];

// Validate environment variables
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ Error: Missing Canva credentials in .env file');
  console.error('');
  console.error('Required environment variables:');
  console.error('  CANVA_CLIENT_ID=your-client-id');
  console.error('  CANVA_CLIENT_SECRET=your-client-secret');
  console.error('  CANVA_REDIRECT_URI=http://localhost:3001/oauth/redirect (optional)');
  console.error('');
  console.error('Get credentials from: https://www.canva.com/developers/');
  process.exit(1);
}

/**
 * Generate PKCE code verifier and challenge
 */
function generatePKCE() {
  const codeVerifier = crypto.randomBytes(32).toString('base64url');
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');

  return { codeVerifier, codeChallenge };
}

/**
 * Generate state parameter for CSRF protection
 */
function generateState() {
  return crypto.randomBytes(16).toString('hex');
}

/**
 * Save tokens to file
 */
function saveTokens(tokens) {
  const data = {
    ...tokens,
    timestamp: new Date().toISOString(),
    expiresAt: new Date(Date.now() + tokens.expires_in * 1000).toISOString()
  };

  fs.writeFileSync(TOKEN_FILE, JSON.stringify(data, null, 2));
  console.log(`✅ Tokens saved to: ${TOKEN_FILE}`);
}

/**
 * Load tokens from file
 */
function loadTokens() {
  if (!fs.existsSync(TOKEN_FILE)) {
    return null;
  }

  try {
    const data = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
    return data;
  } catch (error) {
    console.error('❌ Error loading tokens:', error.message);
    return null;
  }
}

/**
 * Check if tokens are expired
 */
function isTokenExpired(tokens) {
  if (!tokens || !tokens.expiresAt) {
    return true;
  }

  const expiresAt = new Date(tokens.expiresAt);
  const now = new Date();

  // Consider expired if less than 5 minutes remaining
  return (expiresAt - now) < 5 * 60 * 1000;
}

/**
 * Refresh access token using refresh token
 */
async function refreshAccessToken(refreshToken) {
  console.log('🔄 Refreshing access token...');

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  });

  try {
    const response = await fetch(CANVA_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token refresh failed: ${error}`);
    }

    const tokens = await response.json();
    saveTokens(tokens);

    console.log('✅ Access token refreshed successfully');
    return tokens;
  } catch (error) {
    console.error('❌ Error refreshing token:', error.message);
    throw error;
  }
}

/**
 * Exchange authorization code for access token
 */
async function exchangeCodeForToken(code, codeVerifier) {
  console.log('🔄 Exchanging authorization code for access token...');

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    code_verifier: codeVerifier,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  });

  try {
    const response = await fetch(CANVA_TOKEN_URL, {
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
    saveTokens(tokens);

    console.log('✅ Access token obtained successfully');
    console.log(`📊 Token expires in: ${tokens.expires_in} seconds (${Math.round(tokens.expires_in / 60)} minutes)`);

    return tokens;
  } catch (error) {
    console.error('❌ Error exchanging code for token:', error.message);
    throw error;
  }
}

/**
 * Start OAuth flow
 */
async function startOAuthFlow() {
  console.log('🚀 Starting Canva OAuth flow...');
  console.log('');

  // Generate PKCE and state
  const { codeVerifier, codeChallenge } = generatePKCE();
  const state = generateState();

  // Build authorization URL
  const authParams = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(' '),
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    state: state,
    response_type: 'code'
  });

  const authUrl = `${CANVA_AUTH_URL}?${authParams.toString()}`;

  console.log('📋 Authorization URL:');
  console.log(authUrl);
  console.log('');

  // Create Express server to handle callback
  const app = express();
  let server;

  return new Promise((resolve, reject) => {
    app.get('/oauth/redirect', async (req, res) => {
      const { code, state: returnedState, error } = req.query;

      // Handle errors
      if (error) {
        res.send(`
          <html>
            <body style="font-family: sans-serif; padding: 40px; text-align: center;">
              <h1 style="color: red;">❌ Authorization Failed</h1>
              <p>Error: ${error}</p>
              <p>You can close this window.</p>
            </body>
          </html>
        `);
        server.close();
        reject(new Error(`Authorization failed: ${error}`));
        return;
      }

      // Verify state (CSRF protection)
      if (returnedState !== state) {
        res.send(`
          <html>
            <body style="font-family: sans-serif; padding: 40px; text-align: center;">
              <h1 style="color: red;">❌ Security Error</h1>
              <p>State mismatch detected. Possible CSRF attack.</p>
              <p>You can close this window.</p>
            </body>
          </html>
        `);
        server.close();
        reject(new Error('State mismatch - possible CSRF attack'));
        return;
      }

      // Exchange code for token
      try {
        const tokens = await exchangeCodeForToken(code, codeVerifier);

        res.send(`
          <html>
            <body style="font-family: sans-serif; padding: 40px; text-align: center;">
              <h1 style="color: green;">✅ Authorization Successful!</h1>
              <p>You can now close this window and return to the terminal.</p>
              <hr>
              <p style="font-size: 12px; color: #666;">
                Access token expires in ${Math.round(tokens.expires_in / 60)} minutes
              </p>
            </body>
          </html>
        `);

        server.close();
        resolve(tokens);
      } catch (error) {
        res.send(`
          <html>
            <body style="font-family: sans-serif; padding: 40px; text-align: center;">
              <h1 style="color: red;">❌ Token Exchange Failed</h1>
              <p>${error.message}</p>
              <p>You can close this window.</p>
            </body>
          </html>
        `);
        server.close();
        reject(error);
      }
    });

    // Start server
    const PORT = 3001;
    server = app.listen(PORT, () => {
      console.log(`🌐 Local OAuth server listening on http://localhost:${PORT}`);
      console.log('');
      console.log('👉 Opening browser for authorization...');
      console.log('   If browser doesn\'t open, visit the URL above manually.');
      console.log('');

      // Open browser
      open(authUrl).catch(() => {
        console.log('⚠️  Could not open browser automatically.');
        console.log('   Please visit the authorization URL above manually.');
      });
    });
  });
}

/**
 * Get valid access token (load from file, refresh if needed, or run OAuth flow)
 */
export async function getAccessToken() {
  // Load existing tokens
  const tokens = loadTokens();

  // Check if tokens exist and are valid
  if (tokens && !isTokenExpired(tokens)) {
    console.log('✅ Using cached access token');
    return tokens.access_token;
  }

  // Try to refresh if refresh token exists
  if (tokens && tokens.refresh_token) {
    try {
      const newTokens = await refreshAccessToken(tokens.refresh_token);
      return newTokens.access_token;
    } catch (error) {
      console.log('⚠️  Token refresh failed, starting new OAuth flow...');
    }
  }

  // Start new OAuth flow
  const newTokens = await startOAuthFlow();
  return newTokens.access_token;
}

/**
 * Main function - run OAuth flow when script is executed directly
 */
async function main() {
  console.log('╔═══════════════════════════════════════════╗');
  console.log('║   Canva OAuth Authentication Helper       ║');
  console.log('╚═══════════════════════════════════════════╝');
  console.log('');

  try {
    const accessToken = await getAccessToken();

    console.log('');
    console.log('╔═══════════════════════════════════════════╗');
    console.log('║   ✅ Authentication Successful!           ║');
    console.log('╚═══════════════════════════════════════════╝');
    console.log('');
    console.log('📝 Your access token is ready to use.');
    console.log(`📁 Tokens saved to: ${TOKEN_FILE}`);
    console.log('');
    console.log('🔐 Access Token (first 20 chars):');
    console.log(`   ${accessToken.substring(0, 20)}...`);
    console.log('');
    console.log('💡 You can now use Canva API in your scripts!');
    console.log('');
  } catch (error) {
    console.error('');
    console.error('╔═══════════════════════════════════════════╗');
    console.error('║   ❌ Authentication Failed                ║');
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
