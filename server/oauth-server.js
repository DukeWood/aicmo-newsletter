#!/usr/bin/env node

/**
 * Canva OAuth Server (Production-Ready)
 *
 * Minimal Express server to handle Canva OAuth callbacks
 * Deploy this to Vercel, Railway, or any hosting service
 *
 * Environment Variables Required:
 *   CANVA_CLIENT_ID - Your Canva Client ID
 *   CANVA_CLIENT_SECRET - Your Canva Client Secret
 *   FRONTEND_URL - Your frontend URL (optional)
 *
 * Usage:
 *   Local: node server/oauth-server.js
 *   Production: Deploy with environment variables configured
 */

import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration
const CLIENT_ID = process.env.CANVA_CLIENT_ID;
const CLIENT_SECRET = process.env.CANVA_CLIENT_SECRET;
const CANVA_TOKEN_URL = 'https://api.canva.com/rest/v1/oauth/token';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// In-memory storage for PKCE code verifiers
// In production, use Redis or database
const codeVerifiers = new Map();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Root endpoint - Health check
 */
app.get('/', (req, res) => {
  res.json({
    service: 'aiCMO Canva OAuth Server',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      authorize: '/oauth/authorize',
      callback: '/oauth/redirect'
    }
  });
});

/**
 * Health check endpoint for monitoring
 */
app.get('/health', (req, res) => {
  const isConfigured = CLIENT_ID && CLIENT_SECRET;
  res.status(isConfigured ? 200 : 500).json({
    status: isConfigured ? 'healthy' : 'misconfigured',
    configured: isConfigured,
    timestamp: new Date().toISOString()
  });
});

/**
 * Initiate OAuth flow
 * Visit this endpoint to start authorization
 */
app.get('/oauth/authorize', (req, res) => {
  console.log('🚀 Starting OAuth authorization flow');

  // Validate configuration
  if (!CLIENT_ID || !CLIENT_SECRET) {
    return res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Configuration Error</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              max-width: 600px;
              margin: 100px auto;
              padding: 40px;
              text-align: center;
            }
            h1 { color: #d32f2f; }
            .error {
              background: #ffebee;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <h1>❌ Configuration Error</h1>
          <div class="error">
            <p><strong>Missing environment variables:</strong></p>
            <ul>
              ${!CLIENT_ID ? '<li>CANVA_CLIENT_ID</li>' : ''}
              ${!CLIENT_SECRET ? '<li>CANVA_CLIENT_SECRET</li>' : ''}
            </ul>
            <p>Please configure these variables before deploying.</p>
          </div>
        </body>
      </html>
    `);
  }

  // Generate PKCE parameters
  const state = crypto.randomBytes(16).toString('hex');
  const codeVerifier = crypto.randomBytes(32).toString('base64url');
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');

  // Store code verifier for later verification
  codeVerifiers.set(state, {
    verifier: codeVerifier,
    timestamp: Date.now()
  });

  // Clean up old verifiers (older than 10 minutes)
  const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
  for (const [key, value] of codeVerifiers.entries()) {
    if (value.timestamp < tenMinutesAgo) {
      codeVerifiers.delete(key);
    }
  }

  // Required scopes for newsletter automation
  const scopes = [
    'design:content:read',
    'design:content:write',
    'design:meta:read',
    'asset:read',
    'asset:write',
    'profile:read'
  ];

  // Build authorization URL
  const redirectUri = `${req.protocol}://${req.get('host')}/oauth/redirect`;
  const authUrl = new URL('https://www.canva.com/api/oauth/authorize');
  authUrl.searchParams.set('client_id', CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', scopes.join(' '));
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('response_type', 'code');

  console.log('  Redirect URI:', redirectUri);
  console.log('  State:', state);

  // Redirect to Canva authorization page
  res.redirect(authUrl.toString());
});

/**
 * OAuth callback endpoint
 * Canva redirects here after user authorization
 */
app.get('/oauth/redirect', async (req, res) => {
  const { code, state, error } = req.query;

  console.log('📥 OAuth callback received');
  console.log('  Code:', code ? '✓ present' : '✗ missing');
  console.log('  State:', state);
  console.log('  Error:', error || 'none');

  // Handle authorization errors
  if (error) {
    console.error('❌ Authorization error:', error);
    return res.status(400).send(renderErrorPage(
      'Authorization Failed',
      `Canva returned an error: ${error}`,
      'The user may have declined authorization or an error occurred.'
    ));
  }

  // Verify authorization code
  if (!code) {
    console.error('❌ Missing authorization code');
    return res.status(400).send(renderErrorPage(
      'Missing Authorization Code',
      'No authorization code received from Canva.',
      'Please try the authorization flow again.'
    ));
  }

  // Verify state and get code verifier
  const storedData = codeVerifiers.get(state);
  if (!storedData) {
    console.error('❌ Invalid state parameter:', state);
    return res.status(400).send(renderErrorPage(
      'Invalid State Parameter',
      'The state parameter is invalid or expired.',
      'This may be a CSRF attack or the session expired. Please try again.'
    ));
  }

  const codeVerifier = storedData.verifier;
  codeVerifiers.delete(state); // Clean up

  try {
    // Exchange authorization code for access token
    console.log('🔄 Exchanging authorization code for access token...');

    const redirectUri = `${req.protocol}://${req.get('host')}/oauth/redirect`;
    const tokenResponse = await fetch(CANVA_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        code_verifier: codeVerifier,
        redirect_uri: redirectUri,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      }).toString()
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('❌ Token exchange failed:', errorText);
      throw new Error(`Token exchange failed: ${errorText}`);
    }

    const tokens = await tokenResponse.json();
    console.log('✅ Tokens obtained successfully');
    console.log('  Access token:', tokens.access_token.substring(0, 20) + '...');
    console.log('  Expires in:', tokens.expires_in, 'seconds');

    // Success! Return tokens to user
    res.send(renderSuccessPage(tokens));

  } catch (error) {
    console.error('❌ Error during token exchange:', error);
    res.status(500).send(renderErrorPage(
      'Token Exchange Failed',
      error.message,
      'An error occurred while exchanging the authorization code for tokens.'
    ));
  }
});

/**
 * Render success page with tokens
 */
function renderSuccessPage(tokens) {
  const tokenData = {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    token_type: tokens.token_type,
    expires_in: tokens.expires_in,
    timestamp: new Date().toISOString(),
    expiresAt: new Date(Date.now() + tokens.expires_in * 1000).toISOString()
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Authorization Successful</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          h1 { color: #2e7d32; margin-top: 0; }
          h2 { color: #333; font-size: 18px; margin-top: 30px; }
          .success-box {
            background: #e8f5e9;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #2e7d32;
          }
          .token-box {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 6px;
            margin: 10px 0;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 12px;
            word-break: break-all;
            max-height: 150px;
            overflow-y: auto;
            border: 1px solid #ddd;
          }
          .warning-box {
            background: #fff3e0;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #f57c00;
          }
          .warning-box ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          .copy-button {
            background: #1976d2;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin-top: 5px;
          }
          .copy-button:hover {
            background: #1565c0;
          }
          .back-button {
            display: inline-block;
            background: #1976d2;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 20px;
          }
          .back-button:hover {
            background: #1565c0;
          }
          pre {
            margin: 0;
            white-space: pre-wrap;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>✅ Authorization Successful!</h1>

          <div class="success-box">
            <p><strong>Your Canva integration is now authorized.</strong></p>
            <p>Access and refresh tokens have been generated successfully.</p>
          </div>

          <h2>📋 Save These Tokens</h2>
          <p>Copy the JSON below and save it to <code>.canva-tokens.json</code> in your project root:</p>

          <div class="token-box" id="tokenJson"><pre>${JSON.stringify(tokenData, null, 2)}</pre></div>
          <button class="copy-button" onclick="copyTokens()">📋 Copy to Clipboard</button>

          <div class="warning-box">
            <p><strong>⚠️ Important Security Notes:</strong></p>
            <ul>
              <li>Save these tokens immediately - they won't be shown again</li>
              <li>Access token expires in <strong>${Math.round(tokens.expires_in / 60)} minutes</strong></li>
              <li>Use refresh token to get new access tokens when expired</li>
              <li><strong>Never commit tokens to git or share publicly</strong></li>
              <li>Ensure <code>.canva-tokens.json</code> is in your <code>.gitignore</code></li>
            </ul>
          </div>

          <h2>🚀 Next Steps</h2>
          <ol>
            <li>Copy the JSON above</li>
            <li>Save to <code>.canva-tokens.json</code> in your project root</li>
            <li>Run your Canva scripts - they'll automatically use these tokens</li>
            <li>Tokens will auto-refresh when they expire</li>
          </ol>

          <a href="${FRONTEND_URL}" class="back-button">← Back to Dashboard</a>
        </div>

        <script>
          function copyTokens() {
            const text = document.getElementById('tokenJson').innerText;
            navigator.clipboard.writeText(text).then(() => {
              const button = event.target;
              button.textContent = '✅ Copied!';
              setTimeout(() => {
                button.textContent = '📋 Copy to Clipboard';
              }, 2000);
            });
          }
        </script>
      </body>
    </html>
  `;
}

/**
 * Render error page
 */
function renderErrorPage(title, message, details) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 600px;
            margin: 100px auto;
            padding: 40px;
            text-align: center;
            background: #f5f5f5;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          h1 { color: #d32f2f; }
          .error-box {
            background: #ffebee;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: left;
            border-left: 4px solid #d32f2f;
          }
          .back-button {
            display: inline-block;
            background: #1976d2;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>❌ ${title}</h1>
          <div class="error-box">
            <p><strong>${message}</strong></p>
            <p>${details}</p>
          </div>
          <a href="/oauth/authorize" class="back-button">Try Again</a>
        </div>
      </body>
    </html>
  `;
}

// Start server
const server = app.listen(PORT, () => {
  console.log('╔═══════════════════════════════════════════╗');
  console.log('║   Canva OAuth Server                      ║');
  console.log('╚═══════════════════════════════════════════╝');
  console.log('');
  console.log(`🌐 Server running on port ${PORT}`);
  console.log('');
  console.log('📍 Endpoints:');
  console.log(`   GET  /                    - Service info`);
  console.log(`   GET  /health              - Health check`);
  console.log(`   GET  /oauth/authorize     - Start OAuth flow`);
  console.log(`   GET  /oauth/redirect      - OAuth callback`);
  console.log('');
  console.log('⚙️  Configuration:');
  console.log(`   Client ID: ${CLIENT_ID ? '✅ Configured' : '❌ Missing'}`);
  console.log(`   Client Secret: ${CLIENT_SECRET ? '✅ Configured' : '❌ Missing'}`);
  console.log('');

  if (process.env.NODE_ENV === 'production') {
    console.log('🚀 Running in PRODUCTION mode');
  } else {
    console.log('🛠️  Running in DEVELOPMENT mode');
    console.log('');
    console.log('👉 Test OAuth flow:');
    console.log(`   Open: http://localhost:${PORT}/oauth/authorize`);
  }
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM received: closing server...');
  server.close(() => {
    console.log('✅ Server closed gracefully');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n⚠️  SIGINT received: closing server...');
  server.close(() => {
    console.log('✅ Server closed gracefully');
    process.exit(0);
  });
});

export default app;
