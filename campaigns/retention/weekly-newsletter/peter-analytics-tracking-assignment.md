# Analytics & Performance Tracking Assignment - Peter (performance-analyst)

## Assignment Owner
Peter (performance-analyst)

## Assignment from
Maggie (aiCMO)

## Objective
Define comprehensive tracking setup, A/B testing framework, and weekly performance dashboard template for aiCMO weekly newsletter. Ensure every metric ties to business objectives and creates a tight feedback loop for continuous optimization.

## Dependencies
- Chris's editorial brief: `/Users/Jason-uk/AI/AI_Coding/Repositories/TorlyAI_v2/campaigns/weekly-newsletter/chris-editorial-brief.md`
- Emily's newsletter copy: `/Users/Jason-uk/AI/AI_Coding/Repositories/TorlyAI_v2/campaigns/weekly-newsletter/2025-01-13-issue-01.md`
- Sophie's social strategy: `/Users/Jason-uk/AI/AI_Coding/Repositories/TorlyAI_v2/campaigns/weekly-newsletter/sophie-social-strategy.md`

## Assignment Context

This newsletter is a critical growth lever for aiCMO. We need to track everything that matters, test everything that's testable, and create dashboards that enable rapid decision-making. No vanity metrics - every KPI must connect to business outcomes.

### Primary Business Objectives
1. Drive 10+ qualified leads per week to aiCMO platform
2. Establish thought leadership (measured via engagement, shares, citations)
3. Build engaged community (measured via reply rate, forward rate, social engagement)
4. Achieve sustainable growth (measured via subscriber growth rate, retention)

### Target KPIs (Ambitious but Achievable)
- **Open rate**: 40%+ (industry: 21%)
- **Click-through rate**: 8%+ (industry: 2.6%)
- **Forward/share rate**: 5%+
- **Conversion to signup**: 10+ qualified leads/week
- **Unsubscribe rate**: <0.5%
- **Social amplification**: 50+ engagements per issue

## Deliverable Requirements

Create: `/Users/Jason-uk/AI/AI_Coding/Repositories/TorlyAI_v2/campaigns/weekly-newsletter/peter-analytics-framework.md`

### Part 1: Tracking Infrastructure Setup

#### UTM Parameter Strategy
Define complete UTM taxonomy:

**Email Newsletter Tracking**
```
utm_source=newsletter
utm_medium=email
utm_campaign=weekly_issue_[NUMBER]
utm_content=[SECTION]_[LINK_TYPE]
utm_term=[TOPIC]
```

Example:
- Primary CTA: `utm_content=feature_cta_primary&utm_term=geo_optimization`
- Resource link: `utm_content=resources_whitepaper&utm_term=geo_playbook`
- Social link: `utm_content=footer_linkedin&utm_term=community`

Provide:
- Complete UTM structure for all newsletter links
- Naming conventions for consistency
- Tracking spreadsheet template for link generation

**Social Media Tracking**
Define UTM structure for:
- LinkedIn posts: `utm_source=linkedin&utm_medium=social&utm_campaign=newsletter_promo_issue_[NUMBER]`
- Twitter/X posts: `utm_source=twitter&utm_medium=social&utm_campaign=newsletter_promo_issue_[NUMBER]`
- Reddit posts: `utm_source=reddit&utm_medium=social&utm_campaign=newsletter_promo_issue_[NUMBER]`

#### Conversion Pixel & Event Tracking
Define tracking events:

**Email Events**
- Email sent
- Email delivered
- Email opened
- Email clicked (by link)
- Email forwarded
- Email unsubscribed
- Email replied
- Spam report

**Website Events (Post-Click)**
- Landing page view (from newsletter)
- Time on page
- Scroll depth (25%, 50%, 75%, 100%)
- CTA button click (signup form)
- Form start
- Form completion
- Signup success
- Account activation

**Conversion Events**
- Trial signup
- Demo request
- Product tour start
- First login
- First content generated (activation metric)
- Upgrade to paid (if applicable)

#### Technical Implementation Checklist
- [ ] Email service provider tracking setup (e.g., Mailchimp, ConvertKit, HubSpot)
- [ ] Google Analytics 4 event configuration
- [ ] Conversion pixel placement on landing pages
- [ ] Form tracking setup
- [ ] Social media pixels (LinkedIn Insight Tag, Twitter Pixel)
- [ ] Webhook configuration for real-time alerts
- [ ] Data warehouse integration (if applicable)

### Part 2: A/B Testing Framework

#### Test Prioritization Matrix
Define testing roadmap for:

**Issue #1 Tests (Launch)**
- **Test 1**: Subject line variations (3-5 variants)
  - Test goal: Maximize open rate to 40%+
  - Sample size: Minimum 1,000 per variant
  - Statistical significance: 95% confidence
  - Decision criteria: Winner deployed to remaining list
  - Runtime: 2 hours, then auto-select winner

- **Test 2**: Primary CTA button copy (2-3 variants)
  - Test goal: Maximize click-to-conversion rate
  - Variants: "Start Free Trial" vs. "See How GEO Works" vs. "Get AI-Ready Now"
  - Sample size: 500 per variant
  - Runtime: Full send, analyze post-campaign

**Issues #2-4 Tests (Optimization Phase)**
- Preview text variations
- Content length (short vs. long feature section)
- Personalization (with/without first name in subject line)
- Send time optimization (morning vs. afternoon vs. evening)
- Image vs. text-heavy layouts

**Issues #5-8 Tests (Refinement Phase)**
- Audience segmentation messaging
- Story-driven vs. data-driven content
- Single CTA vs. multiple CTAs
- Educational vs. case study focused

#### Testing Methodology
For each test, define:
- **Hypothesis**: What we believe and why
- **Variables**: What we're changing
- **Control group**: Baseline version
- **Success metric**: Primary KPI to optimize
- **Sample size calculation**: Based on baseline + expected lift
- **Runtime**: How long to run before declaring winner
- **Decision framework**: When to scale winner, iterate, or abandon

#### A/B Testing Dashboard
Create template for tracking:
- Active tests
- Test status (running/completed/analyzing)
- Sample sizes
- Statistical significance
- Winner/loser declaration
- Learnings captured
- Next test queue

### Part 3: Weekly Performance Dashboard Template

Design comprehensive dashboard: `/Users/Jason-uk/AI/AI_Coding/Repositories/TorlyAI_v2/campaigns/weekly-newsletter/performance-tracking.md`

#### Dashboard Structure

**Section 1: Executive Summary (Top KPIs)**
```
📊 Week of [DATE] | Issue #[NUMBER]

🎯 Key Results:
- Newsletter subscribers: [NUMBER] (+/- X% WoW)
- Open rate: X% (target: 40%+) ⬆️ / ⬇️ / ➡️
- Click-through rate: X% (target: 8%+) ⬆️ / ⬇️ / ➡️
- Qualified leads generated: X (target: 10+) ⬆️ / ⬇️ / ➡️
- Unsubscribe rate: X% (target: <0.5%) ⬆️ / ⬇️ / ➡️

🔥 Top Insight: [One-liner about biggest win or learning]
⚠️ Top Concern: [One-liner about biggest risk or drop]
```

**Section 2: Detailed Email Metrics**
```
Delivery & Engagement:
- Total sent: [NUMBER]
- Delivered: [NUMBER] ([X]% delivery rate)
- Bounced: [NUMBER] (hard: X, soft: X)
- Opens: [NUMBER] ([X]% open rate)
  - Unique opens: [NUMBER]
  - Open rate by segment:
    * Founders: X%
    * Agencies: X%
    * Incubators: X%
- Clicks: [NUMBER] ([X]% click rate)
  - Unique clicks: [NUMBER]
  - Click-to-open rate: X%
- Forwards: [NUMBER] ([X]% forward rate)
- Unsubscribes: [NUMBER] ([X]% unsub rate)
- Spam reports: [NUMBER]

Top Performing Links:
1. [Link description]: [X] clicks (X% of total)
2. [Link description]: [X] clicks (X% of total)
3. [Link description]: [X] clicks (X% of total)
```

**Section 3: Conversion Funnel**
```
Newsletter → Landing Page → Signup:
- Newsletter clicks: [NUMBER]
- Landing page views: [NUMBER]
- Click-to-view rate: X%
- Signup form starts: [NUMBER]
- Form start rate: X%
- Signups completed: [NUMBER]
- Completion rate: X%
- Overall conversion rate: X% (newsletter click → signup)

Lead Quality:
- Qualified leads: [NUMBER] (X% of signups)
- Qualification criteria: [e.g., founder title, company size, budget indicators]
- Average time to signup: X minutes
- Activation rate: X% (completed first action in platform)
```

**Section 4: Audience Insights**
```
Subscriber Growth:
- New subscribers: [NUMBER] (+X% WoW)
- Unsubscribes: [NUMBER]
- Net growth: [NUMBER] (+/- X%)
- Growth rate: X%
- Total active subscribers: [NUMBER]

Subscriber Sources (This Week):
- Website signup: [NUMBER]
- Social media: [NUMBER] (LinkedIn: X, Twitter: X, Reddit: X)
- Referrals: [NUMBER]
- Partnerships: [NUMBER]
- Other: [NUMBER]

Engagement Segments:
- Highly engaged (opened 3+ of last 4): [NUMBER] (X%)
- Moderately engaged (opened 1-2 of last 4): [NUMBER] (X%)
- Low engagement (opened 0 of last 4): [NUMBER] (X%)
- At-risk (no open in 8+ weeks): [NUMBER] (X%)
```

**Section 5: Social Amplification**
```
Social Performance:
- Total social engagements: [NUMBER] (target: 50+)
- LinkedIn: [X] engagements (likes: X, comments: X, shares: X)
- Twitter/X: [X] engagements (likes: X, retweets: X, replies: X)
- Reddit: [X] upvotes, [X] comments
- Social → newsletter signups: [NUMBER]

Top Performing Social Posts:
1. [Platform] | [Post summary]: [X] engagements, [X] clicks
2. [Platform] | [Post summary]: [X] engagements, [X] clicks
3. [Platform] | [Post summary]: [X] engagements, [X] clicks
```

**Section 6: A/B Test Results**
```
Active Tests:
- Test 1: [Description] | Status: [Running/Completed]
  - Variant A: [Metric] = X%
  - Variant B: [Metric] = X%
  - Winner: [A/B/TBD] | Lift: +X%
  - Insight: [Learning captured]

- Test 2: [Description] | Status: [Running/Completed]
  [Similar structure]

Learnings This Week:
1. [Key insight from tests or data]
2. [Key insight from tests or data]
3. [Key insight from tests or data]
```

**Section 7: Next Actions & Optimizations**
```
🎯 Next Week Priorities:
1. [Action item based on data] - Owner: [Name]
2. [Action item based on data] - Owner: [Name]
3. [Action item based on data] - Owner: [Name]

🧪 Tests to Launch:
1. [Test description] - Expected lift: X%
2. [Test description] - Expected lift: X%

⚠️ Issues to Address:
1. [Problem identified] - Mitigation: [Plan]
2. [Problem identified] - Mitigation: [Plan]
```

### Part 4: Benchmarking & Goals

#### Industry Benchmarks (Marketing Newsletters)
Document baseline for comparison:
- Open rate: 21% (industry avg)
- CTR: 2.6% (industry avg)
- Unsub rate: 0.5% (industry avg)
- Forward rate: 1-2% (industry avg)

#### aiCMO Targets (Ambitious)
Define 4-week trajectory:
- **Week 1 (Issue #1)**: Open 35%, CTR 5%, 5 qualified leads (learning phase)
- **Week 2 (Issue #2)**: Open 38%, CTR 6%, 8 qualified leads (optimization)
- **Week 3 (Issue #3)**: Open 40%, CTR 7%, 10 qualified leads (hitting targets)
- **Week 4 (Issue #4)**: Open 42%, CTR 8%, 12 qualified leads (exceeding targets)

#### Success Milestones
Define celebration points:
- 🎉 1,000 subscribers
- 🎉 40% open rate achieved
- 🎉 8% CTR achieved
- 🎉 10+ leads in single issue
- 🎉 50+ social engagements per issue
- 🎉 5% forward rate achieved

### Part 5: Data Collection & Reporting

#### Weekly Reporting Cadence
- **Monday 9am**: Send newsletter issue
- **Monday 5pm**: Initial performance snapshot (6-hour results)
- **Tuesday 9am**: 24-hour results + initial insights
- **Wednesday 9am**: 48-hour results + complete funnel data
- **Friday 9am**: Full week analysis + next week planning

#### Monthly Reporting
- Month-over-month trend analysis
- Cohort analysis (subscriber retention by signup month)
- Content performance patterns (what topics drive best engagement?)
- Channel effectiveness (email vs. social for acquisition)
- Quarterly goal progress

#### Data Quality Checks
- [ ] UTM parameters on all links
- [ ] Tracking pixels firing correctly
- [ ] Event data flowing to analytics platform
- [ ] No duplicate counting
- [ ] Privacy compliance (GDPR, CAN-SPAM)
- [ ] Unsubscribe mechanism working

### Part 6: Optimization Playbook

Create decision tree for common scenarios:

**Scenario 1: Open Rate Below Target (<40%)**
- Check: Subject line quality, send time, sender name, deliverability
- Action: Test new subject line formulas, audit spam filters, clean list
- Timeline: Test within 1 week

**Scenario 2: CTR Below Target (<8%)**
- Check: CTA clarity, content relevance, link placement, value proposition
- Action: Simplify CTAs, increase content-CTA alignment, test button copy
- Timeline: Test within 1 week

**Scenario 3: High Unsubscribe Rate (>0.5%)**
- Check: Content-expectation mismatch, frequency fatigue, value delivery
- Action: Survey unsubscribers, review signup flow, adjust tone/content
- Timeline: Investigate immediately

**Scenario 4: Low Conversion Rate (<2% click-to-signup)**
- Check: Landing page experience, form friction, value clarity
- Action: Optimize landing page, reduce form fields, strengthen value prop
- Timeline: Test within 1 week

## Success Metrics for This Assignment
- Complete tracking infrastructure documented
- All UTM parameters defined for issue #1
- A/B testing framework with 4-week roadmap
- Performance dashboard template (ready to populate)
- Clear optimization playbook for common issues
- Shippable quality (Peter can execute tracking setup immediately)

## Timeline
- Complete by: 48 hours from assignment (can work in parallel with other team members)
- Handoff to: Maggie for integration into overall strategy document
- Implementation: Before issue #1 sends

## Tools Available
- Read, Write, Edit, Glob, Grep, Bash, WebFetch
- Brand knowledge base access
- All team deliverables for context

## Questions/Clarifications
Coordinate with Emily on link structure questions. Flag technical tracking questions to Maggie or user.

---
**Assignment Status**: Assigned (can work in parallel)
**Date**: 2025-10-11
**Due**: 2025-10-13
