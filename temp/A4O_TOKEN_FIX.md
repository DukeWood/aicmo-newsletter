# Fix Hugging Face Token Permissions

## Issue
Your Hugging Face token has insufficient permissions for Inference API.

**Error:** `This authentication method does not have sufficient permissions to call Inference Providers`

---

## Solution 1: Update Token Permissions (Recommended)

### Step 1: Go to Token Settings
Visit: https://huggingface.co/settings/tokens

### Step 2: Find Your Token
Look for your Hugging Face token in the list

### Step 3: Update Permissions
1. Click "Edit" on the token
2. Change role from "read" to **"write"** or **"inference"**
3. Save changes

### Step 4: Generate Image
```bash
node scripts/ai-image/generate-a4o-framework.js
```

---

## Solution 2: Create New Token (Alternative)

### Step 1: Create New Token
1. Go to: https://huggingface.co/settings/tokens
2. Click "New token"
3. **Name:** aiCMO-inference
4. **Role:** Select "write" or "inference"
5. Click "Generate"

### Step 2: Copy Token
Copy the new token (starts with `hf_...`)

### Step 3: Update .env
Replace the token in `.env`:
```bash
HUGGING_FACE_TOKEN=hf_YOUR_NEW_TOKEN_HERE
```

### Step 4: Generate Image
```bash
node scripts/ai-image/generate-a4o-framework.js
```

---

## Solution 3: Web Interface (Fastest - No Token Issues)

### Generate Manually (2 minutes)

1. **Visit:** https://huggingface.co/spaces/black-forest-labs/FLUX.1-schnell

2. **Paste this prompt:**
```
Professional business infographic showing AI Marketing Maturity Framework A4O with four progressive stages or pillars, modern clean corporate design, navy blue #012169 and crimson red #C8102E brand colors, data visualization elements with charts and upward arrows showing progression, minimalist professional layout, high quality photorealistic business presentation style, 1200x675 pixels horizontal format, geometric patterns, corporate professional lighting, sharp crisp details, space for text overlay, enterprise software aesthetic, clean typography areas
```

3. **Click "Generate"** (takes 20-30 seconds)

4. **Download** the image

5. **Save to:** `./temp/a4o-framework.png`

6. **Post to Twitter:**
```bash
node scripts/social/post-tweet-with-image.js "📊 Introducing the A4O Framework 🚀

Our AI Marketing Maturity Model helps organizations assess and advance their AI adoption journey.

Ready to transform your marketing with AI?

#AIMarketing #MarketingStrategy #A4O #AITransformation" ./temp/a4o-framework.png
```

---

## Why This Happened

Hugging Face tokens have different permission levels:
- **Read:** Access public models/datasets
- **Write:** Create/edit repositories
- **Inference:** Use Inference API (required for image generation)

Your current token has "read" permissions only.

---

## Recommended Next Step

**Use Solution 3 (Web Interface)** for immediate results - it takes 2 minutes and requires no technical setup.

Once the image is generated and saved, you can immediately post it to Twitter using the command above.
