# LinkedIn Preview & Analytics Features

Complete guide to LinkedIn Development Tier preview and analytics tools.

---

## Overview

Since LinkedIn Development Tier allows **reading but not posting**, we've built comprehensive tools to maximize what you can do while waiting for Standard Tier approval:

✅ **Visual post previews** with formatting validation  
✅ **Read organization posts** with engagement metrics  
✅ **Analytics dashboard** for performance tracking  
✅ **Post optimization recommendations**  
✅ **Hashtag and content analysis**

---

## Quick Start

### 1. Preview a LinkedIn Post

```bash
# Preview newsletter post
node scripts/social/linkedin-preview.cjs file campaigns/weekly-newsletter/issue-01/issue-01-newsletter-social-posts.json

# Preview any text
node scripts/social/linkedin-preview.cjs preview "Your post text here #Marketing"

# Compare two posts
node scripts/social/linkedin-preview.cjs compare "Post A" "Post B with more details..."
```

### 2. View Recent Posts

```bash
# List last 10 posts
node scripts/social/linkedin-read-posts.cjs list

# Search for specific content
node scripts/social/linkedin-read-posts.cjs search "AI marketing"

# Get summary statistics
node scripts/social/linkedin-read-posts.cjs summary
```

### 3. Analytics Dashboard

```bash
# View 30-day analytics
node scripts/social/linkedin-analytics.cjs dashboard --days 30

# Compare last 7 days vs last 30 days
node scripts/social/linkedin-analytics.cjs compare --period1 7 --period2 30
```

---

## Tools Reference

### linkedin-preview.cjs - Visual Post Preview

**Purpose:** Generate LinkedIn UI simulation with formatting validation

**Features:**
- Terminal-based LinkedIn post rendering
- Character count (871/3000)
- Hashtag validation (3-5 recommended)
- Emoji usage check (1-3 professional)
- URL detection and warnings
- Optimal length validation (800-1200 chars)
- Engagement optimization tips

**Commands:**
```bash
# Preview text post
node scripts/social/linkedin-preview.cjs preview "Your text here"

# Preview from JSON file
node scripts/social/linkedin-preview.cjs file path/to/post.json

# Compare two versions
node scripts/social/linkedin-preview.cjs compare "Version A" "Version B"
```

**Example Output:**
```
╔══════════════════════════════════════════════════════════════════════╗
║ LinkedIn Post Preview                                                 ║
╠══════════════════════════════════════════════════════════════════════╣
║ aiCMO (Organization)                                        • Public ║
║ Preview                                                              ║
║                                                                      ║
║ 📰 New from aiCMO: Discovery Has Moved. Have You?                    ║
║                                                                      ║
║ 71% of Americans now use AI to research brands...                    ║
║                                                                      ║
║ #AIMarketing #GEO #MarketingStrategy #AIFirst                        ║
╠══════════════════════════════════════════════════════════════════════╣
║ 📊 871/3000 characters | 4 hashtags | 1 links | 2 emojis            ║
║ ✅ Optimal length (800-1200 chars)                                    ║
║ ✅ Professional emoji usage                                        ║
║ ✅ Good hashtag count (3-5)                                         ║
╚══════════════════════════════════════════════════════════════════════╝

#️⃣  Hashtags: #AIMarketing, #GEO, #MarketingStrategy, #AIFirst

🔗 Links:
   https://ai.cmo.so/newsletter/issue-1
```

---

### linkedin-read-posts.cjs - Read Organization Posts

**Purpose:** Fetch and display posts from your organization page

**Features:**
- List recent posts with engagement metrics
- Search posts by keyword
- Export to JSON for analysis
- Post statistics summary
- Hashtag frequency analysis

**Commands:**
```bash
# List recent posts
node scripts/social/linkedin-read-posts.cjs list --count 20

# Export to JSON
node scripts/social/linkedin-read-posts.cjs export posts.json --count 50

# Search by keyword
node scripts/social/linkedin-read-posts.cjs search "marketing" --count 30

# Get summary
node scripts/social/linkedin-read-posts.cjs summary
```

**Example Output:**
```
═══════════════════════════════════════════════════════════
Organization Posts (10 shown)
═══════════════════════════════════════════════════════════

─── Post #1 ───
ID: 12345
Published: 2 days ago
Visibility: PUBLIC

🚀 New blog post about AI-powered marketing...

📷 Media attached

👍 45 likes  💬 12 comments  🔄 8 shares

─── Post #2 ───
...
```

---

### linkedin-analytics.cjs - Analytics Dashboard

**Purpose:** Track performance metrics and get optimization recommendations

**Features:**
- Post activity tracking
- Engagement metrics (likes, comments, shares)
- Top performing posts
- Hashtag frequency analysis
- Posting frequency charts
- Automated recommendations
- Performance comparison across periods

**Commands:**
```bash
# View dashboard
node scripts/social/linkedin-analytics.cjs dashboard --days 30

# Export analytics
node scripts/social/linkedin-analytics.cjs export analytics.json --days 90

# Compare periods
node scripts/social/linkedin-analytics.cjs compare --period1 7 --period2 30
```

**Example Output:**
```
═══════════════════════════════════════════════════════════
        LinkedIn Analytics Dashboard - Last 30 Days
═══════════════════════════════════════════════════════════

📊 Post Activity
────────────────────────────────────────────────────────────
Total Posts:           12
Posts with Media:      8 (67%)
Posts with Articles:   2 (17%)
Avg Post Length:       945 characters

💬 Engagement Metrics
────────────────────────────────────────────────────────────
Total Likes:           234
Total Comments:        56
Total Shares:          23
Avg Engagement Score:  89

🏆 Top Performing Posts
────────────────────────────────────────────────────────────

1. Discovery Has Moved. Have You? 71% of Americans now use AI...
   👍 45  💬 12  🔄 8  (Score: 234)
   2025-10-14

2. AI Marketing Trends for 2025...
   👍 38  💬 9  🔄 5  (Score: 189)
   2025-10-12

#️⃣  Top Hashtags
────────────────────────────────────────────────────────────
1. #AIMarketing (used 10 times)
2. #GEO (used 8 times)
3. #MarketingStrategy (used 7 times)

💡 Recommendations
────────────────────────────────────────────────────────────
• Add more media to posts (images increase engagement by 2-3x)
• Post more frequently (currently 0.4 posts/day)
• Add questions to posts to encourage comments
```

---

## Integration with Cross-Post Tool

The preview tool is **automatically integrated** with the newsletter cross-posting workflow:

```bash
# Generate LinkedIn post with enhanced preview
node scripts/social/cross-post-newsletter.cjs \
  campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md \
  --linkedin --dry-run
```

This will:
1. Parse newsletter content
2. Generate LinkedIn-optimized post
3. **Display visual preview with validation**
4. Save to JSON file

---

## Validation Checks

### Character Count
- ✅ Optimal: 800-1200 characters
- ⚠️  Short: < 800 characters (consider expanding)
- ⚠️  Long: > 1200 characters (ensure key message in first 3 lines)
- ❌ Too long: > 3000 characters (will be truncated)

### Hashtags
- ✅ Optimal: 3-5 hashtags
- ⚠️  Too few: < 3 hashtags
- ⚠️  Too many: > 5 hashtags

### Emojis
- ✅ Professional: 1-3 emojis
- ⚠️  Too many: > 3 emojis (keep it professional)
- 💡 None: Consider adding 1-2 for visual interest

### URLs
- ✅ Single CTA: 1 URL
- ⚠️  Multiple CTAs: > 2 URLs (may reduce click-through)

### Engagement Optimization
- 💡 Add questions to encourage comments
- 💡 Use bullet points for readability
- 💡 Include media for 2-3x engagement boost

---

## Current Limitations (Development Tier)

**What Works:**
- ✅ Visual previews
- ✅ Read organization posts
- ✅ Analytics and engagement metrics
- ✅ Post validation and recommendations
- ✅ Export data to JSON

**What Requires Standard Tier:**
- ❌ Create new posts (403 ACCESS_DENIED)
- ❌ Some advanced analytics endpoints

**Workaround:**
Use preview tools to generate perfect posts, then manually copy-paste to LinkedIn until Standard Tier is approved.

---

## Best Practices

### 1. Always Preview Before Manual Posting
```bash
# Generate and preview
node scripts/social/linkedin-preview.cjs file post.json

# Copy the validated post to LinkedIn manually
```

### 2. Track What Works
```bash
# Check analytics weekly
node scripts/social/linkedin-analytics.cjs dashboard --days 7

# Compare month-over-month
node scripts/social/linkedin-analytics.cjs compare --period1 30 --period2 60
```

### 3. Optimize Based on Data
```bash
# Identify top performers
node scripts/social/linkedin-read-posts.cjs summary

# Analyze hashtag performance
# (Look at top hashtags in analytics output)
```

### 4. Test Different Formats
```bash
# Compare short vs long posts
node scripts/social/linkedin-preview.cjs compare "Short post (500 chars)" "Longer post with more detail (1200 chars)"
```

---

## Next Steps

1. **Preview Newsletter Posts**
   ```bash
   node scripts/social/linkedin-preview.cjs file campaigns/weekly-newsletter/issue-01/issue-01-newsletter-social-posts.json
   ```

2. **Check Analytics** (if you have existing posts)
   ```bash
   node scripts/social/linkedin-analytics.cjs dashboard --days 30
   ```

3. **Apply for Standard Tier**
   - Go to: https://www.linkedin.com/developers/apps/225561866/products
   - Request Standard Tier access
   - Provide screen recording of preview tools working
   - Wait 1-3 business days

4. **Start Live Posting** (after Standard Tier approval)
   ```bash
   node scripts/social/cross-post-newsletter.cjs --linkedin
   ```

---

## Troubleshooting

**Preview tool shows errors:**
- Check that JSON file has `linkedin.post` or `post` field
- Verify file path is correct

**Read posts fails:**
- Ensure you're authenticated: `node scripts/social/linkedin-oauth.cjs`
- Check token hasn't expired (60-day limit)
- Verify organization ID is correct in `.env`

**Analytics returns no data:**
- Some analytics endpoints require Standard Tier
- Use post-based analytics instead (analyzes fetched posts)
- Works on Development Tier

**"ACCESS_DENIED" errors:**
- Normal for Development Tier when trying to POST
- Use preview tools instead
- Apply for Standard Tier for live posting

---

**Created:** 2025-10-16  
**Status:** Development Tier - Full Preview & Analytics Available  
**Organization:** 108297743

For complete LinkedIn integration guide, see: `docs/LINKEDIN_INTEGRATION_GUIDE.md`
