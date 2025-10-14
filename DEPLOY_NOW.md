# Deploy Canva OAuth Server - Execute Now

## Step-by-Step Deployment (10 minutes)

### Step 1: Login to Vercel (2 minutes)

Run this command in your terminal:

```bash
vercel login
```

**What happens:**
- Opens browser for authentication
- Choose login method (GitHub, GitLab, Bitbucket, or Email)
- Authorize Vercel CLI
- Returns to terminal

**Recommended:** Login with GitHub (easiest)

---

### Step 2: Deploy (3 minutes)

Once logged in, run:

```bash
cd /Users/Jason-uk/AI/AI_Coding/Repositories/aiCMO_newsletter
vercel --prod
```

**During deployment, answer:**

1. **Set up and deploy?** → Yes (Y)
2. **Which scope?** → Choose your account
3. **Link to existing project?** → No (N)
4. **Project name?** → aicmo-canva-oauth (or press Enter)
5. **Directory?** → ./ (press Enter)
6. **Override settings?** → No (N)

**Output will show:**
```
✅ Production: https://aicmo-canva-oauth-xxxxx.vercel.app
```

**SAVE THIS URL!** You'll need it for Canva portal.

---

### Step 3: Set Environment Variables (2 minutes)

Run these commands one by one:

```bash
# Set Client ID
vercel env add CANVA_CLIENT_ID production
# When prompted, paste: OC-AZndiQDmxUJT

# Set Client Secret
vercel env add CANVA_CLIENT_SECRET production
# When prompted, paste your actual secret from Canva Developer Portal
```

---

### Step 4: Redeploy with Environment Variables (1 minute)

```bash
vercel --prod
```

This redeploys with the environment variables you just set.

**Your final production URL:**
```
https://aicmo-canva-oauth-xxxxx.vercel.app
```

---

### Step 5: Update Canva Developer Portal (2 minutes)

1. Go to: https://www.canva.com/developers/
2. Open your integration: **OC-AZndiQDmxUJT**
3. Click **"Authentication"** section
4. Click **"Add redirect URL"**
5. Enter: `https://aicmo-canva-oauth-xxxxx.vercel.app/oauth/redirect`
   (Replace with your actual Vercel URL)
6. Click **"Set as default"** ✅

---

### Step 6: Test Your Deployment (1 minute)

Open in browser:
```
https://aicmo-canva-oauth-xxxxx.vercel.app/oauth/authorize
```

**Expected flow:**
1. Redirects to Canva authorization page
2. Click "Authorize"
3. Redirects back to your Vercel URL
4. Shows success page with tokens
5. Copy the JSON and save to `.canva-tokens.json`

---

## Quick Commands Reference

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Add environment variable
vercel env add CANVA_CLIENT_ID production
vercel env add CANVA_CLIENT_SECRET production

# Check deployment
vercel ls

# View logs
vercel logs

# Check env vars
vercel env ls
```

---

## Troubleshooting

### "No existing credentials found"
```bash
vercel login
```

### "Missing environment variables"
```bash
vercel env add CANVA_CLIENT_ID production
vercel env add CANVA_CLIENT_SECRET production
vercel --prod
```

### "Redirect URI mismatch"
- Ensure URL in Canva portal matches Vercel URL exactly
- Include `/oauth/redirect` path
- Must be HTTPS

---

## What You'll Get

**Production URL Example:**
```
https://aicmo-canva-oauth-abc123.vercel.app
```

**OAuth Authorize URL:**
```
https://aicmo-canva-oauth-abc123.vercel.app/oauth/authorize
```

**Health Check:**
```
https://aicmo-canva-oauth-abc123.vercel.app/health
```

---

## After Deployment

1. ✅ Save your Vercel URL
2. ✅ Add to Canva Developer Portal as redirect URL
3. ✅ Set as default in Canva portal
4. ✅ Test OAuth flow
5. ✅ Submit integration for review

---

**Ready to start?** Open your terminal and run:

```bash
vercel login
```

Then follow the steps above!
