# Canva OAuth Setup - Quick Start Guide

**Problem:** Canva requires non-localhost redirect URL to submit integration for review.

**Solution:** Deploy OAuth server to production (5-10 minutes).

---

## 🚀 Fastest Path to Production

### Step 1: Deploy to Vercel (2 minutes)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Note your URL (example):
# https://aicmo-canva-oauth.vercel.app
```

### Step 2: Set Environment Variables (1 minute)

```bash
vercel env add CANVA_CLIENT_ID
# Paste: OC-AZndiQDmxUJT

vercel env add CANVA_CLIENT_SECRET
# Paste: your-client-secret

# Redeploy with env vars
vercel --prod
```

### Step 3: Update Canva Portal (2 minutes)

1. Go to: <https://www.canva.com/developers/>
2. Open your integration
3. **Authentication** → **Add redirect URL**
4. Enter: `https://your-vercel-url.vercel.app/oauth/redirect`
5. **Set as default** ✅

### Step 4: Test & Get Tokens (1 minute)

1. Open: `https://your-vercel-url.vercel.app/oauth/authorize`
2. Click "Authorize" on Canva
3. Copy the JSON from success page
4. Save to `.canva-tokens.json` in your project root

### Step 5: Submit for Review

1. Go to Canva Developer Portal
2. **Submit for review** section
3. All checks should pass ✅
4. Click **Submit**

**Done! ✅**

---

## 📁 Files Created

| File | Purpose |
|------|---------|
| `server/oauth-server.js` | Production OAuth server |
| `vercel.json` | Vercel deployment config |
| `railway.json` | Railway deployment config |
| `Procfile` | Heroku deployment config |
| `CANVA_OAUTH_DEPLOYMENT.md` | Full deployment guide |

---

## 🔧 Local Testing

Test the server locally before deploying:

```bash
# Set env vars in .env
CANVA_CLIENT_ID=OC-AZndiQDmxUJT
CANVA_CLIENT_SECRET=your-secret

# Start server
npm run oauth:server

# Open browser
open http://localhost:3001/oauth/authorize
```

---

## 📋 Available Commands

```bash
# Start production OAuth server
npm start

# Start OAuth server (same as above)
npm run oauth:server

# Run local OAuth flow (development)
npm run oauth:local

# Deploy to Vercel
vercel --prod

# Check Vercel logs
vercel logs
```

---

## 🌐 Platform Options

| Platform | Deploy Time | Free Tier | Command |
|----------|-------------|-----------|---------|
| **Vercel** ⭐ | 2 min | ✅ Yes | `vercel --prod` |
| **Railway** | 3 min | $5/month | `railway up` |
| **Render** | 5 min | ✅ Yes | Via dashboard |
| **Heroku** | 5 min | ✅ Yes* | `git push heroku main` |

*Requires credit card

---

## ✅ What This Solves

**Before:**
- ❌ Can't submit integration (localhost not allowed)
- ❌ Can't use Canva API in production
- ❌ Stuck in development mode

**After:**
- ✅ Production HTTPS redirect URL
- ✅ Can submit for Canva review
- ✅ Production-ready OAuth flow
- ✅ Still works for local development

---

## 🔐 Security

**Environment Variables (Never commit):**
- `CANVA_CLIENT_ID` - Set via hosting platform
- `CANVA_CLIENT_SECRET` - Set via hosting platform
- `.canva-tokens.json` - Already in .gitignore

**HTTPS:**
- ✅ All platforms provide free HTTPS
- ✅ Canva requires HTTPS for production

---

## 🆘 Troubleshooting

### "Configuration Error"
```bash
# Check env vars are set
vercel env ls

# Add if missing
vercel env add CANVA_CLIENT_ID
vercel env add CANVA_CLIENT_SECRET
```

### "Redirect URI Mismatch"
- Ensure URL in Canva portal matches deployment URL exactly
- Include `/oauth/redirect` path
- Check HTTPS (not HTTP)

### Server Won't Start Locally
```bash
# Check if port 3001 is in use
lsof -i :3001

# Kill process if needed
kill -9 <PID>
```

---

## 📚 Full Documentation

- **Complete Setup:** [CANVA_SETUP.md](CANVA_SETUP.md)
- **Deployment Guide:** [CANVA_OAUTH_DEPLOYMENT.md](CANVA_OAUTH_DEPLOYMENT.md)
- **Redirect URL FAQ:** [CANVA_REDIRECT_URL_GUIDE.md](CANVA_REDIRECT_URL_GUIDE.md)

---

## 🎯 Next Steps

1. ✅ Deploy server (5 minutes)
2. ✅ Update Canva portal redirect URL
3. ✅ Test OAuth flow
4. ✅ Submit integration for review
5. ✅ Start building with Canva API!

---

**Deployment Status:** ✅ Ready to Deploy
**Estimated Time:** 10 minutes total
**Cost:** Free (Vercel free tier)

---

**Need Help?**
- Full guide: [CANVA_OAUTH_DEPLOYMENT.md](CANVA_OAUTH_DEPLOYMENT.md)
- Vercel docs: <https://vercel.com/docs>
- Canva docs: <https://www.canva.dev/docs/>
