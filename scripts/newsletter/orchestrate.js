#!/usr/bin/env node

/**
 * Newsletter Orchestration Script
 *
 * Main automation tool that coordinates the entire newsletter workflow:
 * - Converts markdown to Mailchimp HTML
 * - Creates campaigns via MCP
 * - Configures A/B tests
 * - Schedules sends
 * - Triggers social automation
 *
 * Usage:
 *   node orchestrate.js publish --issue path/to/issue.md --send-time "2025-01-13T09:00:00Z"
 *   node orchestrate.js test --issue path/to/issue.md
 *   node orchestrate.js send-test --campaign-id abc123 --email test@example.com
 */

require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const yaml = require('yaml-front-matter');
const MarkdownIt = require('markdown-it');
const { format } = require('date-fns');

// Initialize markdown parser
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

// MCP Client (simulated - will use actual MCP when server is running)
class MailchimpMCP {
  constructor(apiKey, serverPrefix) {
    this.apiKey = apiKey;
    this.serverPrefix = serverPrefix;
    this.baseUrl = `https://${serverPrefix}.api.mailchimp.com/3.0`;
  }

  async createCampaign(config) {
    // This would call the actual MCP server
    // For now, we'll structure the request properly
    console.log('📧 Creating Mailchimp campaign via MCP...');

    const campaign = {
      type: 'regular',
      recipients: {
        list_id: config.listId,
        segment_opts: config.segments
      },
      settings: {
        subject_line: config.subjectLine,
        preview_text: config.previewText,
        title: config.title,
        from_name: process.env.NEWSLETTER_FROM_NAME || 'Maggie (aiCMO)',
        reply_to: process.env.NEWSLETTER_REPLY_TO || 'hello@ai.cmo.so',
        auto_footer: false,
        inline_css: true
      }
    };

    // Simulate MCP call
    return {
      id: `campaign_${Date.now()}`,
      status: 'draft',
      settings: campaign.settings,
      ...campaign
    };
  }

  async setCampaignContent(campaignId, html) {
    console.log(`📝 Setting campaign content for ${campaignId}...`);
    return { success: true, campaignId };
  }

  async createABTest(campaignId, variants) {
    console.log(`🧪 Creating A/B test with ${variants.length} variants...`);
    return {
      campaignId,
      testType: 'subject',
      variants: variants.map((v, i) => ({ id: i, subject_line: v }))
    };
  }

  async scheduleCampaign(campaignId, sendTime) {
    console.log(`⏰ Scheduling campaign ${campaignId} for ${sendTime}...`);
    return { campaignId, scheduled_time: sendTime, status: 'scheduled' };
  }

  async sendTestEmail(campaignId, testEmails) {
    console.log(`📨 Sending test to ${testEmails.join(', ')}...`);
    return { campaignId, test_emails: testEmails, sent: true };
  }
}

// Markdown to Mailchimp HTML converter
class NewsletterPublisher {
  constructor() {
    this.mcpClient = new MailchimpMCP(
      process.env.MAILCHIMP_API_KEY,
      process.env.MAILCHIMP_SERVER_PREFIX
    );
  }

  async parseMarkdown(filePath) {
    console.log(`📄 Parsing newsletter markdown: ${filePath}`);

    const content = await fs.readFile(filePath, 'utf8');
    const parsed = yaml.loadFront(content);

    return {
      metadata: parsed,
      html: md.render(parsed.__content || ''),
      raw: parsed.__content || ''
    };
  }

  convertToMailchimpHTML(newsletter) {
    // Wrap content in Mailchimp-friendly template
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${newsletter.metadata.title || 'aiCMO Newsletter'}</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #1E1E1E;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      font-family: 'Montserrat', sans-serif;
      color: #C8102E;
      font-size: 28px;
      margin-bottom: 20px;
    }
    h2 {
      font-family: 'Montserrat', sans-serif;
      color: #012169;
      font-size: 22px;
      margin-top: 30px;
    }
    a {
      color: #C8102E;
      text-decoration: none;
    }
    .button {
      display: inline-block;
      background: #C8102E;
      color: white;
      padding: 12px 30px;
      border-radius: 6px;
      text-decoration: none;
      margin: 20px 0;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  ${newsletter.html}

  <div class="footer">
    <p>You're receiving this because you subscribed to aiCMO's weekly newsletter.</p>
    <p><a href="*|UNSUB|*">Unsubscribe</a> | <a href="*|UPDATE_PROFILE|*">Update preferences</a></p>
    <p>aiCMO | Building the future of AI-first marketing</p>
    <p>*|REWARDS|*</p>
  </div>
</body>
</html>
    `.trim();

    return html;
  }

  addUTMParameters(html, issueNumber) {
    // Add UTM parameters to all links
    const utmParams = `utm_source=newsletter&utm_medium=email&utm_campaign=weekly_issue_${issueNumber}`;

    return html.replace(
      /href="(https?:\/\/[^"]+)"/g,
      (match, url) => {
        const separator = url.includes('?') ? '&' : '?';
        return `href="${url}${separator}${utmParams}"`;
      }
    );
  }

  async publish(options) {
    const { issuePath, sendTime, segments = ['founders', 'agencies'], dryRun = false } = options;

    try {
      // 1. Parse newsletter markdown
      const newsletter = await this.parseMarkdown(issuePath);
      console.log(`✅ Parsed newsletter: ${newsletter.metadata.title}`);

      // 2. Convert to Mailchimp HTML
      let html = this.convertToMailchimpHTML(newsletter);

      // 3. Add UTM tracking
      const issueNumber = newsletter.metadata.issue || '01';
      html = this.addUTMParameters(html, issueNumber);
      console.log('✅ Added UTM tracking parameters');

      // 4. Create campaign
      const campaign = await this.mcpClient.createCampaign({
        listId: process.env.MAILCHIMP_LIST_ID || 'default_list',
        title: newsletter.metadata.title || `aiCMO Newsletter #${issueNumber}`,
        subjectLine: newsletter.metadata.subject_lines?.[0] || newsletter.metadata.title,
        previewText: newsletter.metadata.preview_text || '',
        segments: this.buildSegments(segments)
      });
      console.log(`✅ Campaign created: ${campaign.id}`);

      // 5. Set content
      await this.mcpClient.setCampaignContent(campaign.id, html);
      console.log('✅ Campaign content uploaded');

      // 6. Configure A/B test (if multiple subject lines)
      if (newsletter.metadata.subject_lines && newsletter.metadata.subject_lines.length > 1) {
        await this.mcpClient.createABTest(campaign.id, newsletter.metadata.subject_lines);
        console.log('✅ A/B test configured');
      }

      // 7. Schedule or send
      if (!dryRun && sendTime) {
        await this.mcpClient.scheduleCampaign(campaign.id, sendTime);
        console.log(`✅ Campaign scheduled for ${sendTime}`);
      } else {
        console.log('✅ Campaign saved as DRAFT (use --send-time to schedule)');
      }

      return {
        success: true,
        campaignId: campaign.id,
        issueNumber,
        scheduled: !!sendTime && !dryRun
      };

    } catch (error) {
      console.error('❌ Publishing failed:', error.message);
      throw error;
    }
  }

  buildSegments(segments) {
    const segmentMap = {
      founders: { field: 'ROLE', op: 'is', value: 'Founder' },
      agencies: { field: 'ROLE', op: 'is', value: 'Consultant' },
      incubators: { field: 'ROLE', op: 'is', value: 'Program Director' }
    };

    return {
      match: 'any',
      conditions: segments.map(seg => segmentMap[seg]).filter(Boolean)
    };
  }

  async sendTest(campaignId, testEmails) {
    return await this.mcpClient.sendTestEmail(campaignId, testEmails);
  }
}

// CLI Handler
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const publisher = new NewsletterPublisher();

  switch (command) {
    case 'publish': {
      const issuePath = getArg(args, '--issue');
      const sendTime = getArg(args, '--send-time');
      const segments = getArg(args, '--segments')?.split(',') || ['founders', 'agencies'];
      const dryRun = args.includes('--dry-run');

      if (!issuePath) {
        console.error('❌ Missing --issue argument');
        process.exit(1);
      }

      const result = await publisher.publish({ issuePath, sendTime, segments, dryRun });
      console.log('\n🎉 Publishing complete!');
      console.log(JSON.stringify(result, null, 2));
      break;
    }

    case 'test': {
      const issuePath = getArg(args, '--issue');
      if (!issuePath) {
        console.error('❌ Missing --issue argument');
        process.exit(1);
      }

      const result = await publisher.publish({
        issuePath,
        dryRun: true
      });
      console.log('\n✅ Test complete - Campaign created as DRAFT');
      console.log(JSON.stringify(result, null, 2));
      break;
    }

    case 'send-test': {
      const campaignId = getArg(args, '--campaign-id');
      const email = getArg(args, '--email');

      if (!campaignId || !email) {
        console.error('❌ Missing --campaign-id or --email arguments');
        process.exit(1);
      }

      await publisher.sendTest(campaignId, [email]);
      console.log(`✅ Test email sent to ${email}`);
      break;
    }

    default:
      console.log(`
Usage: node orchestrate.js <command> [options]

Commands:
  publish       Publish newsletter to Mailchimp
  test          Create draft campaign without sending
  send-test     Send test email

Options:
  --issue <path>           Path to newsletter markdown file (required)
  --send-time <ISO8601>    Schedule send time (e.g., "2025-01-13T09:00:00Z")
  --segments <list>        Comma-separated segments (e.g., "founders,agencies")
  --campaign-id <id>       Campaign ID for test sends
  --email <address>        Test email recipient
  --dry-run                Create campaign but don't schedule

Examples:
  node orchestrate.js publish --issue campaigns/weekly-newsletter/2025-01-13-issue-01.md --send-time "2025-01-13T09:00:00Z"
  node orchestrate.js test --issue campaigns/weekly-newsletter/2025-01-13-issue-01.md
  node orchestrate.js send-test --campaign-id abc123 --email test@example.com
      `);
  }
}

function getArg(args, flag) {
  const index = args.indexOf(flag);
  return index >= 0 && args[index + 1] ? args[index + 1] : null;
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { NewsletterPublisher, MailchimpMCP };
