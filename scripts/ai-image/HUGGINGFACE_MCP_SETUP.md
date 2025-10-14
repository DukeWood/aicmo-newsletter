# Hugging Face MCP Setup Guide

**Free AI image generation through Claude Code**

---

## What is This?

Hugging Face MCP allows Claude Code to generate images using free AI models (FLUX.1 Krea, Qwen-Image) without any coding required.

---

## Setup (One-Time)

### Step 1: Create Hugging Face Account

1. Go to https://huggingface.co
2. Click "Sign Up"
3. Create free account (no credit card required)
4. Verify email

### Step 2: Configure MCP (Already Done!)

The MCP configuration is already added to `.claude/mcp-config.json`:

```json
{
  "huggingface": {
    "type": "remote",
    "url": "https://huggingface.co/mcp?login"
  }
}
```

### Step 3: Enable Tools in Hugging Face

1. Visit https://huggingface.co/mcp/settings
2. Add these tools:
   - `mcp-tools/FLUX.1-Krea-dev` (realistic images)
   - `mcp-tools/qwen-image` (text rendering)
3. Save settings

### Step 4: Connect Claude Code

1. Restart Claude Code
2. Claude Code will auto-connect to Hugging Face MCP
3. You can now generate images!

---

## How to Use

### Generate Image (Simple)

**Just ask Claude Code:**

```
Generate an image of a modern tech event flyer
with AI and Web3 theme
```

Claude Code will:
1. Connect to Hugging Face MCP
2. Use FLUX.1 Krea model
3. Generate image
4. Save to `./temp/generated/`
5. Show you the result

### Generate Image (Detailed)

```
Generate a professional event flyer image:
- Title: AI Meets Web3
- Modern tech design with neural network graphics
- Color scheme: Navy blue and crimson red
- Clean minimalist layout
- High quality, 1200x675px
```

### Generate and Save to Specific Path

```
Generate an event flyer image and save it to ./temp/my-event.png:
[your detailed prompt]
```

---

## Example Prompts

### Event Flyer

```
Generate a professional event flyer:
- Modern tech conference theme
- AI and blockchain visuals
- Navy blue (#012169) and crimson red (#C8102E) colors
- Clean professional layout
- Text space for event details
- 1200x675px for Twitter
```

### Social Media Post

```
Generate a social media graphic:
- Topic: AI Marketing tips
- Modern minimalist design
- Bold typography
- Tech-forward aesthetic
- Eye-catching colors
- 1080x1080px square format
```

### Newsletter Header

```
Generate a newsletter header image:
- Topic: Generative Engine Optimization
- Professional clean design
- Technology theme
- Minimal visual clutter
- 600x200px banner size
```

---

## Complete Workflow

### Workflow 1: AI → Twitter (Fastest)

```
1. Ask Claude Code: "Generate image: [prompt]"
2. Claude Code generates and saves image
3. Run: node scripts/social/post-tweet-with-image.js "Tweet text" ./path/to/image.png
```

**Time:** ~1 minute
**Cost:** FREE

### Workflow 2: AI → Canva → Twitter (Best Quality)

```
1. Ask Claude Code: "Generate image: [prompt]"
2. Download generated image
3. Import to Canva → add branding/logos
4. Save in Canva
5. Run: node scripts/canva/export-design.js [DESIGN_ID] png ./temp/final.png
6. Run: node scripts/social/post-tweet-with-image.js "Tweet" ./temp/final.png
```

**Time:** ~5 minutes
**Cost:** FREE

---

## Tips for Better Results

### Do's ✅

- **Be specific:** "Modern tech event flyer" vs "flyer"
- **Include style:** "photorealistic", "minimalist", "professional"
- **Specify colors:** Use hex codes or color names
- **State dimensions:** "1200x675px", "square", "banner"
- **Add quality terms:** "high quality", "detailed", "sharp"

### Don'ts ❌

- **Don't be vague:** "nice image" (too general)
- **Don't overload:** Too many elements in one prompt
- **Don't expect perfect text:** Use Canva for text overlay
- **Don't use copyrighted terms:** Brand names, characters

---

## Model Selection

### Use FLUX.1 Krea for:
- Event flyers
- Social media graphics
- Marketing visuals
- Photorealistic images
- Professional photography style

### Use Qwen-Image for:
- Images with text
- Technical diagrams
- Infographics
- Detailed instructions
- Complex layouts

**Note:** Claude Code auto-selects the best model based on your prompt.

---

## Limitations & Solutions

### Free Tier Limits

**Limit:** ~50-100 images per day
**Solution:** Use responsibly, spread throughout day

### Text Rendering

**Issue:** AI-generated text may be imperfect
**Solution:** Use Canva to add/fix text overlay

### Brand Consistency

**Issue:** AI doesn't know your brand guidelines
**Solution:** Use hybrid workflow (AI base + Canva polish)

### Generation Time

**Speed:** 10-30 seconds per image
**Solution:** Generate in advance, not real-time

---

## Troubleshooting

### "MCP connection failed"

1. Check Hugging Face account is active
2. Verify you enabled tools at https://huggingface.co/mcp/settings
3. Restart Claude Code
4. Try: `claude mcp restart`

### "Rate limit exceeded"

**Solution:** Wait 1 hour, then retry
**Alternative:** Use Canva workflow

### "Image quality poor"

1. Improve prompt specificity
2. Add quality keywords ("professional", "high quality")
3. Try different model (FLUX vs Qwen)
4. Use hybrid workflow for polish

### "Can't find generated image"

**Default location:** `./temp/generated/`
**Solution:** Ask Claude Code: "Where did you save the image?"

---

## Cost Analysis

### Hugging Face MCP (FREE)

| Usage | Monthly Cost | Limits |
|-------|--------------|--------|
| **Light** (1-10/day) | $0 | None |
| **Medium** (10-50/day) | $0 | May hit rate limits |
| **Heavy** (50+/day) | $0 | Will hit rate limits |

**Recommendation:**
- For <50 images/day: Perfect, completely free
- For 50+ images/day: Consider Pro tier or local SD

### Hugging Face Pro (Optional)

- **Cost:** ~$9/month
- **Benefits:** Higher rate limits
- **When to upgrade:** If you need >100 images/day

---

## Next Steps

1. ✅ **Create Hugging Face account**
2. ✅ **Enable MCP tools** at https://huggingface.co/mcp/settings
3. ✅ **Test generation:** Ask Claude Code to generate a test image
4. ✅ **Try workflows:** Test AI → Twitter and AI → Canva → Twitter
5. ✅ **Refine prompts:** Experiment with different prompts

---

## Resources

- **Hugging Face MCP:** https://huggingface.co/mcp
- **FLUX.1 Model:** https://huggingface.co/spaces/black-forest-labs/FLUX.1-schnell
- **Qwen-Image:** https://huggingface.co/spaces/Qwen/Qwen-Image
- **MCP Documentation:** https://mcp.so
- **Main Guide:** `docs/CANVA_INTEGRATION_GUIDE.md`

---

**Ready to generate?** Ask Claude Code: "Generate an image of [your prompt]"
