# Mailchimp API Setup Guide

Complete guide to setting up the Mailchimp Marketing API for aiCMO's weekly newsletter automation.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [MCP Server Installation](#mcp-server-installation)
3. [Mailchimp Configuration](#mailchimp-configuration)
4. [Testing the Integration](#testing-the-integration)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts & Access

- **Mailchimp Account** (Standard plan or higher recommended)
  - Account with API access enabled
  - Domain authentication configured (SPF, DKIM, DMARC)

- **Development Environment**
  - Node.js 18+ installed
  - npm or yarn package manager
  - Git (for version control)

### API Credentials Needed

1. **Mailchimp API Key**
   - Location: Mailchimp → Account → Extras → API keys
   - Format: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-usXX`

2. **Server Prefix**
   - Found in your API key after the dash (e.g., `us12`, `us6`)
   - Also visible in your Mailchimp dashboard URL

---

## Mailchimp SDK Installation

### Step 1: Install Dependencies

We use the official Mailchimp Marketing SDK:

```bash
# Navigate to project root
cd /Users/Jason-uk/AI/AI_Coding/Repositories/TorlyAI_v2

# Install all dependencies (includes Mailchimp SDK)
npm install

# The package.json includes:
# @mailchimp/mailchimp_marketing - Official Mailchimp Marketing API client
```

### Step 2: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Mailchimp credentials:
```bash
MAILCHIMP_API_KEY=your-actual-api-key-here
MAILCHIMP_SERVER_PREFIX=us12  # Replace with your server prefix
```

3. **Security**: Add `.env` to `.gitignore`:
```bash
echo ".env" >> .gitignore
```

### Step 3: Get Your Mailchimp List ID

You'll need your audience list ID for publishing:

```bash
# 1. Log into Mailchimp
# 2. Go to Audience → Settings → Audience name and defaults
# 3. Copy the List ID (format: abc123def4)
```

Add it to your `.env` file:
```env
MAILCHIMP_LIST_ID=your-list-id-here
```

---

## Mailchimp Configuration

### Audience Setup

1. **Create Main Audience**
   - Name: "aiCMO Newsletter Subscribers"
   - From email: `newsletter@ai.cmo.so`
   - From name: `Maggie (aiCMO)`

2. **Add Merge Fields** (Custom subscriber fields):
   ```
   FNAME     - First Name (default)
   ROLE      - Role (Founder, CMO, Consultant, Other)
   COMPANY   - Company Stage (Pre-seed, Seed, Series A, Growth)
   INTERESTS - Content Interests (GEO, B2A, Tactics, Case Studies)
   SOURCE    - Signup Source (Website, Social, Referral, Event)
   ```

3. **Create Segments**:
   - **Founders**: ROLE = "Founder" OR "CEO"
   - **Agencies**: ROLE = "Consultant" OR "Agency"
   - **Incubators**: ROLE = "Program Director" OR "Mentor"

### Email Templates

1. **Create Newsletter Template** in Mailchimp:
   - Name: "aiCMO Weekly Newsletter Template"
   - Design: Single column, mobile-responsive
   - Include merge tags: `*|FNAME|*`, `*|UNSUB|*`

2. **Brand Styling**:
   - Primary Color: #C8102E (Crimson Red)
   - Secondary Color: #012169 (Navy Blue)
   - Font: Montserrat (headings), Inter (body)

### Domain Authentication

1. **Set up SPF Record**:
   ```
   v=spf1 include:servers.mcsv.net ?all
   ```

2. **Set up DKIM**:
   - Mailchimp → Account → Settings → Verified domains
   - Follow Mailchimp's domain verification process
   - Add DKIM records to your DNS

3. **Set up DMARC** (optional but recommended):
   ```
   v=DMARC1; p=none; rua=mailto:dmarc@ai.cmo.so
   ```

### Automation Workflows (via Mailchimp UI)

1. **Welcome Series**:
   - Trigger: New subscriber joins
   - Email 1: Welcome + value prop (immediate)
   - Email 2: First GEO tip (2 days later)
   - Email 3: Community invitation (5 days later)

2. **Re-engagement Campaign**:
   - Trigger: No open in 4 weeks
   - Email 1: "Still interested?" (Week 4)
   - Email 2: Final reminder + unsub option (Week 6)

---

## Testing the Integration

### Test 1: API Connection

Verify your Mailchimp API connectivity:

```bash
# Run the test connection script
node scripts/newsletter/test-mcp-connection.js
```

Expected output:
```
✅ All environment variables present
✅ API key format valid
✅ Mailchimp SDK available
✅ Mailchimp API connection successful
✅ Account information retrieved
✅ ALL CHECKS PASSED
```

### Test 2: Create Test Campaign

```bash
# Create a test campaign (won't send, just creates draft)
node scripts/newsletter/orchestrate.js test \
  --issue campaigns/weekly-newsletter/2025-01-13-issue-01.md
```

Expected output:
```
✅ Newsletter markdown parsed
✅ HTML template generated
✅ Mailchimp campaign created (ID: abc123)
✅ A/B test configured (5 subject line variants)
✅ Audience segments applied (Founders, Agencies)
✅ Campaign saved as DRAFT
```

### Test 3: Send Test Email

```bash
# Send test email to yourself
node scripts/newsletter/orchestrate.js send-test \
  --campaign-id abc123 \
  --email your-email@example.com
```

### Test 4: Fetch Campaign Reports

```bash
# Test metrics fetching
node scripts/newsletter/fetch-metrics.js --campaign-id abc123
```

Expected output:
```json
{
  "opens": 0,
  "clicks": 0,
  "opens_rate": 0,
  "clicks_rate": 0,
  "status": "draft"
}
```

---

## Troubleshooting

### Issue: "Invalid API Key"

**Cause**: API key format incorrect or expired

**Solution**:
1. Regenerate API key in Mailchimp
2. Ensure no extra spaces in `.env` file
3. Verify format: `xxxxx-usXX` (32 chars + dash + server prefix)

### Issue: "MCP Server Not Found"

**Cause**: Mailchimp SDK not installed

**Solution**:
```bash
# Install dependencies
npm install

# Verify Mailchimp SDK is installed
npm list @mailchimp/mailchimp_marketing
```

### Issue: "Template Not Found"

**Cause**: Template ID mismatch or template doesn't exist

**Solution**:
1. List all templates: `node scripts/newsletter/list-templates.js`
2. Update template ID in config
3. Or create template via script

### Issue: "Deliverability Score Low"

**Cause**: Domain not authenticated or spam-like content

**Solution**:
1. Complete domain authentication (SPF, DKIM, DMARC)
2. Review content for spam triggers
3. Warm up sender reputation (gradual sending increase)

### Issue: "Campaign Send Failed"

**Cause**: Missing required fields or compliance issues

**Solution**:
1. Verify all merge tags are populated
2. Check unsubscribe link is present
3. Ensure physical address in footer
4. Test with Mailchimp's content checker

---

## Next Steps

Once setup is complete:

1. ✅ **Run full test suite**: `npm run test:newsletter`
2. ✅ **Create first draft campaign**: Use orchestration script
3. ✅ **Review in Mailchimp UI**: Verify appearance and links
4. ✅ **Send test to team**: Get approval before live send
5. ✅ **Schedule first issue**: Set send time for launch

---

## Mailchimp API Capabilities

The Mailchimp Marketing API provides these operations:

### Campaign Management
- `create_campaign` - Create new email campaign
- `update_campaign` - Modify campaign settings
- `send_campaign` - Send campaign to audience
- `schedule_campaign` - Schedule future send
- `get_campaign_report` - Fetch performance metrics

### List Management
- `get_lists` - Retrieve all audience lists
- `add_subscriber` - Add new subscriber
- `update_subscriber` - Update subscriber data
- `get_segments` - Retrieve audience segments
- `create_segment` - Create new segment

### Template Management
- `get_templates` - List all email templates
- `create_template` - Create new template
- `update_template` - Modify existing template

### Automation
- `get_automations` - List automation workflows
- `create_automation` - Create new automation
- `start_automation` - Activate automation workflow

### Reports & Analytics
- `get_campaign_stats` - Overall campaign statistics
- `get_click_details` - Click tracking data
- `get_open_details` - Open tracking data
- `get_email_activity` - Individual subscriber activity

---

## Support Resources

- **Mailchimp API Docs**: https://mailchimp.com/developer/
- **MCP Server GitHub**: https://github.com/bryangsmith/mailchimp-mcp-server
- **Model Context Protocol**: https://modelcontextprotocol.io/
- **aiCMO Newsletter Strategy**: `/campaigns/weekly-newsletter/newsletter-strategy.md`

---

**Setup Status**: Ready for implementation
**Last Updated**: 2025-10-12
**Maintained By**: Peter (performance-analyst) + DevOps team
