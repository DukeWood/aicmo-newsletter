# AI Image Generation Scripts

**Automated image generation using AI models via MCP servers**

---

## Overview

This directory contains scripts for generating images using free AI models through Hugging Face MCP server, eliminating the need for manual design in Canva for simple graphics.

### Available Methods

1. **Hugging Face MCP** (FREE) - Via Claude Code MCP integration
2. **Local Stable Diffusion** (FREE, Unlimited) - Coming soon
3. **Hybrid** - AI generation + Canva polish

---

## Quick Start

### Prerequisites

1. **Hugging Face Account** (free)
   - Sign up at https://huggingface.co
   - No credit card required

2. **MCP Configuration**
   - Already configured in `.claude/mcp-config.json`
   - Hugging Face MCP server enabled

3. **Available Models**
   - FLUX.1 Krea [dev] - Realistic, professional images
   - Qwen-Image - Excellent text rendering

---

## Usage

### Method 1: Via Claude Code MCP (Recommended)

**Direct generation through Claude Code:**

```
Ask Claude Code:
"Generate an image of [your prompt] using Hugging Face MCP"
```

Claude Code will:
1. Connect to Hugging Face MCP
2. Use FLUX.1 Krea or Qwen-Image model
3. Generate and save image
4. Return image path

### Method 2: Generate and Post Script

**All-in-one workflow:**

```bash
node scripts/ai-image/generate-and-post.js "AI Meets Web3 event flyer with modern tech design" "🤖 Event announcement! #AIMarketing"
```

What it does:
1. Generates image via Hugging Face MCP
2. Saves to `./temp/generated/`
3. Posts to Twitter with your text

---

## Prompt Engineering Tips

### For Event Flyers

```
"Modern event flyer for [EVENT NAME], professional design,
tech theme with AI and Web3 elements, clean layout,
event details in readable text: [LOCATION], [DATE], [TIME],
high quality, professional photography style"
```

### For Social Media Posts

```
"Eye-catching social media graphic about [TOPIC],
modern minimalist design, bold typography,
[BRAND COLORS], professional marketing style,
16:9 aspect ratio"
```

### For Newsletter Headers

```
"Professional newsletter header image for [TITLE],
clean modern design, technology theme,
[BRAND COLORS], minimal text,
600x200px dimensions, web-optimized"
```

---

## Workflow Comparison

### AI-First Workflow (Fastest)

```bash
# 1. Generate via Claude Code MCP
"Generate image: [prompt]"

# 2. Post to Twitter
node scripts/social/post-tweet-with-image.js "Tweet" ./generated/image.png
```

**Time:** 30 seconds
**Cost:** FREE
**Best for:** Quick social posts, simple graphics

---

### Canva-First Workflow (Highest Quality)

```bash
# 1. Design in Canva UI
Open Canva → Create design → Save

# 2. Export via API
node scripts/canva/export-design.js DAG1wokOYPs png ./temp/image.png

# 3. Post to Twitter
node scripts/social/post-tweet-with-image.js "Tweet" ./temp/image.png
```

**Time:** 5-10 minutes
**Cost:** FREE (Canva Pro subscription)
**Best for:** Brand-perfect content, complex designs

---

### Hybrid Workflow (Best of Both)

```bash
# 1. Generate base with AI
"Generate image: [prompt]"

# 2. Import to Canva for branding
Upload to Canva → Add logos/text → Save

# 3. Export via API
node scripts/canva/export-design.js DAGxyz png ./temp/image.png

# 4. Post to Twitter
node scripts/social/post-tweet-with-image.js "Tweet" ./temp/image.png
```

**Time:** 3-5 minutes
**Cost:** FREE
**Best for:** Professional results with AI speed

---

## Models & Capabilities

### FLUX.1 Krea [dev]

**Best for:**
- Realistic photography-style images
- Professional marketing graphics
- High-quality event flyers
- Social media posts

**Strengths:**
- Photorealistic output
- Good with complex prompts
- Professional aesthetics

**Limitations:**
- Not ideal for precise text rendering
- May need Canva for text overlay

### Qwen-Image

**Best for:**
- Images requiring text
- Detailed technical diagrams
- Infographics
- Complex instructions

**Strengths:**
- Excellent text rendering
- Follows detailed prompts well
- Good for technical content

**Limitations:**
- Less photorealistic than FLUX
- May need post-processing

---

## Image Specifications

### Twitter/X
- **Size:** 1200×675px (16:9)
- **Format:** PNG or JPG
- **Max size:** 5MB

### LinkedIn
- **Size:** 1200×627px (1.91:1)
- **Format:** PNG or JPG
- **Max size:** 5MB

### Instagram
- **Size:** 1080×1080px (1:1)
- **Format:** JPG
- **Max size:** 30MB

### Newsletter Header
- **Size:** 600×200px (3:1)
- **Format:** PNG
- **Optimized:** via Cloudinary

---

## Cost Comparison

| Method | Setup Time | Generation Time | Cost/Image | Quality | Limits |
|--------|------------|-----------------|------------|---------|--------|
| **Hugging Face MCP** | 0 min | 10-30 sec | FREE | High | Usage limits |
| **Canva Export** | 0 min | 5-10 min | FREE | Highest | None |
| **Hybrid** | 2 min | 3-5 min | FREE | Highest | Usage limits |
| **Local SD** | 2-4 hours | 30-60 sec | FREE | High | None |

---

## Troubleshooting

### "Cannot connect to Hugging Face MCP"

**Solution:**
1. Verify MCP config in `.claude/mcp-config.json`
2. Check Hugging Face account is active
3. Restart Claude Code
4. Try: `claude mcp restart`

### "Image generation failed"

**Possible causes:**
- Rate limit reached (wait 1 hour)
- Invalid prompt (simplify prompt)
- MCP server timeout (retry)

**Solution:**
- Use simpler, more specific prompts
- Avoid very complex multi-element requests
- Fall back to Canva workflow

### "Image quality not good enough"

**Solution:**
1. **Improve prompt:**
   - Add "professional", "high quality", "detailed"
   - Specify style: "photorealistic", "modern", "clean"
   - Include "well-lit", "sharp focus"

2. **Use Hybrid workflow:**
   - Generate base with AI
   - Polish in Canva
   - Export via API

3. **Switch to Canva-first:**
   - Full manual control
   - Brand-perfect results

---

## Future Enhancements

### Coming Soon

- **Local Stable Diffusion** - Unlimited free generations
- **Batch generation** - Multiple images at once
- **Template library** - Pre-configured prompts
- **Auto-posting** - Schedule generations + posts
- **Brand consistency** - Automatic logo/color overlay

---

## Documentation

**Complete guides:**
- **Canva Integration:** `docs/CANVA_INTEGRATION_GUIDE.md`
- **Social Media:** See `scripts/social/README.md`
- **Main README:** `README.md`

---

**Questions?** Check the main Canva Integration Guide or ask Claude Code for help!
