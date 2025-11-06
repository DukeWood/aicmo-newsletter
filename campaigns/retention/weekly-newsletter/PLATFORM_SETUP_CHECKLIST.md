# Platform Setup Checklist

Complete checklist for configuring all platforms and services for aiCMO's weekly newsletter.

---

## 📧 Mailchimp Setup

### Account & Authentication

- [ ] **Create Mailchimp Account**
  - Plan: Standard or higher (for automation features)
  - Account URL: `https://usXX.admin.mailchimp.com` (note your server prefix)

- [ ] **Generate API Key**
  - Navigate to: Account → Extras → API keys
  - Create new key
  - Copy key (format: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-usXX`)
  - Store securely in `.env` file

- [ ] **Configure Domain Authentication**
  - **SPF Record**: Add to DNS
    ```
    v=spf1 include:servers.mcsv.net ?all
    ```
  - **DKIM Record**: Get from Mailchimp → Settings → Verified domains
  - **DMARC Record** (optional):
    ```
    v=DMARC1; p=none; rua=mailto:dmarc@ai.cmo.so
    ```
  - Verify all records in Mailchimp dashboard

### Audience Configuration

- [ ] **Create Main Audience List**
  - Name: `aiCMO Newsletter Subscribers`
  - Default from email: `newsletter@ai.cmo.so`
  - Default from name: `Maggie (aiCMO)`
  - Reply-to email: `hello@ai.cmo.so`
  - Reminder: Set physical address (required by law)

- [ ] **Add Custom Merge Fields**
  ```
  FNAME     - Text (First Name) - default
  LNAME     - Text (Last Name) - default
  ROLE      - Dropdown (Founder, CEO, CMO, Consultant, Agency, Program Director, Other)
  COMPANY   - Text (Company Name)
  STAGE     - Dropdown (Pre-seed, Seed, Series A, Series B+, Growth)
  INTERESTS - Checkboxes (GEO Fundamentals, B2A Marketing, Tactical Tips, Case Studies, Industry Analysis)
  SOURCE    - Text (Signup Source - hidden field)
  ```

- [ ] **Create Audience Segments**
  - **Founders Segment**:
    - Condition: ROLE is "Founder" OR "CEO"
    - Use for: Founder-specific content
  - **Agencies Segment**:
    - Condition: ROLE is "Consultant" OR "Agency"
    - Use for: White-label content
  - **Incubators Segment**:
    - Condition: ROLE is "Program Director" OR "Mentor"
    - Use for: Batch programs
  - **Highly Engaged**:
    - Condition: Opened any of last 3 campaigns
    - Use for: Early access content
  - **Re-engagement**:
    - Condition: Has not opened any of last 4 campaigns
    - Use for: Win-back campaigns

### Email Templates

- [ ] **Create Newsletter Template**
  - Template name: `aiCMO Weekly Newsletter - Main Template`
  - Layout: Single column, 600px width
  - Mobile responsive: Yes
  - Include sections:
    - Header with aiCMO logo
    - Hero section
    - Main content area
    - CTA button area
    - Footer with social links
    - Unsubscribe link (auto-insert `*|UNSUB|*`)
  - Brand colors:
    - Primary: #C8102E (Crimson Red)
    - Secondary: #012169 (Navy Blue)
    - Accent: #A259FF (Electric Purple)
  - Fonts:
    - Headings: Montserrat Bold
    - Body: Inter Regular

- [ ] **Create Welcome Email Template**
  - Template name: `aiCMO Welcome Email`
  - Personalized greeting: `*|FNAME|*`
  - Content: Value prop + what to expect

### Automation Workflows

- [ ] **Welcome Series Automation**
  - Trigger: Subscriber joins audience
  - Email 1: Welcome + value proposition (send immediately)
  - Email 2: First GEO tip + resource (send 2 days later)
  - Email 3: Community invitation (send 5 days later)
  - Settings: Stop if unsubscribes

- [ ] **Re-engagement Automation**
  - Trigger: Has not opened email in 4 weeks
  - Email 1: "Still interested?" (send at Week 4)
  - Email 2: Final reminder + easy unsub (send at Week 6)
  - Email 3: Auto-remove if no engagement (Week 8)
  - Settings: Archive inactive subscribers

### Signup Forms

- [ ] **Website Embed Form**
  - Form type: Embedded
  - Fields: Email (required), FNAME (optional), ROLE (optional)
  - Success message: "Check your email to confirm subscription"
  - Double opt-in: Enabled
  - Embed on: ai.cmo.so homepage, blog sidebar

- [ ] **Landing Page Form**
  - Form type: Hosted
  - Custom URL: `https://ai.cmo.so/newsletter`
  - Fields: Email, FNAME, ROLE, INTERESTS
  - Thank you page: Custom redirect to sharing page

---

## 📊 Google Analytics 4 Setup

### Account Configuration

- [ ] **Create GA4 Property**
  - Property name: `aiCMO Newsletter Tracking`
  - Timezone: Your primary timezone
  - Currency: USD (or your primary currency)

- [ ] **Install GA4 Tracking**
  - Get Measurement ID (format: `G-XXXXXXXXXX`)
  - Add to landing pages
  - Add to thank-you pages
  - Verify tracking with GA4 DebugView

### Events Configuration

- [ ] **Newsletter Signup Events**
  ```javascript
  Event name: newsletter_signup
  Parameters:
    - source (website, social, referral, event)
    - segment (founders, agencies, incubators)
  ```

- [ ] **Platform Signup Events**
  ```javascript
  Event name: platform_signup
  Parameters:
    - referral_source (newsletter)
    - campaign_id (issue number)
  ```

- [ ] **Email Link Clicks** (via UTM)
  - Auto-tracked when UTM parameters present
  - Format: `utm_source=newsletter&utm_medium=email&utm_campaign=weekly_issue_XX`

### Conversion Goals

- [ ] **Newsletter Subscription**
  - Event: `newsletter_signup`
  - Value: $0 (awareness goal)

- [ ] **Platform Signup from Newsletter**
  - Event: `platform_signup` where `referral_source = newsletter`
  - Value: $50 (estimated qualified lead value)

### Custom Reports

- [ ] **Newsletter Performance Report**
  - Dimensions: Campaign ID, Source, Segment
  - Metrics: Signups, Platform conversions, Conversion rate
  - Filter: Source = newsletter

- [ ] **Landing Page Funnel**
  - Step 1: Landing page view
  - Step 2: Form start
  - Step 3: Newsletter signup
  - Step 4: Platform signup

---

## 🌐 Landing Page Setup

### Platform Choice

- [ ] **Select Platform**
  - Option A: Webflow (recommended for design flexibility)
  - Option B: Framer (good for animation/interaction)
  - Option C: WordPress (if existing site)

### Page Structure

- [ ] **Newsletter Landing Page** (`/newsletter`)
  - Hero: Value proposition + CTA
  - Section 1: What you'll learn (GEO, B2A, tactics)
  - Section 2: Who it's for (challenger brands, consultants)
  - Section 3: Social proof (testimonials, metrics)
  - Section 4: Signup form (Mailchimp embed)
  - Footer: Links, social, privacy

- [ ] **Thank You Page** (`/newsletter/thanks`)
  - Confirmation message
  - Next steps (check email, whitelist sender)
  - Social sharing buttons (pre-populated messages)
  - Secondary CTA (explore platform, read blog)

### Form Integration

- [ ] **Mailchimp Form Embed**
  - Copy embed code from Mailchimp
  - Style to match brand
  - Test submission flow
  - Verify double opt-in email sends

- [ ] **GA4 Tracking Integration**
  - Add GA4 code to all pages
  - Set up conversion events
  - Test with GA4 DebugView

### Mobile Optimization

- [ ] **Responsive Design**
  - Test on mobile devices (iOS, Android)
  - Ensure form is thumb-friendly
  - Check load time (<3 seconds)
  - Verify all CTAs visible above fold

---

## 📱 Social Media Configuration

### LinkedIn Setup

- [ ] **Company Page Access**
  - Verify admin access to aiCMO LinkedIn page
  - Enable posting permissions for team

- [ ] **Content Preparation**
  - Create post templates (announcement, teaser, highlights)
  - Design social graphics (1200x627px for feed)
  - Write pre-populated share messages

- [ ] **Posting Schedule**
  - Pre-newsletter (Friday): Teaser post
  - Launch day (Monday): Full announcement
  - Mid-week (Wednesday): Key takeaway highlight

### Twitter/X Setup

- [ ] **Account Verification**
  - Verify @aiCMO account access
  - Check API access (if using automation)

- [ ] **Content Templates**
  - Thread template (opening tweet + 5-7 follow-ups)
  - Quote graphics (1200x675px)
  - Engagement prompts

- [ ] **Automation** (optional)
  - Set up Buffer/Hootsuite
  - Create posting queue
  - Schedule around newsletter send

### Social Sharing Buttons

- [ ] **Pre-populated Share Messages**
  - **LinkedIn**: "Just read the latest from @aiCMO on [topic]. Key takeaway: [insight]. Get GEO tips in your inbox: [link]"
  - **Twitter**: "🚀 New @aiCMO newsletter on [topic]. If you're a challenger brand, this is essential reading: [link]"
  - **Email Forward**: Subject line pre-filled with "Thought you'd find this useful"

---

## 🛠️ Development Environment

### Local Setup

- [ ] **Clone Repository**
  ```bash
  git clone [repo-url]
  cd aicmo_cc
  ```

- [ ] **Install Dependencies**
  ```bash
  npm install
  ```

- [ ] **Configure Environment**
  ```bash
  cp .env.example .env
  # Edit .env with your credentials
  ```

- [ ] **Install MCP Server**
  ```bash
  npm install -g @bryangsmith/mailchimp-mcp-server
  ```

### Testing

- [ ] **Run Connection Test**
  ```bash
  npm run test:mcp
  ```
  - Expected: All checks pass ✅

- [ ] **Test Newsletter Publisher**
  ```bash
  npm run test:publisher
  ```
  - Expected: Draft campaign created

- [ ] **Test Metrics Fetcher**
  ```bash
  npm run fetch:metrics -- --dashboard
  ```
  - Expected: Dashboard data generated

---

## 🔔 Monitoring & Alerts

### Performance Thresholds

- [ ] **Configure Alert Triggers** (in `.env`)
  ```
  ALERT_THRESHOLD_OPEN_RATE=30
  ALERT_THRESHOLD_CTR=5
  ALERT_THRESHOLD_LEADS=7
  ```

- [ ] **Set Up Alert Channels**
  - Email: Team distribution list
  - Slack: #newsletter-alerts channel
  - SMS: Critical alerts only

### Monitoring Dashboards

- [ ] **Mailchimp Dashboard**
  - Check daily: Open rate, CTR, unsubscribes
  - Alert if: Open rate <30%, Unsub rate >1%

- [ ] **GA4 Dashboard**
  - Check weekly: Newsletter → Platform conversion
  - Alert if: Conversion rate <2%

- [ ] **Custom Dashboard** (Looker Studio or similar)
  - Combine Mailchimp + GA4 data
  - Weekly KPI summary
  - Trend analysis

---

## ✅ Pre-Launch Verification

### Week Before Launch

- [ ] **Technical Checks**
  - [ ] MCP server connected and tested
  - [ ] All automation scripts working
  - [ ] Landing pages live and tested
  - [ ] Forms submitting correctly
  - [ ] GA4 tracking firing
  - [ ] Email templates rendering properly (desktop + mobile)

- [ ] **Content Checks**
  - [ ] Issue #1 content finalized
  - [ ] Subject lines A/B test configured (5-7 variants)
  - [ ] UTM parameters added to all links
  - [ ] Social promotion content ready
  - [ ] Team reviewed and approved

- [ ] **List Checks**
  - [ ] Audience list has >100 subscribers (minimum for send)
  - [ ] Segments configured correctly
  - [ ] Double opt-in confirmed for all
  - [ ] Test sends successful

### Day Before Launch

- [ ] **Final Tests**
  - [ ] Send test to all team members
  - [ ] Verify rendering in 5+ email clients (Gmail, Outlook, Apple Mail, Yahoo, mobile)
  - [ ] Click all links to verify tracking
  - [ ] Check spam score (<5 SpamAssassin)
  - [ ] Confirm send time scheduled correctly

- [ ] **Backup Plans**
  - [ ] Document rollback procedure
  - [ ] Identify emergency contacts
  - [ ] Prepare "Issue with send" communication

---

## 📋 Launch Day Checklist

### Morning of Send (3 hours before)

- [ ] **Pre-flight Checks**
  - [ ] Verify scheduled campaign in Mailchimp
  - [ ] Confirm subscriber count
  - [ ] Check for any Mailchimp system alerts
  - [ ] Test landing pages are live
  - [ ] Verify GA4 is tracking

### 1 Hour Before Send

- [ ] **Final Verification**
  - [ ] Social posts queued
  - [ ] Monitoring dashboard open
  - [ ] Team on standby
  - [ ] Emergency contact list ready

### At Send Time

- [ ] **Launch Actions**
  - [ ] Confirm send initiated
  - [ ] Monitor first 100 opens
  - [ ] Check for immediate bounces/unsubscribes
  - [ ] Verify links are working
  - [ ] Post to social media

### First Hour After Send

- [ ] **Monitor Performance**
  - [ ] Open rate tracking (target: 15% in first hour)
  - [ ] Click-through rate
  - [ ] Any deliverability issues
  - [ ] Social engagement
  - [ ] Platform signups

### 24 Hours After Send

- [ ] **Full Analysis**
  - [ ] Run complete metrics report
  - [ ] Document learnings
  - [ ] Plan optimizations for Issue #2
  - [ ] Team retrospective

---

## 🎯 Success Criteria

### Technical Success

- ✅ Email delivered to >98% of list (bounce rate <2%)
- ✅ All tracking links working
- ✅ Landing pages load <3 seconds
- ✅ Mobile rendering perfect
- ✅ No critical errors or outages

### Performance Success

- ✅ Open rate ≥35% (Week 1 baseline, target 40%+)
- ✅ CTR ≥5% (Week 1 baseline, target 8%+)
- ✅ Unsub rate <0.5%
- ✅ 5+ qualified leads generated
- ✅ Positive social engagement

### Process Success

- ✅ Team workflow executed smoothly
- ✅ All deadlines met
- ✅ Quality standards maintained
- ✅ Learnings documented
- ✅ Week 2 planning initiated

---

**Checklist Owner**: Peter (performance-analyst) + DevOps
**Review Cadence**: Daily during setup, weekly after launch
**Last Updated**: 2025-10-12
