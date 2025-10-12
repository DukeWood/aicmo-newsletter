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
├── .env                     # Environment variables (Mailchimp, Cloudinary, etc.)
├── mcp-config.json         # MCP server configuration (Mailchimp, Cloudinary)
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

**Configuration:** `mcp-config.json`
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
- **`post-to-twitter.js`** - Post tweets and threads to Twitter/X
- **`cross-post-newsletter.js`** - Cross-post newsletter content to multiple platforms

### Social Media Workflow

#### 1. Platform Setup

**Twitter/X (Active):**
- Uses `@mbelinky/x-mcp-server` MCP server
- OAuth 1.0a authentication
- Supports tweets, threads, and media

**LinkedIn (Pending):**
- Requires LinkedIn Community Management API approval
- Generates LinkedIn-formatted posts
- Manual posting currently required

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

**MCP Configuration:** (`mcp-config.json`)
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

#### 3. Cross-Posting Newsletters

**Preview Posts (Dry Run):**
```bash
node scripts/social/cross-post-newsletter.js --dry-run
```

**Post to Twitter:**
```bash
node scripts/social/cross-post-newsletter.js --twitter
```

**Post to All Platforms:**
```bash
node scripts/social/cross-post-newsletter.js campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md
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

#### 4. Custom Posting

**Post Single Tweet:**
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
- Twitter/X ✅ (automated via MCP)
- LinkedIn ⏳ (pending API approval)
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
- Status: Requires API approval (can take 1-2 weeks)
- Current: Generates posts for manual copying
- Future: Full automation once API approved

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