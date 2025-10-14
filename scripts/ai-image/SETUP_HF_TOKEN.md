# Hugging Face API Token Setup

To use Hugging Face image generation, you need a free API token.

## Quick Setup (2 minutes)

### Step 1: Get Your Token

1. Go to https://huggingface.co/settings/tokens
2. Click "New token"
3. Name: "aiCMO Image Generation"
4. Type: "Read" (default)
5. Click "Generate"
6. Copy the token (starts with `hf_...`)

### Step 2: Add to .env

Add this line to your `.env` file:

```bash
HUGGING_FACE_TOKEN=hf_your_token_here
```

### Step 3: Generate Image

```bash
node scripts/ai-image/generate-a4o-framework.js
```

## That's it!

Your image will be saved to `./temp/a4o-framework.png`

---

## Alternative: Use Web Interface

If you prefer not to set up the API:

1. Go to https://huggingface.co/spaces/black-forest-labs/FLUX.1-schnell
2. Enter this prompt:
   ```
   Professional business infographic showing AI Marketing Maturity Framework with four progressive stages or pillars, modern clean corporate design, navy blue #012169 and crimson red #C8102E brand colors, data visualization elements with charts and upward arrows showing progression, minimalist professional layout, high quality photorealistic business presentation style, 1200x675 pixels horizontal format, geometric patterns, corporate professional lighting, sharp crisp details, space for text overlay, enterprise software aesthetic, clean typography areas
   ```
3. Click "Generate"
4. Download the image
5. Save to `./temp/a4o-framework.png`

Done!
