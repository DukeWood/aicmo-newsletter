# LinkedIn Integration Guide

Complete guide for LinkedIn Community Management API integration with aiCMO.

---

## Table of Contents

1. [Overview](#overview)
2. [Setup & Configuration](#setup--configuration)
3. [Authentication](#authentication)
4. [Posting to LinkedIn](#posting-to-linkedin)
5. [API Tiers & Permissions](#api-tiers--permissions)
6. [Troubleshooting](#troubleshooting)
7. [Next Steps](#next-steps)

---

## Overview

### What's Included

This repository includes full LinkedIn integration for posting newsletter content and marketing updates to your organization's LinkedIn page.

**Features:**
- ✅ OAuth 2.0 authentication with Community Management API
- ✅ Automated posting to organization pages
- ✅ Newsletter cross-posting (Twitter + LinkedIn)
- ✅ Dry-run mode for testing
- ✅ 60-day access token (auto-refresh ready)

**Current Status:**
- **Development Tier:** ✅ Complete (OAuth + dry-run working)
- **Standard Tier:** ⏳ Pending approval (required for live posting)

---

## Setup & Configuration

### Prerequisites

- LinkedIn account with **admin access** to an organization page
- LinkedIn Developer App with **Community Management API** access
- Node.js 18+ installed

### Step 1: LinkedIn Developer App

**Already Configured:**
- App ID: `225561866`
- Client ID: `78qfm9pahj7sxi`
- Redirect URI: `http://localhost:3001/oauth/redirect`
- Scopes: `w_organization_social_feed`, `r_organization_social_feed`

### Step 2: Environment Variables

Your `.env` file is already configured:

```bash
# LinkedIn API (Official Community Management API)
LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_client_secret_here
LINKEDIN_REDIRECT_URI=http://localhost:3001/oauth/redirect
LINKEDIN_ORGANIZATION_ID=108297743
```

**Your Organization:**
- ID: `108297743`
- URL: https://www.linkedin.com/company/108297743/

---

## Authentication

### Initial Setup (One-Time)

Run the OAuth authentication script:

```bash
node scripts/social/linkedin-oauth.cjs
```

**What happens:**
1. Opens browser to LinkedIn authorization page
2. You click "Allow" to authorize aiCMO
3. Access token is saved to `.linkedin-tokens.json`
4. Token expires in 60 days

**Success Output:**
```
🎉 LinkedIn Authentication Complete!
============================================================

Next steps:
  1. Test posting: node scripts/social/post-linkedin-direct.cjs "Test post"
  2. Cross-post newsletter: node scripts/social/cross-post-newsletter.cjs --linkedin

Token expires in: 86399 minutes
```

### Token Management

**Token Location:** `.linkedin-tokens.json`

**Token Expiration:**
- Valid for 60 days (5,183,999 seconds)
- Re-run `linkedin-oauth.cjs` when expired

**Check Token:**
```bash
cat .linkedin-tokens.json | grep expiresAt
```

---

## Posting to LinkedIn

### Method 1: Quick Single Post

```bash
node scripts/social/post-linkedin-direct.cjs "Your post text here

#Hashtag #Example"
```

### Method 2: Cross-Post Newsletter

**Dry-Run (Preview Only):**
```bash
node scripts/social/cross-post-newsletter.cjs \
  campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md \
  --linkedin --dry-run
```

**Live Posting (Requires Standard Tier):**
```bash
node scripts/social/cross-post-newsletter.cjs \
  campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md \
  --linkedin
```

### Method 3: Full API Control

```bash
node scripts/social/post-to-linkedin.cjs text "Your post text"
node scripts/social/post-to-linkedin.cjs image "Caption" /path/to/image.jpg
node scripts/social/post-to-linkedin.cjs article "Commentary" "https://url" "Title"
```

---

## API Tiers & Permissions

### Development Tier (Current)

**What You Can Do:**
- ✅ OAuth authentication
- ✅ Read organization data
- ✅ Generate post previews (dry-run mode)
- ❌ Create actual posts (403 ACCESS_DENIED)

**Limitations:**
- API call restrictions
- Cannot create posts: `partnerApiPostsExternal.CREATE.20250101`
- 12-month deadline to upgrade to Standard Tier

### Standard Tier (Required for Posting)

**What You Get:**
- ✅ Full posting capabilities
- ✅ No API call restrictions
- ✅ Production-ready access

**How to Request:**

1. **Go to Developer Portal:**
   - https://www.linkedin.com/developers/apps/225561866
   - Click "Products" tab
   - Find "Community Management API"
   - Click "Request Standard Tier Access"

2. **Provide:**
   - **Screen recording** showing OAuth + dry-run mode working
   - **Use case:** "AI-powered marketing automation for newsletter distribution to organization LinkedIn page"
   - **Expected volume:** "~100 posts/month (weekly newsletters + occasional marketing updates)"
   - **Business info:** Your registered entity details

3. **Wait for Approval:**
   - Typical time: 1-3 business days
   - LinkedIn will review your integration

### API Scopes

**Community Management API Scopes:**
```
w_organization_social_feed  // Post to organization pages
r_organization_social_feed  // Read organization posts/analytics
```

**NOT Included (Requires Different Products):**
```
openid, profile, email      // User profile (requires Sign In with LinkedIn)
w_member_social             // Personal profile posting (requires Share on LinkedIn)
```

---

## Troubleshooting

### Error: "unauthorized_scope_error"

**Cause:** Requesting scopes not available in Community Management API

**Solution:** Only use `w_organization_social_feed` and `r_organization_social_feed` scopes

### Error: "ACCESS_DENIED - Not enough permissions to access: partnerApiPostsExternal.CREATE"

**Cause:** Development Tier doesn't allow creating posts

**Solution:** Request Standard Tier access (see above)

### Error: "Not authenticated"

**Cause:** Access token expired or missing

**Solution:**
```bash
node scripts/social/linkedin-oauth.cjs
```

### Error: "LINKEDIN_ORGANIZATION_ID not set"

**Cause:** Missing organization ID in `.env`

**Solution:**
```bash
echo "LINKEDIN_ORGANIZATION_ID=108297743" >> .env
```

### Posts Not Appearing

**Check:**
1. Verify you have Standard Tier access (not Development Tier)
2. Confirm you're an admin of the organization page
3. Check that organization ID is correct (108297743)
4. Verify access token hasn't expired

---

## LinkedIn Post Format

### Generated Post Structure

Posts are automatically formatted with:

```
📰 New from aiCMO: [Newsletter Title]

[TL;DR - Main message]

📊 Key insights:
• [Insight 1]
• [Insight 2]
• [Insight 3]
• [Insight 4]

This is part of our weekly newsletter series on AI-first marketing strategies for challenger brands.

Read the full issue: https://ai.cmo.so/newsletter/issue-[#]

#AIMarketing #GEO #MarketingStrategy #AIFirst
```

### Best Practices

**Character Limits:**
- Maximum: 3,000 characters
- Recommended: 800-1,200 characters for engagement

**Hashtags:**
- Use 3-5 relevant hashtags
- Place at end of post
- Examples: `#AIMarketing #GEO #MarketingStrategy #AIFirst`

**Emojis:**
- Use sparingly (1-2 per post)
- Professional emoji only: 📰 📊 ✅ 💡 🚀

**Formatting:**
- Use line breaks for readability
- Bullet points for key insights
- Clear CTA at the end

---

## File Reference

### LinkedIn Scripts

**Location:** `scripts/social/`

1. **`linkedin-oauth.cjs`** - OAuth 2.0 authentication
   - Starts local server on port 3001
   - Opens browser for authorization
   - Saves tokens to `.linkedin-tokens.json`

2. **`post-to-linkedin.cjs`** - LinkedIn Posts API integration
   - `postText()` - Post text content
   - `postImage()` - Post with image
   - `postArticle()` - Share article link
   - `getOrganizations()` - Get organization URN

3. **`post-linkedin-direct.cjs`** - Quick posting wrapper
   - Convenience script for single posts
   - Usage: `node post-linkedin-direct.cjs "Text here"`

4. **`cross-post-newsletter.cjs`** - Newsletter cross-posting
   - Generates LinkedIn posts from newsletter markdown
   - Supports dry-run mode
   - Saves results to JSON

### Configuration Files

**`.env`** - Environment variables:
```bash
LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_client_secret_here
LINKEDIN_REDIRECT_URI=http://localhost:3001/oauth/redirect
LINKEDIN_ORGANIZATION_ID=108297743
```

**`.linkedin-tokens.json`** - OAuth tokens (auto-generated):
```json
{
  "access_token": "...",
  "expires_in": 5183999,
  "timestamp": 1729081854168,
  "expiresAt": 1734265853168,
  "note": "Community Management API - Use organization pages for posting"
}
```

---

## Next Steps

### 1. Request Standard Tier Access

**Priority:** High (Required for live posting)

**Action:**
1. Go to https://www.linkedin.com/developers/apps/225561866/products
2. Request Standard Tier for Community Management API
3. Provide screen recording + use case
4. Wait 1-3 business days for approval

### 2. Test Live Posting

**After Standard Tier approval:**

```bash
# Test single post
node scripts/social/post-linkedin-direct.cjs "Test post from aiCMO 🚀 #AIMarketing"

# Cross-post newsletter
node scripts/social/cross-post-newsletter.cjs \
  campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md \
  --linkedin
```

### 3. Automate Newsletter Distribution

**Weekly workflow:**

```bash
# 1. Generate newsletter content (Emily/Chris)
# 2. Upload images to Cloudinary
node scripts/newsletter/upload-to-cloudinary.js

# 3. Send email via Mailchimp
node scripts/newsletter/send-test-email.js [newsletter-file] [email]

# 4. Cross-post to social media
node scripts/social/cross-post-newsletter.cjs [newsletter-file]
```

### 4. Monitor & Optimize

**Track engagement:**
- LinkedIn Page Analytics
- Check which posts perform best
- Adjust posting times/content based on data

**Optimization:**
- Test different post formats
- A/B test hashtags
- Experiment with post length
- Add images for higher engagement

---

## Support & Resources

### LinkedIn Documentation

- **Community Management API:** https://learn.microsoft.com/en-us/linkedin/marketing/community-management/community-management-overview
- **Posts API:** https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api
- **OAuth Guide:** https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow

### aiCMO Documentation

- **Main Documentation:** `CLAUDE.md`
- **Social Media Setup:** `SOCIAL_MEDIA_SETUP.md`
- **LinkedIn Quick Reference:** `docs/LINKEDIN_QUICK_REFERENCE.md` (to be created)

### Getting Help

**LinkedIn Developer Support:**
- Submit ticket: https://www.linkedin.com/help/linkedin/ask/api

**aiCMO Team:**
- Email: maggie@aimarketing.so
- GitHub Issues: https://github.com/your-repo/issues

---

**Last Updated:** 2025-10-16
**Status:** Development Tier Complete | Standard Tier Pending
