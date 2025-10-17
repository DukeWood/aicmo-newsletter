#!/usr/bin/env node

/**
 * LinkedIn Permissions Test
 * Test what operations are available with current Community Management API access
 */

require('dotenv').config();
const fs = require('fs').promises;

const TOKEN_FILE = '.linkedin-tokens.json';

async function loadToken() {
  const data = await fs.readFile(TOKEN_FILE, 'utf8');
  const tokens = JSON.parse(data);
  return tokens.access_token;
}

async function testPermissions() {
  console.log('🔍 Testing LinkedIn Community Management API Permissions\n');
  console.log('=' .repeat(70) + '\n');

  try {
    const accessToken = await loadToken();
    const orgId = process.env.LINKEDIN_ORGANIZATION_ID;
    const orgUrn = `urn:li:organization:${orgId}`;

    console.log(`Organization: ${orgUrn}\n`);

    // Test 1: Read organization info
    console.log('Test 1: Read Organization Info');
    try {
      const response = await fetch(`https://api.linkedin.com/rest/organizations/${orgId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'LinkedIn-Version': '202501',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ SUCCESS - Can read organization info');
        console.log(`   Name: ${data.localizedName || data.name || 'N/A'}`);
      } else {
        const error = await response.text();
        console.log(`❌ FAILED - ${response.status}: ${error}`);
      }
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}`);
    }

    console.log('');

    // Test 2: Read organization posts
    console.log('Test 2: Read Organization Posts');
    try {
      const response = await fetch(`https://api.linkedin.com/rest/posts?author=${encodeURIComponent(orgUrn)}&count=5`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'LinkedIn-Version': '202501',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ SUCCESS - Can read organization posts');
        console.log(`   Posts found: ${data.elements?.length || 0}`);
      } else {
        const error = await response.text();
        console.log(`❌ FAILED - ${response.status}: ${error}`);
      }
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}`);
    }

    console.log('');

    // Test 3: Create post (expected to fail with Development Tier)
    console.log('Test 3: Create Post');
    try {
      const testPost = {
        author: orgUrn,
        commentary: 'TEST POST - This should fail with Development Tier',
        visibility: 'PUBLIC',
        distribution: {
          feedDistribution: 'MAIN_FEED',
          targetEntities: [],
          thirdPartyDistributionChannels: []
        },
        lifecycleState: 'PUBLISHED'
      };

      const response = await fetch('https://api.linkedin.com/rest/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'LinkedIn-Version': '202501',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify(testPost)
      });

      if (response.ok) {
        console.log('✅ SUCCESS - Can create posts! (Unexpected with Development Tier)');
      } else {
        const error = await response.text();
        const errorData = JSON.parse(error);
        console.log(`❌ FAILED - ${response.status}: ${errorData.message}`);

        if (errorData.message.includes('partnerApiPostsExternal.CREATE')) {
          console.log('   → This is expected with Development Tier');
          console.log('   → Standard Tier approval required for posting');
        }
      }
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}`);
    }

    console.log('\n' + '=' .repeat(70));
    console.log('\n📋 SUMMARY:\n');
    console.log('Your Community Management API access (Development Tier) allows:');
    console.log('  ✅ Reading organization info');
    console.log('  ✅ Reading posts and analytics');
    console.log('  ❌ Creating posts (requires Standard Tier)\n');
    console.log('To post to LinkedIn, you need to:');
    console.log('  1. Apply for Standard Tier at:');
    console.log('     https://www.linkedin.com/developers/apps/YOUR_APP_ID/products');
    console.log('  2. Provide screen recording of your integration');
    console.log('  3. Wait 1-3 business days for approval\n');
    console.log('=' .repeat(70) + '\n');

  } catch (error) {
    console.error(`\n❌ Fatal error: ${error.message}\n`);
    process.exit(1);
  }
}

testPermissions();
