#!/usr/bin/env node

/**
 * LinkedIn Posts API Integration
 * Post text and image content to LinkedIn using Community Management API
 * Requires authentication via linkedin-oauth.js first
 */

require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');

const TOKEN_FILE = '.linkedin-tokens.json';
const LINKEDIN_API_VERSION = '202501'; // January 2025

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
      throw new Error('Access token has expired. Run: node scripts/social/linkedin-oauth.js');
    }

    return tokens.access_token;

  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('Not authenticated. Run: node scripts/social/linkedin-oauth.js');
    }
    throw error;
  }
}

/**
 * Get organization URN (for Community Management API)
 * Uses LINKEDIN_ORGANIZATION_ID from environment variables
 */
async function getOrganizations(accessToken) {
  const orgId = process.env.LINKEDIN_ORGANIZATION_ID;

  if (!orgId) {
    throw new Error('LINKEDIN_ORGANIZATION_ID not set in .env file. Please add your organization ID.');
  }

  const orgUrn = `urn:li:organization:${orgId}`;
  console.log(`\n📊 Using organization: ${orgUrn}\n`);

  return orgUrn;
}

/**
 * Get user profile URN (for personal posting - requires different scopes)
 */
async function getUserURN(accessToken) {
  try {
    const response = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get user profile: ${error}`);
    }

    const profile = await response.json();
    // Convert sub to LinkedIn URN format
    return `urn:li:person:${profile.sub}`;

  } catch (error) {
    throw new Error(`Error getting user URN: ${error.message}`);
  }
}

/**
 * Post text to LinkedIn
 */
async function postText(text, options = {}) {
  console.log('💼 Posting to LinkedIn...\n');

  try {
    const accessToken = await loadToken();
    // Use organization URN for Community Management API
    const authorURN = await getOrganizations(accessToken);

    const postData = {
      author: authorURN,
      commentary: text,
      visibility: options.visibility || 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: []
      },
      lifecycleState: 'PUBLISHED'
    };

    console.log('📝 Post content:');
    console.log(`"${text}"`);
    console.log(`\n📊 Character count: ${text.length}/3000`);
    console.log('');

    const response = await fetch('https://api.linkedin.com/rest/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'LinkedIn-Version': LINKEDIN_API_VERSION,
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Post failed: ${response.status} ${error}`);
    }

    // Get post ID from response header
    const postId = response.headers.get('x-restli-id');

    console.log('✅ Post published successfully!\n');
    console.log(`📊 Post ID: ${postId}`);

    // Note: LinkedIn doesn't provide direct post URLs via API
    // Users can view their posts in their LinkedIn feed
    console.log('🔗 View your post on LinkedIn.com in your feed\n');

    return {
      success: true,
      postId: postId,
      text: text
    };

  } catch (error) {
    console.error(`❌ Error posting to LinkedIn: ${error.message}\n`);
    throw error;
  }
}

/**
 * Upload image to LinkedIn
 */
async function uploadImage(imagePath, accessToken, authorURN) {
  console.log(`📤 Uploading image: ${imagePath}...`);

  try {
    // Step 1: Register upload
    const registerResponse = await fetch('https://api.linkedin.com/rest/images?action=initializeUpload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'LinkedIn-Version': LINKEDIN_API_VERSION,
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify({
        initializeUploadRequest: {
          owner: authorURN
        }
      })
    });

    if (!registerResponse.ok) {
      const error = await registerResponse.text();
      throw new Error(`Image registration failed: ${error}`);
    }

    const registerData = await registerResponse.json();
    const uploadUrl = registerData.value.uploadUrl;
    const imageURN = registerData.value.image;

    // Step 2: Upload image binary
    const imageBuffer = await fs.readFile(imagePath);

    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/octet-stream'
      },
      body: imageBuffer
    });

    if (!uploadResponse.ok) {
      const error = await uploadResponse.text();
      throw new Error(`Image upload failed: ${error}`);
    }

    console.log(`✅ Image uploaded: ${imageURN}\n`);
    return imageURN;

  } catch (error) {
    throw new Error(`Error uploading image: ${error.message}`);
  }
}

/**
 * Post image with text to LinkedIn
 */
async function postImage(text, imagePath, options = {}) {
  console.log('💼 Posting image to LinkedIn...\n');

  try {
    const accessToken = await loadToken();
    // Use organization URN for Community Management API
    const authorURN = await getOrganizations(accessToken);

    // Upload image first
    const imageURN = await uploadImage(imagePath, accessToken, authorURN);

    const postData = {
      author: authorURN,
      commentary: text,
      visibility: options.visibility || 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: []
      },
      content: {
        media: {
          id: imageURN
        }
      },
      lifecycleState: 'PUBLISHED'
    };

    console.log('📝 Post content:');
    console.log(`"${text}"`);
    console.log(`📷 Image: ${path.basename(imagePath)}`);
    console.log('');

    const response = await fetch('https://api.linkedin.com/rest/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'LinkedIn-Version': LINKEDIN_API_VERSION,
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Post failed: ${response.status} ${error}`);
    }

    const postId = response.headers.get('x-restli-id');

    console.log('✅ Image post published successfully!\n');
    console.log(`📊 Post ID: ${postId}`);
    console.log('🔗 View your post on LinkedIn.com in your feed\n');

    return {
      success: true,
      postId: postId,
      text: text,
      image: imagePath
    };

  } catch (error) {
    console.error(`❌ Error posting image to LinkedIn: ${error.message}\n`);
    throw error;
  }
}

/**
 * Post article to LinkedIn
 */
async function postArticle(articleData, options = {}) {
  console.log('💼 Posting article to LinkedIn...\n');

  try {
    const accessToken = await loadToken();
    // Use organization URN for Community Management API
    const authorURN = await getOrganizations(accessToken);

    const postData = {
      author: authorURN,
      commentary: articleData.commentary || '',
      visibility: options.visibility || 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: []
      },
      content: {
        article: {
          source: articleData.url,
          title: articleData.title,
          description: articleData.description,
          thumbnail: articleData.thumbnailUrl || undefined
        }
      },
      lifecycleState: 'PUBLISHED'
    };

    console.log('📝 Article details:');
    console.log(`   Title: ${articleData.title}`);
    console.log(`   URL: ${articleData.url}`);
    console.log('');

    const response = await fetch('https://api.linkedin.com/rest/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'LinkedIn-Version': LINKEDIN_API_VERSION,
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Article post failed: ${response.status} ${error}`);
    }

    const postId = response.headers.get('x-restli-id');

    console.log('✅ Article post published successfully!\n');
    console.log(`📊 Post ID: ${postId}`);
    console.log('🔗 View your post on LinkedIn.com in your feed\n');

    return {
      success: true,
      postId: postId,
      article: articleData
    };

  } catch (error) {
    console.error(`❌ Error posting article to LinkedIn: ${error.message}\n`);
    throw error;
  }
}

// CLI Handler
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.log('📘 LinkedIn Posting Tool\n');
    console.log('Usage:');
    console.log('  node post-to-linkedin.js text "Your post text here"');
    console.log('  node post-to-linkedin.js image "Caption text" /path/to/image.jpg');
    console.log('  node post-to-linkedin.js article "Commentary" "https://example.com" "Article Title"\n');
    console.log('Examples:');
    console.log('  node post-to-linkedin.js text "New blog post out now! #Marketing"');
    console.log('  node post-to-linkedin.js image "Check out this infographic!" ./image.png');
    console.log('\nAuthentication:');
    console.log('  Run: node scripts/social/linkedin-oauth.js\n');
    process.exit(1);
  }

  try {
    let result;

    switch (command) {
      case 'text':
        if (!args[1]) {
          throw new Error('Text content required');
        }
        result = await postText(args[1]);
        break;

      case 'image':
        if (!args[1] || !args[2]) {
          throw new Error('Text and image path required');
        }
        result = await postImage(args[1], args[2]);
        break;

      case 'article':
        if (!args[1] || !args[2] || !args[3]) {
          throw new Error('Commentary, URL, and title required');
        }
        result = await postArticle({
          commentary: args[1],
          url: args[2],
          title: args[3],
          description: args[4] || ''
        });
        break;

      default:
        throw new Error(`Unknown command: ${command}`);
    }

    console.log('🎉 Success!\n');
    process.exit(0);

  } catch (error) {
    console.error(`\nFatal error: ${error.message}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { postText, postImage, postArticle, loadToken, getOrganizations, getUserURN };
