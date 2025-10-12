# LDF25 ANALYTICS DASHBOARD SPECIFICATION

**Campaign:** Leeds Digital Festival 2025 - Post-Event Conversion
**Campaign Code:** LDF25-NURTURE
**Owner:** Peter (Performance Analyst)
**Last Updated:** October 7, 2025
**Status:** IN DEVELOPMENT

---

## OVERVIEW

This document specifies the analytics dashboard for tracking LDF25 post-event conversion performance. The dashboard provides real-time visibility into email engagement, lead progression, conversion funnel, and revenue attribution.

**Dashboard Goals:**
1. Monitor email sequence performance (opens, clicks, conversions)
2. Track lead movement through Hot/Warm/Cold segments
3. Measure discount code redemption and revenue impact
4. Identify bottlenecks in conversion funnel
5. Provide actionable insights for campaign optimization

**Dashboard Platform:** Google Data Studio (or Tableau/Looker if available)
**Data Sources:** Email platform API, CRM, GA4, Stripe/payment processor
**Update Frequency:** Real-time (15-minute refresh)
**Access:** Jason (CEO), Peter (Performance), Emily (Email), Mark (Research), Sophie (Social)

---

## DASHBOARD STRUCTURE

### TAB 1: EXECUTIVE SUMMARY
**Purpose:** High-level campaign health at-a-glance

**Metrics Displayed:**
| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Total Leads | [Real-time] | 100 | [Green/Yellow/Red] |
| Email Delivery Rate | [Real-time] | 98%+ | [Green/Yellow/Red] |
| Average Open Rate | [Real-time] | 35-45% | [Green/Yellow/Red] |
| Average CTR | [Real-time] | 8-12% | [Green/Yellow/Red] |
| Lead → Paid Conversion | [Real-time] | 8-12% | [Green/Yellow/Red] |
| Total Conversions | [Real-time] | 8-12 | [Green/Yellow/Red] |
| Total MRR Generated | [Real-time] | £1,600-£2,200 | [Green/Yellow/Red] |
| Projected 12-Month ARR | [Real-time] | £19K-£26K | [Green/Yellow/Red] |

**Status Indicators:**
- Green: On track or exceeding target
- Yellow: Within 10% of target (needs monitoring)
- Red: >10% below target (needs intervention)

**Visualization:** Gauge charts for each metric

---

### TAB 2: EMAIL PERFORMANCE
**Purpose:** Detailed email-by-email performance tracking

**Table View:**
| Email | Send Date | Segment | Sent | Delivered | Opened | Open Rate | Clicked | CTR | Converted | Conv. Rate |
|-------|-----------|---------|------|-----------|--------|-----------|---------|-----|-----------|------------|
| Email 1: Early Bird | Oct 7 | Hot | 40 | 40 | 20 | 50% | 6 | 15% | 2 | 5% |
| Email 2: Social Proof | Oct 10 | All | 100 | 98 | 39 | 40% | 10 | 10% | 1 | 1% |
| Email 3: GEO Deep Dive | Oct 14 | All | 98 | 98 | 37 | 38% | 9 | 9% | 2 | 2% |
| Email 4: Discount Reminder | Oct 17 | All | 98 | 98 | 41 | 42% | 12 | 12% | 3 | 3% |
| Email 5: Objection Handler | Oct 21 | Engaged | 45 | 45 | 16 | 35% | 4 | 9% | 1 | 2% |
| Email 6: Community | Oct 28 | All | 98 | 98 | 32 | 33% | 7 | 7% | 1 | 1% |
| Email 7: Final Call | Nov 6 | Hot+Warm | 60 | 60 | 27 | 45% | 11 | 18% | 2 | 3% |

**Chart View:**
- Line chart: Open rate trend across 7 emails
- Bar chart: CTR comparison across emails
- Funnel chart: Sent → Opened → Clicked → Converted (per email)

**A/B Test Results:**
| Email | Test Element | Variant A | Variant B | Winner | Lift |
|-------|--------------|-----------|-----------|--------|------|
| Email 1 | Subject line | "Your exclusive 40% founder's rate" | "Thank you for joining us..." | A | +12% |
| Email 4 | Sender name | Jason Xu | Maggie (AI CMO) | Jason | +8% |

---

### TAB 3: LEAD SEGMENTATION & PROGRESSION
**Purpose:** Track lead movement through Hot/Warm/Cold segments

**Segment Breakdown (Current State):**
| Segment | Count | % of Total | Avg. Score | Top Persona | Conv. Rate |
|---------|-------|------------|------------|-------------|------------|
| Hot | 40 | 40% | 78 | Startup Founder | 20% |
| Warm | 35 | 35% | 52 | Solopreneur | 8% |
| Cold | 25 | 25% | 18 | Consultant | 2% |

**Segment Movement (Flow Diagram):**
```
Day 0:  Hot (40) → Warm (35) → Cold (25)
Day 7:  Hot (38) ← Warm (37) ← Cold (20)  [2 upgraded, 3 moved Warm→Hot, 5 engaged Cold→Warm]
Day 14: Hot (35) ← Warm (35) ← Cold (18)  [3 upgraded, 0 moved, 2 engaged]
Day 30: Hot (30) ← Warm (33) ← Cold (15)  [8 total upgraded, flow stabilizes]
```

**Visualization:** Sankey diagram showing lead flow between segments

**Top Movers:**
| Lead Name | Day 0 Segment | Day 30 Segment | Trigger Event |
|-----------|---------------|----------------|---------------|
| Sarah Chen | Warm | Hot | Joined WhatsApp group |
| Tom Mitchell | Cold | Warm | Downloaded whitepaper |
| Emma Rogers | Hot | Converted | Upgraded to MOMENTUM |

---

### TAB 4: CONVERSION FUNNEL
**Purpose:** Identify drop-off points in user journey

**Funnel Stages:**
1. **Event Registered:** 100 leads (100%)
2. **Event Attended:** 75 leads (75%)
3. **Email Opened:** 60 leads (60%)
4. **CTA Clicked:** 18 leads (18%)
5. **Visited Pricing Page:** 14 leads (14%)
6. **Started Checkout:** 10 leads (10%)
7. **Completed Purchase:** 8 leads (8%)

**Visualization:** Funnel chart with conversion rates between stages

**Bottleneck Analysis:**
| Stage Transition | Conv. Rate | Industry Benchmark | Status |
|------------------|------------|-------------------|--------|
| Registered → Attended | 75% | 60-70% | Green (above benchmark) |
| Attended → Opened Email | 80% | 70-80% | Green |
| Opened → Clicked CTA | 30% | 10-15% | Green (double benchmark) |
| Clicked → Visited Pricing | 78% | 50-60% | Green |
| Visited → Started Checkout | 71% | 30-50% | Green |
| Started → Completed | 80% | 60-70% | Yellow (needs improvement) |

**Recommended Actions:**
- **Bottleneck:** Started Checkout → Completed (80% conversion, target 85%+)
- **Hypothesis:** Payment friction or unclear pricing
- **Test:** Add trust badges + "Money-back guarantee" on checkout page

---

### TAB 5: DISCOUNT CODE PERFORMANCE
**Purpose:** Track redemption and revenue impact by discount tier

**Discount Code Breakdown:**
| Code | Discount | Valid Dates | Redemptions | Target | % of Target | Revenue Impact |
|------|----------|-------------|-------------|--------|-------------|----------------|
| LDF25-EARLY | 40% off | Oct 7-9 | 4 | 8-12 | 40% | £548 MRR (Month 1) |
| LDF25-STANDARD | 30% off | Oct 7-21 | 7 | 15-20 | 38% | £1,195 MRR (Month 1) |
| LDF25-COMMUNITY | 20% off | Oct 22+ | 3 | 10-15 | 23% | £490 MRR (Month 1) |
| **TOTAL** | — | — | **14** | **33-47** | **36%** | **£2,233 MRR** |

**Revenue Projection (12-Month ARR):**
- Month 1-3 (discounted): £2,233 MRR
- Month 4-12 (full price): £2,912 MRR
- **Total 12-Month ARR:** £26,796

**Discount Cost (Opportunity Cost):**
- Total savings given to customers: £1,833 (over 3 months)
- Net ARR after discount cost: £24,963

**Plan Distribution:**
| Plan | Users | % of Conversions | Month 1 MRR | Month 4+ MRR |
|------|-------|------------------|-------------|--------------|
| MOMENTUM | 10 | 71% | £1,260 | £1,580 |
| OUTREACH | 4 | 29% | £973 | £1,192 |

**Visualization:**
- Pie chart: Redemptions by discount code
- Bar chart: Revenue by plan (MOMENTUM vs OUTREACH)
- Line chart: Redemptions over time (daily)

---

### TAB 6: COHORT ANALYSIS
**Purpose:** Compare performance across lead segments and personas

**Hot vs Warm vs Cold Conversion Rates:**
| Segment | Total Leads | Conversions | Conversion Rate | Avg. Days to Convert | Preferred Plan |
|---------|-------------|-------------|-----------------|---------------------|----------------|
| Hot | 40 | 8 | 20% | 4.2 days | OUTREACH (60%) |
| Warm | 35 | 4 | 11% | 9.5 days | MOMENTUM (75%) |
| Cold | 25 | 2 | 8% | 18.3 days | MOMENTUM (100%) |

**Persona Conversion Rates:**
| Persona | Total Leads | Conversions | Conversion Rate | Avg. Deal Size | LTV Estimate |
|---------|-------------|-------------|-----------------|----------------|--------------|
| Solopreneur | 45 | 6 | 13% | £158/mo (MOMENTUM) | £1,896/year |
| Startup Founder | 35 | 6 | 17% | £228/mo (mixed) | £2,736/year |
| Consultant/Agency | 20 | 2 | 10% | £298/mo (OUTREACH) | £3,576/year |

**Key Insights:**
- Hot leads convert 2.5x faster than Warm leads (4.2 days vs 9.5 days)
- Startup Founders have highest conversion rate (17%) but smaller cohort
- Solopreneurs are largest segment (45%) with moderate conversion (13%)
- OUTREACH plan preferred by Hot leads (higher intent, bigger budgets)

---

### TAB 7: CHANNEL ATTRIBUTION
**Purpose:** Track which channels drive conversions

**UTM Source Performance:**
| UTM Source | Clicks | Conversions | Conv. Rate | Revenue |
|------------|--------|-------------|------------|---------|
| ldf25 (email) | 142 | 10 | 7.0% | £1,890 MRR |
| ldf25 (whatsapp) | 38 | 3 | 7.9% | £474 MRR |
| ldf25 (social) | 22 | 1 | 4.5% | £158 MRR |

**Email-Specific Attribution:**
| Email | Conversions | Revenue | Avg. Time to Convert |
|-------|-------------|---------|---------------------|
| Email 1: Early Bird | 4 | £548 | 1.8 days |
| Email 2: Social Proof | 2 | £316 | 3.2 days |
| Email 3: GEO Deep Dive | 1 | £158 | 2.1 days |
| Email 4: Discount Reminder | 3 | £474 | 1.5 days |
| Email 5: Objection Handler | 2 | £395 | 0.9 days |
| Email 6: Community | 1 | £126 | 4.7 days |
| Email 7: Final Call | 1 | £209 | 1.2 days |

**Multi-Touch Attribution Model:**
- **First Touch:** Email 1 gets 40% credit (introduced offer)
- **Last Touch:** Email that triggered conversion gets 40% credit
- **Middle Touches:** Remaining 20% split among emails in between

**Example:** User opened Emails 1, 2, 4, 5 → converted after Email 5
- Email 1: 40% credit
- Email 2: 6.7% credit
- Email 4: 6.7% credit
- Email 5: 46.6% credit (last touch bonus)

---

### TAB 8: REVENUE & RETENTION
**Purpose:** Track MRR/ARR growth and predict churn

**Monthly Recurring Revenue (MRR) Trend:**
| Month | New MRR | Churn MRR | Expansion MRR | Net MRR | Cumulative MRR |
|-------|---------|-----------|---------------|---------|----------------|
| Oct 2025 | £2,233 | £0 | £0 | +£2,233 | £2,233 |
| Nov 2025 | £0 | £0 | £0 | £0 | £2,233 |
| Dec 2025 | £0 | £0 | £0 | £0 | £2,233 |
| Jan 2026 | £0 | -£223 | £0 | -£223 | £2,010 |
| Feb 2026 | £0 | -£112 | £79 | -£33 | £1,977 |

**Retention Cohort (LDF25 Cohort):**
| Month | Active Users | Retention Rate | Churned | Churn Rate |
|-------|--------------|----------------|---------|------------|
| Month 1 | 14 | 100% | 0 | 0% |
| Month 2 | 14 | 100% | 0 | 0% |
| Month 3 | 14 | 100% | 0 | 0% |
| Month 4 | 13 | 93% | 1 | 7% |
| Month 5 | 12 | 86% | 1 | 7% |
| Month 6 | 11 | 79% | 1 | 8% |

**Churn Prediction (Month 4+):**
- Predicted churn rate: 7-10% per month (after discount ends)
- High-risk users (flagged): Users who didn't publish >100 articles in Month 3
- Retention actions: Personal check-in from Jason, offer annual billing (20% off)

**Customer Lifetime Value (LTV):**
- Average customer lifespan: 14 months (estimate)
- Average MRR per user: £195/mo (blended MOMENTUM + OUTREACH)
- **LTV per customer: £2,730**

**Customer Acquisition Cost (CAC):**
- Event cost: £2,000 (venue, catering, materials)
- Campaign cost: £500 (email platform, tools)
- Total cost: £2,500
- Total conversions: 14 users
- **CAC: £179 per customer**

**LTV:CAC Ratio: 15.3:1** (Excellent - target is 3:1+)

---

## DATA SOURCES & INTEGRATION

### Email Platform (e.g., Mailchimp, SendGrid, HubSpot)
**Data Points:**
- Email sent, delivered, bounced, opened, clicked, unsubscribed
- UTM parameters from links
- A/B test variant performance

**Integration Method:** API connector to Google Sheets/Data Studio
**Update Frequency:** Real-time (15-minute delay)

---

### CRM (e.g., HubSpot, Pipedrive, Airtable)
**Data Points:**
- Lead scores, segment (Hot/Warm/Cold), persona
- Conversion status, plan selected, MRR
- Lead source, event attendance status

**Integration Method:** API connector or CSV export
**Update Frequency:** Daily sync (overnight)

---

### Website Analytics (GA4)
**Data Points:**
- Pricing page visits
- UTM source/medium/campaign tracking
- Time on page, bounce rate
- Conversion events (started checkout, completed purchase)

**Integration Method:** GA4 API connector
**Update Frequency:** Real-time

---

### Payment Processor (Stripe, Chargebee)
**Data Points:**
- Discount code used
- Plan selected (MOMENTUM vs OUTREACH)
- MRR, ARR, churn events
- Payment success/failure

**Integration Method:** Stripe API connector
**Update Frequency:** Real-time

---

### WhatsApp (Manual)
**Data Points:**
- Group member count
- Engagement level (posts/replies per user)
- Join date

**Integration Method:** Manual export + Google Sheets
**Update Frequency:** Weekly

---

## DASHBOARD ACCESS & PERMISSIONS

| User | Access Level | Purpose |
|------|--------------|---------|
| Jason (CEO) | Full access (edit) | Strategic decisions, budget allocation |
| Peter (Performance) | Full access (edit) | Dashboard maintenance, data analysis |
| Emily (Email) | View + email tab edit | Email optimization, A/B testing |
| Mark (Research) | View only | Lead quality analysis, persona insights |
| Sophie (Social) | View only | Social/WhatsApp performance |

**Security:**
- Dashboard URL: https://datastudio.google.com/reporting/ldf25-nurture (example)
- Access via Google account authentication
- No public sharing (internal team only)

---

## AUTOMATED ALERTS

**Setup:** Email/Slack alerts for critical metrics

### Alert 1: Low Email Open Rate
**Trigger:** Email open rate <25% (below industry average)
**Recipient:** Emily + Peter
**Action:** Review subject line, sender name, send time

### Alert 2: High Unsubscribe Rate
**Trigger:** Unsubscribe rate >1% for any email
**Recipient:** Emily + Jason
**Action:** Pause campaign, review messaging tone

### Alert 3: Conversion Spike
**Trigger:** 3+ conversions in single day
**Recipient:** Jason + Peter
**Action:** Identify what's working, amplify (e.g., send Email 4 to non-openers)

### Alert 4: Discount Code Exhaustion
**Trigger:** LDF25-EARLY reaches 18/20 redemptions (90% cap)
**Recipient:** Peter + Emily
**Action:** Prepare to switch messaging to LDF25-STANDARD

### Alert 5: Payment Failure
**Trigger:** Checkout started but payment failed
**Recipient:** Peter + Jason
**Action:** Manual follow-up email to user (troubleshoot payment issue)

---

## DASHBOARD MAINTENANCE

**Owner:** Peter (Performance Analyst)

**Weekly Tasks:**
- Verify data accuracy (spot-check against source systems)
- Update manual data sources (WhatsApp group stats)
- Review automated alerts and resolve any data pipeline issues
- Share weekly snapshot with team (every Monday 9am GMT)

**Monthly Tasks:**
- Export dashboard data to CSV for long-term storage
- Conduct cohort analysis (compare LDF25 cohort to other cohorts)
- Update revenue projections based on retention trends
- Present insights to Jason in monthly strategy meeting

---

## SUCCESS METRICS SUMMARY

**Campaign Success Criteria (Day 60 Review: Dec 6, 2025):**

| Metric | Target | Stretch Goal | Actual | Status |
|--------|--------|--------------|--------|--------|
| Total Conversions | 8-12 | 16+ | [TBD] | [TBD] |
| Conversion Rate | 8-12% | 16%+ | [TBD] | [TBD] |
| Email Avg Open Rate | 35-45% | 50%+ | [TBD] | [TBD] |
| Email Avg CTR | 8-12% | 15%+ | [TBD] | [TBD] |
| MRR Generated | £1,600-£2,200 | £3,000+ | [TBD] | [TBD] |
| 12-Month ARR | £19K-£26K | £35K+ | [TBD] | [TBD] |
| LTV:CAC Ratio | 10:1+ | 20:1+ | [TBD] | [TBD] |
| Month 4+ Retention | 80%+ | 90%+ | [TBD] | [TBD] |

---

## APPENDIX: SAMPLE DASHBOARD SCREENSHOTS

*To be added after dashboard development (Oct 10, 2025)*

**Screenshot 1:** Executive Summary (gauge charts)
**Screenshot 2:** Email Performance (table + line chart)
**Screenshot 3:** Conversion Funnel (funnel chart with drop-off rates)
**Screenshot 4:** Discount Code Performance (pie chart)
**Screenshot 5:** Revenue & Retention (MRR trend line chart)

---

**END OF ANALYTICS DASHBOARD SPECIFICATION**
