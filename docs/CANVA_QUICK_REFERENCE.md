# Canva Quick Reference

**One-page cheat sheet for daily Canva workflows**

---

## Quick Commands

### Authentication
```bash
# Authenticate (first time only)
node scripts/canva/canva-oauth.js
```

### Export Design
```bash
# Basic export (PNG to ./temp/)
node scripts/canva/export-design.js <DESIGN_ID>

# With custom path
node scripts/canva/export-design.js <DESIGN_ID> png ./output/image.png
```

### Post to Twitter
```bash
# With image
node scripts/social/post-tweet-with-image.js "Tweet text" ./path/to/image.png

# Text only
node scripts/social/tweet.js "Tweet text"
```

### Combined Workflow
```bash
# Export + Post (one command)
node scripts/canva/export-design.js DAG1wokOYPs png ./temp/image.png && \
node scripts/social/post-tweet-with-image.js "Your tweet" ./temp/image.png
```

---

## Get Design ID

**From Canva URL:**
```
https://www.canva.com/design/DAG1wokOYPs/view
                              ↑
                    Your Design ID
```

**Steps:**
1. Open design in Canva
2. Copy ID from URL (between `/design/` and `/view`)
3. Use in export command

---

## Image Sizes

| Platform | Size | Aspect Ratio |
|----------|------|--------------|
| **Twitter** | 1200×675px | 16:9 |
| **LinkedIn** | 1200×627px | 1.91:1 |
| **Instagram** | 1080×1080px | 1:1 |
| **Newsletter Header** | 600×200px | 3:1 |
| **Email Card** | 500×350px | 10:7 |

---

## Brand Colors

```
Crimson Red:  #C8102E
Navy Blue:    #012169
White:        #FFFFFF
Light Gray:   #F5F5F5
```

---

## Common Workflows

### Event Flyer → Twitter
```bash
# 1. Design in Canva (1200×675px)
# 2. Copy Design ID from URL
# 3. Run:
node scripts/canva/export-design.js DAG1wokOYPs png ./temp/event.png
node scripts/social/post-tweet-with-image.js "Event announcement 🎉" ./temp/event.png
```

### Newsletter Header
```bash
# 1. Design in Canva (600×200px)
# 2. Export:
node scripts/canva/export-design.js DAGheader png \
  ./campaigns/weekly-newsletter/issue-XX/assets/header.png

# 3. Upload to Cloudinary:
node scripts/newsletter/upload-to-cloudinary.js
```

### Batch Social Posts
```bash
# Export multiple designs at once
for id in DAG001 DAG002 DAG003; do
  node scripts/canva/export-design.js $id png ./temp/${id}.png
done
```

---

## Troubleshooting

### "Token expired"
```bash
node scripts/canva/canva-oauth.js
```

### "Design not found"
- Check Design ID is correct (case-sensitive)
- Ensure design is in your Canva account
- Verify you're logged in to correct account

### "Export timeout"
- Normal for large designs (wait up to 60 seconds)
- Check Canva API status: https://status.canva.com
- Retry if it fails

---

## Environment Variables

**Required in `.env`:**
```bash
CANVA_CLIENT_ID=OC-AZndiQDmxUJT
CANVA_CLIENT_SECRET=your-secret-here
CANVA_REDIRECT_URI=http://127.0.0.1:3001/oauth/redirect
```

**For Twitter posting:**
```bash
TWITTER_API_KEY=your-key
TWITTER_API_SECRET=your-secret
TWITTER_ACCESS_TOKEN=your-token
TWITTER_ACCESS_TOKEN_SECRET=your-token-secret
```

---

## File Locations

```
.canva-tokens.json          # OAuth tokens (auto-generated)
.env                        # Secrets (never commit!)
temp/                       # Exported images
docs/CANVA_INTEGRATION_GUIDE.md  # Full documentation
```

---

## Canva Pro vs Enterprise

| Feature | Pro | Enterprise |
|---------|-----|------------|
| UI Design | ✅ | ✅ |
| API Export | ✅ | ✅ |
| Autofill API | ❌ | ✅ |
| Brand Templates API | ❌ | ✅ |

**This project works with Canva Pro** (your current tier)

---

## Useful Links

- **Full Guide:** `docs/CANVA_INTEGRATION_GUIDE.md`
- **Canva Portal:** https://www.canva.com/developers/
- **API Docs:** https://www.canva.dev/docs/connect/
- **API Status:** https://status.canva.com

---

**Need help?** See full guide: `docs/CANVA_INTEGRATION_GUIDE.md`
