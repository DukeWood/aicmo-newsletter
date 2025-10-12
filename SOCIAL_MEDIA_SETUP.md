# Social Media Automation Setup Guide

This guide walks you through setting up automated social media posting for Twitter/X and LinkedIn using MCP (Model Context Protocol) servers.

---

## Table of Contents

1. [Overview](#overview)
2. [Twitter/X Setup](#twitterx-setup)
3. [LinkedIn Setup](#linkedin-setup)
4. [Testing the Integration](#testing-the-integration)
5. [Usage Examples](#usage-examples)
6. [Troubleshooting](#troubleshooting)

---

## Overview

### What's Included

This repository includes automation for:
- **Twitter/X**: Post tweets and threads via `@mbelinky/x-mcp-server`
- **LinkedIn**: Post updates via LinkedIn Community Management API (requires approval)
- **Cross-posting**: Automatically share newsletter content across platforms

### Architecture

```
Newsletter Content (Markdown)
         ↓
   Parsing & Generation
         ↓
   ├──→ Twitter Thread (2-5 tweets)
   └──→ LinkedIn Post (professional format)
         ↓
    MCP Servers
         ↓
   Social Media APIs
```

---

## Twitter/X Setup

### Prerequisites

- Twitter/X account
- Node.js 18+ installed
- Access to Twitter Developer Portal

### Step 1: Create Twitter Developer Account

1. Go to https://developer.twitter.com
2. Sign in with your Twitter account
3. Apply for Developer Access (free tier is sufficient)
4. Create a new Project and App

### Step 2: Configure App Permissions

1. In your App settings, go to **"User authentication settings"**
2. Set **App permissions** to **"Read and Write"**
3. Set **Type of App** to **"Web App"**
4. Add **Callback URL**: `http://localhost:3000/callback`
5. Save changes

### Step 3: Generate API Credentials

1. Go to your App's **"Keys and tokens"** tab
2. Generate the following:
   - **API Key** (also called Consumer Key)
   - **API Secret Key** (also called Consumer Secret)
   - **Access Token**
   - **Access Token Secret**

⚠️ **Important**: Save these credentials securely - you won't be able to view them again!

### Step 4: Add Credentials to .env

Open your `.env` file and add:

```bash
# Twitter/X API (OAuth 1.0a)
TWITTER_API_KEY=your_actual_api_key_here
TWITTER_API_SECRET=your_actual_api_secret_here
TWITTER_ACCESS_TOKEN=your_actual_access_token_here
TWITTER_ACCESS_TOKEN_SECRET=your_actual_access_token_secret_here
```

### Step 5: Verify MCP Configuration

The Twitter MCP server is already configured in `mcp-config.json`. Verify it looks like this:

```json
{
  "mcpServers": {
    "twitter": {
      "command": "npx",
      "args": ["-y", "@mbelinky/x-mcp-server"],
      "env": {
        "API_KEY": "${TWITTER_API_KEY}",
        "API_SECRET_KEY": "${TWITTER_API_SECRET}",
        "ACCESS_TOKEN": "${TWITTER_ACCESS_TOKEN}",
        "ACCESS_TOKEN_SECRET": "${TWITTER_ACCESS_TOKEN_SECRET}"
      }
    }
  }
}
```

### Step 6: Test Twitter Integration

Run a dry-run test:

```bash
node scripts/social/post-to-twitter.js tweet "Testing aiCMO social media automation! 🚀"
```

Expected output:
```
🐦 Posting to Twitter/X...

📝 Tweet content:
"Testing aiCMO social media automation! 🚀"

📊 Character count: 48/280

⚠️  NOTE: This script requires MCP server to be running
   Twitter MCP server: npx -y @mbelinky/x-mcp-server
   See SOCIAL_MEDIA_SETUP.md for configuration

✅ Tweet prepared successfully
```

---

## LinkedIn Setup

### Prerequisites

- LinkedIn account (personal or company page)
- Node.js 18+ installed
- LinkedIn Developer access

### Step 1: Apply for LinkedIn API Access

⚠️ **LinkedIn requires approval** for Community Management API access.

1. Go to https://www.linkedin.com/developers/
2. Create a new App
3. Apply for **"Community Management API"** product
4. Wait for approval (can take 1-2 weeks)

### Step 2: Configure OAuth Settings

Once approved:

1. In your App settings, go to **"Auth"** tab
2. Add **Redirect URL**: `http://localhost:3001/callback`
3. Note your **Client ID** and **Client Secret**

### Step 3: Add Credentials to .env

```bash
# LinkedIn API (Official Community Management API)
LINKEDIN_CLIENT_ID=your_actual_client_id_here
LINKEDIN_CLIENT_SECRET=your_actual_client_secret_here
LINKEDIN_ACCESS_TOKEN=your_actual_access_token_here
```

### Step 4: LinkedIn MCP Server

⚠️ **Status**: LinkedIn MCP integration is pending. The scripts generate LinkedIn-formatted content, but actual posting requires additional setup.

**Current capabilities:**
- ✅ Generate LinkedIn posts from newsletter content
- ✅ Preview LinkedIn posts
- ⏳ Actual posting (requires MCP server completion)

---

## Testing the Integration

### Test 1: Preview Social Media Posts (Dry Run)

Preview what would be posted without actually posting:

```bash
node scripts/social/cross-post-newsletter.js --dry-run
```

This will:
- Parse the newsletter
- Generate Twitter thread
- Generate LinkedIn post
- Show previews
- Save to JSON file

### Test 2: Twitter-Only Dry Run

```bash
node scripts/social/cross-post-newsletter.js --twitter --dry-run
```

### Test 3: Post Single Tweet

```bash
node scripts/social/post-to-twitter.js tweet "New aiCMO newsletter out now! Check it out: https://ai.cmo.so/newsletter"
```

### Test 4: Post Newsletter Thread

```bash
node scripts/social/cross-post-newsletter.js --twitter
```

---

## Usage Examples

### Example 1: Cross-Post Newsletter (Dry Run)

```bash
node scripts/social/cross-post-newsletter.js \
  campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md \
  --dry-run
```

**Output:**
```
🌐 Cross-Posting Newsletter to Social Media

============================================================
Newsletter: campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md
Platforms: twitter, linkedin
Dry Run: Yes (preview only)
============================================================

🐦 TWITTER/X:

Preview of Twitter thread:

Tweet 1/4:
"🚀 New from aiCMO:

"Discovery Has Moved. Have You?"

But ChatGPT only cites 2-7 companies per answer. Here's how to be one of them.

🧵 Key insights below 👇"
(160 characters)

[... more tweets ...]

✅ Cross-posting complete!
📄 Results saved to: campaigns/weekly-newsletter/issue-01/issue-01-newsletter-social-posts.json
```

### Example 2: Post Custom Tweet

```bash
node scripts/social/post-to-twitter.js tweet "71% of Americans now use AI to research brands. Are you optimizing for GEO? Learn more in our latest newsletter: https://ai.cmo.so/newsletter 🔍"
```

### Example 3: Post Thread from JSON

Create `thread.json`:
```json
{
  "tweets": [
    "Tweet 1 content here",
    "Tweet 2 content here",
    "Tweet 3 content here"
  ]
}
```

Then post:
```bash
node scripts/social/post-to-twitter.js thread thread.json
```

---

## Troubleshooting

### Twitter/X Issues

#### Error: "Invalid api_key"

**Cause**: Incorrect Twitter API credentials

**Solution**:
1. Double-check credentials in `.env`
2. Ensure no extra spaces or quotes
3. Verify credentials in Twitter Developer Portal
4. Make sure you're using API Key (not Client ID)

#### Error: "Twitter API credentials not configured"

**Cause**: `.env` file still has placeholder values

**Solution**:
- Replace `your-twitter-api-key` with actual credentials
- Ensure all 4 Twitter environment variables are set

#### Error: "Tweet text too long"

**Cause**: Tweet exceeds 280 characters

**Solution**:
- Edit tweet text to be shorter
- Use thread for longer content

### LinkedIn Issues

#### Error: "LinkedIn posting requires MCP server integration"

**Cause**: LinkedIn MCP server not yet fully integrated

**Status**: ⏳ Pending - LinkedIn posting generates formatted content but requires additional MCP setup

**Workaround**: Use dry-run mode to generate LinkedIn posts, then copy-paste manually

### General Issues

#### MCP Server Not Running

**Symptom**: Script runs but posts don't appear

**Solution**:
```bash
# Start Twitter MCP server manually
npx -y @mbelinky/x-mcp-server
```

#### Rate Limiting

**Symptom**: "Rate limit exceeded" errors

**Solution**:
- Wait 15 minutes between posting sessions
- Twitter free tier limits: 50 tweets/24 hours
- Use `--dry-run` for testing

---

## Advanced Configuration

### Custom Tweet Templates

Edit `scripts/social/cross-post-newsletter.js` to customize tweet generation:

```javascript
// Customize tweet 1 (hook)
tweets.push(
  `🎯 Custom hook here:\n\n"${newsletter.title}"\n\n${newsletter.previewText}`
);
```

### Scheduling Posts

Use cron or task scheduler:

```bash
# Crontab example: Post newsletter every Monday at 9 AM
0 9 * * 1 cd /path/to/repo && node scripts/social/cross-post-newsletter.js --twitter
```

### Monitoring

Track posted content:
```bash
# View saved results
cat campaigns/weekly-newsletter/issue-01/issue-01-newsletter-social-posts.json
```

---

## Best Practices

### Twitter/X

✅ **DO:**
- Keep tweets under 280 characters
- Use emojis sparingly (1-2 per tweet)
- Include hashtags (2-3 max)
- Add clear CTAs
- Test with --dry-run first

❌ **DON'T:**
- Post duplicate content within 24 hours
- Exceed rate limits
- Use all caps
- Over-hashtag

### LinkedIn

✅ **DO:**
- Use professional tone
- Include relevant hashtags (#AIMarketing, #GEO, etc.)
- Add line breaks for readability
- Include clear value proposition

❌ **DON'T:**
- Post informal content
- Use excessive emojis
- Cross-post Twitter threads directly

---

## Support

### Getting Help

- **Documentation**: See `CLAUDE.md` for full system documentation
- **Issues**: Check troubleshooting section above
- **Twitter MCP**: https://github.com/mbelinky/x-mcp-server
- **Questions**: Contact maggie@aimarketing.so

### Next Steps

1. ✅ Complete Twitter/X setup
2. ⏳ Apply for LinkedIn API access
3. 🚀 Start cross-posting newsletters
4. 📊 Monitor engagement and optimize

---

**Last Updated**: 2025-10-12
