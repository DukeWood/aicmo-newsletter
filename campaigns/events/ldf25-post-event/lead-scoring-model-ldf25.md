# LDF25 LEAD SCORING & SEGMENTATION MODEL

**Campaign:** Leeds Digital Festival 2025 - Post-Event Conversion
**Campaign Code:** LDF25-NURTURE
**Owner:** Mark (Market Researcher)
**Last Updated:** October 7, 2025
**Status:** ACTIVE

---

## OVERVIEW

This lead scoring model prioritizes LDF25 attendees and registrants based on engagement signals, demographic fit, and conversion readiness. Leads are segmented into **Hot (70-100 pts)**, **Warm (40-69 pts)**, and **Cold (0-39 pts)** for targeted nurture campaigns.

**Scoring Philosophy:**
- Behavioral signals (attended, engaged) weighted higher than demographic fit
- Recency matters: recent actions score higher than historical data
- Multiple touchpoints compound (WhatsApp + whitepaper > whitepaper alone)
- Negative signals (unsubscribe, spam report) disqualify leads entirely

---

## LEAD SCORING CRITERIA

### Behavioral Signals (Max: 100 points)

| Signal | Points | Reasoning | Data Source |
|--------|--------|-----------|-------------|
| **Attended event in-person** | 40 | Highest intent signal - physically showed up | Event check-in sheet |
| **Joined WhatsApp group** | 20 | Community-minded, wants ongoing relationship | WhatsApp group member list |
| **Downloaded GEO whitepaper** | 15 | Education-focused, serious about GEO | Lark download logs |
| **Claimed brand page** | 15 | Activated product, exploring features | aiCMO dashboard logs |
| **Opened thank-you email** | 10 | Basic engagement | Email platform analytics |
| **Clicked CTA in email** | 10 | High intent (clicked upgrade link) | Email platform click tracking |
| **Visited pricing page** | 8 | Researching plans | Website analytics (GA4) |
| **Watched demo video** | 5 | Engaged with product education | Video analytics (Vimeo/YouTube) |
| **Registered but no-show** | 20 | Moderate interest, life got in the way | Event registration vs check-in |
| **Shared event on social** | 5 | Amplifier, may influence others | Social listening tools |

### Firmographic/Demographic Fit (Max: 30 points)

| Criteria | Points | Reasoning | Data Source |
|----------|--------|-----------|-------------|
| **Solo entrepreneur** | 10 | Perfect ICP (ideal customer profile) | LinkedIn profile/registration form |
| **Startup founder** | 10 | High-value target, budget for tools | LinkedIn profile/registration form |
| **Marketing/growth role** | 8 | Decision-maker or influencer | LinkedIn profile/registration form |
| **Tech/digital industry** | 5 | More AI-savvy, faster adoption | Company website/LinkedIn |
| **Leeds/Yorkshire-based** | 5 | Local community, easier to nurture | Registration form address |
| **Previously engaged with aiCMO content** | 5 | Familiar with brand, warmer lead | CRM history |

### Negative Signals (Disqualifiers)

| Signal | Impact | Action |
|--------|--------|--------|
| **Unsubscribed from emails** | -100 | Remove from nurture sequence entirely |
| **Marked email as spam** | -100 | Permanent blacklist |
| **Competitor employee** | -50 | Flag for manual review (may be researching competition) |
| **Student (non-paying)** | -20 | Deprioritize (unlikely to convert short-term) |
| **Bounced email** | -100 | Remove from list (invalid contact) |

---

## SEGMENTATION TIERS

### HOT LEADS (70-100 points)
**Definition:** Attended in-person + high engagement signals (WhatsApp, whitepaper, brand page claim, email opens)

**Characteristics:**
- Physically attended event
- Joined WhatsApp group OR downloaded whitepaper
- Opened thank-you email
- Solo entrepreneur or startup founder

**Estimated Volume:** 40 leads (40% of attendees)

**Nurture Strategy:**
- Full 7-email sequence (Emails 1-7)
- Email 1 sent from Jason's personal email (founder touch)
- Personalized opening line referencing specific event moment
- LDF25-EARLY discount (40% off, 48-hour window)
- Priority for Jason's personal outreach if they don't convert within 7 days
- Maggie's Inner Circle access included

**Example Hot Lead Profile:**
- Name: Sarah Chen
- Role: Founder, sustainable fashion consultancy
- Location: Manchester, UK
- Actions: Attended event (40 pts) + Joined WhatsApp (20 pts) + Downloaded whitepaper (15 pts) + Opened email (10 pts) = **85 points**

---

### WARM LEADS (40-69 points)
**Definition:** Attended OR (registered + engaged with post-event communications)

**Characteristics:**
- Either attended but didn't join WhatsApp/download whitepaper
- OR registered but no-show, then engaged with thank-you email
- Marketing/growth role or tech industry
- Opened emails but didn't click CTAs yet

**Estimated Volume:** 35 leads (35% of attendees/registrants)

**Nurture Strategy:**
- Full 7-email sequence (Emails 1-7)
- Standard sender (Maggie or Jason, based on A/B test results)
- LDF25-STANDARD discount (30% off, 14-day window)
- WhatsApp community invitation emphasized (bring them into Hot segment)
- Maggie's Inner Circle access included

**Example Warm Lead Profile:**
- Name: Tom Mitchell
- Role: Marketing Manager, SaaS startup
- Location: London, UK
- Actions: Attended event (40 pts) + Opened email (10 pts) = **50 points**

---

### COLD LEADS (0-39 points)
**Definition:** Registered but no-show + minimal/no engagement

**Characteristics:**
- Registered for event but didn't attend
- Didn't open thank-you email
- No whitepaper download, no WhatsApp join
- May be tire-kickers or had scheduling conflict

**Estimated Volume:** 25 leads (25% of registrants)

**Nurture Strategy:**
- Shortened 3-email re-engagement sequence (separate from main nurture)
- Focus on FOMO ("You missed it - here's what happened")
- LDF25-COMMUNITY discount (20% off, evergreen)
- Emphasis on accessing event deck/whitepaper (move them to Warm)
- No Maggie's Inner Circle access (unless they upgrade by Nov 13)

**Example Cold Lead Profile:**
- Name: Alex Johnson
- Role: Product Designer
- Location: Leeds, UK
- Actions: Registered (20 pts) + No other engagement = **20 points**

---

## PERSONA MAPPING

Based on attendee data, we've identified 3 primary personas:

### Persona 1: The Solopreneur Hustler
**Profile:**
- Solo founder or freelancer
- Limited budget (<£500/month for tools)
- Wearing all hats (marketing, sales, product)
- Struggling with content consistency

**Pain Points:**
- "I don't have time to create content"
- "I can't afford a marketing team or agency"
- "I'm not showing up on Google or ChatGPT"

**Best Fit Plan:** MOMENTUM (£158/mo → £111/mo with LDF25-STANDARD)

**Messaging Focus:**
- Time savings: "Turn 6 hours/week into 30 minutes"
- Cost efficiency: "99% cheaper than hiring freelancers"
- Case study: Sarah Chen (sustainable fashion consultant)

**Lead Scoring Signals:**
- Solo entrepreneur (+10)
- Downloaded whitepaper (+15)
- Watched demo video (+5)
- Likely score: 60-85 (Warm to Hot)

---

### Persona 2: The Startup Founder
**Profile:**
- Founder of venture-backed or bootstrapped startup (2-10 employees)
- Budget for tools (£500-£2,000/month)
- Delegating marketing but still involved
- Growth-obsessed, data-driven

**Pain Points:**
- "We need to scale content without hiring more writers"
- "Our competitors are outranking us on Google and AI search"
- "We're not getting ROI from our current marketing tools"

**Best Fit Plan:** OUTREACH (£298/mo → £209/mo with LDF25-STANDARD)

**Messaging Focus:**
- Scalability: "1,000 articles/month + 100 social posts"
- AI citation tracking: "See when ChatGPT recommends your brand"
- ROI: "30x output at 1/5 the cost"

**Lead Scoring Signals:**
- Startup founder (+10)
- Attended event (+40)
- Claimed brand page (+15)
- Visited pricing page (+8)
- Likely score: 70-95 (Hot)

---

### Persona 3: The Marketing Consultant/Agency
**Profile:**
- Fractional CMO or boutique agency
- Managing 3-10 client accounts
- Looking for tools to scale without hiring
- Interested in white-label or multi-account features

**Pain Points:**
- "I can't scale my agency without hiring more writers"
- "My clients expect AI-first marketing but I don't have the tools"
- "I need a white-label solution I can resell"

**Best Fit Plan:** ENTERPRISE (custom pricing, multi-account)

**Messaging Focus:**
- Multi-account management: "Manage all clients from one dashboard"
- White-label option: "Co-brand as your own service"
- Agency partnership: "Revenue share program available"

**Lead Scoring Signals:**
- Marketing role (+8)
- Attended event (+40)
- Asked questions about multi-account features (manual tag)
- Likely score: 55-75 (Warm to Hot)

---

## LEAD ENRICHMENT PROCESS

**Goal:** Enhance raw registration data with additional context for better segmentation

### Data Sources
1. **Event Registration Form:** Name, email, company, role, location
2. **LinkedIn Profile Scraping:** Company size, industry, job title verification
3. **Company Website:** Tech stack (from BuiltWith), company stage (startup vs established)
4. **Email Engagement:** Opens, clicks, time spent reading (from email analytics)
5. **aiCMO Dashboard Activity:** Brand page claimed, articles generated on CATALYST
6. **WhatsApp Group:** Join date, engagement level (posts/replies)

### Enrichment Workflow (Owner: Mark)
**Step 1:** Export raw attendee list (CSV from event platform)
**Step 2:** Match emails to LinkedIn profiles (manual or via LinkedIn Sales Navigator)
**Step 3:** Scrape company data (BuiltWith, Clearbit, manual research)
**Step 4:** Merge with email engagement data (from email platform export)
**Step 5:** Merge with product usage data (from aiCMO dashboard/database)
**Step 6:** Calculate lead scores (automated via spreadsheet formula or CRM)
**Step 7:** Segment into Hot/Warm/Cold (export 3 separate CSVs for Emily)

**Timeline:** Complete by October 9, 2025 (2 days from kickoff)

---

## LEAD SCORING CALCULATION EXAMPLES

### Example 1: Hot Lead (Score: 85)
**Name:** Sarah Chen | **Role:** Founder | **Company:** EcoStyle Consulting

| Signal | Points |
|--------|--------|
| Attended event in-person | 40 |
| Joined WhatsApp group | 20 |
| Downloaded GEO whitepaper | 15 |
| Opened thank-you email | 10 |
| **TOTAL** | **85** |

**Segment:** HOT
**Nurture Track:** Full 7-email sequence, LDF25-EARLY (40% off)
**Priority:** High - Jason's personal follow-up if no conversion within 7 days

---

### Example 2: Warm Lead (Score: 50)
**Name:** Tom Mitchell | **Role:** Marketing Manager | **Company:** CloudFlow SaaS

| Signal | Points |
|--------|--------|
| Attended event in-person | 40 |
| Opened thank-you email | 10 |
| **TOTAL** | **50** |

**Segment:** WARM
**Nurture Track:** Full 7-email sequence, LDF25-STANDARD (30% off)
**Priority:** Medium - WhatsApp invitation to move to Hot

---

### Example 3: Cold Lead (Score: 20)
**Name:** Alex Johnson | **Role:** Product Designer | **Company:** DesignStudio Leeds

| Signal | Points |
|--------|--------|
| Registered but no-show | 20 |
| **TOTAL** | **20** |

**Segment:** COLD
**Nurture Track:** 3-email re-engagement sequence, LDF25-COMMUNITY (20% off)
**Priority:** Low - Focus on Warm/Hot first

---

## DYNAMIC SCORING (REAL-TIME UPDATES)

Leads can move between segments based on post-event behavior:

### Score Increase Triggers
- **Cold → Warm:** Opens Email 1 (+10) or downloads whitepaper (+15)
- **Warm → Hot:** Joins WhatsApp group (+20) or claims brand page (+15)
- **Any Tier → High Priority:** Clicks "Upgrade" CTA in email (+10) or visits pricing page (+8)

### Score Decrease Triggers
- **Any Tier → Disqualified:** Unsubscribes (-100) or marks as spam (-100)
- **Hot → Warm:** No email opens for 7+ days (-10 recency penalty)

### Automated Re-Segmentation (Owner: Peter)
- Daily sync between email platform and CRM
- If lead moves from Warm → Hot, Emily updates nurture track
- High-priority leads (clicked CTA but didn't convert) get manual outreach from Jason

---

## LEAD HANDOFF PROCESS

### Mark → Emily (Email Nurture)
**Deliverable:** Segmented lead lists (3 CSVs: Hot, Warm, Cold)
**Deadline:** October 9, 2025, 5pm GMT
**Format:**
- Columns: First Name, Last Name, Email, Score, Segment, Persona, Company, Role, Location
- File names: LDF25_HOT_LEADS.csv, LDF25_WARM_LEADS.csv, LDF25_COLD_LEADS.csv

### Mark → Sophie (WhatsApp Engagement)
**Deliverable:** List of WhatsApp group members with scores
**Deadline:** October 9, 2025, 5pm GMT
**Format:**
- Columns: First Name, Phone Number (if available), Score, Persona
- Use for personalized welcome DMs and targeted content

### Mark → Peter (Analytics Setup)
**Deliverable:** Lead score calculation logic for CRM integration
**Deadline:** October 9, 2025, 5pm GMT
**Format:**
- Spreadsheet with formulas OR
- CRM custom field configuration instructions

### Mark → Jason (High-Priority Lead Alerts)
**Deliverable:** Top 10 hottest leads for personal outreach
**Deadline:** October 10, 2025, 9am GMT
**Format:**
- Short summary: Name, company, why they're high-priority, suggested talking points

---

## LEAD QUALITY BENCHMARKS

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Hot leads (70-100 pts) | 35-45% of total | [TBD] | [TBD] |
| Warm leads (40-69 pts) | 30-40% of total | [TBD] | [TBD] |
| Cold leads (0-39 pts) | 20-30% of total | [TBD] | [TBD] |
| Average lead score | 55-65 | [TBD] | [TBD] |
| Hot lead → paid conversion | 15-25% | [TBD] | [TBD] |
| Warm lead → paid conversion | 5-10% | [TBD] | [TBD] |
| Cold lead → paid conversion | 1-3% | [TBD] | [TBD] |

**Review Date:** November 30, 2025
**Owner:** Mark (Market Researcher)

---

## SEGMENTATION INSIGHTS (POST-CAMPAIGN)

*To be completed after campaign ends (Nov 30, 2025)*

**Questions to Answer:**
1. Did our scoring model accurately predict conversion likelihood?
2. Which signals were most predictive of conversion? (e.g., WhatsApp join > whitepaper download?)
3. Which personas converted best? (Solopreneur vs Startup Founder vs Agency)
4. Should we adjust point values for future campaigns?
5. Were there any "dark horse" leads (low score but converted anyway)?

**Owner:** Mark (Market Researcher) + Peter (Performance Analyst)
**Deadline:** December 15, 2025

---

**END OF LEAD SCORING MODEL**
