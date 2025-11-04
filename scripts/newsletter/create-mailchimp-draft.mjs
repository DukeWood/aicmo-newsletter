#!/usr/bin/env node

import mailchimp from '@mailchimp/mailchimp_marketing';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

const LIST_ID = '84834d503f'; // AI Marketing OS audience

async function createDraftCampaign() {
  try {
    // Read the email HTML
    const emailHtmlPath = path.join(
      __dirname,
      '../../campaigns/weekly-newsletter/issue-01/assets/manual_newsletters/invisible-to-ai-email.html'
    );

    if (!fs.existsSync(emailHtmlPath)) {
      throw new Error(`Email HTML not found at: ${emailHtmlPath}`);
    }

    const emailHtml = fs.readFileSync(emailHtmlPath, 'utf-8');

    console.log('📧 Creating Mailchimp draft campaign...\n');

    // Create the campaign
    const campaign = await mailchimp.campaigns.create({
      type: 'regular',
      recipients: {
        list_id: LIST_ID,
      },
      settings: {
        subject_line: 'Why Your Startup Is Invisible to AI(and how to fix it before your competitors do).',
        preview_text: 'HubSpot lost 80% of its traffic to AI. Learn how GEO can save your startup.',
        title: 'Newsletter - Invisible to AI',
        from_name: 'Maggie from aiCMO',
        reply_to: 'hello@aimarketing.so',
      },
    });

    console.log(`✅ Campaign created: ${campaign.id}`);
    console.log(`📋 Campaign status: ${campaign.status}`);

    // Set the campaign content
    await mailchimp.campaigns.setContent(campaign.id, {
      html: emailHtml,
    });

    console.log('✅ Campaign content uploaded\n');

    // Get the campaign web URL
    console.log('🔗 Campaign Details:');
    console.log(`   ID: ${campaign.id}`);
    console.log(`   Status: Draft`);
    console.log(`   Subject: ${campaign.settings.subject_line}`);
    console.log(`   List: AI Marketing OS (${LIST_ID})`);
    console.log(`   Recipients: 34 members`);
    console.log(`   From: ${campaign.settings.from_name} <${campaign.settings.reply_to}>`);
    console.log('');
    console.log('📝 Next Steps:');
    console.log('   1. Go to Mailchimp dashboard');
    console.log('   2. Find campaign: "Newsletter - Invisible to AI"');
    console.log('   3. Preview the email');
    console.log('   4. Send test to yourself');
    console.log('   5. Schedule or send when ready');
    console.log('');
    console.log(`🌐 View in Mailchimp: https://${process.env.MAILCHIMP_SERVER_PREFIX}.admin.mailchimp.com/campaigns/show/?id=${campaign.web_id}`);

    return campaign;
  } catch (error) {
    console.error('❌ Error creating campaign:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response.body, null, 2));
    }
    throw error;
  }
}

createDraftCampaign();
