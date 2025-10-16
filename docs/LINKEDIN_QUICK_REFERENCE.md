# LinkedIn Integration - Quick Reference

One-page cheat sheet for LinkedIn Community Management API integration.

---

## Quick Start

### 1. Authenticate (One-Time Setup)

```bash
node scripts/social/linkedin-oauth.cjs
```

**Result:** Access token saved to `.linkedin-tokens.json` (valid 60 days)

### 2. Test Posting (Dry-Run)

```bash
node scripts/social/post-linkedin-direct.cjs "Test post! #AIMarketing"
```

**Error:** `ACCESS_DENIED - partnerApiPostsExternal.CREATE` → Normal for Development Tier

### 3. Generate Newsletter Post

```bash
node scripts/social/cross-post-newsletter.cjs \
  campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md \
  --linkedin --dry-run
```

**Result:** LinkedIn post preview saved to JSON file

---

## Common Commands

### Authentication

```bash
# Initial setup
node scripts/social/linkedin-oauth.cjs

# Check token expiration
cat .linkedin-tokens.json | grep expiresAt
```

### Posting

```bash
# Quick post (Development Tier will fail)
node scripts/social/post-linkedin-direct.cjs "Your post text"

# Cross-post newsletter (dry-run)
node scripts/social/cross-post-newsletter.cjs [file] --linkedin --dry-run

# Full API control
node scripts/social/post-to-linkedin.cjs text "Post text"
node scripts/social/post-to-linkedin.cjs image "Caption" /path/to/image.jpg
```

---

## Configuration

### Environment Variables (`.env`)

```bash
LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_client_secret_here
LINKEDIN_REDIRECT_URI=http://localhost:3001/oauth/redirect
LINKEDIN_ORGANIZATION_ID=108297743
```

### Files

- **OAuth:** `scripts/social/linkedin-oauth.cjs`
- **Posting:** `scripts/social/post-to-linkedin.cjs`
- **Quick Post:** `scripts/social/post-linkedin-direct.cjs`
- **Cross-Post:** `scripts/social/cross-post-newsletter.cjs`
- **Tokens:** `.linkedin-tokens.json` (auto-generated)

---

## API Tiers

### Development Tier (Current)

✅ OAuth authentication
✅ Read organization data
✅ Generate post previews
❌ Create actual posts (403 ACCESS_DENIED)

### Standard Tier (Required for Posting)

✅ Full posting capabilities
✅ No API call restrictions
⏳ Pending approval (1-3 business days)

**Request Standard Tier:**
https://www.linkedin.com/developers/apps/225561866/products

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `unauthorized_scope_error` | Invalid scopes | Only use `w_organization_social_feed` and `r_organization_social_feed` |
| `ACCESS_DENIED - partnerApiPostsExternal.CREATE` | Development Tier limitation | Request Standard Tier approval |
| `Not authenticated` | Token expired/missing | Run `node scripts/social/linkedin-oauth.cjs` |
| `LINKEDIN_ORGANIZATION_ID not set` | Missing org ID in `.env` | Add `LINKEDIN_ORGANIZATION_ID=108297743` |

---

## LinkedIn Post Format

**Generated Structure:**

```
📰 New from aiCMO: [Title]

[TL;DR Summary]

📊 Key insights:
• [Insight 1]
• [Insight 2]
• [Insight 3]

This is part of our weekly newsletter series...

Read the full issue: https://ai.cmo.so/newsletter/issue-[#]

#AIMarketing #GEO #MarketingStrategy #AIFirst
```

**Best Practices:**
- Max: 3,000 characters
- Recommended: 800-1,200 characters
- Hashtags: 3-5 relevant tags
- Emojis: 1-2 professional emojis
- Tone: Professional and informative

---

## Next Steps

### 1. Request Standard Tier

1. Go to https://www.linkedin.com/developers/apps/225561866/products
2. Click "Request Standard Tier Access" for Community Management API
3. Provide screen recording + use case
4. Wait 1-3 business days

### 2. Test Live Posting (After Approval)

```bash
# Test single post
node scripts/social/post-linkedin-direct.cjs "Live test post 🚀"

# Cross-post newsletter
node scripts/social/cross-post-newsletter.cjs \
  campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md \
  --linkedin
```

### 3. Automate

```bash
# Weekly newsletter distribution
node scripts/newsletter/send-test-email.js [file] [email]
node scripts/social/cross-post-newsletter.cjs [file]
```

---

## Links

- **Full Guide:** `docs/LINKEDIN_INTEGRATION_GUIDE.md`
- **Main Docs:** `CLAUDE.md`
- **Social Setup:** `SOCIAL_MEDIA_SETUP.md`
- **LinkedIn Docs:** https://learn.microsoft.com/en-us/linkedin/marketing/community-management/
- **Developer Portal:** https://www.linkedin.com/developers/apps/225561866

---

**Status:** Development Tier Active | Standard Tier Pending
**Organization:** 108297743 (https://www.linkedin.com/company/108297743/)
**Last Updated:** 2025-10-16
