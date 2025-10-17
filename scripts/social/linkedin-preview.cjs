#!/usr/bin/env node

/**
 * LinkedIn Post Preview Tool
 * Generate visual previews of LinkedIn posts before publishing
 * Works with Development Tier (no posting required)
 */

require('dotenv').config();
const fs = require('fs').promises;

/**
 * Analyze post content and provide recommendations
 */
function analyzePost(text) {
  const analysis = {
    length: text.length,
    maxLength: 3000,
    optimal: text.length >= 800 && text.length <= 1200,
    lines: text.split('\n').length,
    emojis: (text.match(/[\u{1F300}-\u{1F9FF}]/gu) || []).length,
    hashtags: (text.match(/#\w+/g) || []),
    mentions: (text.match(/@\w+/g) || []),
    urls: (text.match(/https?:\/\/[^\s]+/g) || []),
    questions: (text.match(/\?/g) || []).length,
    bullets: (text.match(/^[•\-*]/gm) || []).length
  };

  const warnings = [];
  const tips = [];

  // Length checks
  if (analysis.length > 3000) {
    warnings.push(`⚠️  Post too long (${analysis.length}/3000 chars) - will be truncated`);
  } else if (analysis.length < 100) {
    warnings.push('⚠️  Very short post - consider adding more context');
  } else if (!analysis.optimal) {
    if (analysis.length < 800) {
      tips.push('💡 Consider expanding to 800-1200 chars for optimal engagement');
    } else {
      tips.push('💡 Long post - ensure key message is in first 3 lines');
    }
  }

  // Hashtag checks
  if (analysis.hashtags.length === 0) {
    warnings.push('⚠️  No hashtags - consider adding 3-5 relevant tags');
  } else if (analysis.hashtags.length > 5) {
    warnings.push(`⚠️  Too many hashtags (${analysis.hashtags.length}) - recommended: 3-5`);
  } else if (analysis.hashtags.length < 3) {
    tips.push('💡 Add more hashtags (current: ' + analysis.hashtags.length + ', recommended: 3-5)');
  }

  // Emoji checks
  if (analysis.emojis > 5) {
    warnings.push(`⚠️  Too many emojis (${analysis.emojis}) - keep it professional (1-3)`);
  } else if (analysis.emojis === 0) {
    tips.push('💡 Consider adding 1-2 professional emojis for visual interest');
  }

  // URL checks
  if (analysis.urls.length > 2) {
    warnings.push('⚠️  Multiple URLs may reduce click-through - focus on one CTA');
  }

  // Engagement tips
  if (analysis.questions === 0) {
    tips.push('💡 Add a question to encourage comments');
  }

  if (analysis.bullets === 0 && analysis.length > 500) {
    tips.push('💡 Use bullet points for better readability');
  }

  return { analysis, warnings, tips };
}

/**
 * Format post with syntax highlighting
 */
function formatPostContent(text) {
  let formatted = text;

  // Highlight hashtags in blue
  formatted = formatted.replace(/#(\w+)/g, '\x1b[34m#$1\x1b[0m');

  // Highlight URLs in cyan
  formatted = formatted.replace(/(https?:\/\/[^\s]+)/g, '\x1b[36m$1\x1b[0m');

  // Highlight mentions in green
  formatted = formatted.replace(/@(\w+)/g, '\x1b[32m@$1\x1b[0m');

  return formatted;
}

/**
 * Generate visual LinkedIn post preview
 */
function generatePreview(text, options = {}) {
  const {
    author = 'aiCMO',
    authorType = 'Organization',
    timeAgo = 'Just now',
    visibility = 'Public',
    includeImage = false,
    imagePath = null
  } = options;

  const { analysis, warnings, tips } = analyzePost(text);
  const formatted = formatPostContent(text);

  const width = 70;
  const border = '═'.repeat(width);

  console.log('\n╔' + border + '╗');
  console.log('║ \x1b[1mLinkedIn Post Preview\x1b[0m' + ' '.repeat(width - 21) + '║');
  console.log('╠' + border + '╣');

  // Author info
  const authorLine = `║ \x1b[1m${author}\x1b[0m (${authorType})`;
  const visibilityText = `• ${visibility}`;
  const padding = width - author.length - authorType.length - visibilityText.length - 5;
  console.log(authorLine + ' '.repeat(padding) + visibilityText + ' ║');
  console.log(`║ \x1b[90m${timeAgo}\x1b[0m` + ' '.repeat(width - timeAgo.length - 1) + '║');
  console.log('║' + ' '.repeat(width) + '║');

  // Post content (wrap at 68 chars to fit in box)
  const lines = [];
  formatted.split('\n').forEach(line => {
    // Strip ANSI codes for length calculation
    const plainLine = line.replace(/\x1b\[[0-9;]*m/g, '');
    if (plainLine.length <= 68) {
      lines.push(line);
    } else {
      // Word wrap
      const words = line.split(' ');
      let currentLine = '';
      words.forEach(word => {
        const plainWord = word.replace(/\x1b\[[0-9;]*m/g, '');
        const plainCurrent = currentLine.replace(/\x1b\[[0-9;]*m/g, '');
        if ((plainCurrent + ' ' + plainWord).length <= 68) {
          currentLine += (currentLine ? ' ' : '') + word;
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      });
      if (currentLine) lines.push(currentLine);
    }
  });

  lines.forEach(line => {
    const plainLine = line.replace(/\x1b\[[0-9;]*m/g, '');
    const padding = width - plainLine.length;
    console.log('║ ' + line + ' '.repeat(padding - 1) + '║');
  });

  // Image placeholder
  if (includeImage && imagePath) {
    console.log('║' + ' '.repeat(width) + '║');
    console.log('║ \x1b[90m[Image: ' + imagePath + ']\x1b[0m' + ' '.repeat(width - imagePath.length - 9) + '║');
  }

  console.log('╠' + border + '╣');

  // Engagement section
  console.log('║ \x1b[90m👍 Like  💬 Comment  🔄 Repost  📤 Send\x1b[0m' + ' '.repeat(width - 38) + '║');
  console.log('╠' + border + '╣');

  // Analytics
  const charInfo = `${analysis.length}/3000 characters`;
  const hashtagInfo = `${analysis.hashtags.length} hashtags`;
  const urlInfo = `${analysis.urls.length} links`;
  const emojiInfo = `${analysis.emojis} emojis`;

  console.log(`║ 📊 ${charInfo} | ${hashtagInfo} | ${urlInfo} | ${emojiInfo}` +
    ' '.repeat(width - charInfo.length - hashtagInfo.length - urlInfo.length - emojiInfo.length - 14) + '║');

  // Status indicators
  if (analysis.optimal) {
    console.log('║ \x1b[32m✅ Optimal length (800-1200 chars)\x1b[0m' + ' '.repeat(width - 34) + '║');
  } else if (analysis.length < 800) {
    console.log('║ \x1b[33m⚠️  Short post (consider expanding)\x1b[0m' + ' '.repeat(width - 34) + '║');
  } else {
    console.log('║ \x1b[33m⚠️  Long post (key message in first 3 lines)\x1b[0m' + ' '.repeat(width - 48) + '║');
  }

  if (analysis.emojis >= 1 && analysis.emojis <= 3) {
    console.log('║ \x1b[32m✅ Professional emoji usage\x1b[0m' + ' '.repeat(width - 30) + '║');
  }

  if (analysis.hashtags.length >= 3 && analysis.hashtags.length <= 5) {
    console.log('║ \x1b[32m✅ Good hashtag count (3-5)\x1b[0m' + ' '.repeat(width - 29) + '║');
  }

  console.log('╚' + border + '╝');

  // Warnings
  if (warnings.length > 0) {
    console.log('\n\x1b[33m⚠️  Warnings:\x1b[0m');
    warnings.forEach(warning => console.log(`   ${warning}`));
  }

  // Tips
  if (tips.length > 0) {
    console.log('\n\x1b[36m💡 Optimization Tips:\x1b[0m');
    tips.forEach(tip => console.log(`   ${tip}`));
  }

  // Hashtag analysis
  if (analysis.hashtags.length > 0) {
    console.log('\n\x1b[34m#️⃣  Hashtags:\x1b[0m', analysis.hashtags.join(', '));
  }

  // URL analysis
  if (analysis.urls.length > 0) {
    console.log('\n\x1b[36m🔗 Links:\x1b[0m');
    analysis.urls.forEach(url => console.log(`   ${url}`));
  }

  console.log('');

  return { analysis, warnings, tips };
}

/**
 * Preview post from text
 */
async function previewPost(text, options = {}) {
  console.log('\n🔍 Generating LinkedIn Post Preview...');
  return generatePreview(text, options);
}

/**
 * Preview post from file
 */
async function previewFromFile(filePath, options = {}) {
  console.log(`\n📄 Loading post from: ${filePath}`);

  try {
    const content = await fs.readFile(filePath, 'utf8');

    // Check if it's JSON format
    if (filePath.endsWith('.json')) {
      const data = JSON.parse(content);
      if (data.linkedin && data.linkedin.post) {
        return previewPost(data.linkedin.post, options);
      } else if (data.post) {
        return previewPost(data.post, options);
      } else {
        throw new Error('JSON file must have "post" or "linkedin.post" field');
      }
    } else {
      // Plain text file
      return previewPost(content, options);
    }
  } catch (error) {
    console.error(`\n❌ Error reading file: ${error.message}\n`);
    throw error;
  }
}

/**
 * Compare two posts side by side
 */
async function comparePosts(text1, text2) {
  console.log('\n📊 Comparing Two LinkedIn Posts\n');

  console.log('\x1b[1m═══ POST A ═══\x1b[0m');
  const resultA = analyzePost(text1);

  console.log('\n\x1b[1m═══ POST B ═══\x1b[0m');
  const resultB = analyzePost(text2);

  console.log('\n\x1b[1m═══ COMPARISON ═══\x1b[0m\n');

  console.log('Metric              | Post A    | Post B    | Winner');
  console.log('─'.repeat(60));

  const metrics = [
    ['Length', resultA.analysis.length, resultB.analysis.length, 'optimal'],
    ['Hashtags', resultA.analysis.hashtags.length, resultB.analysis.hashtags.length, '3-5'],
    ['Emojis', resultA.analysis.emojis, resultB.analysis.emojis, '1-3'],
    ['URLs', resultA.analysis.urls.length, resultB.analysis.urls.length, '1'],
    ['Bullets', resultA.analysis.bullets, resultB.analysis.bullets, 'more']
  ];

  metrics.forEach(([metric, a, b, ideal]) => {
    let winner = '─';
    if (metric === 'Length') {
      const optimalA = a >= 800 && a <= 1200;
      const optimalB = b >= 800 && b <= 1200;
      if (optimalA && !optimalB) winner = 'A ✅';
      else if (!optimalA && optimalB) winner = 'B ✅';
    } else if (ideal === '3-5') {
      const goodA = a >= 3 && a <= 5;
      const goodB = b >= 3 && b <= 5;
      if (goodA && !goodB) winner = 'A ✅';
      else if (!goodA && goodB) winner = 'B ✅';
    } else if (ideal === '1-3') {
      const goodA = a >= 1 && a <= 3;
      const goodB = b >= 1 && b <= 3;
      if (goodA && !goodB) winner = 'A ✅';
      else if (!goodA && goodB) winner = 'B ✅';
    } else if (ideal === 'more') {
      if (a > b) winner = 'A ✅';
      else if (b > a) winner = 'B ✅';
    } else {
      const targetA = Math.abs(a - parseInt(ideal));
      const targetB = Math.abs(b - parseInt(ideal));
      if (targetA < targetB) winner = 'A ✅';
      else if (targetB < targetA) winner = 'B ✅';
    }

    const padding1 = ' '.repeat(20 - metric.length);
    const padding2 = ' '.repeat(10 - String(a).length);
    const padding3 = ' '.repeat(10 - String(b).length);
    console.log(`${metric}${padding1}| ${a}${padding2}| ${b}${padding3}| ${winner}`);
  });

  console.log('');
}

// CLI Handler
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '--help' || command === '-h') {
    console.log('\n📘 LinkedIn Post Preview Tool\n');
    console.log('Usage:');
    console.log('  node linkedin-preview.cjs preview "Your post text here"');
    console.log('  node linkedin-preview.cjs file /path/to/post.txt');
    console.log('  node linkedin-preview.cjs file /path/to/social-posts.json');
    console.log('  node linkedin-preview.cjs compare "Post A" "Post B"\n');
    console.log('Examples:');
    console.log('  node linkedin-preview.cjs preview "New blog post! #Marketing"');
    console.log('  node linkedin-preview.cjs file campaigns/weekly-newsletter/issue-01/issue-01-newsletter-social-posts.json');
    console.log('  node linkedin-preview.cjs compare "Short post" "Longer post with more details..."\n');
    process.exit(0);
  }

  try {
    switch (command) {
      case 'preview':
        if (!args[1]) {
          throw new Error('Post text required');
        }
        await previewPost(args[1]);
        break;

      case 'file':
        if (!args[1]) {
          throw new Error('File path required');
        }
        await previewFromFile(args[1]);
        break;

      case 'compare':
        if (!args[1] || !args[2]) {
          throw new Error('Two posts required for comparison');
        }
        await comparePosts(args[1], args[2]);
        break;

      default:
        // Assume it's direct text if no command specified
        await previewPost(args.join(' '));
        break;
    }

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { previewPost, previewFromFile, comparePosts, analyzePost, generatePreview };
