# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**aicmo_cc** is a marketing orchestration system built on Claude Code's agent framework. It provides a team of specialized AI marketing agents coordinated by Maggie, an AI Chief Marketing Orchestrator (aiCMO).

## Agent Architecture

This repository implements a hierarchical agent system with one orchestrator and seven specialized marketing subagents:

### Maggie (aiCMO) - The Orchestrator
- **File:** `.claude/agents/maggie-ai-cmo.md`
- **Role:** Marketing orchestrator who plans, coordinates, and delegates work across all specialized agents
- **Model:** Sonnet
- **Key Responsibilities:**
  - Strategic planning and OKR management
  - Task delegation with clear owners, metrics, and deadlines
  - Cross-functional coordination between all four clusters
  - Executive reporting and performance tracking
- **When to Use:** Comprehensive marketing campaigns, go-to-market strategies, multi-channel initiatives, or any work requiring coordination across multiple marketing disciplines

### The Four Specialized Clusters

#### 1. Strategy & Research Cluster
**Mark (market-researcher)**
- **File:** `.claude/agents/market-researcher.md`
- **Focus:** Market analysis, competitive intelligence, customer research, audience insights, trend identification
- **Style:** Analytical, skeptical, hypothesis-driven, validates before scaling
- **Tools:** Read, Write, Edit, Glob, Grep, Bash, WebFetch, WebSearch

#### 2. Content & Creative Cluster
**Chris (content-strategist)**
- **File:** `.claude/agents/content-strategist.md`
- **Focus:** Content planning, SEO/GEO optimization, editorial calendars, content strategy
- **Style:** Expressive, empathetic, imaginative, sprint-based
- **Tools:** Read, Write, Edit, Glob, Grep, Bash, WebFetch, WebSearch

**Brenda (brand-strategist)**
- **File:** `.claude/agents/brand-strategist.md`
- **Focus:** Brand positioning, messaging architecture, voice/tone development, brand identity
- **Tools:** Read, Write, Edit, Glob, Grep, Bash, WebFetch, WebSearch

#### 3. Performance & Optimization Cluster
**Peter (performance-analyst)**
- **File:** `.claude/agents/performance-analyst.md`
- **Focus:** Marketing analytics, metrics tracking, A/B testing, ROI analysis, data-driven optimization
- **Style:** Energetic, technical, results-driven, agile (ship→test→learn→scale)
- **Tools:** Read, Write, Edit, Glob, Grep, Bash, WebFetch

**Grace (growth-hacker)**
- **File:** `.claude/agents/growth-hacker.md`
- **Focus:** Growth experiments, acquisition optimization, viral loops, conversion rate optimization
- **Tools:** Read, Write, Edit, Glob, Grep, Bash, WebFetch, WebSearch

**Emily (email-marketer)**
- **File:** `.claude/agents/email-marketer.md`
- **Focus:** Email campaign strategy, automation workflows, segmentation, deliverability, performance optimization
- **Tools:** Read, Write, Edit, Glob, Grep, Bash

#### 4. Social & Community Cluster
**Sophie (social-media-manager)**
- **File:** `.claude/agents/social-media-manager.md`
- **Focus:** Social media strategy, community management, content creation, platform-specific optimization
- **Style:** Empathetic, lively, culturally tuned, real-time responsive, authenticity-first
- **Platforms:** Twitter/X, LinkedIn, Facebook, Instagram, TikTok, Mastodon, Bluesky, Reddit, Quora, Discord, WhatsApp Channels, WhatsApp Groups
- **Tools:** Read, Write, Edit, Glob, Grep, Bash, WebFetch, WebSearch

## Agent Invocation Pattern

When working with this system:

1. **For complex, multi-channel marketing work:** Start with Maggie (maggie-ai-cmo) who will orchestrate and delegate to specialized agents
2. **For focused, single-discipline work:** Invoke the appropriate specialized agent directly
3. **For coordinated campaigns:** Always use Maggie to ensure proper coordination, OKR tracking, and cross-functional alignment

## Key Workflows

### Maggie's Orchestration Pattern
1. **Intake → Triage → Assign → Deliver → Measure**
2. Each task defines: goal, metric, deadline, owner, dependencies
3. Deliverables ship with quality checks and measurement plans

### Standard Output Format (Maggie's Deliverables)
- **TL;DR** (3-6 bullets)
- **Plan/Deliverables** (checklist with owners & dates)
- **KPI/Measurement** (definitions & instrumentation)
- **Risks & Mitigations**
- **Next Actions** (who/when)
- **Appendices** (as needed)

### GEO/SEO Loop
- Mark identifies queries/opportunities → Chris crafts aligned content
- Peter ensures technical optimization & distribution
- Sophie amplifies and collects sentiment → loops back to Mark for insights

### Experiment Loop (CRO/Growth)
- Hypothesis → design → A/B test → measure → decision memo → scale or kill

## Agent Personas

Each agent has a distinct personality and working style:
- **Maggie:** Visionary, calm, empathetic, systems-thinking, KPI-driven
- **Mark:** Analytical, skeptical, hypothesis-driven
- **Chris:** Expressive, empathetic, imaginative
- **Brenda:** Strategic, differentiation-focused, consistency-oriented
- **Peter:** Energetic, technical, results-driven
- **Grace:** Experiment-driven, data-obsessed, creative
- **Emily:** Subscriber-centric, test-and-learn, automation-first
- **Sophie:** Empathetic, lively, culturally tuned, authenticity-first

## Global Policies

When working with any agent in this system:
- Maintain brand consistency and factual integrity
- Prefer concise, actionable briefs over lengthy documentation
- Tie every initiative to measurable OKRs/KPIs
- Close the loop: every deliverable includes outcomes, insights, and next actions
- Quality over speed: deliverables must be shippable and measured
- Ensure privacy and compliance with platform policies

## Knowledge Base Structure

The `knowledge_base/` directory contains structured information that all agents reference:

### Brand Knowledge (`knowledge_base/brand/`)
- **[brand-overview.md](knowledge_base/brand/brand-overview.md)**: Brand identity, mission, vision, values, voice/tone, target audience, messaging pillars
- **[products-services.md](knowledge_base/brand/products-services.md)**: Product catalog, pricing strategy, unique value propositions
- **[competition-landscape.md](knowledge_base/brand/competition-landscape.md)**: Competitive intelligence, market positioning, differentiation strategies (optimized for agent consumption)

### Events & Campaigns (`knowledge_base/events/`)
- Event-specific information and marketing campaign details

### Guidelines (`knowledge_base/guidelines/`)
- Platform-specific policies and compliance requirements (currently empty)

**Key Principle:** All agents should reference knowledge base files to maintain brand consistency, accurate product information, and competitive awareness. When creating marketing deliverables, agents should cross-reference brand guidelines and competitive positioning.

## Repository Structure

```
aicmo_cc/
├── .claude/
│   └── agents/              # Agent definitions (8 agents)
│       ├── maggie-ai-cmo.md           # Orchestrator
│       ├── market-researcher.md       # Mark
│       ├── content-strategist.md      # Chris
│       ├── brand-strategist.md        # Brenda
│       ├── performance-analyst.md     # Peter
│       ├── growth-hacker.md           # Grace
│       ├── email-marketer.md          # Emily
│       └── social-media-manager.md    # Sophie
├── campaigns/               # Campaign content and newsletters
│   └── weekly-newsletter/  # Weekly GEO newsletter series
│       └── issue-01/       # Newsletter Issue #1
│           ├── issue-01-newsletter.md     # Main newsletter content
│           ├── assets/                    # Newsletter images
│           ├── IMAGE_GENERATION_PROMPTS.md
│           └── DESIGN_ASSETS_NEEDED.md
├── knowledge_base/          # Structured brand/product information
│   ├── brand/              # Brand guidelines and competitive intel
│   ├── events/             # Event-specific content
│   └── guidelines/         # Platform policies (to be populated)
├── scripts/                 # Automation scripts
│   └── newsletter/         # Newsletter automation
│       ├── send-test-email.js         # Send test emails via Mailchimp
│       └── upload-to-cloudinary.js    # Upload images to Cloudinary CDN
├── .claude/
│   ├── agents/             # Agent definitions
│   └── mcp-config.json     # MCP server configuration (Mailchimp, Cloudinary, Twitter)
├── .env                     # Environment variables (Mailchimp, Cloudinary, etc.)
└── CLAUDE.md               # This file
```

## Agent File Format

All agent definition files follow this structure:

```yaml
---
name: agent-name
description: Brief description of agent capabilities and when to use
tools: Read, Write, Edit, Glob, Grep, Bash, WebFetch, WebSearch
model: sonnet | inherit
color: red | blue | green | purple (optional)
---

# Agent persona and detailed instructions follow...
```

## Modifying Agents

When updating agent definitions:
- Each agent file is in `.claude/agents/` directory
- Files use YAML frontmatter with: name, description, tools, model, color (optional)
- The `description` field is shown to Claude Code and should explain when to invoke this agent
- Maintain the persona, tone, and working style consistency
- Preserve the hierarchical relationship (Maggie orchestrates, specialists execute)
- Keep tool access appropriate to each agent's role

## Working with Knowledge Base Files

When updating brand/product information:

1. **Brand changes** → Update `knowledge_base/brand/brand-overview.md`
2. **Product/pricing changes** → Update `knowledge_base/brand/products-services.md`
3. **Competitive intelligence** → Update `knowledge_base/brand/competition-landscape.md`
   - This file is specifically optimized for agent consumption with structured sections, comparison tables, and agent-specific guidance
4. **New events/campaigns** → Add to `knowledge_base/events/`
5. **Platform policies** → Add to `knowledge_base/guidelines/`

All agents (especially Mark, Brenda, Chris, and Maggie) will reference these files when generating marketing materials, competitive analysis, or strategic recommendations.

## Common Development Tasks

Since this is a pure agent orchestration system (no build/compile/test commands), development tasks focus on:

### Testing Agent Behavior
- Invoke agents via Claude Code Task tool
- Test Maggie's orchestration by requesting multi-channel campaigns
- Test specialist agents individually for focused tasks
- Verify agents reference knowledge_base files correctly

### Updating Marketing Intelligence
```bash
# Review brand knowledge files
ls -la knowledge_base/brand/

# Check agent definitions
ls -la .claude/agents/

# Search for specific topics across knowledge base
grep -r "GEO" knowledge_base/
```

### Content Review Workflow
When agents generate marketing content:
1. Verify brand voice alignment with `knowledge_base/brand/brand-overview.md`
2. Check competitive positioning against `knowledge_base/brand/competition-landscape.md`
3. Validate product claims against `knowledge_base/brand/products-services.md`
4. Ensure compliance with guidelines in `knowledge_base/guidelines/`

---

## Newsletter Automation System

This repository includes a complete newsletter automation workflow for the weekly aiCMO newsletter.

### Newsletter Architecture

**Location:** `campaigns/weekly-newsletter/issue-XX/`

Each newsletter issue contains:
- **`issue-XX-newsletter.md`** - Main content with YAML frontmatter (subject lines, preview text, metadata)
- **`assets/`** - All visual assets (images, icons)
- **`IMAGE_GENERATION_PROMPTS.md`** - ChatGPT-4o prompts for generating images
- **`DESIGN_ASSETS_NEEDED.md`** - Image specifications and requirements

### Newsletter Workflow

#### 1. Content Creation
Newsletter content is written in Markdown with YAML frontmatter:

```yaml
---
title: "Newsletter Title"
issue: 01
date: 2025-10-14
content_pillar: GEO Fundamentals
author: Maggie (AI CMO)
subject_lines:
  - "Subject line option 1"
  - "Subject line option 2"
preview_text: "Preview text for email clients"
segments:
  - founders
  - consultants
---

# Newsletter content in Markdown...
```

#### 2. Image Generation & Optimization

**Generate Images:**
- Use prompts from `IMAGE_GENERATION_PROMPTS.md` with ChatGPT-4o (DALL-E 3)
- Save high-resolution images (1-2MB) to `assets/` folder
- No manual compression needed

**Upload to Cloudinary CDN:**
```bash
node scripts/newsletter/upload-to-cloudinary.js
```

This script:
- Uploads all images to Cloudinary
- Generates optimized CDN URLs
- Saves URLs to `assets/cloudinary-urls.json`
- Applies automatic optimization (q_auto, f_auto)

**Image Specifications:**
- **Original:** High-resolution (1-2MB) for quality
- **Delivery:** Optimized via Cloudinary (~50-200KB)
- **Display sizes:**
  - Header: 600×200px
  - Stats/Decline cards: 500×350px
  - Case study: 500×400px
  - CTA button: 400px width (responsive)
  - Social icons: 32×32px

**Cloudinary URL Format:**
```
Main images:
https://res.cloudinary.com/dmaw7i3gz/image/upload/w_XXX,h_XXX,c_fit,q_auto,f_auto/v[version]/newsletter/issue-01/[filename].png

Icons:
https://res.cloudinary.com/dmaw7i3gz/image/upload/w_32,h_32,c_fit/v[version]/newsletter/issue-01/icons/[filename].png
```

#### 3. Email Delivery

**Send Test Email:**
```bash
node scripts/newsletter/send-test-email.js campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md your-email@example.com
```

The script:
- Parses YAML frontmatter and Markdown content
- Converts Markdown to HTML
- Wraps in email template with branding
- Creates Mailchimp campaign
- Sends test email via Mailchimp API

**Email Template Features:**
- Brand colors: Crimson Red (#C8102E), Navy Blue (#012169)
- Responsive design (max-width: 600px)
- Gmail-optimized image handling
- Proper HTML structure for email clients

#### 4. MCP Server Integration

**Configured MCP Servers:**
- **Mailchimp** (`@bryangsmith/mailchimp-mcp-server`) - Email campaign management
- **Cloudinary** (`@cloudinary/asset-management`) - Image hosting and optimization

**Configuration:** `.claude/mcp-config.json`
```json
{
  "mcpServers": {
    "mailchimp": { ... },
    "cloudinary": { ... }
  }
}
```

**Environment Variables:** `.env`
```bash
# Mailchimp
MAILCHIMP_API_KEY=...
MAILCHIMP_SERVER_PREFIX=us2
MAILCHIMP_LIST_ID=...

# Cloudinary
CLOUDINARY_CLOUD_NAME=dmaw7i3gz
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_URL=cloudinary://...

# Newsletter
NEWSLETTER_FROM_EMAIL=maggie@aimarketing.so
NEWSLETTER_FROM_NAME=Maggie from aiCMO
NEWSLETTER_REPLY_TO=maggie@aimarketing.so
```

### Newsletter Best Practices

**Content:**
- Use emoji sparingly for section headers (🔍, 📊, ✅, 💡, etc.)
- Keep paragraphs short for mobile readability
- Include clear CTAs with button images
- Add alt text to all images for accessibility

**Images:**
- Use Cloudinary transformations for responsive sizing
- Test images in Gmail, Outlook, and mobile clients
- Icons must be exactly 32×32px (use `w_32,h_32,c_fit` in URL)
- All images should use `<img>` tags with width/height attributes (not Markdown syntax)

**Email Client Compatibility:**
- Gmail: Requires explicit image dimensions and proper HTML structure
- Outlook: Test with both desktop and web versions
- Mobile: Images should be responsive with `max-width: 100%; height: auto;`

### Troubleshooting

**Images not displaying in Gmail:**
- Ensure images use `<img>` tags with explicit width/height
- Use Cloudinary transformations (w_XXX, h_XXX, q_auto, f_auto)
- Check that URLs are HTTPS (Cloudinary provides this automatically)

**Mailchimp test limit:**
- Free/basic accounts have daily test email limits
- Error: "Too many tests sent in a 24 hour period"
- Solution: Wait 24 hours or use production campaign sends

**Large file sizes:**
- Original images can be 1-2MB (quality matters)
- Cloudinary automatically optimizes delivery to 50-200KB
- Use `q_auto` and `f_auto` parameters for automatic optimization

---

## Social Media Automation System

This repository includes automated social media posting for Twitter/X and LinkedIn to amplify newsletter content and marketing campaigns.

### Social Media Architecture

**Location:** `scripts/social/`

Social media automation includes:

- **`post-tweet-direct.js`** - Direct Twitter API v2 posting (recommended)
- **`post-thread-direct.js`** - Direct Twitter thread posting
- **`tweet.js`** - Convenience wrapper for quick posting
- **`post-to-twitter.js`** - MCP-based tweets and threads (legacy)
- **`cross-post-newsletter.js`** - Cross-post newsletter content to multiple platforms

### Social Media Workflow

#### 1. Platform Setup

**Twitter/X (Active):**
- Uses `@mbelinky/x-mcp-server` MCP server
- OAuth 1.0a authentication
- Supports tweets, threads, and media

**LinkedIn (Active - Development Tier):**
- ✅ OAuth 2.0 authentication complete
- ✅ Dry-run mode generating LinkedIn posts
- ⏳ Standard Tier approval pending (required for live posting)
- Organization ID: 108297743

**Setup Guide:** See `SOCIAL_MEDIA_SETUP.md` for complete setup instructions

#### 2. Twitter/X Configuration

**Get Credentials:**
1. Create app at https://developer.twitter.com
2. Set permissions to "Read and Write"
3. Generate API keys and access tokens

**Environment Variables:**
```bash
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
```

**MCP Configuration:** (`.claude/mcp-config.json`)
```json
{
  "mcpServers": {
    "twitter": {
      "command": "npx",
      "args": ["-y", "@mbelinky/x-mcp-server"],
      "env": {
        "API_KEY": "${TWITTER_API_KEY}",
        "API_SECRET_KEY": "${TWITTER_API_SECRET}",
        "ACCESS_TOKEN": "${TWITTER_ACCESS_TOKEN}",
        "ACCESS_TOKEN_SECRET": "${TWITTER_ACCESS_TOKEN_SECRET}"
      }
    }
  }
}
```

#### 3. LinkedIn Configuration

**Get Credentials:**
1. Create app at https://www.linkedin.com/developers/
2. Apply for Community Management API access
3. Get Development Tier approval (immediate)
4. Request Standard Tier for live posting (1-3 business days)

**Environment Variables:**
```bash
LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_client_secret_here
LINKEDIN_REDIRECT_URI=http://localhost:3001/oauth/redirect
LINKEDIN_ORGANIZATION_ID=108297743
```

**OAuth Authentication:**
```bash
# One-time setup (60-day tokens)
node scripts/social/linkedin-oauth.cjs
```

**Scopes Required:**
- `w_organization_social_feed` - Post to organization pages
- `r_organization_social_feed` - Read organization posts/analytics

**Current Status:**
- Development Tier: ✅ Active
- Standard Tier: ⏳ Pending (required for live posting)
- OAuth: ✅ Complete
- Dry-run mode: ✅ Working

**Documentation:** See `docs/LINKEDIN_INTEGRATION_GUIDE.md` for complete setup guide

#### 4. LinkedIn Preview & Analytics Tools (Development Tier Features)

Since Development Tier allows reading but not posting, we've built comprehensive preview and analytics tools:

**Visual Post Preview:**
```bash
# Preview any post with formatting validation
node scripts/social/linkedin-preview.cjs preview "Your post text here"

# Preview from JSON file
node scripts/social/linkedin-preview.cjs file campaigns/weekly-newsletter/issue-01/issue-01-newsletter-social-posts.json

# Compare two posts side-by-side
node scripts/social/linkedin-preview.cjs compare "Post A" "Post B"
```

**Read Organization Posts:**
```bash
# List recent posts
node scripts/social/linkedin-read-posts.cjs list --count 20

# Export posts to JSON
node scripts/social/linkedin-read-posts.cjs export posts.json --count 50

# Search posts by keyword
node scripts/social/linkedin-read-posts.cjs search "marketing" --count 30

# Get summary statistics
node scripts/social/linkedin-read-posts.cjs summary
```

**Analytics Dashboard:**
```bash
# View 30-day analytics
node scripts/social/linkedin-analytics.cjs dashboard --days 30

# Export analytics to JSON
node scripts/social/linkedin-analytics.cjs export analytics.json --days 90

# Compare performance across periods
node scripts/social/linkedin-analytics.cjs compare --period1 7 --period2 30
```

**Preview Features:**
- ✅ Visual LinkedIn UI simulation in terminal
- ✅ Character count validation (871/3000)
- ✅ Hashtag analysis and recommendations
- ✅ Emoji usage validation
- ✅ URL detection and warnings
- ✅ Optimal length suggestions (800-1200 chars)
- ✅ Engagement optimization tips

**Analytics Features:**
- ✅ Post engagement metrics (likes, comments, shares)
- ✅ Top performing posts ranking
- ✅ Hashtag frequency analysis
- ✅ Posting frequency tracking
- ✅ Content type analysis (media vs text)
- ✅ Performance comparison across time periods
- ✅ Automated recommendations

**Example Preview Output:**
```
╔══════════════════════════════════════════════════════════════════════╗
║ LinkedIn Post Preview                                                 ║
╠══════════════════════════════════════════════════════════════════════╣
║ aiCMO (Organization)                                        • Public ║
║ Preview                                                              ║
║                                                                      ║
║ 📰 New from aiCMO: Discovery Has Moved. Have You?                    ║
║                                                                      ║
║ 71% of Americans now use AI to research brands...                    ║
║                                                                      ║
║ #AIMarketing #GEO #MarketingStrategy #AIFirst                        ║
╠══════════════════════════════════════════════════════════════════════╣
║ 📊 871/3000 characters | 4 hashtags | 1 links | 2 emojis            ║
║ ✅ Optimal length (800-1200 chars)                                    ║
║ ✅ Professional emoji usage                                        ║
║ ✅ Good hashtag count (3-5)                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

#### 5. Cross-Posting Newsletters

**Preview Posts (Dry Run):**
```bash
node scripts/social/cross-post-newsletter.cjs --dry-run
```

**Post to Twitter:**
```bash
node scripts/social/cross-post-newsletter.js --twitter
```

**Post to All Platforms:**
```bash
node scripts/social/cross-post-newsletter.cjs campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md
```

**LinkedIn Only (Dry-Run):**
```bash
node scripts/social/cross-post-newsletter.cjs campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md --linkedin --dry-run
```

**What It Does:**
- Parses newsletter content
- Generates Twitter thread (4-5 tweets):
  - Tweet 1: Hook + Title
  - Tweet 2: TL;DR summary
  - Tweet 3: Key statistics
  - Tweet 4: CTA with newsletter link
- Generates LinkedIn post (professional format)
- Saves results to JSON file
- **LinkedIn posts now include enhanced visual preview** with formatting validation

#### 6. Direct Twitter Posting (Recommended)

**Quick Single Tweet (Easiest):**
```bash
node scripts/social/tweet.js "Your tweet text here"
```

**Single Tweet (Full Script):**
```bash
node scripts/social/post-tweet-direct.js "Your tweet text here"
```

**Post a Thread:**

First, create a JSON file with your tweets:
```json
{
  "tweets": [
    "First tweet in thread",
    "Second tweet in thread",
    "Third tweet in thread"
  ]
}
```

Then post the thread:
```bash
node scripts/social/post-thread-direct.js thread.json
```

**Benefits:**
- Posts immediately via Twitter API v2
- Uses OAuth 1.0a authentication
- No MCP server required
- Returns tweet ID and URL for each tweet
- Threads automatically connect tweets with reply relationships
- 2-second delay between thread tweets

**Example Single Tweet:**
```bash
node scripts/social/tweet.js "Test post from aiCMO! 🚀 #AIMarketing"
```

**Success Output:**
```text
✅ Tweet posted successfully!
📊 Tweet ID: 1977514819096867226
🔗 Tweet URL: https://twitter.com/user/status/1977514819096867226
```

**Example Thread Output:**
```text
🧵 Posting Twitter thread (4 tweets)...
✅ Tweet 1 posted successfully!
✅ Tweet 2 posted successfully!
✅ Tweet 3 posted successfully!
✅ Tweet 4 posted successfully!
🎉 Thread posted successfully!
```

#### 7. Legacy MCP-Based Posting

**Post Single Tweet (via MCP):**
```bash
node scripts/social/post-to-twitter.js tweet "Your tweet text here"
```

**Post Thread from JSON:**
```json
{
  "tweets": [
    "Tweet 1 content",
    "Tweet 2 content",
    "Tweet 3 content"
  ]
}
```

```bash
node scripts/social/post-to-twitter.js thread thread.json
```

**Generate Tweet from Newsletter:**
```bash
node scripts/social/post-to-twitter.js newsletter campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md
```

**Note:** MCP-based methods require MCP server running. Use direct posting method for simpler workflow.

### Social Media Best Practices

**Twitter/X:**
- Keep tweets under 280 characters
- Use 1-2 emojis per tweet maximum
- Include 2-3 relevant hashtags (#AIMarketing, #GEO, etc.)
- Test with `--dry-run` before posting
- Respect rate limits (50 tweets/24 hours on free tier)

**LinkedIn:**
- Use professional tone
- Include relevant hashtags
- Add line breaks for readability
- Provide clear value proposition

**Cross-Posting:**
- Always preview with `--dry-run` first
- Customize platform-specific content
- Track engagement via saved JSON results
- Monitor for rate limits

### Integration with Sophie Agent

**Sophie (social-media-manager)** can leverage these automation scripts:
- Generate platform-specific content
- Schedule posts
- Monitor engagement
- Optimize posting times

**Sophie's Platforms:**
- Twitter/X ✅ (automated - live posting active)
- LinkedIn ✅ (automated - dry-run active, live posting pending Standard Tier)
- Facebook, Instagram, TikTok (manual posting)
- Discord, WhatsApp, Reddit (community management)

### Troubleshooting

**Twitter API Issues:**
- Error: "Invalid api_key" → Check credentials in `.env`
- Error: "Rate limit exceeded" → Wait 15 minutes between sessions
- Error: "Tweet text too long" → Keep under 280 characters

**MCP Server:**
- Ensure MCP server configured in `mcp-config.json`
- Verify environment variables are set correctly
- Check that API credentials don't have placeholder values

**LinkedIn:**
- Status: Development Tier active, Standard Tier pending
- OAuth: ✅ Complete (60-day tokens)
- Dry-run: ✅ Generates formatted posts
- Live posting: ⏳ Requires Standard Tier approval
- Organization: 108297743 (https://www.linkedin.com/company/108297743/)

### Next Steps

1. **Complete Setup:**
   - Follow `SOCIAL_MEDIA_SETUP.md` for Twitter/X setup
   - Apply for LinkedIn API access if needed

2. **Test Integration:**
   - Run `--dry-run` to preview posts
   - Post test tweet to verify configuration
   - Cross-post newsletter Issue #1

3. **Monitor & Optimize:**
   - Track engagement via Twitter Analytics
   - Adjust posting times based on performance
   - Refine content templates in scripts

4. **Expand:**
   - Add scheduling via cron jobs
   - Integrate additional platforms
   - Build engagement monitoring dashboards

---

## Canva Design Integration System

This repository includes complete Canva Connect API integration for automated design export and social media posting.

### Canva Architecture

**Location:** `scripts/canva/` & `docs/`

Canva integration includes:

- **`scripts/canva/canva-oauth.js`** - OAuth 2.0 authentication with PKCE
- **`scripts/canva/export-design.js`** - Export designs by ID to PNG/JPG
- **`scripts/newsletter/generate-images-canva.js`** - Newsletter image workflow
- **`server/oauth-server.js`** - Production OAuth server (Enterprise)
- **`docs/CANVA_INTEGRATION_GUIDE.md`** - Complete integration guide
- **`docs/CANVA_QUICK_REFERENCE.md`** - One-page cheat sheet

### Canva Workflow (Design → Export → Post)

#### 1. What Canva Pro Can Do

**✅ Capabilities:**
- Design in Canva UI with full creative control
- Export designs programmatically via API
- Automate social media posting with images
- Generate newsletter images

**❌ Limitations (Requires Enterprise):**
- Autofill API (programmatic text/image placement)
- Brand templates API (bulk generation with data)
- Advanced template automation

#### 2. Setup & Authentication

**Get Canva Credentials:**
1. Go to https://www.canva.com/developers/
2. Create integration (Private recommended)
3. Copy Client ID and Client Secret
4. Add redirect URL: `http://127.0.0.1:3001/oauth/redirect`
5. Enable scopes: design:content:read, design:content:write, design:meta:read, asset:read, asset:write, profile:read

**Authenticate:**
```bash
node scripts/canva/canva-oauth.js
```

**What happens:**
- Opens browser to Canva authorization
- You click "Authorize"
- Tokens saved to `.canva-tokens.json`
- Auto-refreshes when expired

#### 3. Design in Canva UI

**Create designs:**
1. Go to https://www.canva.com
2. Create new design with optimal sizes:
   - **Twitter:** 1200×675px (16:9)
   - **LinkedIn:** 1200×627px (1.91:1)
   - **Instagram:** 1080×1080px (1:1)
   - **Newsletter Header:** 600×200px (3:1)
3. Design with brand colors:
   - Crimson Red: `#C8102E`
   - Navy Blue: `#012169`
4. Save (auto-saved by Canva)

**Get Design ID:**
- Open design in Canva
- Copy ID from URL: `https://www.canva.com/design/[DESIGN_ID]/view`
- Example: `DAG1wokOYPs`

#### 4. Export Designs via API

**Basic export:**
```bash
node scripts/canva/export-design.js <DESIGN_ID>
```

**Export with options:**
```bash
node scripts/canva/export-design.js <DESIGN_ID> png ./temp/image.png
```

**What happens:**
- Authenticates (uses cached tokens)
- Starts async export job via Canva API
- Waits for completion (~10-30 seconds)
- Downloads image to specified path

**Supported formats:**
- `png` - Best for graphics with transparency
- `jpg` - Smaller file size
- `pdf` - Print quality

#### 5. Post to Social Media

**Twitter with image:**
```bash
node scripts/social/post-tweet-with-image.js "Tweet text" ./temp/image.png
```

**Combined workflow (export + post):**
```bash
node scripts/canva/export-design.js DAG1wokOYPs png ./temp/event.png && \
node scripts/social/post-tweet-with-image.js "Event announcement 🎉" ./temp/event.png
```

### Complete Workflow Examples

#### Example 1: Event Flyer → Twitter

```bash
# 1. Design in Canva UI (1200×675px)
#    - Add event details
#    - Save design
#    - Copy Design ID: DAG1wokOYPs

# 2. Export & post (automated)
node scripts/canva/export-design.js DAG1wokOYPs png ./temp/event.png
node scripts/social/post-tweet-with-image.js \
  "🤖 AI Meets Web3 in London!

  FREE event @ London Web3 Week
  📍 Wapping Tavern, London
  📅 Oct 21, 6:45-8:30pm

  #LondonWeb3Week #AIMarketing" \
  ./temp/event.png
```

#### Example 2: Newsletter Header

```bash
# Export latest header design
node scripts/canva/export-design.js DAGheader png \
  ./campaigns/weekly-newsletter/issue-02/assets/header.png

# Upload to Cloudinary
node scripts/newsletter/upload-to-cloudinary.js

# Send newsletter
node scripts/newsletter/send-test-email.js \
  campaigns/weekly-newsletter/issue-02/issue-02-newsletter.md \
  your-email@example.com
```

#### Example 3: Batch Social Posts

```bash
# Export multiple designs
for id in DAG001 DAG002 DAG003; do
  node scripts/canva/export-design.js $id png ./temp/${id}.png
done

# Post with scheduling
node scripts/social/post-tweet-with-image.js "Post 1" ./temp/DAG001.png
node scripts/social/post-tweet-with-image.js "Post 2" ./temp/DAG002.png
node scripts/social/post-tweet-with-image.js "Post 3" ./temp/DAG003.png
```

### Canva Configuration

**Environment Variables:**
```bash
# Canva API
CANVA_CLIENT_ID=OC-AZndiQDmxUJT
CANVA_CLIENT_SECRET=your-secret-here
CANVA_REDIRECT_URI=http://127.0.0.1:3001/oauth/redirect
```

**MCP Configuration:** `.claude/mcp-config.json`
```json
{
  "mcpServers": {
    "canva": {
      "command": "npx",
      "args": ["-y", "@canva/cli@latest", "mcp"]
    }
  }
}
```

**Canva MCP Server:**
- Provides Canva documentation and development assistance
- No authentication required (documentation access only)
- Use for API guidance and troubleshooting

### Account Tier Comparison

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| UI Design | ✅ | ✅ | ✅ |
| API Export | ✅ | ✅ | ✅ |
| Create via API | ✅ | ✅ | ✅ |
| Autofill API | ❌ | ❌ | ✅ |
| Brand Templates API | ❌ | ❌ | ✅ |

**This project works with:** All tiers (tested with Canva Pro)

### Troubleshooting

**"Token expired"**
```bash
node scripts/canva/canva-oauth.js
```

**"Design not found"**
- Verify Design ID is correct (case-sensitive)
- Ensure design is in your Canva account
- Check you're logged in to correct account

**"Export timeout"**
- Normal for large designs (wait up to 60 seconds)
- Check Canva API status: https://status.canva.com
- Retry if it fails

**"Missing Canva credentials"**
- Check `.env` file has `CANVA_CLIENT_ID` and `CANVA_CLIENT_SECRET`
- Verify no typos in variable names
- Restart terminal to reload environment

### Documentation

**Complete guide:** See `docs/CANVA_INTEGRATION_GUIDE.md` for:
- Detailed setup instructions
- OAuth authentication guide
- Design best practices
- Image size recommendations
- Troubleshooting & FAQ
- API limitations by account tier

**Quick reference:** See `docs/CANVA_QUICK_REFERENCE.md` for:
- One-page command cheat sheet
- Common workflows
- Quick troubleshooting

### Useful Links

- **Canva Developer Portal:** https://www.canva.com/developers/
- **API Documentation:** https://www.canva.dev/docs/connect/
- **API Status:** https://status.canva.com
- **Integration Guide:** `docs/CANVA_INTEGRATION_GUIDE.md`
- **Quick Reference:** `docs/CANVA_QUICK_REFERENCE.md`