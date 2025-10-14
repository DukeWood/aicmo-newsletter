# Canva Integration Guide

**Complete guide to using Canva with the aiCMO marketing system**

---

## Table of Contents

1. [Quick Start (Canva Pro Users)](#quick-start-canva-pro-users)
2. [Setup & Authentication](#setup--authentication)
3. [Working with Designs](#working-with-designs)
4. [Complete Workflow Examples](#complete-workflow-examples)
5. [Advanced: Production Deployment](#advanced-production-deployment)
6. [Troubleshooting & FAQ](#troubleshooting--faq)
7. [Reference](#reference)

---

## Quick Start (Canva Pro Users)

**You have Canva Pro. Here's what you can do:**

### ✅ What Canva Pro CAN Do

1. **Design in Canva UI** - Full creative control
2. **Export via API** - Automate image downloads
3. **Social media automation** - Post to Twitter/X automatically
4. **Newsletter images** - Generate and distribute via email

### ❌ What Canva Pro CANNOT Do

- **Autofill API** - Programmatically add text/images (requires Canva Enterprise)
- **Template automation** - Bulk generation with data (requires Canva Enterprise)
- **Brand templates API** - Advanced template features (requires Canva Enterprise)

### 🚀 Your Workflow (Design → Export → Post)

```bash
# 1. Design in Canva UI (manual - one time)
Open https://www.canva.com → Create design → Save

# 2. Export design via API (automated)
node scripts/canva/export-design.js DAG1wokOYPs png ./temp/image.png

# 3. Post to Twitter with image (automated)
node scripts/social/post-tweet-with-image.js "Your tweet text" ./temp/image.png
```

**That's it!** You get creative flexibility + automation benefits.

---

## Setup & Authentication

### Prerequisites

- ✅ Canva account (Free, Pro, or Enterprise)
- ✅ Node.js v20+
- ✅ npm v9+

### Step 1: Get Canva API Credentials

1. **Go to:** https://www.canva.com/developers/
2. **Login** with your Canva account
3. **Enable MFA** (required for API access)
4. **Create integration:**
   - Click "Create an integration"
   - Type: **Private** (recommended)
   - Name: `aiCMO Newsletter Generator`
   - Description: `Automated marketing image generation`

5. **Copy credentials:**
   - **Client ID:** `OC-AZndiQDmxUJT` (already set for this project)
   - **Client Secret:** Click "Generate" and save it (shown only once!)

### Step 2: Configure OAuth

**Add Redirect URL in Canva Portal:**
1. Go to **Authentication** section
2. Click **"Add redirect URL"**
3. Enter: `http://127.0.0.1:3001/oauth/redirect`
4. Click **"Add"**

**Select Required Scopes:**
- ✅ `design:content:read` - Read design content
- ✅ `design:content:write` - Create designs
- ✅ `design:meta:read` - Read design metadata
- ✅ `asset:read` - Read assets
- ✅ `asset:write` - Upload assets
- ✅ `profile:read` - Read profile

### Step 3: Configure Environment Variables

**Update `.env` file:**
```bash
# Canva API Configuration
CANVA_CLIENT_ID=OC-AZndiQDmxUJT
CANVA_CLIENT_SECRET=your-secret-from-step-1
CANVA_REDIRECT_URI=http://127.0.0.1:3001/oauth/redirect
```

**Security:** Never commit `.env` to git! It's already in `.gitignore`.

### Step 4: Authenticate

**Run OAuth flow:**
```bash
node scripts/canva/canva-oauth.js
```

**What happens:**
1. Opens browser to Canva
2. You click "Authorize"
3. Redirects back to localhost
4. Tokens saved to `.canva-tokens.json`

**Expected output:**
```
✅ Authentication Successful!
📁 Tokens saved to: .canva-tokens.json
```

**Token management:**
- Access tokens expire after 4 hours
- Refresh tokens are used automatically
- Re-authenticate if tokens expire

---

## Working with Designs

### Creating Designs in Canva UI

**Step-by-step:**

1. **Go to Canva:** https://www.canva.com
2. **Create new design:**
   - Click "Create a design"
   - Select "Custom size"
   - **For Twitter:** 1200×675px (16:9 ratio)
   - **For Newsletter:** 600×400px
   - **For Instagram:** 1080×1080px (1:1 ratio)

3. **Design your image:**
   - Add background (gradient, photo, etc.)
   - Add text, logos, icons
   - Use brand colors:
     - Crimson Red: `#C8102E`
     - Navy Blue: `#012169`
   - Save automatically

### Getting Your Design ID

**Method 1: From URL (Easiest)**

1. Open your design in Canva
2. Look at browser URL:
   ```
   https://www.canva.com/design/DAG1wokOYPs/view
                                ↑
                       This is your Design ID
   ```
3. Copy `DAG1wokOYPs` (between `/design/` and `/view` or `/edit`)

**Method 2: From Share Link**

1. Click "Share" button in Canva
2. Copy link: `https://www.canva.com/design/DAG1wokOYPs/...`
3. Extract Design ID: `DAG1wokOYPs`

### Exporting Designs via API

**Basic export:**
```bash
node scripts/canva/export-design.js DAG1wokOYPs
```

**Export with options:**
```bash
node scripts/canva/export-design.js DAG1wokOYPs png ./output/my-image.png
```

**Export formats:**
- `png` - Best for graphics with transparency
- `jpg` - Smaller file size, no transparency
- `pdf` - Print quality

**What happens:**
1. Authenticates with Canva (uses cached tokens)
2. Starts export job
3. Waits for completion (~10-30 seconds)
4. Downloads image to specified path

**Output:**
```
✅ Export completed successfully!
📁 Image saved to: ./temp/event-flyer.png
```

---

## Complete Workflow Examples

### Example 1: Event Flyer → Twitter (What We Just Did!)

**Scenario:** Promote event on Twitter with Canva-designed flyer

**Step 1: Design in Canva**
```
1. Open Canva → Create design (1200×675px)
2. Add event details:
   - Title: "AI Meets Web3"
   - Location: Wapping Tavern, London
   - Date/Time: Oct 21, 6:45-8:30pm
   - Add "FREE EVENT" badge
3. Save design
4. Copy Design ID from URL: DAG1wokOYPs
```

**Step 2: Export & Post (Automated)**
```bash
# Export design
node scripts/canva/export-design.js DAG1wokOYPs png ./temp/event-flyer.png

# Post to Twitter
node scripts/social/post-tweet-with-image.js \
  "🤖 AI Meets Web3 in London!

  FREE social event @ London Web3 Week
  📍 Wapping Tavern, London E1W
  📅 Oct 21, 6:45-8:30pm

  Learn how AI transforms brand discovery
  + networking & drinks 🍻

  #LondonWeb3Week #AIMarketing #GEO" \
  ./temp/event-flyer.png
```

**Result:**
```
✅ Tweet posted successfully!
📊 Tweet ID: 1978051712083534208
🔗 https://twitter.com/user/status/1978051712083534208
```

**Time saved:** ~5 minutes per post (vs. manual upload)

---

### Example 2: Newsletter Header Images

**Scenario:** Generate header image for weekly newsletter

**Step 1: Create template in Canva**
```
Size: 600×200px
Design: Newsletter title + issue number + brand colors
Save Design ID: DAGabc123
```

**Step 2: Export for each issue**
```bash
# Export latest version
node scripts/canva/export-design.js DAGabc123 png \
  ./campaigns/weekly-newsletter/issue-02/assets/header.png
```

**Step 3: Upload to Cloudinary**
```bash
node scripts/newsletter/upload-to-cloudinary.js
```

**Step 4: Send newsletter**
```bash
node scripts/newsletter/send-test-email.js \
  campaigns/weekly-newsletter/issue-02/issue-02-newsletter.md \
  your-email@example.com
```

**Workflow benefit:** Update design in Canva → re-export → automatically in newsletter

---

### Example 3: Social Media Batch Posts

**Scenario:** Create 5 social posts for the week

**Step 1: Design 5 images in Canva**
```
Post 1: DAGpost001 (Monday - Tip)
Post 2: DAGpost002 (Tuesday - Case study)
Post 3: DAGpost003 (Wednesday - Quote)
Post 4: DAGpost004 (Thursday - Tutorial)
Post 5: DAGpost005 (Friday - Weekend read)
```

**Step 2: Export all at once**
```bash
# Create script: export-batch.sh
for id in DAGpost001 DAGpost002 DAGpost003 DAGpost004 DAGpost005; do
  node scripts/canva/export-design.js $id png ./temp/${id}.png
done
```

**Step 3: Schedule posts**
```bash
# Monday
node scripts/social/post-tweet-with-image.js "Monday tip 💡" ./temp/DAGpost001.png

# Tuesday
node scripts/social/post-tweet-with-image.js "Case study 📊" ./temp/DAGpost002.png

# ... etc
```

**Time saved:** ~30 minutes per week

---

## Advanced: Production Deployment

**⚠️ Only needed if:**
- You want to submit integration to Canva for public use
- You need a non-localhost redirect URL
- You're upgrading to Canva Enterprise

**For most Canva Pro users: Skip this section!**

### When to Deploy Production OAuth Server

**You need this if:**
- ❌ Canva shows "non-localhost URL required" error
- ❌ You're publishing integration publicly
- ❌ You're using Canva Enterprise features

**You DON'T need this if:**
- ✅ Using Canva Pro for personal/team use
- ✅ Localhost OAuth works fine (it does!)
- ✅ Not publishing integration publicly

### Quick Deployment (Vercel)

**If you need it, here's the quickest path:**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel login
   vercel --prod
   ```

3. **Set environment variables:**
   ```bash
   vercel env add CANVA_CLIENT_ID
   vercel env add CANVA_CLIENT_SECRET
   vercel --prod
   ```

4. **Update Canva portal:**
   - Add redirect URL: `https://your-app.vercel.app/oauth/redirect`
   - Set as default

**Full deployment guide:** See archived docs in `docs/archive/CANVA_OAUTH_DEPLOYMENT.md`

---

## Troubleshooting & FAQ

### Common Issues

#### "Missing Canva credentials in .env file"

**Solution:**
```bash
# Check .env file exists
ls -la .env

# Add missing variables
echo 'CANVA_CLIENT_ID=OC-AZndiQDmxUJT' >> .env
echo 'CANVA_CLIENT_SECRET=your-secret' >> .env
```

#### "Redirect URI mismatch"

**Solution:**
1. Check Canva portal → Authentication → Redirect URLs
2. Ensure exact match: `http://127.0.0.1:3001/oauth/redirect`
3. Check `.env` → `CANVA_REDIRECT_URI` matches

#### "Token refresh failed"

**Solution:**
```bash
# Re-authenticate
node scripts/canva/canva-oauth.js
```

#### "Export takes too long"

**Normal behavior:**
- Canva exports are asynchronous
- Typical time: 10-30 seconds
- Script waits automatically

**If it times out (>60 seconds):**
- Check Canva API status: https://status.canva.com
- Retry export
- Check network connection

#### "Design ID not found"

**Solution:**
1. Open design in Canva
2. Verify URL format: `https://www.canva.com/design/[ID]/...`
3. Copy exact ID (case-sensitive)
4. Ensure design is in your account

### FAQ

#### Q: Can I automate text/image placement in designs?

**A:** Only with Canva Enterprise + Autofill API.

**Canva Pro workflow:**
1. Design template manually in Canva UI
2. Update template as needed
3. Export latest version via API

#### Q: How many designs can I create?

**A:** Unlimited designs in Canva Pro. API rate limits: ~100 requests/minute.

#### Q: Can I use this for client work?

**A:** Yes, with a Private integration (current setup). For public integrations, you need Canva review.

#### Q: Do tokens expire?

**A:** Yes. Access tokens expire after 4 hours. Refresh tokens last longer. Scripts handle refresh automatically.

#### Q: Can I export without re-authenticating each time?

**A:** Yes! Tokens are cached in `.canva-tokens.json`. Scripts reuse them until they expire.

#### Q: What image formats are supported?

**A:** PNG, JPG, PDF. Use PNG for transparency, JPG for smaller files.

#### Q: Can I batch export multiple designs?

**A:** Yes! Use a bash script:
```bash
for id in DESIGN1 DESIGN2 DESIGN3; do
  node scripts/canva/export-design.js $id png ./output/${id}.png
done
```

#### Q: How do I upgrade to Canva Enterprise?

**A:** Contact Canva sales: https://www.canva.com/enterprise/

**Enterprise benefits:**
- Autofill API (programmatic content)
- Brand templates API
- Advanced team management
- Priority support

---

## Reference

### Script Commands

#### Authentication
```bash
# Authenticate with Canva (first time)
node scripts/canva/canva-oauth.js

# Check authentication status
cat .canva-tokens.json | jq '.expiresAt'
```

#### Export Designs
```bash
# Basic export (default: PNG to ./temp/)
node scripts/canva/export-design.js <DESIGN_ID>

# Export with format
node scripts/canva/export-design.js <DESIGN_ID> png

# Export to specific path
node scripts/canva/export-design.js <DESIGN_ID> png ./output/image.png

# Export as JPG
node scripts/canva/export-design.js <DESIGN_ID> jpg ./output/image.jpg
```

#### Twitter Posting
```bash
# Post text + image
node scripts/social/post-tweet-with-image.js "Tweet text" ./path/to/image.png

# Quick tweet (text only)
node scripts/social/tweet.js "Tweet text"
```

#### Combined Workflow
```bash
# Export → Post (all in one)
node scripts/canva/export-design.js DAG1wokOYPs png ./temp/image.png && \
node scripts/social/post-tweet-with-image.js "Your tweet" ./temp/image.png
```

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `CANVA_CLIENT_ID` | Your Canva integration Client ID | `OC-AZndiQDmxUJT` |
| `CANVA_CLIENT_SECRET` | Your Canva integration Client Secret | `abc123...` |
| `CANVA_REDIRECT_URI` | OAuth redirect URL | `http://127.0.0.1:3001/oauth/redirect` |
| `TWITTER_API_KEY` | Twitter API key (for posting) | `WrGBOnMpPT...` |
| `TWITTER_API_SECRET` | Twitter API secret | `X0bc7IoHjh...` |
| `TWITTER_ACCESS_TOKEN` | Twitter access token | `1772353872...` |
| `TWITTER_ACCESS_TOKEN_SECRET` | Twitter access token secret | `7NpHOeoEHx...` |

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/rest/v1/users/me` | GET | Get user profile |
| `/rest/v1/designs` | GET | List designs |
| `/rest/v1/designs` | POST | Create design |
| `/rest/v1/exports` | POST | Start export job |
| `/rest/v1/exports/{job_id}` | GET | Check export status |

**Base URL:** `https://api.canva.com`

### File Structure

```
.
├── .env                              # Environment variables (secrets)
├── .canva-tokens.json                # OAuth tokens (auto-generated)
├── docs/
│   ├── CANVA_INTEGRATION_GUIDE.md    # This file
│   ├── CANVA_QUICK_REFERENCE.md      # Quick cheat sheet
│   └── archive/                      # Old documentation
│       ├── CANVA_SETUP.md
│       ├── CANVA_REDIRECT_URL_GUIDE.md
│       ├── CANVA_OAUTH_DEPLOYMENT.md
│       └── QUICK_START_CANVA.md
├── scripts/
│   ├── canva/
│   │   ├── canva-oauth.js            # OAuth authentication
│   │   └── export-design.js          # Export designs by ID
│   ├── newsletter/
│   │   └── generate-images-canva.js  # Newsletter workflow
│   └── social/
│       ├── tweet.js                  # Quick tweet
│       └── post-tweet-with-image.js  # Tweet with image
├── server/
│   └── oauth-server.js               # Production OAuth server
└── temp/                             # Temporary exported images
```

### Account Tier Comparison

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| **UI Design** | ✅ Yes | ✅ Yes | ✅ Yes |
| **API Export** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Create via API** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Autofill API** | ❌ No | ❌ No | ✅ Yes |
| **Brand Templates API** | ❌ No | ❌ No | ✅ Yes |
| **Team Management** | Limited | Yes | Advanced |
| **Storage** | 5GB | Unlimited | Unlimited |
| **Priority Support** | ❌ No | ❌ No | ✅ Yes |

**This project works with:** Free, Pro, and Enterprise

**Tested with:** Canva Pro (your current tier)

### Rate Limits

| Operation | Limit | Notes |
|-----------|-------|-------|
| API Requests | ~100/minute | Per user |
| Exports | Unlimited | Async processing |
| OAuth Tokens | 1 hour expiry | Auto-refresh |
| Designs | Unlimited | Storage limits apply |

### Useful Links

- **Canva Developer Portal:** https://www.canva.com/developers/
- **API Documentation:** https://www.canva.dev/docs/connect/
- **API Status:** https://status.canva.com
- **Authentication Guide:** https://www.canva.dev/docs/connect/authentication/
- **API Reference:** https://www.canva.dev/docs/connect/api-reference/
- **Starter Kit:** https://github.com/canva-sdks/canva-connect-api-starter-kit

### Support

**Issues with this integration:**
- Check troubleshooting section above
- Review `.env` configuration
- Check token expiry in `.canva-tokens.json`

**Canva API issues:**
- API Status: https://status.canva.com
- Developer docs: https://www.canva.dev/docs/
- Contact Canva support

**Script issues:**
- Check Node.js version: `node --version` (need v20+)
- Check dependencies: `npm install`
- Review script output for error messages

---

**Last Updated:** 2025-10-14
**Tested With:** Canva Pro
**Node.js Version:** v22.20.0
**Integration Status:** ✅ Working
