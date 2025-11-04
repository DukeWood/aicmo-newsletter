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

const CAMPAIGN_ID = '218c2178e4';

async function updateCampaignSender() {
  try {
    console.log('🔄 Updating Mailchimp campaign sender and content...\n');

    // Step 1: Update campaign settings (sender information)
    console.log('📧 Updating sender information...');
    await mailchimp.campaigns.update(CAMPAIGN_ID, {
      settings: {
        from_name: 'Maggie from aiCMO Discovered by AI Weekly',
        reply_to: 'Maggie@aimarketing.so',
      },
    });
    console.log('✅ Sender information updated\n');

    // Step 2: Read the updated email HTML (with archive link)
    const emailHtmlPath = path.join(
      __dirname,
      '../../campaigns/weekly-newsletter/issue-01/assets/manual_newsletters/invisible-to-ai-email.html'
    );

    if (!fs.existsSync(emailHtmlPath)) {
      throw new Error(`Email HTML not found at: ${emailHtmlPath}`);
    }

    const emailHtml = fs.readFileSync(emailHtmlPath, 'utf-8');

    // Step 3: Update the campaign content
    console.log('📝 Updating campaign content with archive link...');
    await mailchimp.campaigns.setContent(CAMPAIGN_ID, {
      html: emailHtml,
    });
    console.log('✅ Campaign content updated\n');

    // Step 4: Get campaign details to verify
    const campaign = await mailchimp.campaigns.get(CAMPAIGN_ID);

    console.log('📊 Updated Campaign Details:');
    console.log(`   Campaign ID: ${campaign.id}`);
    console.log(`   Title: ${campaign.settings.title}`);
    console.log(`   Subject: ${campaign.settings.subject_line}`);
    console.log(`   From: ${campaign.settings.from_name} <${campaign.settings.reply_to}>`);
    console.log(`   Status: ${campaign.status}`);
    console.log(`   Recipients: ${campaign.recipients.list_name}`);
    console.log('');
    console.log('✨ Updates Applied:');
    console.log('   ✅ Sender: "Maggie from aiCMO Discovered by AI Weekly"');
    console.log('   ✅ Reply-to: Maggie@aimarketing.so');
    console.log('   ✅ Archive link: Added "View in browser" at top');
    console.log('   ✅ Content: All newsletter sections with signup CTAs');
    console.log('');
    console.log('📝 Next Steps:');
    console.log('   1. Preview the updated email in Mailchimp');
    console.log('   2. Send a test to yourself');
    console.log('   3. Schedule or send when ready');
    console.log('');
    console.log(`🌐 View in Mailchimp: https://${process.env.MAILCHIMP_SERVER_PREFIX}.admin.mailchimp.com/campaigns/show/?id=${campaign.web_id}`);

  } catch (error) {
    console.error('❌ Error updating campaign:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response.body, null, 2));
    }
    throw error;
  }
}

updateCampaignSender();
