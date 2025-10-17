#!/usr/bin/env node

/**
 * LinkedIn Legacy ugcPosts API Test
 * Try posting using the deprecated v2 ugcPosts endpoint
 * This may work with Development Tier permissions
 */

require('dotenv').config();
const fs = require('fs').promises;

const TOKEN_FILE = '.linkedin-tokens.json';

/**
 * Load access token from file
 */
async function loadToken() {
  try {
    const data = await fs.readFile(TOKEN_FILE, 'utf8');
    const tokens = JSON.parse(data);

    // Check if token is expired
    const now = Date.now();
    if (tokens.expiresAt && now >= tokens.expiresAt) {
      throw new Error('Access token has expired. Run: node scripts/social/linkedin-oauth.cjs');
    }

    return tokens.access_token;

  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('Not authenticated. Run: node scripts/social/linkedin-oauth.cjs');
    }
    throw error;
  }
}

/**
 * Get organization URN
 */
function getOrganizationURN() {
  const orgId = process.env.LINKEDIN_ORGANIZATION_ID;

  if (!orgId) {
    throw new Error('LINKEDIN_ORGANIZATION_ID not set in .env file');
  }

  return `urn:li:organization:${orgId}`;
}

/**
 * Post using legacy ugcPosts API (v2)
 */
async function postTextLegacy(text) {
  console.log('💼 Testing LinkedIn Legacy API (ugcPosts)...\n');

  try {
    const accessToken = await loadToken();
    const authorURN = getOrganizationURN();

    console.log(`📊 Using organization: ${authorURN}\n`);

    // Legacy ugcPosts request format
    const postData = {
      author: authorURN,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: text
          },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };

    console.log('📝 Post content:');
    console.log(`"${text}"`);
    console.log(`\n📊 Character count: ${text.length}/3000`);
    console.log('');

    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Legacy API failed: ${response.status} ${error}`);
    }

    const result = await response.json();

    console.log('✅ Post published successfully via legacy API!\n');
    console.log(`📊 Post ID: ${result.id}`);
    console.log('🔗 View your post on LinkedIn.com in your feed\n');

    return {
      success: true,
      postId: result.id,
      text: text,
      method: 'legacy-ugcPosts'
    };

  } catch (error) {
    console.error(`❌ Error posting via legacy API: ${error.message}\n`);
    throw error;
  }
}

// CLI Handler
async function main() {
  const text = process.argv.slice(2).join(' ');

  if (!text) {
    console.log('📘 LinkedIn Legacy API Test\n');
    console.log('Usage:');
    console.log('  node post-linkedin-legacy.cjs "Your post text here"\n');
    console.log('This tests the deprecated ugcPosts API which may work with Development Tier.\n');
    process.exit(1);
  }

  try {
    await postTextLegacy(text);
    process.exit(0);
  } catch (error) {
    console.error(`\n❌ Test failed: ${error.message}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { postTextLegacy };
