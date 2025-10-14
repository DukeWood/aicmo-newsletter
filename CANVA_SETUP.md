# Canva API Setup Guide

Complete guide to set up Canva Connect API for automated newsletter image generation in the aiCMO marketing system.

## Overview

The Canva Connect API integration enables:
- Programmatic creation of newsletter images
- Brand-consistent design automation
- Template-based image generation
- Export designs as PNG/JPG for email campaigns

## Prerequisites

Before starting, ensure you have:

1. **Canva Account** (free or paid)
   - Sign up at https://www.canva.com if needed
   - **Important:** Enable Multi-Factor Authentication (MFA) on your account

2. **Node.js Environment**
   - Node.js v20.14.0 or higher
   - npm v9 or v10

3. **Project Setup**
   - `.env` file in project root
   - Required npm packages (see Installation section)

## Step 1: Create Canva Integration

### 1.1 Access Developer Portal

1. Go to https://www.canva.com/developers/
2. Log in with your Canva account
3. Ensure MFA is enabled (required for API access)

### 1.2 Create Integration

1. Navigate to **"Your integrations"**
2. Click **"Create an integration"**
3. Choose integration type:
   - **Private** (recommended) - For your organization only
   - **Public** - Available to all Canva users (requires Canva review)
4. Agree to the **Developer Terms**

### 1.3 Configure Integration Settings

**Basic Information:**
- **Integration Name:** `aiCMO Newsletter Generator` (or your preferred name)
- **Description:** "Automated newsletter image generation for aiCMO marketing campaigns"

**Copy Your Credentials:**
- **Client ID** - Will be displayed immediately (copy this)
- **Client Secret** - Click "Generate" and save securely (shown only once!)

⚠️ **Important:** Save your Client Secret immediately! It cannot be retrieved later.

## Step 2: Configure OAuth Settings

### 2.1 Redirect URLs

Canva supports localhost URLs for development using `127.0.0.1`. For production, use a public domain.

**Development Setup (recommended):**
```
http://127.0.0.1:3001/oauth/redirect
```

**Alternative (also works):**
```
http://localhost:3001/oauth/redirect
```

**Production Setup (when deploying):**
```
https://yourdomain.com/oauth/redirect
```

**How to Add:**
1. In your integration settings, find **"Authentication"** section
2. Click **"Add redirect URL"**
3. Enter: `http://127.0.0.1:3001/oauth/redirect`
4. Click **"Add"**
5. **Set as default** if this is your primary URL

**Note:** Canva's portal may warn about "non-localhost" URLs, but `127.0.0.1` is fully supported for development. The warning applies to the default redirect URL for production deployments.

### 2.2 Return Navigation (Optional)

Return navigation allows users to return to your app after editing:

```
http://localhost:3001/return-nav
```

Add this in the **"Return navigation"** section if needed.

### 2.3 Required Scopes

Select the following scopes for newsletter image generation:

- ✅ `design:content:read` - Read design content
- ✅ `design:content:write` - Create and modify designs
- ✅ `design:meta:read` - Read design metadata
- ✅ `asset:read` - Read assets from Canva
- ✅ `asset:write` - Upload assets to Canva
- ✅ `profile:read` - Read user profile information

**How to Add Scopes:**
1. In integration settings, find **"Scopes"** section
2. Check each required scope
3. Click **"Save"**

## Step 3: Configure Environment Variables

### 3.1 Update .env File

Add your Canva credentials to the `.env` file:

```bash
# Canva API Configuration (OAuth 2.0)
CANVA_CLIENT_ID=your-client-id-from-step-1.3
CANVA_CLIENT_SECRET=your-client-secret-from-step-1.3
CANVA_REDIRECT_URI=http://localhost:3001/oauth/redirect
```

**Example:**
```bash
CANVA_CLIENT_ID=OC-AaBbCc123456789
CANVA_CLIENT_SECRET=abcdef1234567890abcdef1234567890
CANVA_REDIRECT_URI=http://localhost:3001/oauth/redirect
```

### 3.2 Security Best Practices

⚠️ **Never commit your .env file to git!**

Ensure `.env` is in your `.gitignore`:
```bash
# .gitignore
.env
.canva-tokens.json
```

The `.canva-tokens.json` file stores OAuth tokens locally and should never be committed.

## Step 4: Install Dependencies

Install required npm packages:

```bash
npm install dotenv express node-fetch open yaml
```

Or add to your `package.json`:

```json
{
  "dependencies": {
    "dotenv": "^16.0.0",
    "express": "^4.18.0",
    "node-fetch": "^3.3.0",
    "open": "^10.0.0",
    "yaml": "^2.3.0"
  }
}
```

## Step 5: Authenticate with Canva

### 5.1 Run OAuth Flow

Run the authentication helper to obtain access tokens:

```bash
node scripts/canva/canva-oauth.js
```

**What happens:**
1. Script starts a local OAuth server on port 3001
2. Opens your browser to Canva authorization page
3. You authorize the integration
4. Browser redirects back to localhost
5. Script exchanges code for access/refresh tokens
6. Tokens are saved to `.canva-tokens.json`

### 5.2 Authorize Integration

In the browser:
1. Review the requested permissions
2. Click **"Authorize"** or **"Connect"**
3. You'll be redirected back to localhost
4. See success message: "✅ Authorization Successful!"
5. Close browser and return to terminal

### 5.3 Verify Authentication

The script will display:
```
╔═══════════════════════════════════════════╗
║   ✅ Authentication Successful!           ║
╚═══════════════════════════════════════════╝

📝 Your access token is ready to use.
📁 Tokens saved to: .canva-tokens.json
```

## Step 6: Test the Integration

### 6.1 Generate Newsletter Images

Test the Canva integration with a newsletter:

```bash
node scripts/newsletter/generate-images-canva.js campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md
```

**Expected Output:**
```
╔═══════════════════════════════════════════╗
║   Canva Newsletter Image Generator        ║
╚═══════════════════════════════════════════╝

🔐 Authenticating with Canva...
✅ Authentication successful

📄 Parsing newsletter: campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md
   Title: GEO vs SEO: What Smart Founders Need to Know
   Issue: 01

👤 Getting user profile...
   User: Your Name

🎨 Creating newsletter header image...
✅ Design created: ABC123XYZ

╔═══════════════════════════════════════════╗
║   ✅ Canva Design Created!                ║
╚═══════════════════════════════════════════╝
```

### 6.2 Access Your Design

The script provides a direct link to edit your design:

```
https://www.canva.com/design/ABC123XYZ/edit
```

Open this URL to customize the design in Canva's editor.

## Understanding OAuth Token Management

### Automatic Token Refresh

The authentication system automatically handles token refresh:

1. **Access Token** - Valid for 1 hour
2. **Refresh Token** - Used to get new access tokens
3. **Auto-refresh** - Scripts automatically refresh expired tokens
4. **Token Storage** - Saved in `.canva-tokens.json` (local only)

### Token Lifecycle

```
┌─────────────────────────────────────────┐
│ First Run: OAuth Flow                   │
│ → User authorizes                       │
│ → Tokens saved to .canva-tokens.json    │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│ Subsequent Runs: Token Reuse            │
│ → Load cached tokens                    │
│ → Check if expired (< 5 min remaining)  │
│ → Auto-refresh if needed                │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│ Refresh Failed: Re-authenticate         │
│ → Start new OAuth flow                  │
│ → User re-authorizes                    │
│ → New tokens saved                      │
└─────────────────────────────────────────┘
```

### When to Re-authenticate

You'll need to run the OAuth flow again if:

- **First time** using the integration
- **Tokens expired** and refresh failed
- **Deleted** `.canva-tokens.json` file
- **Revoked** authorization in Canva settings
- **Changed** Client ID/Secret in `.env`

## Usage Examples

### Example 1: Basic Newsletter Image Generation

```bash
# Generate images for Issue #1
node scripts/newsletter/generate-images-canva.js campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md
```

### Example 2: Programmatic Design Creation

```javascript
import { getAccessToken } from './scripts/canva/canva-oauth.js';
import { createDesign, exportDesign, waitForExport, downloadImage } from './scripts/newsletter/generate-images-canva.js';

// Authenticate
const accessToken = await getAccessToken();

// Create a design
const design = await createDesign(
  accessToken,
  'Newsletter Header',
  'Presentation',
  600,  // width
  200   // height
);

console.log(`Design created: https://www.canva.com/design/${design.id}/edit`);

// After editing in Canva UI, export programmatically:
const job = await exportDesign(accessToken, design.id, 'png');
const result = await waitForExport(accessToken, job.id);
await downloadImage(result.urls[0], './output/header.png');
```

### Example 3: List Recent Designs

```javascript
import { getAccessToken } from './scripts/canva/canva-oauth.js';
import { listDesigns } from './scripts/newsletter/generate-images-canva.js';

const accessToken = await getAccessToken();
const designs = await listDesigns(accessToken, 10);

designs.forEach(design => {
  console.log(`${design.title} - ${design.id}`);
});
```

## Troubleshooting

### Issue: "Missing Canva credentials in .env file"

**Solution:**
1. Ensure `.env` file exists in project root
2. Verify `CANVA_CLIENT_ID` and `CANVA_CLIENT_SECRET` are set
3. Check for typos in variable names
4. Restart your terminal to reload environment variables

### Issue: "State mismatch - possible CSRF attack"

**Solution:**
- Clear browser cache and cookies
- Restart OAuth flow: `node scripts/canva/canva-oauth.js`
- Ensure no proxy/VPN interfering with requests

### Issue: "Redirect URI mismatch"

**Solution:**
1. Check Canva Developer Portal → Your Integration → Authentication
2. Ensure `http://localhost:3001/oauth/redirect` is added
3. Verify `CANVA_REDIRECT_URI` in `.env` matches exactly
4. Set the redirect URL as **default** in Canva portal

### Issue: "Token exchange failed"

**Solution:**
- Verify Client ID and Client Secret are correct
- Check if integration is enabled in Developer Portal
- Ensure all required scopes are selected
- Try generating a new Client Secret

### Issue: "Failed to create design"

**Solution:**
- Verify authentication: `node scripts/canva/canva-oauth.js`
- Check if tokens are valid (run OAuth flow again)
- Ensure scopes include `design:content:write`
- Check Canva API status: https://status.canva.com

### Issue: "Browser doesn't open automatically"

**Solution:**
- Copy the authorization URL from terminal
- Open manually in your browser
- Complete authorization flow
- Script will detect the callback automatically

### Issue: Port 3001 already in use

**Solution:**
```bash
# Find process using port 3001
lsof -i :3001

# Kill the process
kill -9 <PID>

# Or change port in script
# Edit CANVA_REDIRECT_URI in .env to use different port
```

## API Limitations

### Free Tier Limits

Canva API limits depend on your account type:

- **Rate Limits:** 100 requests/minute (typical)
- **Design Creation:** Unlimited
- **Exports:** May have daily/monthly limits
- **Storage:** Designs stored in your Canva account

### API Capabilities

**What the API Can Do:**
✅ Create blank designs with specified dimensions
✅ List your existing designs
✅ Export designs as PNG/JPG/PDF
✅ Upload images to Canva
✅ Read design metadata

**What the API Cannot Do (Currently):**
❌ Add text/elements programmatically (requires Canva UI)
❌ Apply templates via API (manual only)
❌ Bulk design generation without manual editing
❌ Direct template customization via API

**Workflow Recommendation:**
1. Create design via API (blank canvas)
2. Open in Canva UI to customize
3. Export via API when ready

## Production Deployment

### Update Redirect URLs

For production deployment:

1. Register a public domain redirect URL:
   ```
   https://yourdomain.com/oauth/redirect
   ```

2. Update `.env` for production:
   ```bash
   CANVA_REDIRECT_URI=https://yourdomain.com/oauth/redirect
   ```

3. Deploy OAuth callback handler:
   - Express.js route for `/oauth/redirect`
   - Handle authorization code exchange
   - Store tokens securely (database, not file system)

### Security Considerations

- **Never expose Client Secret** in client-side code
- **Store tokens securely** (encrypted database, not plain files)
- **Use HTTPS** for all redirect URLs in production
- **Implement token rotation** and secure refresh logic
- **Monitor for suspicious activity** in Canva Developer Portal

## Next Steps

Now that Canva is set up:

1. ✅ Create newsletter design templates in Canva UI
2. ✅ Use API to generate blank designs for each issue
3. ✅ Customize designs manually or via templates
4. ✅ Export finalized designs via API
5. ✅ Upload to Cloudinary for newsletter delivery

## Resources

- **Canva Developer Portal:** https://www.canva.com/developers/
- **API Documentation:** https://www.canva.dev/docs/connect/
- **Quickstart Guide:** https://www.canva.dev/docs/connect/quickstart/
- **Authentication Guide:** https://www.canva.dev/docs/connect/authentication/
- **API Reference:** https://www.canva.dev/docs/connect/api-reference/
- **OpenAPI Spec:** https://www.canva.dev/sources/connect/api/latest/api.yml
- **Starter Kit:** https://github.com/canva-sdks/canva-connect-api-starter-kit

## Support

For issues with this integration:
- Check this documentation first
- Review Canva API status: https://status.canva.com
- Consult Canva developer docs: https://www.canva.dev/docs/
- Contact Canva support for API-specific issues

---

**Last Updated:** 2025-10-13
**Integration Version:** 1.0
**Canva API Version:** v1
