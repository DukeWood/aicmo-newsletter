#!/usr/bin/env node

/**
 * LinkedIn Read Posts Tool
 * Fetch and display organization posts using Development Tier permissions
 * Requires: r_organization_social_feed scope
 */

require('dotenv').config();
const fs = require('fs').promises;
const { loadToken, getOrganizations } = require('./post-to-linkedin.cjs');

const LINKEDIN_API_VERSION = '202501';

/**
 * Fetch organization posts
 * @param {object} options - Query options
 * @returns {Promise<Array>} Array of posts
 */
async function getPosts(options = {}) {
  const {
    count = 10,
    start = 0,
    sortBy = 'LAST_MODIFIED'
  } = options;

  console.log('\n📊 Fetching LinkedIn Posts...\n');

  try {
    const accessToken = await loadToken();
    const organizationUrn = await getOrganizations(accessToken);

    // Extract organization ID from URN
    const orgId = organizationUrn.replace('urn:li:organization:', '');

    // Fetch posts for the organization
    const url = new URL('https://api.linkedin.com/rest/posts');
    url.searchParams.append('author', organizationUrn);
    url.searchParams.append('q', 'author');
    url.searchParams.append('count', count);
    url.searchParams.append('start', start);
    url.searchParams.append('sortBy', sortBy);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'LinkedIn-Version': LINKEDIN_API_VERSION,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch posts: ${response.status} ${error}`);
    }

    const data = await response.json();
    const posts = data.elements || [];

    console.log(`✅ Found ${posts.length} posts\n`);

    return posts;

  } catch (error) {
    console.error(`❌ Error fetching posts: ${error.message}\n`);
    throw error;
  }
}

/**
 * Get post analytics/metrics
 * @param {string} postUrn - Post URN
 * @returns {Promise<object>} Post statistics
 */
async function getPostAnalytics(postUrn) {
  try {
    const accessToken = await loadToken();

    // Note: This endpoint may require additional permissions
    const url = `https://api.linkedin.com/rest/posts/${encodeURIComponent(postUrn)}/statistics`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'LinkedIn-Version': LINKEDIN_API_VERSION,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });

    if (!response.ok) {
      // Analytics may not be available in Development Tier
      return null;
    }

    const stats = await response.json();
    return stats;

  } catch (error) {
    // Silently fail if analytics not available
    return null;
  }
}

/**
 * Format timestamp
 */
function formatTimestamp(timestamp) {
  if (!timestamp) return 'Unknown';

  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

/**
 * Display post in formatted output
 */
function displayPost(post, index) {
  const commentary = post.commentary || '(No text)';
  const published = post.publishedAt || post.createdAt || Date.now();
  const visibility = post.visibility || 'PUBLIC';
  const postId = post.id || 'unknown';

  console.log(`\x1b[1m─── Post #${index + 1} ───\x1b[0m`);
  console.log(`\x1b[90mID:\x1b[0m ${postId}`);
  console.log(`\x1b[90mPublished:\x1b[0m ${formatTimestamp(published)}`);
  console.log(`\x1b[90mVisibility:\x1b[0m ${visibility}`);
  console.log('');

  // Display commentary (truncate if too long)
  const lines = commentary.split('\n');
  const preview = lines.slice(0, 5).join('\n');
  const truncated = lines.length > 5 || preview.length > 300;

  if (truncated) {
    console.log(preview.substring(0, 300) + '...');
  } else {
    console.log(preview);
  }

  // Display content type
  if (post.content) {
    if (post.content.media) {
      console.log('\n\x1b[36m📷 Media attached\x1b[0m');
    }
    if (post.content.article) {
      console.log(`\n\x1b[36m📄 Article: ${post.content.article.title || post.content.article.source}\x1b[0m`);
    }
  }

  // Display metrics if available
  if (post.statistics) {
    const stats = post.statistics;
    console.log(`\n\x1b[32m👍 ${stats.numLikes || 0} likes  💬 ${stats.numComments || 0} comments  🔄 ${stats.numShares || 0} shares\x1b[0m`);
  }

  console.log('\n');
}

/**
 * Display posts summary
 */
async function displayPosts(options = {}) {
  const posts = await getPosts(options);

  if (posts.length === 0) {
    console.log('📭 No posts found\n');
    return posts;
  }

  console.log('\x1b[1m═══════════════════════════════════════════════════════════\x1b[0m');
  console.log(`\x1b[1mOrganization Posts (${posts.length} shown)\x1b[0m`);
  console.log('\x1b[1m═══════════════════════════════════════════════════════════\x1b[0m\n');

  posts.forEach((post, index) => {
    displayPost(post, index);
  });

  console.log('\x1b[1m═══════════════════════════════════════════════════════════\x1b[0m\n');

  return posts;
}

/**
 * Export posts to JSON
 */
async function exportPosts(filePath, options = {}) {
  console.log(`\n💾 Exporting posts to: ${filePath}\n`);

  const posts = await getPosts(options);

  // Add analytics if available
  for (const post of posts) {
    const analytics = await getPostAnalytics(post.id);
    if (analytics) {
      post.analytics = analytics;
    }
  }

  const exportData = {
    exported: new Date().toISOString(),
    count: posts.length,
    options,
    posts
  };

  await fs.writeFile(filePath, JSON.stringify(exportData, null, 2));

  console.log(`✅ Exported ${posts.length} posts to ${filePath}\n`);

  return exportData;
}

/**
 * Search posts by keyword
 */
async function searchPosts(keyword, options = {}) {
  console.log(`\n🔍 Searching for: "${keyword}"\n`);

  const posts = await getPosts({ ...options, count: 50 }); // Fetch more for search

  const matches = posts.filter(post => {
    const commentary = (post.commentary || '').toLowerCase();
    return commentary.includes(keyword.toLowerCase());
  });

  console.log(`✅ Found ${matches.length} matching posts\n`);

  matches.forEach((post, index) => {
    displayPost(post, index);
  });

  return matches;
}

/**
 * Get post statistics summary
 */
async function getPostsSummary(options = {}) {
  const posts = await getPosts({ ...options, count: 50 });

  const summary = {
    totalPosts: posts.length,
    withMedia: 0,
    withArticles: 0,
    totalLikes: 0,
    totalComments: 0,
    totalShares: 0,
    avgCommentary: 0,
    totalChars: 0,
    hashtags: new Set(),
    recentDays: {}
  };

  posts.forEach(post => {
    if (post.content) {
      if (post.content.media) summary.withMedia++;
      if (post.content.article) summary.withArticles++;
    }

    if (post.statistics) {
      summary.totalLikes += post.statistics.numLikes || 0;
      summary.totalComments += post.statistics.numComments || 0;
      summary.totalShares += post.statistics.numShares || 0;
    }

    const commentary = post.commentary || '';
    summary.totalChars += commentary.length;

    // Extract hashtags
    const hashtags = commentary.match(/#\w+/g) || [];
    hashtags.forEach(tag => summary.hashtags.add(tag));

    // Group by day
    const date = new Date(post.publishedAt || post.createdAt).toLocaleDateString();
    summary.recentDays[date] = (summary.recentDays[date] || 0) + 1;
  });

  summary.avgCommentary = posts.length > 0 ? Math.round(summary.totalChars / posts.length) : 0;
  summary.topHashtags = Array.from(summary.hashtags).slice(0, 10);

  console.log('\n\x1b[1m📊 Posts Summary\x1b[0m\n');
  console.log(`Total Posts:        ${summary.totalPosts}`);
  console.log(`Posts with Media:   ${summary.withMedia} (${Math.round(summary.withMedia / summary.totalPosts * 100)}%)`);
  console.log(`Posts with Articles: ${summary.withArticles} (${Math.round(summary.withArticles / summary.totalPosts * 100)}%)`);
  console.log('');
  console.log(`Total Likes:        ${summary.totalLikes}`);
  console.log(`Total Comments:     ${summary.totalComments}`);
  console.log(`Total Shares:       ${summary.totalShares}`);
  console.log('');
  console.log(`Avg Post Length:    ${summary.avgCommentary} characters`);
  console.log(`Total Hashtags:     ${summary.hashtags.size}`);
  console.log(`Top Hashtags:       ${summary.topHashtags.join(', ')}`);
  console.log('');

  return summary;
}

// CLI Handler
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '--help' || command === '-h') {
    console.log('\n📘 LinkedIn Read Posts Tool\n');
    console.log('Usage:');
    console.log('  node linkedin-read-posts.cjs list [--count N]');
    console.log('  node linkedin-read-posts.cjs export output.json [--count N]');
    console.log('  node linkedin-read-posts.cjs search "keyword" [--count N]');
    console.log('  node linkedin-read-posts.cjs summary [--count N]\n');
    console.log('Options:');
    console.log('  --count N    Number of posts to fetch (default: 10, max: 50)');
    console.log('  --start N    Starting index (default: 0)\n');
    console.log('Examples:');
    console.log('  node linkedin-read-posts.cjs list --count 20');
    console.log('  node linkedin-read-posts.cjs export posts.json --count 50');
    console.log('  node linkedin-read-posts.cjs search "marketing" --count 30');
    console.log('  node linkedin-read-posts.cjs summary\n');
    console.log('Authentication:');
    console.log('  Run: node scripts/social/linkedin-oauth.cjs\n');
    process.exit(0);
  }

  try {
    // Parse options
    const countIndex = args.indexOf('--count');
    const startIndex = args.indexOf('--start');
    const count = countIndex >= 0 ? parseInt(args[countIndex + 1]) : 10;
    const start = startIndex >= 0 ? parseInt(args[startIndex + 1]) : 0;

    const options = { count, start };

    switch (command) {
      case 'list':
        await displayPosts(options);
        break;

      case 'export':
        if (!args[1]) {
          throw new Error('Output file path required');
        }
        await exportPosts(args[1], options);
        break;

      case 'search':
        if (!args[1]) {
          throw new Error('Search keyword required');
        }
        await searchPosts(args[1], options);
        break;

      case 'summary':
        await getPostsSummary(options);
        break;

      default:
        // Default to list
        await displayPosts(options);
        break;
    }

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    console.error('Tip: Make sure you\'re authenticated: node scripts/social/linkedin-oauth.cjs\n');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  getPosts,
  getPostAnalytics,
  displayPosts,
  exportPosts,
  searchPosts,
  getPostsSummary
};
