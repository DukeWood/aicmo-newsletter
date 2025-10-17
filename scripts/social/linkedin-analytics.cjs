#!/usr/bin/env node

/**
 * LinkedIn Analytics Dashboard
 * Display page statistics and follower metrics using Development Tier permissions
 * Requires: r_organization_social_feed scope
 */

require('dotenv').config();
const { loadToken, getOrganizations } = require('./post-to-linkedin.cjs');
const { getPosts } = require('./linkedin-read-posts.cjs');

const LINKEDIN_API_VERSION = '202501';

/**
 * Get organization follower statistics
 */
async function getFollowerStats() {
  console.log('\n📊 Fetching follower statistics...\n');

  try {
    const accessToken = await loadToken();
    const organizationUrn = await getOrganizations(accessToken);
    const orgId = organizationUrn.replace('urn:li:organization:', '');

    // Note: This endpoint may require additional permissions or Standard Tier
    const url = `https://api.linkedin.com/rest/organizationalEntityFollowerStatistics?q=organizationalEntity&organizationalEntity=${encodeURIComponent(organizationUrn)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'LinkedIn-Version': LINKEDIN_API_VERSION,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });

    if (!response.ok) {
      const error = await response.text();
      console.log(`⚠️  Follower statistics not available (Development Tier limitation)`);
      console.log(`   Error: ${response.status} - This feature may require Standard Tier\n`);
      return null;
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.log(`⚠️  Error fetching follower stats: ${error.message}\n`);
    return null;
  }
}

/**
 * Get organization page statistics
 */
async function getPageStats(options = {}) {
  const {
    timeGranularity = 'DAY',
    startDate,
    endDate
  } = options;

  console.log('\n📈 Fetching page statistics...\n');

  try {
    const accessToken = await loadToken();
    const organizationUrn = await getOrganizations(accessToken);

    // Calculate date range
    const end = endDate || new Date();
    const start = startDate || new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago

    const url = new URL('https://api.linkedin.com/rest/organizationPageStatistics');
    url.searchParams.append('q', 'organization');
    url.searchParams.append('organization', organizationUrn);
    url.searchParams.append('timeIntervals.timeGranularityType', timeGranularity);
    url.searchParams.append('timeIntervals.timeRange.start', start.getTime());
    url.searchParams.append('timeIntervals.timeRange.end', end.getTime());

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
      console.log(`⚠️  Page statistics not available (Development Tier limitation)`);
      console.log(`   Error: ${response.status} - This feature may require Standard Tier\n`);
      return null;
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.log(`⚠️  Error fetching page stats: ${error.message}\n`);
    return null;
  }
}

/**
 * Analyze posts for manual metrics
 */
async function analyzePostMetrics(days = 30) {
  console.log(`\n📊 Analyzing posts from last ${days} days...\n`);

  try {
    // Fetch recent posts
    const posts = await getPosts({ count: 50, sortBy: 'LAST_MODIFIED' });

    // Filter by date range
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const recentPosts = posts.filter(post => {
      const postDate = new Date(post.publishedAt || post.createdAt);
      return postDate >= cutoffDate;
    });

    console.log(`✅ Found ${recentPosts.length} posts in last ${days} days\n`);

    // Calculate metrics
    const metrics = {
      totalPosts: recentPosts.length,
      totalLikes: 0,
      totalComments: 0,
      totalShares: 0,
      totalEngagement: 0,
      avgEngagement: 0,
      postsWithMedia: 0,
      postsWithArticles: 0,
      topPosts: [],
      postsByDay: {},
      hashtagFrequency: {},
      avgLength: 0,
      totalChars: 0
    };

    recentPosts.forEach(post => {
      // Engagement metrics
      const likes = post.statistics?.numLikes || 0;
      const comments = post.statistics?.numComments || 0;
      const shares = post.statistics?.numShares || 0;
      const engagement = likes + comments * 2 + shares * 3; // Weighted

      metrics.totalLikes += likes;
      metrics.totalComments += comments;
      metrics.totalShares += shares;
      metrics.totalEngagement += engagement;

      // Content type
      if (post.content?.media) metrics.postsWithMedia++;
      if (post.content?.article) metrics.postsWithArticles++;

      // Top posts
      metrics.topPosts.push({
        commentary: (post.commentary || '').substring(0, 100),
        engagement,
        likes,
        comments,
        shares,
        date: new Date(post.publishedAt || post.createdAt)
      });

      // Posts by day
      const day = new Date(post.publishedAt || post.createdAt).toLocaleDateString();
      metrics.postsByDay[day] = (metrics.postsByDay[day] || 0) + 1;

      // Hashtag analysis
      const hashtags = (post.commentary || '').match(/#\w+/g) || [];
      hashtags.forEach(tag => {
        metrics.hashtagFrequency[tag] = (metrics.hashtagFrequency[tag] || 0) + 1;
      });

      // Length
      metrics.totalChars += (post.commentary || '').length;
    });

    // Calculate averages
    if (recentPosts.length > 0) {
      metrics.avgEngagement = Math.round(metrics.totalEngagement / recentPosts.length);
      metrics.avgLength = Math.round(metrics.totalChars / recentPosts.length);
    }

    // Sort top posts
    metrics.topPosts.sort((a, b) => b.engagement - a.engagement);
    metrics.topPosts = metrics.topPosts.slice(0, 5);

    // Top hashtags
    metrics.topHashtags = Object.entries(metrics.hashtagFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));

    return metrics;

  } catch (error) {
    console.error(`❌ Error analyzing posts: ${error.message}\n`);
    throw error;
  }
}

/**
 * Display analytics dashboard
 */
async function displayDashboard(days = 30) {
  console.log('\n\x1b[1m═══════════════════════════════════════════════════════════\x1b[0m');
  console.log(`\x1b[1m        LinkedIn Analytics Dashboard - Last ${days} Days\x1b[0m`);
  console.log('\x1b[1m═══════════════════════════════════════════════════════════\x1b[0m\n');

  // Try to get official stats (may fail on Development Tier)
  const followerStats = await getFollowerStats();
  const pageStats = await getPageStats({ days });

  // Always get post-based metrics (works on Development Tier)
  const metrics = await analyzePostMetrics(days);

  console.log('\x1b[1m📊 Post Activity\x1b[0m');
  console.log('─'.repeat(60));
  console.log(`Total Posts:           ${metrics.totalPosts}`);
  console.log(`Posts with Media:      ${metrics.postsWithMedia} (${metrics.totalPosts > 0 ? Math.round(metrics.postsWithMedia / metrics.totalPosts * 100) : 0}%)`);
  console.log(`Posts with Articles:   ${metrics.postsWithArticles} (${metrics.totalPosts > 0 ? Math.round(metrics.postsWithArticles / metrics.totalPosts * 100) : 0}%)`);
  console.log(`Avg Post Length:       ${metrics.avgLength} characters`);
  console.log('');

  console.log('\x1b[1m💬 Engagement Metrics\x1b[0m');
  console.log('─'.repeat(60));
  console.log(`Total Likes:           ${metrics.totalLikes}`);
  console.log(`Total Comments:        ${metrics.totalComments}`);
  console.log(`Total Shares:          ${metrics.totalShares}`);
  console.log(`Avg Engagement Score:  ${metrics.avgEngagement}`);
  console.log('');

  if (metrics.totalPosts > 0) {
    console.log(`Avg per Post:          ${Math.round(metrics.totalLikes / metrics.totalPosts)} likes, ${Math.round(metrics.totalComments / metrics.totalPosts)} comments, ${Math.round(metrics.totalShares / metrics.totalPosts)} shares`);
    console.log('');
  }

  // Top performing posts
  if (metrics.topPosts.length > 0) {
    console.log('\x1b[1m🏆 Top Performing Posts\x1b[0m');
    console.log('─'.repeat(60));
    metrics.topPosts.forEach((post, index) => {
      console.log(`\n${index + 1}. ${post.commentary}${post.commentary.length >= 100 ? '...' : ''}`);
      console.log(`   \x1b[32m👍 ${post.likes}  💬 ${post.comments}  🔄 ${post.shares}\x1b[0m  (Score: ${post.engagement})`);
      console.log(`   \x1b[90m${post.date.toLocaleDateString()}\x1b[0m`);
    });
    console.log('');
  }

  // Top hashtags
  if (metrics.topHashtags.length > 0) {
    console.log('\x1b[1m#️⃣  Top Hashtags\x1b[0m');
    console.log('─'.repeat(60));
    metrics.topHashtags.forEach((item, index) => {
      console.log(`${index + 1}. ${item.tag} (used ${item.count} times)`);
    });
    console.log('');
  }

  // Posting frequency
  console.log('\x1b[1m📅 Posting Frequency\x1b[0m');
  console.log('─'.repeat(60));
  const dates = Object.keys(metrics.postsByDay).sort().reverse().slice(0, 7);
  if (dates.length > 0) {
    dates.forEach(date => {
      const count = metrics.postsByDay[date];
      const bar = '█'.repeat(count);
      console.log(`${date}: ${bar} (${count})`);
    });
  } else {
    console.log('No recent posts');
  }
  console.log('');

  // Recommendations
  console.log('\x1b[1m💡 Recommendations\x1b[0m');
  console.log('─'.repeat(60));

  if (metrics.postsWithMedia / metrics.totalPosts < 0.5) {
    console.log('• Add more media to posts (images increase engagement by 2-3x)');
  }

  if (metrics.avgLength < 800) {
    console.log('• Increase post length to 800-1200 characters for better reach');
  }

  if (metrics.totalPosts / days < 0.5) {
    console.log(`• Post more frequently (currently ${(metrics.totalPosts / days).toFixed(1)} posts/day)`);
  }

  if (metrics.topHashtags.length < 5) {
    console.log('• Use more diverse hashtags (3-5 per post recommended)');
  }

  if (metrics.totalComments / metrics.totalPosts < 2 && metrics.totalPosts > 0) {
    console.log('• Add questions to posts to encourage comments');
  }

  console.log('');
  console.log('\x1b[1m═══════════════════════════════════════════════════════════\x1b[0m\n');

  return metrics;
}

/**
 * Export analytics to JSON
 */
async function exportAnalytics(filePath, days = 30) {
  console.log(`\n💾 Exporting analytics to: ${filePath}\n`);

  const metrics = await analyzePostMetrics(days);
  const followerStats = await getFollowerStats();
  const pageStats = await getPageStats({ days });

  const exportData = {
    exported: new Date().toISOString(),
    period: `${days} days`,
    metrics,
    followerStats,
    pageStats
  };

  await require('fs').promises.writeFile(filePath, JSON.stringify(exportData, null, 2));

  console.log(`✅ Analytics exported to ${filePath}\n`);

  return exportData;
}

/**
 * Compare metrics across different time periods
 */
async function comparePerformance(period1Days = 7, period2Days = 30) {
  console.log('\n📊 Performance Comparison\n');

  console.log(`Fetching metrics for last ${period1Days} days...`);
  const metrics1 = await analyzePostMetrics(period1Days);

  console.log(`Fetching metrics for last ${period2Days} days...`);
  const metrics2 = await analyzePostMetrics(period2Days);

  console.log('\n\x1b[1m═══ Comparison ═══\x1b[0m\n');
  console.log(`Metric                  | Last ${period1Days} Days | Last ${period2Days} Days | Change`);
  console.log('─'.repeat(70));

  const comparisons = [
    ['Posts', metrics1.totalPosts, metrics2.totalPosts],
    ['Avg Engagement', metrics1.avgEngagement, metrics2.avgEngagement],
    ['Avg Likes', metrics1.totalPosts > 0 ? Math.round(metrics1.totalLikes / metrics1.totalPosts) : 0,
      metrics2.totalPosts > 0 ? Math.round(metrics2.totalLikes / metrics2.totalPosts) : 0],
    ['Avg Comments', metrics1.totalPosts > 0 ? Math.round(metrics1.totalComments / metrics1.totalPosts) : 0,
      metrics2.totalPosts > 0 ? Math.round(metrics2.totalComments / metrics2.totalPosts) : 0],
    ['Avg Length', metrics1.avgLength, metrics2.avgLength]
  ];

  comparisons.forEach(([metric, val1, val2]) => {
    const change = val2 > 0 ? ((val1 - val2) / val2 * 100).toFixed(1) : 0;
    const arrow = change > 0 ? '↑' : change < 0 ? '↓' : '→';
    const color = change > 0 ? '\x1b[32m' : change < 0 ? '\x1b[31m' : '\x1b[90m';

    console.log(`${metric.padEnd(24)}| ${String(val1).padEnd(13)}| ${String(val2).padEnd(14)}| ${color}${arrow} ${Math.abs(change)}%\x1b[0m`);
  });

  console.log('');
}

// CLI Handler
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '--help' || command === '-h') {
    console.log('\n📘 LinkedIn Analytics Dashboard\n');
    console.log('Usage:');
    console.log('  node linkedin-analytics.cjs dashboard [--days N]');
    console.log('  node linkedin-analytics.cjs export output.json [--days N]');
    console.log('  node linkedin-analytics.cjs compare [--period1 N] [--period2 N]\n');
    console.log('Options:');
    console.log('  --days N      Days to analyze (default: 30)');
    console.log('  --period1 N   First period for comparison (default: 7)');
    console.log('  --period2 N   Second period for comparison (default: 30)\n');
    console.log('Examples:');
    console.log('  node linkedin-analytics.cjs dashboard --days 30');
    console.log('  node linkedin-analytics.cjs export analytics.json --days 90');
    console.log('  node linkedin-analytics.cjs compare --period1 7 --period2 30\n');
    console.log('Authentication:');
    console.log('  Run: node scripts/social/linkedin-oauth.cjs\n');
    process.exit(0);
  }

  try {
    // Parse options
    const daysIndex = args.indexOf('--days');
    const period1Index = args.indexOf('--period1');
    const period2Index = args.indexOf('--period2');

    const days = daysIndex >= 0 ? parseInt(args[daysIndex + 1]) : 30;
    const period1 = period1Index >= 0 ? parseInt(args[period1Index + 1]) : 7;
    const period2 = period2Index >= 0 ? parseInt(args[period2Index + 1]) : 30;

    switch (command) {
      case 'dashboard':
        await displayDashboard(days);
        break;

      case 'export':
        if (!args[1]) {
          throw new Error('Output file path required');
        }
        await exportAnalytics(args[1], days);
        break;

      case 'compare':
        await comparePerformance(period1, period2);
        break;

      default:
        // Default to dashboard
        await displayDashboard(days);
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
  getFollowerStats,
  getPageStats,
  analyzePostMetrics,
  displayDashboard,
  exportAnalytics,
  comparePerformance
};
