# Newsletter Assets Folder

This folder contains all visual assets for Issue #1 newsletter.

## Folder Structure

```
assets/
├── newsletter-header.png          (Original: ~1.7MB, Displayed: 600×200px) - Header banner
├── ai-growth-stats.png            (Original: ~1.3MB, Displayed: 500×350px) - AI statistics card
├── traditional-decline.png        (Original: ~1.2MB, Displayed: 500×350px) - Decline statistics
├── case-study-emma.png            (Original: ~1.7MB, Displayed: 500×400px) - Success story visual
├── cta-button-geo-audit.png       (Original: ~1.5MB, Displayed: 400px width) - CTA button
└── icons/
    ├── youtube-icon.png           (Original: ~4KB, Displayed: 32×32px)   - YouTube icon
    ├── x-icon.png                 (Original: ~93KB, Displayed: 32×32px)  - X/Twitter icon
    ├── linkedin-icon.png          (Original: ~69KB, Displayed: 32×32px)  - LinkedIn icon
    ├── whatsapp-icon.jpg          (Original: ~47KB, Displayed: 32×32px)  - WhatsApp icon
    └── discord-icon.png           (Original: ~4KB, Displayed: 32×32px)   - Discord icon
```

## Usage

### Step 1: Generate Images
Use the prompts in `IMAGE_GENERATION_PROMPTS.md` to generate images with ChatGPT-4o.

### Step 2: Save Images Here
Download generated images and save them in this folder with the exact filenames above.

### Step 3: Upload to Cloudinary CDN
Run the upload script to batch upload all images:
```bash
node scripts/newsletter/upload-to-cloudinary.js
```

This will:
- Upload all images to Cloudinary
- Generate optimized CDN URLs
- Save URLs to `assets/cloudinary-urls.json`
- Apply automatic optimization (q_auto, f_auto)

**CDN URLs format:**
- Main images: `https://res.cloudinary.com/dmaw7i3gz/image/upload/w_XXX,h_XXX,c_fit,q_auto,f_auto/v[version]/newsletter/issue-01/[filename].png`
- Icons: `https://res.cloudinary.com/dmaw7i3gz/image/upload/w_32,h_32,c_fit/v[version]/newsletter/issue-01/icons/[filename].png`

**Note:** No manual compression needed - Cloudinary handles all optimization automatically

### Step 5: Test
Send a test email to verify all images load correctly.

## Checklist

### High Priority (Must Have)
- [ ] newsletter-header.png
- [ ] cta-button-geo-audit.png
- [ ] youtube-icon.png
- [ ] x-icon.png
- [ ] linkedin-icon.png
- [ ] whatsapp-icon.png
- [ ] discord-icon.png

### Medium Priority (Enhances Experience)
- [ ] ai-growth-stats.png
- [ ] traditional-decline.png

### Nice to Have
- [ ] case-study-emma.png

## Image Specifications

All images should follow these specs:
- **Format**: PNG (with transparency) or JPG
- **Original size**: High resolution (1-2MB) - quality matters, Cloudinary optimizes delivery
- **Cloudinary optimization**: Automatic compression, format conversion (WebP for modern browsers)
- **Resolution**: 72 DPI (screen)
- **Color Mode**: RGB
- **Brand Colors**:
  - Crimson Red: #C8102E
  - Navy Blue: #012169
  - White: #FFFFFF

## Display Sizes in Email

Images are displayed at these dimensions in the newsletter:
- **Header**: 600×200px
- **Stats cards**: 500×350px
- **Case study**: 500×400px
- **CTA button**: 400px width (responsive)
- **Social icons**: 32×32px

## Notes

- Keep original high-res versions in this folder (already done)
- Cloudinary automatically creates optimized versions via URL parameters
- Images delivered at ~50-200KB via CDN (from 1-2MB originals)
- Test all images in email preview before sending (Gmail, Outlook, mobile)
- Verify images display correctly on mobile devices

---

**Questions?** Contact: maggie@aimarketing.so
