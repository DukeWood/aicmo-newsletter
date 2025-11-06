# Manual Newsletter Workflow

Complete guide for creating, preparing, and sending newsletters via Mailchimp API.

## Overview

This workflow covers the end-to-end process of manually creating newsletter content in HTML, uploading images to Cloudinary CDN, and publishing via Mailchimp API.

## Process Summary

### 1. Newsletter Creation

Create two versions of the newsletter:

**Email Version:** `campaigns/weekly-newsletter/issue-XX/assets/manual_newsletters/[name]-email.html`
- Uses table-based layout for email client compatibility
- Optimized for Gmail, Outlook, Apple Mail
- Inline styles only (no external CSS)
- Max width: 600px

**Web Version:** `campaigns/weekly-newsletter/issue-XX/assets/manual_newsletters/[name].html`
- Modern CSS with embedded styles
- Responsive design
- Browser-optimized (not email-safe)

**Key Email HTML Structure:**
```html
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Newsletter Title</title>
  <style>
    /* Minimal reset styles only */
    body { margin: 0; padding: 0; }
    table { border-collapse: collapse; }
  </style>
</head>
<body>
  <!-- Preheader (hidden preview text) -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    Preview text here
  </div>

  <!-- View in Browser Link -->
  <table role="presentation" style="width: 100%; background-color: #f8fafc;">
    <tr>
      <td align="center" style="padding: 12px 20px; font-size: 13px;">
        Having trouble viewing this email?
        <a href="*|ARCHIVE|*">View it in your browser</a>
      </td>
    </tr>
  </table>

  <!-- Main container (600px max-width) -->
  <table role="presentation" style="width: 100%; max-width: 600px;">
    <!-- Content sections using nested tables -->
  </table>
</body>
</html>
```

**Required Elements:**
- Preheader text (hidden, shows in email preview)
- View in browser link with `*|ARCHIVE|*` merge tag
- Company information in footer:
  ```
  AI Marketing OS Ltd
  Company No. 16687354
  5 Audley Rise, Tonbridge, England, TN9 1XU
  ```
- Unsubscribe link: `*|UNSUB|*` or `{{UNSUBSCRIBE_LINK}}`

### 2. Image Preparation

**Image Specifications:**
- Format: PNG (transparency) or JPG (smaller size)
- Size: 1-2MB original (quality matters)
- Delivery: Optimized by Cloudinary (50-200KB)

**Common Sizes:**
- Header: 1200×627px (social sharing size)
- Diagrams: 1200×600px or 900×900px
- Icons: 32×32px

**Upload to Cloudinary:**
```bash
node scripts/newsletter/upload-newsletter-images.mjs
```

This script:
- Uploads all PNG/JPG images from the newsletter assets folder
- Generates optimized CDN URLs
- Saves URLs to `cloudinary-urls.json`
- Applies automatic optimization (q_auto, f_auto)

**Manual Image URL Format:**
```
https://res.cloudinary.com/dmaw7i3gz/image/upload/v[timestamp]/newsletter/[folder]/[filename].png
```

**Update HTML with Cloudinary URLs:**
Replace local image paths with CDN URLs:
```html
<!-- Before -->
<img src="./seo-vs-geo-comparison.png" alt="SEO vs GEO">

<!-- After -->
<img src="https://res.cloudinary.com/dmaw7i3gz/image/upload/v1762269407/newsletter/invisible-to-ai/seo-vs-geo-comparison.png" alt="SEO vs GEO" style="max-width: 100%; height: auto;">
```

### 3. Company Information Updates

Update newsletter footer with current company details:

```html
<p style="font-size: 12px; color: #94a3b8;">
  AI Marketing OS Ltd<br>
  Company No. 16687354<br>
  5 Audley Rise, Tonbridge, England, TN9 1XU<br>
  Last Updated: [Current Date]
</p>
```

Update pricing information (if applicable):
```html
Lock in <strong>£15/month</strong> (vs £79/month later).<br>
Only <strong>347 of 500 spots remaining</strong>.
```

### 4. Mailchimp Campaign Setup

**Environment Variables Required:**
```bash
MAILCHIMP_API_KEY=your_api_key
MAILCHIMP_SERVER_PREFIX=us2
```

**List Available Audiences:**
```bash
node scripts/newsletter/list-mailchimp-audiences.mjs
```

**Output:**
```
✅ Found 1 audience(s):

1. AI Marketing OS
   ID: 84834d503f
   Members: 34
```

**Create Draft Campaign:**
```bash
node scripts/newsletter/create-mailchimp-draft.mjs
```

This creates a campaign with:
- Type: Regular campaign
- Recipients: AI Marketing OS list (84834d503f)
- Status: Draft (not sent)
- Content: HTML from `invisible-to-ai-email.html`

**Campaign Settings:**
```javascript
{
  subject_line: 'Why Your Startup Is Invisible to AI(and how to fix it before your competitors do).',
  preview_text: 'HubSpot lost 80% of its traffic to AI. Learn how GEO can save your startup.',
  title: 'Newsletter - Invisible to AI',
  from_name: 'Maggie from aiCMO Discovered by AI Weekly',
  reply_to: 'Maggie@aimarketing.so'
}
```

**Output:**
```
✅ Campaign created: 218c2178e4
🌐 View in Mailchimp: https://us2.admin.mailchimp.com/campaigns/show/?id=2791121
```

### 5. Update Existing Campaign

**Update Campaign Content and Sender:**
```bash
node scripts/newsletter/update-mailchimp-sender.mjs
```

This script:
1. Updates sender information (from_name, reply_to)
2. Updates campaign HTML content
3. Verifies changes were applied

**What it updates:**
- Sender: "Maggie from aiCMO Discovered by AI Weekly"
- Reply-to: Maggie@aimarketing.so
- HTML content: Latest version with all updates

**Important:** Email address must be verified in Mailchimp before use.

### 6. Preview and Send

**In Mailchimp Dashboard:**
1. Go to: https://us2.admin.mailchimp.com/campaigns/
2. Find campaign: "Newsletter - Invisible to AI"
3. Click "Preview" to see how email renders
4. Send test email to yourself
5. Verify:
   - Images load correctly
   - Links work (especially CTA links)
   - "View in browser" link generates archive
   - Unsubscribe link works
6. Schedule or send when ready

## Scripts Reference

### Newsletter Scripts

**`scripts/newsletter/upload-newsletter-images.mjs`**
- Purpose: Upload images to Cloudinary CDN
- Input: Images in `assets/manual_newsletters/` folder
- Output: `cloudinary-urls.json` with CDN URLs

**`scripts/newsletter/list-mailchimp-audiences.mjs`**
- Purpose: List all Mailchimp audiences
- Output: Audience names, IDs, member counts

**`scripts/newsletter/create-mailchimp-draft.mjs`**
- Purpose: Create new draft campaign
- Input: HTML file, campaign settings
- Output: Campaign ID and Mailchimp URL

**`scripts/newsletter/update-mailchimp-campaign.mjs`**
- Purpose: Update existing campaign content only
- Input: Campaign ID, updated HTML
- Output: Confirmation of update

**`scripts/newsletter/update-mailchimp-sender.mjs`**
- Purpose: Update sender info AND content
- Input: Campaign ID, sender details, HTML
- Output: Complete campaign update confirmation

## Newsletter Sections Structure

### Required Sections (in order)

1. **Preheader** (hidden preview text)
2. **View in Browser** link
3. **Header** (title, subtitle)
4. **Main Content** (article sections)
5. **Newsletter Signup CTA** (before About the Author)
   - 🚀 Ready to Get Discovered by AI?
   - 📬 About This Newsletter
   - 🌐 Connect With Us
   - 🎁 Founding Member Program
6. **About the Author** (Maggie bio)
7. **Footer** (company info, unsubscribe)

### Newsletter Signup CTA Template

```html
<!-- Newsletter CTA Section -->
<table role="presentation" style="width: 100%; margin: 40px 0; background-color: #eff6ff; border-radius: 8px; border: 2px solid #93c5fd;">
  <tr>
    <td style="padding: 30px;">
      <h2 style="margin: 0 0 15px 0; color: #2563eb; font-size: 24px; font-weight: 700;">
        🚀 Ready to Get Discovered by AI?
      </h2>
      <p style="margin: 0 0 20px 0; font-size: 17px; line-height: 1.6; color: #1e40af;">
        Join 500+ founders, consultants, and marketers who are mastering GEO.
      </p>
      <table role="presentation" style="margin: 20px 0;">
        <tr>
          <td align="center">
            <a href="https://ai.cmo.so/hot/seo-geo-whitepaper" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: 600;">
              Learn More About GEO →
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

## Mailchimp Merge Tags

Use these tags in your email HTML:

- `*|ARCHIVE|*` - Link to web archive version
- `*|EMAIL|*` - Recipient's email address
- `*|FNAME|*` - First name
- `*|LNAME|*` - Last name
- `*|UNSUB|*` - Unsubscribe link
- `{{UNSUBSCRIBE_LINK}}` - Alternative unsubscribe link

## Common Issues & Solutions

### Images Not Displaying in Gmail
**Problem:** Images show as broken links
**Solution:**
- Use Cloudinary CDN URLs (not local paths)
- Add explicit width/height attributes to `<img>` tags
- Use `max-width: 100%; height: auto;` in inline styles

### Email Address Not Verified
**Problem:** "Email address not verified in Mailchimp"
**Solution:**
- Go to Mailchimp Settings → Verified Domains
- Add and verify Maggie@aimarketing.so
- Wait for verification email

### Archive Link Not Working
**Problem:** `*|ARCHIVE|*` shows as plain text
**Solution:**
- This is normal in preview/test emails
- Archive link generates only when sent to actual list
- Use "Send to list" to see real archive link

### Table Layout Breaking in Outlook
**Problem:** Layout looks broken in Outlook
**Solution:**
- Always use `role="presentation"` on layout tables
- Use `border-collapse: collapse` in table styles
- Avoid CSS Grid or Flexbox (not supported in email)

## Best Practices

### Email HTML
- Use tables for layout (not divs)
- Inline all styles (no external CSS)
- Max width: 600px for email content
- Test in Gmail, Outlook, Apple Mail

### Images
- Upload high-res originals (1-2MB)
- Let Cloudinary optimize delivery (~50-200KB)
- Always include alt text
- Use `max-width: 100%` for responsive sizing

### Content
- Keep paragraphs short (2-3 sentences)
- Use clear section headings
- Include clear CTAs with button styling
- Add unsubscribe link (required by law)

### Testing
- Always send test email before list send
- Check mobile rendering
- Verify all links work
- Test unsubscribe flow

## Example: Complete Newsletter Update Workflow

```bash
# 1. Upload images to Cloudinary
node scripts/newsletter/upload-newsletter-images.mjs

# 2. Update HTML with Cloudinary URLs (manual step)
# Edit: campaigns/weekly-newsletter/issue-01/assets/manual_newsletters/invisible-to-ai-email.html

# 3. List audiences to get List ID
node scripts/newsletter/list-mailchimp-audiences.mjs

# 4. Create draft campaign (first time only)
node scripts/newsletter/create-mailchimp-draft.mjs

# 5. Update existing campaign (subsequent updates)
node scripts/newsletter/update-mailchimp-sender.mjs

# 6. Preview in Mailchimp dashboard
# https://us2.admin.mailchimp.com/campaigns/show/?id=2791121

# 7. Send test to yourself

# 8. Send to list when ready
```

## Current Campaign Details

**Campaign ID:** 218c2178e4
**List ID:** 84834d503f (AI Marketing OS)
**Recipients:** 34 members
**Sender:** Maggie from aiCMO Discovered by AI Weekly <Maggie@aimarketing.so>
**Subject:** Why Your Startup Is Invisible to AI(and how to fix it before your competitors do).
**Preview:** HubSpot lost 80% of its traffic to AI. Learn how GEO can save your startup.

**Mailchimp URL:** https://us2.admin.mailchimp.com/campaigns/show/?id=2791121

## Files Created During This Process

### Newsletter Issue #1
```
campaigns/weekly-newsletter/issue-01/
├── assets/
│   └── manual_newsletters/
│       ├── invisible-to-ai-email.html          # Email version (table-based)
│       ├── invisible-to-ai.html                # Web version (modern CSS)
│       ├── seo-vs-geo-comparison.png           # Diagram 1
│       ├── competitive-threat-matrix.png       # Diagram 2
│       ├── five-pillars-geo.png                # Diagram 3
│       ├── 90-day-roadmap.png                  # Diagram 4
│       ├── cover-invisible-to-ai.png           # Cover image
│       ├── ai-citation-pipeline.png            # Bonus diagram
│       └── cloudinary-urls.json                # Generated CDN URLs
```

### Scripts
```
scripts/newsletter/
├── upload-newsletter-images.mjs           # Upload to Cloudinary
├── list-mailchimp-audiences.mjs           # List Mailchimp audiences
├── create-mailchimp-draft.mjs             # Create new campaign
├── update-mailchimp-campaign.mjs          # Update content only
└── update-mailchimp-sender.mjs            # Update sender + content
```

## Next Steps for Future Newsletters

1. Create HTML files (email + web versions)
2. Add images to assets folder
3. Run upload script for Cloudinary
4. Update HTML with CDN URLs
5. Update company info and pricing (if needed)
6. Create/update Mailchimp campaign
7. Preview, test, send

---

**Last Updated:** November 4, 2025
**Campaign:** Issue #1 - "Why Your Startup Is Invisible to AI"
