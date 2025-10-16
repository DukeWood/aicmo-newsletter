#!/usr/bin/env node

/**
 * Cross-Post Newsletter to Social Media
 * Automatically posts newsletter content to Twitter/X and LinkedIn
 * Generates platform-specific content from newsletter markdown
 */

require('dotenv').config();
const fs = require('fs').promises;
const yaml = require('yaml-front-matter');
const { postTweet, postThread } = require('./post-to-twitter.cjs');
const { postText: postToLinkedIn } = require('./post-to-linkedin.cjs');

/**
 * Parse newsletter file and extract key content
 * @param {string} newsletterPath - Path to newsletter markdown file
 * @returns {Promise<object>} Parsed newsletter data
 */
async function parseNewsletter(newsletterPath) {
  console.log(`📰 Parsing newsletter: ${newsletterPath}\n`);

  const content = await fs.readFile(newsletterPath, 'utf8');
  const parsed = yaml.loadFront(content);

  // Extract key sections
  const title = parsed.title || 'Newsletter';
  const issue = parsed.issue || '01';
  const previewText = parsed.preview_text || '';

  // Extract TL;DR
  const tldrMatch = parsed.__content.match(/\*\*📊 TL;DR:\*\*\s+(.+?)(?:\n\n)/s);
  const tldr = tldrMatch ? tldrMatch[1].trim() : '';

  // Extract key stats/data points
  const statsMatches = parsed.__content.match(/- \*\*(.+?)\*\*/g) || [];
  const keyStats = statsMatches.slice(0, 5).map(s => s.replace(/- \*\*(.+?)\*\*/, '$1'));

  console.log(`✅ Parsed: "${title}" (Issue #${issue})\n`);

  return {
    title,
    issue,
    previewText,
    tldr,
    keyStats,
    fullContent: parsed.__content
  };
}

/**
 * Generate Twitter thread from newsletter
 * @param {object} newsletter - Parsed newsletter data
 * @returns {string[]} Array of tweet texts for thread
 */
function generateTwitterThread(newsletter) {
  console.log('🐦 Generating Twitter thread...\n');

  const tweets = [];

  // Tweet 1: Hook + Title
  tweets.push(
    `🚀 New from aiCMO:\n\n"${newsletter.title}"\n\n${newsletter.previewText}\n\n🧵 Key insights below 👇`
  );

  // Tweet 2: TL;DR
  if (newsletter.tldr) {
    const tldrTweet = `📊 TL;DR:\n\n${newsletter.tldr.substring(0, 240)}`;
    tweets.push(tldrTweet);
  }

  // Tweet 3-5: Key Stats (if available)
  if (newsletter.keyStats.length > 0) {
    const statsTweet = `📈 Key data:\n\n${newsletter.keyStats.slice(0, 3).map((stat, i) => `${i + 1}. ${stat}`).join('\n')}`;
    if (statsTweet.length <= 280) {
      tweets.push(statsTweet);
    }
  }

  // Final Tweet: CTA
  tweets.push(
    `Want the full breakdown?\n\n✉️ Read the complete newsletter:\nhttps://ai.cmo.so/newsletter/issue-${newsletter.issue}\n\n💡 Subscribe: https://ai.cmo.so/subscribe`
  );

  console.log(`✅ Generated thread with ${tweets.length} tweets\n`);

  return tweets;
}

/**
 * Generate LinkedIn post from newsletter
 * @param {object} newsletter - Parsed newsletter data
 * @returns {string} LinkedIn post text
 */
function generateLinkedInPost(newsletter) {
  console.log('💼 Generating LinkedIn post...\n');

  const post = `📰 New from aiCMO: ${newsletter.title}

${newsletter.tldr}

${newsletter.keyStats.length > 0 ? `\n📊 Key insights:\n${newsletter.keyStats.slice(0, 4).map(s => `• ${s}`).join('\n')}` : ''}

This is part of our weekly newsletter series on AI-first marketing strategies for challenger brands.

Read the full issue: https://ai.cmo.so/newsletter/issue-${newsletter.issue}

#AIMarketing #GEO #MarketingStrategy #AIFirst`;

  console.log(`✅ Generated LinkedIn post (${post.length} characters)\n`);

  return post;
}

/**
 * Cross-post newsletter to all platforms
 * @param {string} newsletterPath - Path to newsletter markdown file
 * @param {object} options - Posting options
 */
async function crossPost(newsletterPath, options = {}) {
  const {
    platforms = ['twitter', 'linkedin'],
    dryRun = false
  } = options;

  console.log('🌐 Cross-Posting Newsletter to Social Media\n');
  console.log('=' .repeat(60));
  console.log(`Newsletter: ${newsletterPath}`);
  console.log(`Platforms: ${platforms.join(', ')}`);
  console.log(`Dry Run: ${dryRun ? 'Yes (preview only)' : 'No (will post)'}`);
  console.log('=' .repeat(60));
  console.log('');

  try {
    // Parse newsletter
    const newsletter = await parseNewsletter(newsletterPath);

    const results = {};

    // Twitter/X
    if (platforms.includes('twitter')) {
      console.log('\n🐦 TWITTER/X:\n');
      const twitterThread = generateTwitterThread(newsletter);

      console.log('Preview of Twitter thread:');
      twitterThread.forEach((tweet, i) => {
        console.log(`\nTweet ${i + 1}/${twitterThread.length}:`);
        console.log(`"${tweet}"`);
        console.log(`(${tweet.length} characters)`);
      });

      if (!dryRun) {
        console.log('\n📤 Posting thread to Twitter...');
        results.twitter = await postThread(twitterThread);
      } else {
        console.log('\n⏸️  Dry run - skipping actual post');
        results.twitter = { status: 'dry_run', tweets: twitterThread };
      }
    }

    // LinkedIn
    if (platforms.includes('linkedin')) {
      console.log('\n\n💼 LINKEDIN:\n');
      const linkedinPost = generateLinkedInPost(newsletter);

      console.log('Preview of LinkedIn post:');
      console.log(`\n"${linkedinPost}"\n`);
      console.log(`(${linkedinPost.length} characters)`);

      if (!dryRun) {
        try {
          console.log('\n📤 Posting to LinkedIn...');
          results.linkedin = await postToLinkedIn(linkedinPost);
        } catch (error) {
          console.log(`\n⚠️  LinkedIn posting failed: ${error.message}`);
          console.log('   Tip: Authenticate first with: node scripts/social/linkedin-oauth.js');
          results.linkedin = { status: 'error', error: error.message, post: linkedinPost };
        }
      } else {
        console.log('\n⏸️  Dry run - skipping actual post');
        results.linkedin = { status: 'dry_run', post: linkedinPost };
      }
    }

    // Save results
    const resultsFile = `${newsletterPath.replace('.md', '')}-social-posts.json`;
    await fs.writeFile(resultsFile, JSON.stringify(results, null, 2));

    console.log('\n\n' + '='.repeat(60));
    console.log('✅ Cross-posting complete!');
    console.log(`📄 Results saved to: ${resultsFile}`);
    console.log('=' .repeat(60) + '\n');

    return results;

  } catch (error) {
    console.error(`\n❌ Error during cross-posting: ${error.message}\n`);
    throw error;
  }
}

// CLI Handler
async function main() {
  const args = process.argv.slice(2);
  const newsletterPath = args[0] || 'campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md';
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const twitterOnly = args.includes('--twitter');
  const linkedinOnly = args.includes('--linkedin');

  let platforms = ['twitter', 'linkedin'];
  if (twitterOnly) platforms = ['twitter'];
  if (linkedinOnly) platforms = ['linkedin'];

  try {
    await crossPost(newsletterPath, { platforms, dryRun });
  } catch (error) {
    console.error(`\nFatal error: ${error.message}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  console.log('📘 Newsletter Cross-Posting Tool\n');
  console.log('Usage:');
  console.log('  node cross-post-newsletter.js [newsletter-path] [options]\n');
  console.log('Options:');
  console.log('  --dry-run, -d    Preview posts without actually posting');
  console.log('  --twitter        Post to Twitter/X only');
  console.log('  --linkedin       Post to LinkedIn only\n');
  console.log('Examples:');
  console.log('  node cross-post-newsletter.js --dry-run');
  console.log('  node cross-post-newsletter.js campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md');
  console.log('  node cross-post-newsletter.js --twitter --dry-run\n');

  main();
}

module.exports = { crossPost, parseNewsletter, generateTwitterThread, generateLinkedInPost };
