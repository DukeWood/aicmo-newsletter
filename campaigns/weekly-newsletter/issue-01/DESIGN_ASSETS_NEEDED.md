# Design Assets Needed for Issue #1 Newsletter

## Overview
This document lists all visual assets needed to complete the newsletter design. These images should be hosted at `https://ai.cmo.so/assets/` for consistent branding and fast loading.

---

## Required Assets

### 1. Header Banner
**Filename:** `newsletter-header.png`
**Dimensions:** 600px width × 200px height
**Description:** Branded header featuring Maggie/aiCMO logo and tagline
**Content:**
- aiCMO logo (left or center)
- Tagline: "Transform from invisible to AI-recommended"
- Brand colors: Crimson Red (#C8102E), Navy Blue (#012169)
- Clean, professional design suitable for email

---

### 2. AI Growth Statistics Card
**Filename:** `ai-growth-stats.png`
**Dimensions:** 500px width × 350px height
**Description:** Data visualization showing AI adoption growth
**Content to visualize:**
- 400M+ weekly ChatGPT users
- 91% default to favorite AI tool
- 800% YoY citation increase
- Google AI Overviews in 13-16% of searches

**Suggested format:** Bar chart or infographic cards with icons

---

### 3. Traditional Channel Decline Card
**Filename:** `traditional-decline.png`
**Dimensions:** 500px width × 350px height
**Description:** Data visualization showing declining traditional channels
**Content to visualize:**
- Instagram: -18% YoY organic reach (down arrow)
- Facebook: 1.37% average reach (down trend)
- Google: Favoring enterprise over SMBs

**Suggested format:** Declining line graph or comparison bars with red/negative indicators

---

### 4. Case Study Success Visual
**Filename:** `case-study-emma.png`
**Dimensions:** 500px width × 400px height
**Description:** Before/After visualization of Emma's results
**Content to visualize:**
- **Before:** 0 ChatGPT citations, traffic declining
- **After:** 12 monthly citations, +40% AI referral traffic
- Timeline: 8 weeks
- Visual progression arrow or split screen design

**Include key metrics:**
- 0 → 12 ChatGPT citations
- +40% organic referral traffic
- -15% CAC reduction
- "10 hours implementation time"

---

### 5. CTA Button - GEO Audit
**Filename:** `cta-button-geo-audit.png`
**Dimensions:** 800px width × 180px height (displayed at 400px width in email)
**Description:** Call-to-action button for GEO Audit signup
**Text:** "Get Your Free GEO Audit →" with tagline "claim your geo-optimised page"
**Style:**
- Background: Crimson Red (#C8102E)
- Main text: White, bold font
- Tagline: Navy Blue (#012169)
- Rounded corners (8px radius)
- Subtle shadow for depth
- Arrow icon on right

---

### 6. Social Media Icons (Set of 5)
**Filenames:**
- `icons/youtube-icon.png`
- `icons/x-icon.png`
- `icons/linkedin-icon.png`
- `icons/whatsapp-icon.png`
- `icons/discord-icon.png`

**Dimensions:** 32px × 32px each (square)
**Style:** Circular or rounded square, consistent design
**Colors:** Brand-appropriate colors for each platform
- YouTube: Red (#FF0000)
- X: Black (#000000)
- LinkedIn: Blue (#0A66C2)
- WhatsApp: Green (#25D366)
- Discord: Indigo (#5865F2)

---

## Brand Guidelines

### Color Palette
- **Primary:** Crimson Red (#C8102E)
- **Secondary:** Navy Blue (#012169)
- **Accent:** White (#FFFFFF)
- **Text:** Dark Gray (#1E1E1E)
- **Background:** Light Gray (#F5F5F5)

### Typography
- **Headers:** Montserrat, bold, san-serif
- **Body:** Inter, regular, sans-serif
- **Data/Stats:** Montserrat, semi-bold

### Design Principles
- Clean and professional
- High contrast for email readability
- Mobile-friendly (test at smaller sizes)
- Fast-loading (optimize for web)
- Consistent brand voice and visual identity

---

## Image Optimization Requirements

### Technical Specs
- **Format:** PNG (for transparency) or JPG (for photos)
- **Compression:** Optimize for web via Cloudinary CDN (auto-optimization enabled)
- **Original size:** High resolution for quality, CDN will optimize delivery
- **Resolution:** 72 DPI (screen resolution)
- **Color Mode:** RGB
- **Alt text:** Include descriptive alt text for accessibility
- **Cloudinary transforms:** Images resized on-the-fly using URL parameters (w_XXX, h_XXX, q_auto, f_auto)

### Hosting
- **Primary CDN:** Cloudinary (`https://res.cloudinary.com/dmaw7i3gz/`)
- **Folder structure:** `newsletter/issue-01/` for main images, `newsletter/issue-01/icons/` for social icons
- **Upload method:** Use `scripts/newsletter/upload-to-cloudinary.js` for batch uploads
- **Auto-optimization:** Cloudinary handles compression, format conversion, and responsive delivery
- Test all image URLs before newsletter send

---

## Priority Order

**High Priority (Required for launch):**
1. Header banner (`newsletter-header.png`)
2. CTA button (`cta-button-geo-audit.png`)
3. Social icons (5 icons in `icons/` folder)

**Medium Priority (Enhances readability):**
4. AI Growth stats card (`ai-growth-stats.png`)
5. Traditional decline card (`traditional-decline.png`)

**Nice to Have (Additional polish):**
6. Case study visual (`case-study-emma.png`)

---

## Delivery Checklist

- [ ] All 11 image files created
- [ ] Images optimized for web (< 100KB each where possible)
- [ ] Uploaded to `https://ai.cmo.so/assets/` (and `/assets/icons/`)
- [ ] All URLs tested and working
- [ ] Images render correctly on mobile
- [ ] Alt text provided for accessibility
- [ ] Brand guidelines followed (colors, fonts, style)

---

## Notes for Designer

- **Style:** Modern, clean, data-driven, professional
- **Audience:** Challenger brand founders, CMOs, marketing professionals
- **Tone:** Confident, forward-thinking, authoritative but approachable
- **Reference:** Look at modern SaaS newsletters (Lenny's Newsletter, Morning Brew) for inspiration
- **Mobile-first:** Ensure images scale well on small screens

---

**Questions or clarifications?** Contact: maggie@aimarketing.so
