# Newsletter Execution Guide

Complete step-by-step guide for executing aiCMO's weekly newsletter using Mailchimp MCP automation.

---

## 📋 Table of Contents

1. [Setup (One-Time)](#setup-one-time)
2. [Weekly Workflow](#weekly-workflow)
3. [Publishing Process](#publishing-process)
4. [Monitoring & Optimization](#monitoring--optimization)
5. [Troubleshooting](#troubleshooting)

---

## Setup (One-Time)

### Step 1: Install Dependencies

```bash
# Navigate to project root
cd /Users/Jason-uk/AI/AI_Coding/Repositories/TorlyAI_v2

# Install Node.js dependencies
npm install

# Install Mailchimp MCP server
npm install -g @bryangsmith/mailchimp-mcp-server
```

### Step 2: Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your credentials:
nano .env
```

Required variables:
```env
MAILCHIMP_API_KEY=your-mailchimp-api-key
MAILCHIMP_SERVER_PREFIX=us12  # Your server prefix
NEWSLETTER_FROM_EMAIL=newsletter@ai.cmo.so
NEWSLETTER_FROM_NAME=Maggie (aiCMO)
NEWSLETTER_REPLY_TO=hello@ai.cmo.so
```

### Step 3: Verify Setup

```bash
# Test Mailchimp API connection
npm run test:mcp

# Expected output:
# ✅ All environment variables present
# ✅ API key format valid
# ✅ Mailchimp SDK available
# ✅ Mailchimp API connection successful
# ✅ ALL CHECKS PASSED
```

### Step 4: Platform Configuration

Follow the comprehensive checklist:
```bash
# Open the platform setup checklist
open campaigns/weekly-newsletter/PLATFORM_SETUP_CHECKLIST.md
```

**Critical Setup Items:**
- [ ] Mailchimp domain authentication (SPF, DKIM, DMARC)
- [ ] Audience lists & segments created
- [ ] Email templates designed
- [ ] Landing pages live with forms
- [ ] GA4 tracking configured
- [ ] Automation workflows activated

---

## Weekly Workflow

### Monday: Research & Discovery (Mark)

**Objective**: Identify trending AI marketing topics and content opportunities

```bash
# Mark's workflow:
# 1. Research trending topics (LinkedIn, Reddit, Twitter, AI platform updates)
# 2. Analyze challenger brand pain points
# 3. Identify 3-5 content opportunities
# 4. Create research brief

# Output: mark-research-brief-YYYY-MM-DD.md
```

**Deliverable**: Research brief with:
- 3-5 content opportunities ranked by relevance
- Audience pain point analysis
- Trend momentum indicators
- Supporting data and sources

**Due**: Monday 5pm → Deliver to Chris

### Tuesday: Editorial Strategy (Chris + Maggie)

**Objective**: Develop editorial brief and get approval

```bash
# Chris's workflow:
# 1. Review Mark's research
# 2. Select primary topic for newsletter
# 3. Create editorial structure
# 4. Define SEO/GEO keywords
# 5. Get Maggie's approval

# Output: editorial-brief-issue-XX.md
```

**Deliverable**: Editorial brief with:
- Selected topic and rationale
- Content structure (hook, feature, quick wins, etc.)
- Word count targets per section
- SEO/GEO keywords
- Key messages and talking points

**Due**: Tuesday 5pm → Maggie approves → Deliver to Emily

### Wednesday: Content Creation (Emily)

**Objective**: Write complete newsletter copy

```bash
# Emily's workflow:
# 1. Review Chris's editorial brief
# 2. Write newsletter copy following structure
# 3. Create 5-7 subject line variants
# 4. Develop 3-5 preview text options
# 5. Write segment-specific variations (if needed)

# Output: 2025-MM-DD-issue-XX.md (newsletter markdown)
```

**Newsletter File Format**:
```markdown
---
title: "aiCMO Newsletter #XX: [Topic]"
issue: XX
date: 2025-MM-DD
subject_lines:
  - "Subject line option 1"
  - "Subject line option 2"
  - "Subject line option 3"
  - "Subject line option 4"
  - "Subject line option 5"
preview_text: "Preview text for inbox"
segments:
  - founders
  - agencies
  - incubators
---

# Opening Hook (75-100 words)
[Content here...]

# Feature Section (300-400 words)
[Content here...]

# Quick Wins
[Content here...]

# Community Spotlight
[Content here...]

# Resources
[Content here...]

# Primary CTA
[Content here...]

# Closing
[Content here...]
```

**Due**: Wednesday 5pm → Deliver to Sophie + Peter

### Thursday: Review & Setup (Sophie + Peter - Parallel)

**Sophie's Workflow** (Voice & Social):
```bash
# 1. Review newsletter for voice/authenticity (score 1-10)
# 2. Create social promotion content:
#    - LinkedIn posts (3-4 variants)
#    - Twitter/X thread
#    - Reddit community posts
# 3. Develop 2-week social calendar
# 4. Prepare engagement plan

# Output: social-promotion-issue-XX.md
```

**Peter's Workflow** (Analytics & Tracking):
```bash
# 1. Design UTM parameter structure
# 2. Configure tracking pixels & events
# 3. Create A/B test framework
# 4. Set up performance dashboard
# 5. Document tracking setup

# Output: tracking-setup-issue-XX.md
```

**Due**: Thursday 5pm → Both deliver to Maggie

### Friday: Final Review & Scheduling (Maggie)

**Objective**: Quality gate review and campaign scheduling

```bash
# Maggie's workflow:
# 1. Review all team deliverables
# 2. Conduct final quality check:
#    - Brand voice alignment
#    - Strategic fit
#    - 80/20 value ratio
#    - Technical accuracy
# 3. Approve for production or request revisions
# 4. Run orchestration script to publish

# If approved, run:
node scripts/newsletter/orchestrate.js publish \
  --issue campaigns/weekly-newsletter/2025-01-13-issue-01.md \
  --send-time "2025-01-13T09:00:00Z" \
  --segments "founders,agencies,incubators"
```

**Quality Checklist**:
- [ ] Brand voice consistent (matches Maggie persona)
- [ ] Strategic alignment (supports business objectives)
- [ ] Value ratio (80% educational, 20% promotional)
- [ ] Technical accuracy (no broken links, UTMs correct)
- [ ] Mobile optimized (tested in preview)
- [ ] All team deliverables complete

**Due**: Friday 3pm → Scheduled for Monday 9am send

---

## Publishing Process

### Pre-Publish Checklist

```bash
# 1. Run final tests
npm run test:newsletter

# 2. Create draft campaign (review before sending)
node scripts/newsletter/orchestrate.js test \
  --issue campaigns/weekly-newsletter/2025-01-13-issue-01.md

# 3. Send test email to team
node scripts/newsletter/orchestrate.js send-test \
  --campaign-id [campaign-id-from-step-2] \
  --email team@ai.cmo.so

# 4. Review in multiple email clients
# - Gmail (desktop + mobile)
# - Outlook
# - Apple Mail
# - Yahoo Mail

# 5. Verify all links work
# - Click every link in test email
# - Confirm UTM tracking present
# - Check landing pages load correctly
```

### Publish Command

```bash
# Schedule for Monday 9am send
node scripts/newsletter/orchestrate.js publish \
  --issue campaigns/weekly-newsletter/2025-01-13-issue-01.md \
  --send-time "2025-01-13T09:00:00Z" \
  --segments "founders,agencies,incubators"

# Expected output:
# 📧 Creating Mailchimp campaign via MCP...
# ✅ Campaign created: campaign_1234567890
# 📝 Setting campaign content...
# ✅ Campaign content uploaded
# 🧪 Creating A/B test with 5 variants...
# ✅ A/B test configured
# ⏰ Scheduling campaign for 2025-01-13T09:00:00Z...
# ✅ Campaign scheduled for 2025-01-13T09:00:00Z
#
# 🎉 Publishing complete!
# {
#   "success": true,
#   "campaignId": "campaign_1234567890",
#   "issueNumber": "01",
#   "scheduled": true
# }
```

### Post-Publish Actions

```bash
# 1. Confirm send in Mailchimp dashboard
# - Navigate to Mailchimp
# - Verify campaign is scheduled
# - Double-check send time and audience

# 2. Prepare social promotion
# - Sophie schedules LinkedIn posts
# - Queue Twitter/X thread
# - Prepare Reddit community posts

# 3. Set up monitoring
# - Open performance dashboard
# - Enable real-time alerts
# - Team on standby for first hour
```

---

## Monitoring & Optimization

### Launch Day (Monday)

**9:00am - Send Time**
```bash
# Monitor send initiation
# - Check Mailchimp for send confirmation
# - Verify no immediate errors
```

**9:30am - 30 Minutes Post-Send**
```bash
# First checkpoint
npm run fetch:metrics -- --campaign-id [campaign-id]

# Check:
# - Delivery rate (target: 98%+)
# - Initial opens (target: 5-10% in first 30 min)
# - Bounce rate (acceptable: <2%)
```

**10:00am - 1 Hour Post-Send**
```bash
# Second checkpoint
npm run fetch:metrics -- --campaign-id [campaign-id] --save

# Check:
# - Open rate (target: 15%+ in first hour)
# - Click rate (should start appearing)
# - Social engagement (LinkedIn, Twitter shares)
# - Platform signups (any early conversions?)
```

**5:00pm - 8 Hours Post-Send**
```bash
# Third checkpoint (end of business day)
npm run fetch:metrics -- --campaign-id [campaign-id] --save

# Check:
# - Open rate (target: 25-30% by EOD)
# - CTR (target: 3-5% by EOD)
# - Leads generated (target: 2-3 by EOD)
# - Unsubscribe rate (flag if >0.5%)
```

### Day 2 (Tuesday)

**9:00am - 24-Hour Analysis**
```bash
# Generate full report
npm run fetch:metrics -- --campaign-id [campaign-id] --save

# Generate dashboard
npm run dashboard -- --format html

# Team review:
# - Open report in browser
# - Analyze conversion funnel
# - Identify underperforming areas
# - Plan optimizations for next issue
```

**Key Metrics to Review**:
- Open rate: Target 40%+ (baseline 35% week 1)
- CTR: Target 8%+ (baseline 5% week 1)
- Qualified leads: Target 10+ (baseline 5-7 week 1)
- Unsub rate: Must be <0.5%
- Forward/share rate: Target 5%+

### Week-Over-Week Optimization

```bash
# Weekly retrospective (Friday 2pm)
# 1. Review performance dashboard
npm run dashboard -- --format html

# 2. Compare to previous weeks
npm run fetch:metrics -- --all --since "2025-01-01"

# 3. Document learnings
# - What worked well?
# - What underperformed?
# - What to test next week?

# 4. Plan optimizations
# - Subject line formulas to test
# - Content adjustments
# - CTA variations
# - Send time experiments
```

### Alert Triggers

Automatic alerts fire when:
- Open rate <30% (2 consecutive weeks)
- CTR <5% (2 consecutive weeks)
- Leads <7/week (2 consecutive weeks)
- Unsub rate >1% (1 week)
- Bounce rate >2% (1 week)

**Alert Actions**:
1. Emergency team meeting
2. Root cause analysis
3. Immediate corrective action
4. Follow-up monitoring

---

## Troubleshooting

### Issue: "API Connection Failed"

**Symptoms**: Cannot create campaigns, API errors

**Solutions**:
```bash
# 1. Verify environment variables
cat .env | grep MAILCHIMP

# 2. Test API key
npm run test:mcp

# 3. Regenerate API key if needed
# - Go to Mailchimp → Account → Extras → API keys
# - Create new key
# - Update .env

# 4. Verify server prefix matches API key
# - Check the suffix of your API key (e.g., -us2)
# - Update MAILCHIMP_SERVER_PREFIX in .env
```

### Issue: "Low Open Rate (<30%)"

**Root Causes**:
- Poor subject lines
- Wrong send time
- Deliverability issues
- List fatigue

**Solutions**:
```bash
# 1. A/B test more subject line variants (increase from 5 to 7)
# 2. Test different send times
# - Morning (9am)
# - Afternoon (2pm)
# - Evening (6pm)

# 3. Check deliverability
# - Verify SPF, DKIM, DMARC
# - Run spam score test
# - Clean inactive subscribers

# 4. Survey subscribers
# - "What content do you want to see?"
# - "When do you prefer to receive emails?"
```

### Issue: "Low CTR (<5%)"

**Root Causes**:
- Weak CTAs
- Content-CTA disconnect
- Poor link placement
- Value proposition unclear

**Solutions**:
```bash
# 1. Strengthen CTAs
# - Test benefit-driven copy
# - Add urgency (without manipulation)
# - Make buttons more prominent

# 2. Improve content-CTA alignment
# - Ensure hook → feature → CTA flow
# - Add micro-CTAs throughout
# - Test CTA placement (top, middle, end)

# 3. Simplify landing page
# - Reduce form fields
# - Add social proof
# - Clarify value proposition
```

### Issue: "Insufficient Leads (<7/week)"

**Root Causes**:
- Newsletter-landing page disconnect
- High landing page friction
- Poor qualification

**Solutions**:
```bash
# 1. Message match
# - Ensure newsletter CTA matches landing page headline
# - Maintain visual consistency

# 2. Reduce friction
# - Simplify form (email + name only)
# - Remove unnecessary fields
# - Add trust signals (testimonials, case studies)

# 3. Segment-specific landing pages
# - Create /newsletter/founders
# - Create /newsletter/agencies
# - Create /newsletter/incubators
# - Tailor messaging to each segment
```

### Issue: "High Unsubscribe Rate (>0.5%)"

**Root Causes**:
- Content-expectation mismatch
- Too promotional
- Frequency fatigue
- Quality issues

**Solutions**:
```bash
# 1. Survey unsubscribers (exit interview)
# - "Why are you unsubscribing?"
# - "What could we improve?"

# 2. Check 80/20 balance
# - Review last 3 issues
# - Ensure 80% educational, 20% promotional

# 3. Offer frequency options
# - Weekly (default)
# - Bi-weekly digest
# - Monthly summary

# 4. Review signup expectations
# - Update signup form copy
# - Clarify what subscribers will receive
```

---

## Quick Reference Commands

```bash
# Setup & Testing
npm install                          # Install dependencies
npm run test:mcp                     # Test MCP connection
npm run test:newsletter              # Run full test suite

# Publishing
npm run publish:newsletter           # Publish with prompts
node scripts/newsletter/orchestrate.js publish --issue [path] --send-time [ISO8601]

# Monitoring
npm run fetch:metrics -- --campaign-id [id]   # Get campaign report
npm run dashboard -- --format html             # Generate HTML dashboard
npm run fetch:metrics -- --all --since [date]  # Historical data

# Testing
node scripts/newsletter/orchestrate.js test --issue [path]                    # Create draft
node scripts/newsletter/orchestrate.js send-test --campaign-id [id] --email [address]  # Test send
```

---

## Success Checklist

### Week 1 (Foundation)
- [ ] Issue #1 sent successfully
- [ ] 35%+ open rate achieved
- [ ] 5%+ CTR achieved
- [ ] 5-10 leads generated
- [ ] Workflow executed smoothly
- [ ] Learnings documented

### Week 4 (Target Achievement)
- [ ] 40%+ open rate achieved
- [ ] 8%+ CTR achieved
- [ ] 10+ leads/week consistently
- [ ] <0.5% unsub rate
- [ ] 2-week content buffer built
- [ ] Team workflow optimized

### Week 12 (Scale)
- [ ] 3,000+ subscribers
- [ ] 15+ leads/week
- [ ] Referral program launched
- [ ] Partnership programs live
- [ ] Newsletter ROI positive
- [ ] Category leadership established

---

**Document Owner**: Peter (performance-analyst) + Maggie (aiCMO)
**Review Cadence**: Updated weekly based on learnings
**Last Updated**: 2025-10-12
