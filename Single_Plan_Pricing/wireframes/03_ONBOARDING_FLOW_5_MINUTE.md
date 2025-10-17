# 5-Minute Onboarding Flow
## Optimized for Fast Activation & First Publish

**Version:** 1.0
**Date:** 2025-10-16
**Goal:** Get users from sign-up to first published article in <10 minutes
**Target Activation Rate:** >60% complete onboarding, >40% publish within 24 hours

---

## Onboarding Philosophy

### The Problem with Traditional Onboarding
- **Too long:** 15-30 minute setup kills momentum
- **Too much upfront:** Overwhelming before value delivered
- **Too many fields:** Cognitive overload, analysis paralysis
- **Value delayed:** Users quit before seeing ROI

### The aiCMO Approach
- **Value-first:** Generate content in Step 1, configure later
- **Progressive disclosure:** Collect data over time, not all at once
- **Skip-friendly:** Every step optional except brand voice
- **Celebrate early:** Instant wins create dopamine hits

**Mantra:** "5 minutes to first article, 5 days to power user"

---

## Onboarding Flow (5 Steps)

### Overview

```
Step 1: Brand Voice (2 min) → REQUIRED
Step 2: Generate 5 Articles (30 sec) → AUTO
Step 3: Review & Edit (1 min) → OPTIONAL
Step 4: Connect Website (1 min) → SKIP-ABLE
Step 5: Publish & Celebrate (30 sec) → SUCCESS
────────────────────────────────────────────
Total time: ~5 minutes
Activation: First article live
```

---

## Step 1: Brand Voice Setup (2 minutes)

### Screen Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Progress: ●○○○○  Step 1 of 5                                    [Exit]     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  H1: Let's teach AI who you are                                             │
│  Sub: Answer 3 quick questions. We'll generate your first articles.         │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                          │ │
│  │  1. What's your brand name?                                             │ │
│  │  ┌────────────────────────────────────────────────────────────────┐    │ │
│  │  │ [Input: Your Brand Name]                               Required │    │ │
│  │  └────────────────────────────────────────────────────────────────┘    │ │
│  │  Example: "Acme SaaS" or "Jane Doe Consulting"                          │ │
│  │                                                                          │ │
│  │  2. In one sentence, what do you do?                                    │ │
│  │  ┌────────────────────────────────────────────────────────────────┐    │ │
│  │  │ [Textarea: Describe your business in 1-2 sentences]   Required │    │ │
│  │  │                                                                  │    │ │
│  │  │                                                                  │    │ │
│  │  └────────────────────────────────────────────────────────────────┘    │ │
│  │  Example: "We help B2B SaaS companies automate customer onboarding      │ │
│  │           with AI-powered video tutorials."                             │ │
│  │                                                                          │ │
│  │  3. Who's your ideal customer?                                          │ │
│  │  ┌────────────────────────────────────────────────────────────────┐    │ │
│  │  │ [Input: Target audience]                               Required │    │ │
│  │  └────────────────────────────────────────────────────────────────┘    │ │
│  │  Example: "SaaS founders with 10-50 employees"                          │ │
│  │                                                                          │ │
│  │  ───────────────────────────────────────────────────────────────────   │ │
│  │                                                                          │ │
│  │  🎁 BONUS (Optional - we'll ask this later):                            │ │
│  │  [▼] Add your website URL (we'll analyze your content)                  │ │
│  │  [▼] List 2-3 competitors (we'll differentiate you)                     │ │
│  │  [▼] Your brand voice (professional, casual, technical?)                │ │
│  │                                                                          │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  [Back]                              [Generate My First Articles →]         │
│                                                                              │
│  Small text: This takes 30 seconds. We'll refine this later.                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Field Specifications

**1. Brand Name**
- Input type: Text field
- Max length: 50 characters
- Required: Yes
- Validation: Non-empty, no special characters
- Pre-fill: From sign-up if collected

**2. One-Sentence Description**
- Input type: Textarea (3 rows)
- Max length: 200 characters
- Required: Yes
- Placeholder: "We help [target customer] [achieve outcome] with [solution]."
- Helper: Show character count (200 max)

**3. Ideal Customer**
- Input type: Text field
- Max length: 100 characters
- Required: Yes
- Examples: "SaaS founders", "Marketing consultants", "E-commerce brands"

**Optional Bonus (Collapsible)**
- Website URL: Pre-fill from sign-up, validate URL format
- Competitors: Comma-separated, 2-3 max
- Brand Voice: Radio buttons (Professional / Casual / Technical / Friendly)

### Smart Defaults
- If user signed up with email domain, pre-fill website URL
- If user came from referral, pre-select brand voice similar to referrer
- If user skips optional fields, set defaults: website = blank, voice = "Professional"

### CTA Microcopy
- **Primary CTA:** "Generate My First Articles →"
- **Alt version (A/B test):** "Show Me What aiCMO Can Do →"
- **Loading state:** "Teaching AI about [Brand Name]... 10 seconds"

---

## Step 2: Generating Articles (30 seconds - Auto)

### Loading Screen

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Progress: ●●○○○  Step 2 of 5                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│              [Animated spinner or progress bar]                             │
│                                                                              │
│              🧠 Teaching AI about [Brand Name]...                            │
│                                                                              │
│              ✓ Analyzing your market position                               │
│              ✓ Identifying GEO keywords                                     │
│              ⏳ Generating 5 articles optimized for AI search...            │
│              ⏳ Optimizing for ChatGPT, Perplexity, Claude...               │
│                                                                              │
│              This takes ~30 seconds. Worth the wait.                        │
│                                                                              │
│  ──────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  💡 DID YOU KNOW?                                                            │
│  71% of Americans now use AI to research brands.                             │
│  If you're not in AI answers, you're invisible to 7 in 10 customers.        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### What's Happening (Backend)

```javascript
// Onboarding article generation
const generateOnboardingArticles = async (brandData) => {
  const { brandName, description, idealCustomer } = brandData;

  // Generate 5 articles optimized for GEO
  const articles = await Promise.all([
    generateArticle({
      type: 'introductory',
      topic: `What is ${brandName}? A complete guide`,
      keywords: [brandName, description.split(' ').slice(0, 3)],
      tone: brandData.voice || 'professional',
    }),
    generateArticle({
      type: 'problem-solution',
      topic: `How ${brandName} helps ${idealCustomer}`,
      keywords: [idealCustomer, 'solution', description],
    }),
    generateArticle({
      type: 'comparison',
      topic: `${brandName} vs alternatives: What's different?`,
      keywords: [brandName, 'alternative', 'comparison'],
    }),
    generateArticle({
      type: 'how-to',
      topic: `Getting started with ${brandName}: Step-by-step guide`,
      keywords: ['getting started', 'guide', brandName],
    }),
    generateArticle({
      type: 'faq',
      topic: `${brandName} FAQ: Everything you need to know`,
      keywords: ['faq', 'questions', brandName],
    }),
  ]);

  return articles;
};
```

### Loading Tips (Rotate Every 10 Seconds)

1. "71% of Americans now use AI to research brands. GEO ensures you're in those answers."
2. "ChatGPT processes 100M+ queries daily. Is your brand one of the recommendations?"
3. "Traditional SEO = Google's 10 blue links. GEO = AI's direct answer. Big difference."
4. "We're optimizing your content for ChatGPT, Perplexity, Claude, and future AI engines."
5. "First 50 articles are critical—they teach AI who you are. We're starting strong."

---

## Step 3: Review & Edit Articles (1 minute)

### Article Preview Screen

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Progress: ●●●○○  Step 3 of 5                                    [Skip →]   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  H1: ✅ Your first 5 articles are ready!                                     │
│  Sub: Quick review, then we'll publish. (Or skip—you can edit anytime.)     │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  ARTICLE 1                                                    [Edit]    │ │
│  │  ────────────────────────────────────────────────────────────────────  │ │
│  │  📄 What is [Brand Name]? A Complete Guide                             │ │
│  │                                                                          │ │
│  │  Preview:                                                                │ │
│  │  [Brand Name] is a [description]. This guide covers everything you      │ │
│  │  need to know about how [Brand Name] helps [ideal customer] achieve...  │ │
│  │                                                                          │ │
│  │  🎯 GEO Score: 85/100  |  📊 Word count: 1,243  |  ⏱ Read time: 5 min   │ │
│  │                                                                          │ │
│  │  [✓ Approve]  [Edit Draft]  [Delete]                                    │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  ARTICLE 2                                                    [Edit]    │ │
│  │  ────────────────────────────────────────────────────────────────────  │ │
│  │  📄 How [Brand Name] Helps [Ideal Customer]                            │ │
│  │                                                                          │ │
│  │  Preview:                                                                │ │
│  │  If you're a [ideal customer], you face challenges like...              │ │
│  │                                                                          │ │
│  │  🎯 GEO Score: 78/100  |  📊 Word count: 986  |  ⏱ Read time: 4 min     │ │
│  │                                                                          │ │
│  │  [✓ Approve]  [Edit Draft]  [Delete]                                    │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  [+ Show 3 more articles]                                                    │
│                                                                              │
│  ──────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  [Back]     [Skip for Now]                    [Approve All & Continue →]    │
│                                                                              │
│  Microcopy: You can edit these anytime in your dashboard. Let's keep moving.│
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Edit Modal (If User Clicks "Edit Draft")

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Edit Article                                                      [× Close]│
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Title:                                                                      │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ What is [Brand Name]? A Complete Guide                                 │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  Content:                                                                    │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ [Rich text editor with formatting toolbar]                             │ │
│  │                                                                          │ │
│  │ [Brand Name] is a [description]. This guide covers...                   │ │
│  │                                                                          │ │
│  │ [Article content here - editable]                                       │ │
│  │                                                                          │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  GEO Keywords: [brand name], [product category], [target audience]          │
│  SEO Meta Description: [Auto-generated, editable]                           │
│                                                                              │
│  [Cancel]                                          [Save Changes]           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### UX Notes
- **Default: All approved** (checked by default) - users just click "Continue"
- **Edit is optional** - most users skip, power users tweak
- **Delete is safe** - "Are you sure? We can regenerate this later."
- **GEO Score** - visual indicator (green >80, yellow 60-79, red <60)
- **Expand all** - Accordion starts collapsed (first 2 visible)

---

## Step 4: Connect Website (1 minute - Skippable)

### Website Connection Screen

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Progress: ●●●●○  Step 4 of 5                                    [Skip →]   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  H1: Where should we publish your articles?                                 │
│  Sub: Connect your website or skip—we'll save as drafts you can post later. │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                          │ │
│  │  Choose how you want to publish:                                        │ │
│  │                                                                          │ │
│  │  ┌──────────────────────────────────────────────────────────────┐      │ │
│  │  │  ● WordPress                                      [Recommended]│      │ │
│  │  │    Install our plugin (1-click). Autopilot publishing enabled. │      │ │
│  │  │    [Connect WordPress →]                                        │      │ │
│  │  └──────────────────────────────────────────────────────────────┘      │ │
│  │                                                                          │ │
│  │  ┌──────────────────────────────────────────────────────────────┐      │ │
│  │  │  ○ Webflow                                                     │      │ │
│  │  │    Connect via API. Publish to your Webflow CMS.              │      │ │
│  │  │    [Connect Webflow →]                                         │      │ │
│  │  └──────────────────────────────────────────────────────────────┘      │ │
│  │                                                                          │ │
│  │  ┌──────────────────────────────────────────────────────────────┐      │ │
│  │  │  ○ Custom / Other                                              │      │ │
│  │  │    Export as Markdown or HTML. Publish manually.               │      │ │
│  │  │    [Use Manual Export]                                         │      │ │
│  │  └──────────────────────────────────────────────────────────────┘      │ │
│  │                                                                          │ │
│  │  ┌──────────────────────────────────────────────────────────────┐      │ │
│  │  │  ○ Skip for Now                                                │      │ │
│  │  │    Save articles as drafts. Connect your site later.           │      │ │
│  │  │    [Skip & Save as Drafts]                                     │      │ │
│  │  └──────────────────────────────────────────────────────────────┘      │ │
│  │                                                                          │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  [Back]                                             [Continue with Skip →]  │
│                                                                              │
│  Microcopy: You can connect multiple websites later in settings.            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### WordPress Connection Modal

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Connect WordPress                                             [× Close]    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Step 1: Install our WordPress plugin                                       │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  1. Go to your WordPress admin: [Your Site]/wp-admin                   │ │
│  │  2. Navigate to Plugins → Add New                                       │ │
│  │  3. Search for "aiCMO"                                                   │ │
│  │  4. Click "Install" then "Activate"                                     │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  OR: Download plugin zip file and upload manually                           │
│  [Download aiCMO Plugin (.zip)]                                              │
│                                                                              │
│  ──────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  Step 2: Copy your API key                                                  │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  [aicmo_api_1a2b3c4d5e6f7g8h9i0j]                          [Copy]      │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  Step 3: Paste API key in WordPress plugin settings                         │
│  aiCMO menu → Settings → API Key → Save                                     │
│                                                                              │
│  ──────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  [Test Connection]                                      [Done →]             │
│                                                                              │
│  Need help? [Watch 2-min video tutorial]  |  [Chat with support]           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### UX Notes
- **Skip is easy** - Prominent "Skip" button, no shame
- **WordPress recommended** - Most common platform (40% of web)
- **1-click later** - "You can connect anytime in Settings"
- **Test connection** - Verify before closing modal
- **Video tutorial** - Embedded 2-min Loom video

---

## Step 5: Publish & Celebrate (30 seconds)

### Success Screen

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Progress: ●●●●●  Step 5 of 5 - Complete! 🎉                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                       [Animated confetti or celebration graphic]            │
│                                                                              │
│              H1: 🎉 You're live! AI can now discover [Brand Name].          │
│                                                                              │
│              Sub: Your first 5 articles are published and optimized         │
│                   for GEO. Here's what happens next:                        │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                          │ │
│  │  ✅ Articles Published                                                   │ │
│  │  5 articles live on your website (or saved as drafts)                   │ │
│  │                                                                          │ │
│  │  ✅ GEO Optimization Active                                              │ │
│  │  Your content is indexed for ChatGPT, Perplexity, and Claude            │ │
│  │                                                                          │ │
│  │  ✅ Autopilot Scheduled                                                  │ │
│  │  Next batch: 10 articles publishing this week                           │ │
│  │                                                                          │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ──────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  H2: Quick Wins for Your First Week                                         │
│                                                                              │
│  ┌──────────────────────┬──────────────────────┬───────────────────────┐   │
│  │  [Icon: 📊]          │  [Icon: 🎯]          │  [Icon: 🤝]           │   │
│  │                      │                      │                       │   │
│  │  Day 1 (Today)       │  Day 3               │  Day 7                │   │
│  │  ──────────────      │  ────────────────    │  ───────────────      │   │
│  │  ✓ 5 articles live   │  → Review Autopilot  │  → Invite your team   │   │
│  │  ✓ GEO activated     │    calendar          │  → Join Slack channel │   │
│  │                      │  → Adjust cadence    │  → First founder AMA  │   │
│  │  [View Articles]     │    if needed         │                       │   │
│  │                      │                      │  [Invite Team]        │   │
│  │                      │  [View Calendar →]   │                       │   │
│  └──────────────────────┴──────────────────────┴───────────────────────┘   │
│                                                                              │
│  ──────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  🏆 Founding Member Reminder:                                                │
│  You're locked in at £39/month forever. Check your email for:               │
│  • Private Slack invite                                                      │
│  • First founder AMA calendar invite                                         │
│  • Referral link (1 month free per referral)                                │
│                                                                              │
│  ──────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  [Go to Dashboard →]                               [Watch 5-min Tutorial]   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Celebration Animations

**Desktop:**
- Confetti animation (3 seconds)
- Progress bar fills with animation
- Success checkmarks appear sequentially
- Subtle celebration sound (optional, toggle-able)

**Mobile:**
- Simpler confetti (performance)
- Haptic feedback vibration (iOS/Android)
- Checkmarks animate in

### Next Steps CTA

**Primary:** "Go to Dashboard →"
- Opens main dashboard with articles visible
- Highlight "Calendar" tab (encourage exploration)

**Secondary:** "Watch 5-min Tutorial"
- Embedded video or link to YouTube
- Covers: Dashboard tour, Editing articles, Changing cadence, Inviting team

---

## Mobile Onboarding Adaptations

### Step 1: Brand Voice (Mobile)

```
┌─────────────────────────────────────────────────┐
│  ●○○○○  Step 1 of 5                  [Exit]    │
├─────────────────────────────────────────────────┤
│  H1: Teach AI who you are                      │
│  Sub: 3 quick questions                        │
│                                                 │
│  1. Brand name?                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ [Your Brand Name]                         │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  2. What do you do? (1 sentence)                │
│  ┌───────────────────────────────────────────┐ │
│  │ [Describe your business]                  │ │
│  │                                           │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  3. Ideal customer?                             │
│  ┌───────────────────────────────────────────┐ │
│  │ [Target audience]                         │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  [+ Optional fields] ▼                          │
│                                                 │
│  [Generate Articles →]                          │
│                                                 │
│  Takes 30 seconds. Worth it.                    │
└─────────────────────────────────────────────────┘
```

### Mobile UX Considerations
- Larger tap targets (48×48px minimum)
- One question per screen (alternative: paginate)
- Native keyboard optimizations (email, URL types)
- Save progress (localStorage) - survive browser refresh
- Bottom sheet modals (native feel)

---

## Onboarding Variations (A/B Tests)

### Variant A: Value-First (Recommended)
- Step 1: Generate articles immediately
- Collect more data later in drip emails
- Fastest time to value

### Variant B: Setup-First
- Step 1: Comprehensive brand setup (8 fields)
- Step 2: Generate articles
- Higher quality but slower

### Variant C: Wizard-Light
- 3 steps instead of 5
- Combine Steps 2+3 (generate + review)
- Skip website connection entirely (email link later)

**Hypothesis:** Variant A (Value-First) will have highest completion rate (>60%)

---

## Activation Metrics

### Success Criteria

**Primary Activation:** User publishes ≥1 article within 24 hours
- Target: >40% of sign-ups

**Secondary Activation:** User completes onboarding (Step 5)
- Target: >60% of sign-ups

**Tertiary Activation:** User edits ≥1 article (engagement signal)
- Target: >25% of sign-ups

### Drop-Off Analysis

Track where users abandon:
- Step 1 → Step 2: <10% drop-off (should be minimal)
- Step 2 → Step 3: <20% drop-off (patience test - loading screen)
- Step 3 → Step 4: <15% drop-off (skip-friendly)
- Step 4 → Step 5: <10% drop-off (almost done)

**If drop-off >20% at any step:** Investigate, simplify, or remove step

### Time Tracking

- **Target:** <10 minutes end-to-end
- **Stretch goal:** <5 minutes (75th percentile)
- **Alert threshold:** >15 minutes average (too slow)

---

## Post-Onboarding Engagement

### Email Drip (Days 1-7)

**Day 1 (Immediate):**
Subject: "🎉 You're live! Here's what's happening with your articles"
- Confirm articles published
- Link to dashboard
- Link to Slack invite

**Day 2:**
Subject: "👀 First 24 hours: Here's what to check"
- Traffic dashboard (if connected analytics)
- Autopilot calendar preview
- "Tweak your cadence" CTA

**Day 3:**
Subject: "💡 Pro tip: How to edit articles in 2 minutes"
- Video tutorial: Editing workflow
- Common edits (tone, CTAs, links)
- "Edit your first article" CTA

**Day 5:**
Subject: "🤝 Invite your team (if you have one)"
- Team collaboration feature
- Roles: Admin, Editor, Viewer
- "Invite team members" CTA

**Day 7:**
Subject: "📊 Your first week: X articles live, here's what's next"
- Week 1 summary (articles published, GEO score avg)
- Founder AMA invite (if founding member)
- Referral link (1 month free per referral)

### In-App Nudges (Tooltips)

**First Login After Onboarding:**
- "👋 Welcome back! Your next 10 articles publish this week."
- "📅 Check your calendar to see what's coming."
- "✏️ Click any article to edit before it goes live."

**Day 3 Login:**
- "🎯 Want more (or less) content? Adjust your cadence here."
- "📈 Track your GEO performance in the Analytics tab (coming soon)."

**Day 7 Login:**
- "🏆 You're a founding member! Join our private Slack [link]."
- "💰 Refer a friend, get 1 month free [referral link]."

---

## Edge Cases & Error Handling

### Scenario 1: Article Generation Fails

**Error Screen:**
```
Oops! Something went wrong generating your articles.

[Icon: ⚠️]

This is rare. Possible causes:
• Our AI service is temporarily down (check status.aicmo.co)
• Your brand description needs more detail

What to do:
[Try Again]  [Contact Support]  [Skip & Set Up Later]
```

**Backend:**
- Log error (Sentry)
- Auto-retry once (silently)
- If retry fails, show error + support contact

### Scenario 2: WordPress Connection Fails

**Error:**
```
❌ Connection failed

Common issues:
• Plugin not activated
• API key incorrect (check for typos)
• WordPress site is private (must be public)

[Test Connection Again]  [Watch Tutorial]  [Skip for Now]
```

### Scenario 3: User Takes >30 Minutes

**Intervention:**
- Email: "Need help finishing setup? We're here."
- Offer live chat (if available)
- Save progress, resume anytime

---

## Technical Implementation Notes

### Frontend
- **Framework:** Next.js 14 (App Router)
- **State Management:** React Context + useState
- **Progress Persistence:** localStorage (survive refresh)
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation

### Backend
- **Article Generation:** OpenAI GPT-4 or Claude Opus
- **Job Queue:** Bull (Redis-backed) for async generation
- **Progress Tracking:** PostgreSQL (onboarding_progress table)
- **Webhooks:** WordPress REST API for publishing

### Analytics
- **Tool:** PostHog or Mixpanel
- **Events:**
  - `onboarding_started`
  - `onboarding_step_completed` (step_number, time_taken)
  - `onboarding_abandoned` (step_number)
  - `onboarding_completed` (total_time)
  - `first_article_published`

### Performance
- **Loading screen:** Actual async work, not fake delay
- **Optimize generation:** Parallel API calls (5 articles at once)
- **Prefetch assets:** Preload Step 3 while Step 2 loads
- **Lazy load images:** Confetti animation only when needed

---

## Success Checklist

- [ ] Design high-fidelity mockups (all 5 steps)
- [ ] Build brand voice input form (validation)
- [ ] Implement article generation backend (GPT-4)
- [ ] Create loading screen with tips
- [ ] Build article preview cards (GEO score, edit modal)
- [ ] Implement WordPress plugin + connection flow
- [ ] Design success/celebration screen
- [ ] Set up progress tracking (localStorage + DB)
- [ ] Write post-onboarding email drip (5 emails)
- [ ] Add in-app nudges/tooltips
- [ ] Mobile optimization (all 5 steps)
- [ ] Error handling (generation fails, connection fails)
- [ ] Analytics instrumentation (PostHog)
- [ ] A/B test framework (3 variants)
- [ ] Performance optimization (lazy loading)
- [ ] User testing (5-10 users, <10 min target)

---

**Next: Go-to-Market Messaging & Content Calendar**
