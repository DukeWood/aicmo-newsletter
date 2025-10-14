# Canva OAuth Server Deployment Guide

Complete guide to deploy the Canva OAuth server to production, solving the "non-localhost" redirect URL requirement.

## Problem Statement

Canva requires the **default redirect URL to be non-localhost** before you can submit your integration for review. This guide shows you how to deploy a production OAuth server to satisfy this requirement.

## Solution Overview

We've created a lightweight Express.js OAuth server that:
- ✅ Handles Canva OAuth 2.0 flow with PKCE
- ✅ Provides a public HTTPS URL for Canva redirects
- ✅ Runs on free-tier hosting (Vercel, Railway, Render, Heroku)
- ✅ Takes 5-10 minutes to deploy
- ✅ Requires no database (uses in-memory storage)

---

## Quick Start (Choose One Platform)

### Option A: Deploy to Vercel (Recommended) ⭐

**Why Vercel:**
- ✅ Free tier with HTTPS
- ✅ Automatic deployments from Git
- ✅ Deploy in 2 minutes
- ✅ Custom domains supported

**Steps:**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Note your deployment URL:**
   ```
   https://aicmo-canva-oauth.vercel.app
   ```

5. **Set environment variables:**
   ```bash
   vercel env add CANVA_CLIENT_ID
   vercel env add CANVA_CLIENT_SECRET
   ```

6. **Redeploy with env vars:**
   ```bash
   vercel --prod
   ```

---

### Option B: Deploy to Railway

**Why Railway:**
- ✅ Free $5/month credit
- ✅ Simple deployment
- ✅ Good for Node.js apps

**Steps:**

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login:**
   ```bash
   railway login
   ```

3. **Initialize project:**
   ```bash
   railway init
   ```

4. **Deploy:**
   ```bash
   railway up
   ```

5. **Add environment variables:**
   ```bash
   railway variables set CANVA_CLIENT_ID=your-client-id
   railway variables set CANVA_CLIENT_SECRET=your-client-secret
   ```

6. **Get your URL:**
   ```bash
   railway domain
   ```

---

### Option C: Deploy to Render

**Why Render:**
- ✅ Free tier available
- ✅ Easy GitHub integration
- ✅ Automatic HTTPS

**Steps:**

1. **Go to:** <https://render.com>

2. **Create New > Web Service**

3. **Connect your GitHub repository**

4. **Configuration:**
   - **Name:** `aicmo-canva-oauth`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server/oauth-server.js`
   - **Plan:** Free

5. **Environment Variables:**
   - Add `CANVA_CLIENT_ID`
   - Add `CANVA_CLIENT_SECRET`

6. **Deploy** - Your URL will be:
   ```
   https://aicmo-canva-oauth.onrender.com
   ```

---

### Option D: Deploy to Heroku

**Why Heroku:**
- ✅ Well-established platform
- ✅ Free tier (with credit card)
- ✅ Simple deployment

**Steps:**

1. **Install Heroku CLI:**
   ```bash
   brew install heroku/brew/heroku
   ```

2. **Login:**
   ```bash
   heroku login
   ```

3. **Create app:**
   ```bash
   heroku create aicmo-canva-oauth
   ```

4. **Set environment variables:**
   ```bash
   heroku config:set CANVA_CLIENT_ID=your-client-id
   heroku config:set CANVA_CLIENT_SECRET=your-client-secret
   ```

5. **Deploy:**
   ```bash
   git push heroku main
   ```

6. **Your URL:**
   ```
   https://aicmo-canva-oauth.herokuapp.com
   ```

---

## Configure Canva Developer Portal

Once deployed, update your Canva integration:

### Step 1: Add Production Redirect URL

1. Go to <https://www.canva.com/developers/>
2. Open your integration (`OC-AZndiQDmxUJT`)
3. Navigate to **Authentication** section
4. Click **"Add redirect URL"**
5. Enter your production URL:
   ```
   https://your-deployment-url.vercel.app/oauth/redirect
   ```
6. Click **"Add"**
7. **Set as default** ✅

### Step 2: Keep Development URL

Don't remove your localhost URL! Keep it for local development:
- Production (default): `https://your-deployment-url.vercel.app/oauth/redirect`
- Development: `http://127.0.0.1:3001/oauth/redirect`

### Step 3: Submit for Review

Now you can submit your integration:
1. Go to **"Submit for review"** section
2. All checks should pass ✅:
   - ✅ Provide a name for your integration
   - ✅ Enable at least one scope
   - ✅ Add at least one redirect URL
   - ✅ Ensure the default redirect URL is non-localhost
3. Click **"Submit"**

---

## Using Your Deployed OAuth Server

### Method 1: Via Browser (Easiest)

1. **Visit your OAuth URL:**
   ```
   https://your-deployment-url.vercel.app/oauth/authorize
   ```

2. **Authorize with Canva** (click "Authorize")

3. **Copy the tokens** from the success page

4. **Save to `.canva-tokens.json`** in your project root

5. **Done!** Your local scripts will now use these tokens

### Method 2: Via Local Script (Automated)

Update your local `.env` to use production OAuth:

```bash
CANVA_OAUTH_SERVER=https://your-deployment-url.vercel.app
```

Then run:
```bash
node scripts/canva/canva-oauth.js --use-production
```

---

## Testing Your Deployment

### Test Endpoints

1. **Health Check:**
   ```bash
   curl https://your-deployment-url.vercel.app/health
   ```

   Expected response:
   ```json
   {
     "status": "healthy",
     "configured": true,
     "timestamp": "2025-10-13T10:30:00.000Z"
   }
   ```

2. **Service Info:**
   ```bash
   curl https://your-deployment-url.vercel.app/
   ```

3. **OAuth Flow:**
   - Open in browser: `https://your-deployment-url.vercel.app/oauth/authorize`
   - Should redirect to Canva
   - After authorization, should show success page with tokens

---

## Security Best Practices

### Environment Variables

**Never commit these to Git:**
- ❌ `CANVA_CLIENT_ID`
- ❌ `CANVA_CLIENT_SECRET`
- ❌ `.canva-tokens.json`

**Always set via hosting platform:**
```bash
# Vercel
vercel env add CANVA_CLIENT_ID
vercel env add CANVA_CLIENT_SECRET

# Railway
railway variables set CANVA_CLIENT_ID=...

# Heroku
heroku config:set CANVA_CLIENT_ID=...
```

### Token Storage

**Current Implementation:**
- Tokens are stored in-memory (suitable for single-user)
- PKCE code verifiers expire after 10 minutes
- No persistent database required

**For Multi-User Production:**
- Use Redis for code verifier storage
- Store tokens in encrypted database
- Implement user authentication
- Add token refresh logic

### HTTPS Required

- ✅ All hosting platforms provide free HTTPS
- ✅ Canva requires HTTPS for production URLs
- ❌ Never use HTTP for production redirects

---

## Troubleshooting

### Issue: "Configuration Error"

**Symptoms:**
```
❌ Configuration Error
Missing environment variables:
- CANVA_CLIENT_ID
- CANVA_CLIENT_SECRET
```

**Solution:**
```bash
# Check if env vars are set
vercel env ls

# Add missing variables
vercel env add CANVA_CLIENT_ID
vercel env add CANVA_CLIENT_SECRET

# Redeploy
vercel --prod
```

### Issue: "Redirect URI Mismatch"

**Symptoms:**
- Canva shows error: "redirect_uri doesn't match"

**Solution:**
1. Check Canva portal → Authentication → Redirect URLs
2. Ensure exact match (including `/oauth/redirect` path)
3. Check HTTPS vs HTTP
4. Ensure URL is set as default

### Issue: "Invalid State Parameter"

**Symptoms:**
- Error page: "Invalid state parameter"

**Cause:**
- Code verifier expired (10 minute timeout)
- Server restarted between authorize and callback

**Solution:**
- Start OAuth flow again
- Complete authorization within 10 minutes
- For production with multiple servers, use Redis for state storage

### Issue: Deployment Failed

**Vercel:**
```bash
# Check logs
vercel logs

# Check build
vercel inspect
```

**Railway:**
```bash
# Check logs
railway logs

# Check deployment
railway status
```

---

## Cost Comparison

| Platform | Free Tier | Bandwidth | Custom Domain | Auto-Sleep |
|----------|-----------|-----------|---------------|------------|
| **Vercel** | ✅ Unlimited | 100GB/month | ✅ Free | ❌ No |
| **Railway** | $5 credit/month | Included | ✅ Free | ❌ No |
| **Render** | ✅ Yes | Limited | ✅ Free | ✅ After 15 min |
| **Heroku** | ✅ Yes (with card) | Limited | ✅ Paid | ✅ After 30 min |

**Recommendation:** Vercel for best free tier, Railway for simple deployment.

---

## Custom Domain (Optional)

### Add Custom Domain to Vercel

1. **Go to project settings** in Vercel dashboard
2. **Domains** → Add domain
3. **Enter:** `oauth.yourdomain.com`
4. **Add DNS records** as instructed
5. **Wait for DNS propagation** (5-30 minutes)
6. **Update Canva redirect URL:**
   ```
   https://oauth.yourdomain.com/oauth/redirect
   ```

### Benefits:
- ✅ Professional URL
- ✅ Better branding
- ✅ Persistent URL (doesn't change)

---

## Monitoring & Maintenance

### Health Checks

Set up monitoring:
```bash
# UptimeRobot, Pingdom, or similar
GET https://your-deployment-url.vercel.app/health
```

### Logs

**Vercel:**
```bash
vercel logs --follow
```

**Railway:**
```bash
railway logs
```

**Render:**
- View in dashboard

### Updates

When you update the code:
```bash
git push origin main  # If using Git integration
# Or
vercel --prod  # Manual deployment
```

---

## Architecture Diagram

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │ 1. Opens browser
       ↓
┌─────────────────────────────┐
│ Your Deployed OAuth Server  │
│ https://your-app.vercel.app │
└──────┬──────────────────────┘
       │ 2. Redirects to Canva
       ↓
┌─────────────────────────┐
│  Canva Authorization    │
│  User clicks "Authorize"│
└──────┬──────────────────┘
       │ 3. Redirects back
       ↓
┌─────────────────────────────┐
│ Your OAuth Server           │
│ /oauth/redirect endpoint    │
└──────┬──────────────────────┘
       │ 4. Exchange code for tokens
       ↓
┌─────────────────────────┐
│  Success page with      │
│  Access & Refresh tokens│
└─────────────────────────┘
       │ 5. User copies tokens
       ↓
┌─────────────────────────┐
│  .canva-tokens.json     │
│  (local file)           │
└─────────────────────────┘
```

---

## Summary

**What You've Deployed:**
- ✅ Production OAuth server with HTTPS
- ✅ Handles Canva OAuth 2.0 with PKCE
- ✅ Provides non-localhost redirect URL
- ✅ Enables Canva integration submission

**Next Steps:**
1. ✅ Deploy to your chosen platform (5-10 minutes)
2. ✅ Add production redirect URL to Canva portal
3. ✅ Test OAuth flow via deployed URL
4. ✅ Submit integration for review
5. ✅ Use production URL for all future authorizations

**Files Created:**
- `server/oauth-server.js` - OAuth server code
- `vercel.json` - Vercel configuration
- `railway.json` - Railway configuration
- `Procfile` - Heroku configuration

**Support:**
- Deployment issues: Check platform-specific docs
- Canva API issues: <https://www.canva.dev/docs/>
- OAuth questions: See [CANVA_SETUP.md](CANVA_SETUP.md)

---

**Last Updated:** 2025-10-13
**Server Version:** 1.0.0
**Deployment Status:** ✅ Ready to Deploy
