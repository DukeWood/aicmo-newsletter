#!/usr/bin/env node

/**
 * Send Test Email
 * Creates a test campaign and sends it to specific email addresses
 */

require('dotenv').config();
const fs = require('fs').promises;
const mailchimp = require('@mailchimp/mailchimp_marketing');
const yaml = require('yaml-front-matter');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

async function sendTestEmail(newsletterPath, testEmails) {
  console.log('🧪 Sending Test Newsletter...\n');

  // Configure Mailchimp
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX
  });

  try {
    // 1. Read and parse newsletter
    console.log('📄 Reading newsletter file...');
    const content = await fs.readFile(newsletterPath, 'utf8');
    const parsed = yaml.loadFront(content);
    const html = md.render(parsed.__content || '');

    // 2. Wrap in template
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${parsed.title || 'aiCMO Newsletter'}</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #1E1E1E;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h1 {
      font-family: 'Montserrat', sans-serif;
      color: #C8102E;
      font-size: 28px;
      margin-bottom: 20px;
      border-bottom: 3px solid #C8102E;
      padding-bottom: 10px;
    }
    h2 {
      font-family: 'Montserrat', sans-serif;
      color: #012169;
      font-size: 22px;
      margin-top: 30px;
    }
    h3 {
      font-family: 'Montserrat', sans-serif;
      color: #012169;
      font-size: 18px;
      margin-top: 20px;
    }
    a {
      color: #C8102E;
      text-decoration: none;
      font-weight: 500;
    }
    a:hover {
      text-decoration: underline;
    }
    ul, ol {
      padding-left: 20px;
    }
    li {
      margin-bottom: 8px;
    }
    hr {
      border: none;
      border-top: 1px solid #ddd;
      margin: 30px 0;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #ddd;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
    blockquote {
      border-left: 4px solid #C8102E;
      padding-left: 20px;
      margin-left: 0;
      color: #666;
      font-style: italic;
    }
    code {
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
  </style>
</head>
<body>
  <div class="container">
    ${html}

    <div class="footer">
      <p><strong>This is a test email from your aiCMO newsletter automation system.</strong></p>
      <p>AI Marketing OS | Building the future of AI-first marketing</p>
      <p><a href="https://ai.cmo.so">ai.cmo.so</a></p>
    </div>
  </div>
</body>
</html>
    `.trim();

    // 3. Create campaign
    console.log('📧 Creating test campaign...');
    const campaign = await mailchimp.campaigns.create({
      type: 'regular',
      recipients: {
        list_id: process.env.MAILCHIMP_LIST_ID
      },
      settings: {
        subject_line: parsed.subject_lines?.[0] || parsed.title || 'Test Newsletter',
        preview_text: parsed.preview_text || 'Test email from aiCMO',
        title: `TEST - ${parsed.title || 'Newsletter'}`,
        from_name: process.env.NEWSLETTER_FROM_NAME || 'Maggie (aiCMO)',
        reply_to: process.env.NEWSLETTER_REPLY_TO || 'hello@ai.cmo.so',
        auto_footer: false,
        inline_css: true
      }
    });

    console.log(`✅ Campaign created: ${campaign.id}`);

    // 4. Set content
    console.log('📝 Setting campaign content...');
    await mailchimp.campaigns.setContent(campaign.id, {
      html: emailHtml
    });

    console.log('✅ Content uploaded');

    // 5. Send test
    console.log(`📨 Sending test to: ${testEmails.join(', ')}...`);
    await mailchimp.campaigns.sendTestEmail(campaign.id, {
      test_emails: testEmails,
      send_type: 'html'
    });

    console.log('\n🎉 Test email sent successfully!\n');
    console.log('Check your inbox at:', testEmails[0]);
    console.log('\n⚠️  Note: Campaign saved as draft. To delete:');
    console.log(`   Visit Mailchimp → Campaigns → Find "${campaign.settings.title}" → Delete`);
    console.log(`   Or keep it for reference!\n`);

    return campaign;

  } catch (error) {
    console.error('\n❌ Error sending test email:', error.message);
    if (error.response?.body) {
      console.error('Details:', JSON.stringify(error.response.body, null, 2));
    }
    throw error;
  }
}

// CLI Handler
async function main() {
  const args = process.argv.slice(2);
  const newsletterPath = args[0] || 'campaigns/weekly-newsletter/test-issue.md';
  const email = args[1] || process.env.TEST_EMAIL;

  if (!email) {
    console.error('❌ Please provide test email address');
    console.log('\nUsage: node send-test-email.js <newsletter-file> <email>');
    console.log('Example: node send-test-email.js campaigns/weekly-newsletter/test-issue.md jason@aimarketing.so\n');
    process.exit(1);
  }

  await sendTestEmail(newsletterPath, [email]);
}

if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { sendTestEmail };
