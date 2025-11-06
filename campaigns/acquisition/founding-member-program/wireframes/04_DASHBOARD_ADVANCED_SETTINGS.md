# Dashboard Advanced Settings
## Post-Onboarding Configuration & Customization

**Version:** 1.0
**Date:** 2025-10-18
**Purpose:** Allow users to refine auto-generated brand data and configure advanced features
**Location:** Main dashboard → Settings section

---

## Overview

### What Advanced Settings Include

After completing the autopilot onboarding, users can access advanced settings in their dashboard to:

1. **Claim Domain** (DNS verification) - Unlocks advanced features
2. **Edit Basic Settings** - Refine all auto-generated brand data
3. **Configure Advanced Brand Voice** - Multi-dimensional voice profiles

### User Journey

```
Onboarding Complete
↓
Dashboard Landing (with setup checklist)
↓
Settings → Advanced Settings
↓
Three Main Sections:
├─ Domain Claim (mandatory for advanced features)
├─ Basic Settings Editor (refine auto-filled data)
└─ Advanced Brand Voice (multi-profile configuration)
```

---

## Section 1: Domain Claim & Verification

### Purpose

**Why domain claim is needed:**
- Proves ownership of the domain
- Unlocks autopilot publishing to user's website
- Enables advanced features (multi-brand, team collaboration, API access)
- Required for domain-specific configurations

**When it's required:**
- **Optional:** During free tier usage (articles saved as drafts)
- **Mandatory:** For autopilot publishing, website embedding, advanced features

### Screen Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  [Sidebar]  |  SETTINGS → Domain Claim                 [User Menu]   │
├──────────────────────────────────────────────────────────────────────┤
│             |                                                         │
│  Overview   |  🌐 Claim Your Domain                                  │
│  Domain     |                                                         │
│  Brand      |  Verify ownership to unlock:                           │
│  Voice      |  ✓ Autopilot publishing to your website               │
│  Publishing |  ✓ Advanced analytics and tracking                    │
│  Team       |  ✓ Multi-brand management                             │
│             |  ✓ API access for custom integrations                 │
│             |                                                         │
│             |  ────────────────────────────────────────────────────  │
│             |                                                         │
│             |  📍 Your Domain: acmesaas.com                          │
│             |  Status: ⏳ Not Verified                               │
│             |                                                         │
│             |  ┌────────────────────────────────────────────────┐   │
│             |  │ STEP 1: Add DNS TXT Record                      │   │
│             |  │                                                  │   │
│             |  │ Add this TXT record to your DNS settings:       │   │
│             |  │                                                  │   │
│             |  │ Name/Host:                                       │   │
│             |  │ ┌──────────────────────────────────────────┐   │   │
│             |  │ │ _aicmo-verify                      [Copy] │   │   │
│             |  │ └──────────────────────────────────────────┘   │   │
│             |  │                                                  │   │
│             |  │ Value/Content:                                   │   │
│             |  │ ┌──────────────────────────────────────────┐   │   │
│             |  │ │ aicmo-verify-a8f3d9e2c1b4...       [Copy] │   │   │
│             |  │ └──────────────────────────────────────────┘   │   │
│             |  │                                                  │   │
│             |  │ TTL: 3600 (or leave default)                    │   │
│             |  │                                                  │   │
│             |  │ 📘 Need help? [Step-by-step guide for:]        │   │
│             |  │ • GoDaddy • Cloudflare • Namecheap • Other      │   │
│             |  │                                                  │   │
│             |  └────────────────────────────────────────────────┘   │
│             |                                                         │
│             |  ┌────────────────────────────────────────────────┐   │
│             |  │ STEP 2: Verify Ownership                        │   │
│             |  │                                                  │   │
│             |  │ After adding the DNS record (may take 5-60 min):│   │
│             |  │                                                  │   │
│             |  │ [Verify Domain →]                               │   │
│             |  │                                                  │   │
│             |  │ Status: Checking DNS...                         │   │
│             |  │ ⏳ DNS propagation can take up to 24 hours.     │   │
│             |  │                                                  │   │
│             |  └────────────────────────────────────────────────┘   │
│             |                                                         │
│             |  💡 Why DNS verification?                              │
│             |  This proves you own acmesaas.com and prevents         │
│             |  unauthorized publishing to your website.              │
│             |                                                         │
└──────────────────────────────────────────────────────────────────────┘
```

### Verification States

**State 1: Not Started**
- Status badge: ⏳ Not Verified (gray)
- Shows: DNS record instructions
- CTA: "Verify Domain"

**State 2: Verifying**
- Status badge: 🔄 Verifying... (blue, spinning)
- Shows: "Checking DNS records... This may take 1-2 minutes"
- Auto-refreshes every 10 seconds

**State 3: Verified ✅**
- Status badge: ✅ Verified (green)
- Shows: "Domain verified on [date]"
- Unlocks: Autopilot publishing features
- CTA changes to: "Manage Domain Settings"

**State 4: Verification Failed ❌**
- Status badge: ❌ Verification Failed (red)
- Shows error: "TXT record not found. Please check DNS settings."
- Offers: "Retry Verification" button
- Link: "Troubleshooting guide"

### DNS Provider Guides

**Click "Step-by-step guide for:" opens modal with provider-specific instructions:**

**GoDaddy:**
1. Log in to GoDaddy DNS Manager
2. Find TXT Records section
3. Click "Add"
4. Host: `_aicmo-verify`
5. Value: [copied value]
6. Save

**Cloudflare:**
1. Go to DNS settings
2. Add Record → Type: TXT
3. Name: `_aicmo-verify`
4. Content: [copied value]
5. Save

**Generic instructions for other providers included**

---

## Section 2: Edit Basic Settings

### Purpose

Refine all auto-generated data from onboarding:
- Brand name, description, industries
- Target audience, regions
- Products and services
- SWOT analysis
- Market research insights
- Competition landscape

### Navigation

```
Settings Sidebar:
├─ Domain Claim
├─ Basic Settings ← (current)
│  ├─ Brand Overview
│  ├─ Products & Services
│  ├─ Target Audience & Markets
│  ├─ SWOT Analysis
│  └─ Competition Landscape
├─ Advanced Brand Voice
└─ Publishing Settings
```

### Screen Layout - Brand Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│  [Sidebar]  |  SETTINGS → Basic Settings              [User Menu]    │
├──────────────────────────────────────────────────────────────────────┤
│             |                                                         │
│  Domain     |  📝 Brand Overview                       [Save Changes]│
│  Basic      |                                                         │
│  Voice      |  Edit the auto-generated brand information below.      │
│  Publishing |                                                         │
│             |  ────────────────────────────────────────────────────  │
│             |                                                         │
│             |  🏢 Brand Identity                                     │
│             |  ┌────────────────────────────────────────────────┐   │
│             |  │                                                  │   │
│             |  │  Brand Name *                                    │   │
│             |  │  ┌──────────────────────────────────────────┐  │   │
│             |  │  │ Acme SaaS                                │  │   │
│             |  │  └──────────────────────────────────────────┘  │   │
│             |  │                                                  │   │
│             |  │  One-line Description *                          │   │
│             |  │  ┌──────────────────────────────────────────┐  │   │
│             |  │  │ We help B2B SaaS companies automate      │  │   │
│             |  │  │ customer onboarding with AI-powered      │  │   │
│             |  │  │ video tutorials.                         │  │   │
│             |  │  └──────────────────────────────────────────┘  │   │
│             |  │  200/200 characters                             │   │
│             |  │                                                  │   │
│             |  │  Industries (select all that apply)             │   │
│             |  │  [✓] B2B SaaS                                   │   │
│             |  │  [✓] Customer Success                           │   │
│             |  │  [ ] E-commerce                                 │   │
│             |  │  [ ] Marketing Technology                       │   │
│             |  │  [+ Add custom industry]                        │   │
│             |  │                                                  │   │
│             |  │  Company Size                                    │   │
│             |  │  ( ) 1-10 employees                             │   │
│             |  │  (•) 11-50 employees                            │   │
│             |  │  ( ) 51-200 employees                           │   │
│             |  │  ( ) 201+ employees                             │   │
│             |  │                                                  │   │
│             |  └────────────────────────────────────────────────┘   │
│             |                                                         │
│             |  🎯 Target Audience                                    │
│             |  ┌────────────────────────────────────────────────┐   │
│             |  │                                                  │   │
│             |  │  Primary Audience *                              │   │
│             |  │  ┌──────────────────────────────────────────┐  │   │
│             |  │  │ SaaS founders with 10-50 employees       │  │   │
│             |  │  └──────────────────────────────────────────┘  │   │
│             |  │                                                  │   │
│             |  │  Secondary Audiences (optional)                  │   │
│             |  │  ┌──────────────────────────────────────────┐  │   │
│             |  │  │ • Customer success managers              │  │   │
│             |  │  │ • Product teams at B2B companies         │  │   │
│             |  │  │ [+ Add audience]                         │  │   │
│             |  │  └──────────────────────────────────────────┘  │   │
│             |  │                                                  │   │
│             |  └────────────────────────────────────────────────┘   │
│             |                                                         │
│             |  🌍 Geographic Markets                                 │
│             |  ┌────────────────────────────────────────────────┐   │
│             |  │                                                  │   │
│             |  │  Primary Markets *                               │   │
│             |  │  [✓] United Kingdom                             │   │
│             |  │  [✓] United States                              │   │
│             |  │  [ ] Europe (EU)                                │   │
│             |  │  [ ] Asia-Pacific                               │   │
│             |  │  [+ Add custom region]                          │   │
│             |  │                                                  │   │
│             |  │  Languages                                       │   │
│             |  │  [✓] English (UK)                               │   │
│             |  │  [ ] English (US)                               │   │
│             |  │  [ ] Spanish                                    │   │
│             |  │  [ ] French                                     │   │
│             |  │  [+ Add language]                               │   │
│             |  │                                                  │   │
│             |  └────────────────────────────────────────────────┘   │
│             |                                                         │
│             |  [Cancel]                            [Save Changes →]  │
│             |                                                         │
└──────────────────────────────────────────────────────────────────────┘
```

### Products & Services Editor

**Layout:**
```
┌────────────────────────────────────────────────┐
│ 🎯 Products & Services                          │
│                                                  │
│ List your main products/services (3-5 recommended)│
│                                                  │
│ ┌──────────────────────────────────────────┐  │
│ │ PRODUCT 1                          [Edit] │  │
│ │ ────────────────────────────────────────  │  │
│ │ Name: AI-Powered Video Tutorials          │  │
│ │ Description: Automated customer onboard...│  │
│ │ Key Features: • AI generation • Custom... │  │
│ │ [Remove]                                  │  │
│ └──────────────────────────────────────────┘  │
│                                                  │
│ ┌──────────────────────────────────────────┐  │
│ │ PRODUCT 2                          [Edit] │  │
│ │ ────────────────────────────────────────  │  │
│ │ Name: Onboarding Automation Platform      │  │
│ │ Description: Workflow automation for...   │  │
│ │ [Remove]                                  │  │
│ └──────────────────────────────────────────┘  │
│                                                  │
│ [+ Add Product/Service]                         │
│                                                  │
└────────────────────────────────────────────────┘
```

**Add/Edit Product Modal:**
- Product/Service Name (required)
- Short Description (200 chars)
- Key Features (bullet list, 3-5)
- Target Audience (optional override)
- Pricing Tier (if applicable)

### SWOT Analysis Editor

```
┌────────────────────────────────────────────────┐
│ 💪 SWOT Analysis                                │
│                                                  │
│ Refine your competitive positioning             │
│                                                  │
│ ┌───────────────┬───────────────┐              │
│ │ STRENGTHS     │ WEAKNESSES    │              │
│ │ ───────────── │ ───────────── │              │
│ │ • AI-first    │ • New entrant │              │
│ │   approach    │   (limited    │              │
│ │ • Fast impl.  │   brand aware)│              │
│ │ • Affordable  │ • Small team  │              │
│ │ [+ Add]       │ [+ Add]       │              │
│ └───────────────┴───────────────┘              │
│                                                  │
│ ┌───────────────┬───────────────┐              │
│ │ OPPORTUNITIES │ THREATS       │              │
│ │ ───────────── │ ───────────── │              │
│ │ • Enterprise  │ • Big players │              │
│ │   expansion   │   entering    │              │
│ │ • GEO trend   │   market      │              │
│ │ [+ Add]       │ [+ Add]       │              │
│ └───────────────┴───────────────┘              │
│                                                  │
│ 💡 Use SWOT to inform content strategy          │
│    and differentiation messaging.                │
│                                                  │
└────────────────────────────────────────────────┘
```

### Competition Landscape Editor

```
┌────────────────────────────────────────────────┐
│ 🔍 Competition Landscape                        │
│                                                  │
│ Your main competitors (3-5 recommended)         │
│                                                  │
│ ┌──────────────────────────────────────────┐  │
│ │ COMPETITOR 1                       [Edit] │  │
│ │ ────────────────────────────────────────  │  │
│ │ Name: CompetitorA                         │  │
│ │ Website: competitora.com                  │  │
│ │ Positioning: Enterprise-focused, expensive│  │
│ │ Our Advantage: More affordable, AI-first  │  │
│ │ [Remove]                                  │  │
│ └──────────────────────────────────────────┘  │
│                                                  │
│ ┌──────────────────────────────────────────┐  │
│ │ COMPETITOR 2                       [Edit] │  │
│ │ ────────────────────────────────────────  │  │
│ │ Name: CompetitorB.io                      │  │
│ │ Positioning: Basic onboarding tools       │  │
│ │ Our Advantage: AI-powered, smarter        │  │
│ │ [Remove]                                  │  │
│ └──────────────────────────────────────────┘  │
│                                                  │
│ [+ Add Competitor]                              │
│                                                  │
│ 💡 aiCMO uses this to differentiate your        │
│    content from competitors in AI search.       │
│                                                  │
└────────────────────────────────────────────────┘
```

---

## Section 3: Advanced Brand Voice Configuration

### Purpose

Create multi-dimensional brand voice profiles for:
- Different products/services
- Different target regions
- Different audience segments
- Different content topics

**Use case:** A B2B SaaS company might have:
- Professional voice for enterprise audience
- Casual voice for startup founders
- Technical voice for developer documentation
- Friendly voice for customer success content

### Screen Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  [Sidebar]  |  SETTINGS → Advanced Brand Voice        [User Menu]    │
├──────────────────────────────────────────────────────────────────────┤
│             |                                                         │
│  Domain     |  🎙️ Advanced Brand Voice Configuration                │
│  Basic      |                                                         │
│  Voice ←    |  Create multiple voice profiles for different contexts.│
│  Publishing |                                                         │
│             |  ────────────────────────────────────────────────────  │
│             |                                                         │
│             |  📊 VOICE PROFILES (2 active)             [+ New Profile]│
│             |                                                         │
│             |  ┌────────────────────────────────────────────────┐   │
│             |  │ DEFAULT VOICE                          [Edit]  │   │
│             |  │ ──────────────────────────────────────────────  │   │
│             |  │ Tone: Professional, helpful, results-driven     │   │
│             |  │ Applies to: All content (default)              │   │
│             |  │ Products: All                                   │   │
│             |  │ Regions: All                                    │   │
│             |  │ Audience: All                                   │   │
│             |  │ Topics: General marketing, product features     │   │
│             |  │                                                  │   │
│             |  │ [Set as Default] [Edit] [Duplicate]             │   │
│             |  └────────────────────────────────────────────────┘   │
│             |                                                         │
│             |  ┌────────────────────────────────────────────────┐   │
│             |  │ TECHNICAL VOICE                        [Edit]  │   │
│             |  │ ──────────────────────────────────────────────  │   │
│             |  │ Tone: Technical, precise, developer-focused     │   │
│             |  │ Applies to: Developer documentation, API guides │   │
│             |  │ Products: API, Integrations                     │   │
│             |  │ Regions: Global                                 │   │
│             |  │ Audience: Developers, technical teams           │   │
│             |  │ Topics: API, webhooks, integrations             │   │
│             |  │                                                  │   │
│             |  │ [Edit] [Duplicate] [Delete]                     │   │
│             |  └────────────────────────────────────────────────┘   │
│             |                                                         │
│             |  💡 aiCMO automatically selects the right voice based  │
│             |     on content type, product, and target audience.     │
│             |                                                         │
└──────────────────────────────────────────────────────────────────────┘
```

### Create/Edit Voice Profile

**Modal Layout:**

```
┌──────────────────────────────────────────────────────────────────────┐
│  Create Brand Voice Profile                               [X Close]  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Profile Name *                                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ Technical Voice                                                 │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ────────────────────────────────────────────────────────────────   │
│                                                                       │
│  🎭 TONE & PERSONALITY                                               │
│                                                                       │
│  Select 3-5 tone attributes:                                         │
│  [✓] Professional  [ ] Casual      [ ] Friendly    [✓] Technical    │
│  [ ] Enthusiastic  [✓] Precise     [ ] Witty       [ ] Empathetic   │
│  [ ] Bold          [ ] Conservative [ ] Playful    [✓] Authoritative│
│                                                                       │
│  Writing Style:                                                       │
│  ( ) Conversational (like talking to a friend)                       │
│  (•) Balanced (professional but approachable)                        │
│  ( ) Formal (business-first, serious tone)                           │
│                                                                       │
│  Sentence Length:                                                     │
│  ( ) Short & punchy   (•) Varied   ( ) Long & detailed               │
│                                                                       │
│  ────────────────────────────────────────────────────────────────   │
│                                                                       │
│  🎯 APPLY TO                                                         │
│                                                                       │
│  Products/Services (select specific or leave blank for all):         │
│  [✓] API Documentation                                              │
│  [✓] Integration Guides                                             │
│  [ ] Customer Onboarding Platform                                   │
│  [ ] Analytics Dashboard                                            │
│                                                                       │
│  Target Regions (select specific or leave blank for all):            │
│  [ ] United Kingdom  [ ] United States  [ ] Europe  [✓] Global      │
│                                                                       │
│  Target Audience (select specific or leave blank for all):           │
│  [✓] Developers                                                     │
│  [✓] Technical teams                                                │
│  [ ] Marketing teams                                                │
│  [ ] Executives                                                     │
│                                                                       │
│  Content Topics (optional - helps aiCMO auto-select voice):          │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ API, webhooks, integrations, technical documentation            │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ────────────────────────────────────────────────────────────────   │
│                                                                       │
│  📝 VOICE SAMPLE (Optional)                                          │
│                                                                       │
│  Paste 2-3 paragraphs of your existing content to train AI:          │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ Our API provides RESTful endpoints for...                       │ │
│  │ [Paste your sample text here]                                   │ │
│  │                                                                  │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ────────────────────────────────────────────────────────────────   │
│                                                                       │
│  [Cancel]                          [Save Voice Profile →]            │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

### Voice Profile Hierarchy

**How aiCMO selects the right voice:**

1. **Check content context:**
   - What product/service is this about?
   - Who is the target audience?
   - What region/language?
   - What topic/category?

2. **Match to voice profile:**
   - If specific match exists (e.g., "API" topic → Technical Voice), use that
   - If partial match (e.g., developer audience but not API topic), use closest match
   - If no match, use Default Voice

3. **Override options:**
   - User can manually select voice when creating content
   - Voice profile is a smart default, not a hard rule

**Example matching:**

| Content | Product | Audience | Topic | Voice Selected |
|---------|---------|----------|-------|----------------|
| API guide | API | Developers | Integration | Technical Voice ✓ |
| Customer success story | Onboarding | Marketing | Case study | Default Voice ✓ |
| Blog post | All | Founders | Strategy | Default Voice ✓ |
| Help doc | Analytics | Users | How-to | Default Voice ✓ |

---

## Navigation & User Flows

### Settings Sidebar Navigation

```
Settings Menu:
├─ Overview (dashboard summary)
├─ Domain Claim ⏳
├─ Basic Settings
│  ├─ Brand Overview
│  ├─ Products & Services
│  ├─ Target Audience
│  └─ SWOT & Competitors
├─ Advanced Brand Voice
├─ Publishing Settings
│  ├─ WordPress Connection
│  ├─ Autopilot Rules
│  └─ Content Calendar
├─ Team & Collaboration
└─ Billing & Plan
```

### Common User Flows

**Flow 1: Claim Domain**
1. Dashboard → "Claim your domain" banner
2. Settings → Domain Claim
3. Copy DNS TXT record
4. Add to DNS provider
5. Click "Verify Domain"
6. Wait for verification (auto-refresh)
7. Success → Unlocks features

**Flow 2: Edit Brand Info**
1. Dashboard → Settings → Basic Settings → Brand Overview
2. Edit fields (brand name, description, industries, etc.)
3. Click "Save Changes"
4. Success toast: "Brand overview updated"
5. Return to dashboard

**Flow 3: Create New Voice Profile**
1. Settings → Advanced Brand Voice
2. Click "+ New Profile"
3. Fill modal (name, tone, products, audience, topics)
4. Click "Save Voice Profile"
5. Profile added to list
6. Can set as default or use selectively

---

## Mobile Responsive Design

### Mobile Adaptations

**Settings Sidebar:**
- Collapses to hamburger menu on mobile
- Full-screen overlay when opened
- Breadcrumb navigation at top

**Form Fields:**
- Stack vertically (no side-by-side)
- Full-width inputs
- Larger touch targets (min 44px)
- Collapsible sections (accordions)

**Voice Profile Cards:**
- Stack vertically
- Expand/collapse details
- Swipeable actions (edit, duplicate, delete)

**DNS Verification:**
- Copy buttons larger and more prominent
- Provider guides open in full-screen modal
- Step-by-step wizard format

---

## Success Metrics

### Domain Claim
- % of users who complete domain claim within 7 days
- Average time from start to verification complete
- Drop-off rate at DNS setup step

### Basic Settings Editing
- % of users who edit at least one basic setting field
- Most commonly edited fields
- Time spent in settings section

### Advanced Voice Profiles
- % of users who create >1 voice profile
- Average number of voice profiles per user
- Correlation between voice profiles and content quality scores

---

## Implementation Checklist

### Design Phase
- [ ] Create high-fidelity mockups for all 3 sections
- [ ] Design mobile responsive variants
- [ ] Create DNS provider-specific guides (visual)
- [ ] Design voice profile editor modal

### Development Phase
- [ ] Build domain claim section with DNS verification logic
- [ ] Implement basic settings editor forms (all sections)
- [ ] Create advanced brand voice profile system
- [ ] Add real-time DNS verification polling
- [ ] Build voice profile matching algorithm
- [ ] Mobile optimization

### Testing Phase
- [ ] Test DNS verification with 5+ DNS providers
- [ ] User testing: Can users complete domain claim in <10 min?
- [ ] Test voice profile matching accuracy
- [ ] Test settings persistence and sync

---

## Related Documentation

**Other wireframes:**
- `01_PRICING_PAGE_WIREFRAMES.md` - Pricing page
- `02_FOUNDING_MEMBER_BENEFITS_PAGE.md` - Founding member benefits
- `03_ONBOARDING_FLOW_AUTOPILOT.md` - Autopilot onboarding process

**Strategy docs:**
- `../00_PRICING_STRATEGY_ANALYSIS.md` - Business rationale
- `../EXECUTION_ROADMAP.md` - Implementation timeline

---

**Last Updated:** 2025-10-18
**Status:** Ready for Design & Development
**Target Launch:** Week 6-7 of execution roadmap (post-onboarding launch)
