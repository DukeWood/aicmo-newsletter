# Canva Redirect URL Configuration Guide

**Quick Answer:** Yes, you can use `127.0.0.1:3001` for development! Canva supports it.

## TL;DR

```bash
# In Canva Developer Portal:
Add redirect URL: http://127.0.0.1:3001/oauth/redirect

# In your .env file:
CANVA_REDIRECT_URI=http://127.0.0.1:3001/oauth/redirect

# That's it! You're ready to go.
```

## Understanding the "Non-Localhost" Warning

When you see Canva's warning about "non-localhost" URLs, here's what it means:

### What the Warning Says

- ❌ "Ensure the default redirect URL is non-localhost"
- ❌ "Ensure the redirect URL is non-localhost"

### What It Actually Means

The warning is about **production readiness**, not development restrictions:

1. **Development:** `127.0.0.1` and `localhost` are ALLOWED ✅
2. **Production:** Public domains are REQUIRED ✅
3. **Default URL:** Should ideally be production URL (but not enforced)

## Three Ways to Handle Redirect URLs

### Option 1: Use 127.0.0.1 (Recommended for Development)

**In Canva Developer Portal:**

```text
http://127.0.0.1:3001/oauth/redirect
```

**In .env file:**

```bash
CANVA_REDIRECT_URI=http://127.0.0.1:3001/oauth/redirect
```

**Why this works:**

- Canva explicitly supports `127.0.0.1` for development
- Shown in their own Authorization URL generator
- No warnings or errors
- Works immediately

### Option 2: Use localhost (Alternative)

**In Canva Developer Portal:**

```text
http://localhost:3001/oauth/redirect
```

**In .env file:**

```bash
CANVA_REDIRECT_URI=http://localhost:3001/oauth/redirect
```

**Note:**

- Also works fine for development
- `localhost` and `127.0.0.1` are functionally the same
- Some systems may treat them differently

### Option 3: Use Both (Best Practice)

Add **multiple redirect URLs** in Canva Developer Portal:

1. Development: `http://127.0.0.1:3001/oauth/redirect`
2. Staging: `https://staging.yourdomain.com/oauth/redirect`
3. Production: `https://yourdomain.com/oauth/redirect`

Set production URL as "default", but use development URL in local `.env`.

## Step-by-Step Setup

### Step 1: Add Redirect URL in Canva

1. Go to <https://www.canva.com/developers/>
2. Open your integration
3. Navigate to **"Authentication"** section
4. Under **"Redirect URLs"**, click **"Add redirect URL"**
5. Enter: `http://127.0.0.1:3001/oauth/redirect`
6. Click **"Add"**
7. (Optional) Set as default if it's your only URL

### Step 2: Configure .env File

Update your `.env` file:

```bash
CANVA_CLIENT_ID=OC-AZndiQDmxUJT
CANVA_CLIENT_SECRET=your-secret-here
CANVA_REDIRECT_URI=http://127.0.0.1:3001/oauth/redirect
```

### Step 3: Verify Configuration

The OAuth script will:

1. Start local server on `127.0.0.1:3001`
2. Generate authorization URL with redirect_uri parameter
3. Open browser to Canva
4. Redirect back to `http://127.0.0.1:3001/oauth/redirect`
5. Exchange code for tokens

### Step 4: Test Authentication

```bash
node scripts/canva/canva-oauth.js
```

Expected flow:

```text
🚀 Starting Canva OAuth flow...
🌐 Local OAuth server listening on http://127.0.0.1:3001
👉 Opening browser for authorization...

[Browser opens to Canva authorization page]
[User clicks "Authorize"]
[Redirects to http://127.0.0.1:3001/oauth/redirect]

✅ Authorization Successful!
📁 Tokens saved to: .canva-tokens.json
```

## Understanding Authorization URLs

### What You See in Canva's Tool

Canva provides an **Authorization URL generator** that shows:

```text
https://www.canva.com/api/oauth/authorize?
  code_challenge_method=s256&
  response_type=code&
  client_id=OC-AZndiQDmxUJT&
  redirect_uri=http%3A%2F%2F127.0.0.1%3A3001%2Foauth%2Fredirect&
  scope=design:content:write%20asset:write%20...&
  code_challenge=<CODE_CHALLENGE>
```

Notice: `redirect_uri=http%3A%2F%2F127.0.0.1%3A3001%2Foauth%2Fredirect`

This is URL-encoded version of: `http://127.0.0.1:3001/oauth/redirect`

### What Our Script Generates

The OAuth script (`canva-oauth.js`) generates the exact same URL format:

```javascript
const authParams = new URLSearchParams({
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,  // http://127.0.0.1:3001/oauth/redirect
  scope: SCOPES.join(' '),
  code_challenge: codeChallenge,
  code_challenge_method: 'S256',
  state: state,
  response_type: 'code'
});

const authUrl = `${CANVA_AUTH_URL}?${authParams.toString()}`;
```

## Common Issues and Solutions

### Issue: "Redirect URI mismatch"

**Cause:** Redirect URI in your code doesn't match what's in Canva portal.

**Solution:**

1. Check Canva portal → Authentication → Redirect URLs
2. Check `.env` file → `CANVA_REDIRECT_URI`
3. Ensure they match **exactly** (including `http://` vs `https://`, port number, etc.)

**Example of mismatch:**

```text
❌ Portal: http://localhost:3001/oauth/redirect
❌ .env:    http://127.0.0.1:3001/oauth/redirect
   → MISMATCH! These are different to OAuth

✅ Portal: http://127.0.0.1:3001/oauth/redirect
✅ .env:    http://127.0.0.1:3001/oauth/redirect
   → MATCH! This works.
```

### Issue: "Non-localhost URL required"

**If you see this during development:**

- Ignore the warning - `127.0.0.1` works fine
- Warning is about production deployment
- You can still authorize and get tokens

**If you see this when trying to publish:**

- Add a production URL: `https://yourdomain.com/oauth/redirect`
- Set it as the default redirect URL
- Keep `127.0.0.1` URL for development

### Issue: "Connection refused"

**Cause:** OAuth script isn't running or port 3001 is blocked.

**Solution:**

```bash
# Check if port 3001 is available
lsof -i :3001

# If occupied, kill the process
kill -9 <PID>

# Or change port in .env
CANVA_REDIRECT_URI=http://127.0.0.1:3002/oauth/redirect
```

## Production Deployment

When deploying to production:

### Update Redirect URLs

1. **Register production domain** in Canva portal:

   ```text
   https://yourdomain.com/oauth/redirect
   ```

2. **Keep development URL** for local testing:

   ```text
   http://127.0.0.1:3001/oauth/redirect
   ```

3. **Set production as default** in Canva portal

### Environment-Specific Configuration

**Development (.env):**

```bash
CANVA_REDIRECT_URI=http://127.0.0.1:3001/oauth/redirect
```

**Production (.env.production):**

```bash
CANVA_REDIRECT_URI=https://yourdomain.com/oauth/redirect
```

### Deploy OAuth Callback Handler

Deploy an Express server to handle the production redirect:

```javascript
// Production server
app.get('/oauth/redirect', async (req, res) => {
  const { code, state } = req.query;
  // Exchange code for token
  // Store in secure database
  // Redirect user to success page
});
```

## Key Takeaways

1. ✅ **127.0.0.1 works perfectly** for local development
2. ✅ **localhost also works** but 127.0.0.1 is more explicit
3. ✅ **Multiple redirect URLs** are allowed
4. ⚠️ **"Non-localhost" warning** is about production, not development
5. ✅ **For now, use** `http://127.0.0.1:3001/oauth/redirect`
6. ✅ **Later, add production** URL when deploying

## Quick Reference

| Environment | Redirect URL | Where to Set |
|-------------|-------------|--------------|
| **Development** | `http://127.0.0.1:3001/oauth/redirect` | Canva portal + `.env` |
| **Staging** | `https://staging.domain.com/oauth/redirect` | Canva portal + `.env.staging` |
| **Production** | `https://yourdomain.com/oauth/redirect` | Canva portal (set as default) + `.env.production` |

## Next Steps

1. ✅ Add `http://127.0.0.1:3001/oauth/redirect` to Canva portal
2. ✅ Update `.env` with `CANVA_REDIRECT_URI=http://127.0.0.1:3001/oauth/redirect`
3. ✅ Run `npm install` to install dependencies
4. ✅ Run `node scripts/canva/canva-oauth.js` to authenticate
5. ✅ Test with `node scripts/newsletter/generate-images-canva.js`

---

**Last Updated:** 2025-10-13

**Your Setup:**

- ✅ Client ID: `OC-AZndiQDmxUJT`
- ✅ Redirect URI: `http://127.0.0.1:3001/oauth/redirect`
- ✅ Scripts: Ready to use
- ✅ Documentation: Complete

You're all set! 🚀
