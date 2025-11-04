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

const CAMPAIGN_ID = '218c2178e4'; // Your existing campaign ID

async function updateCampaign() {
  try {
    // Read the updated email HTML
    const emailHtmlPath = path.join(
      __dirname,
      '../../campaigns/weekly-newsletter/issue-01/assets/manual_newsletters/invisible-to-ai-email.html'
    );

    if (!fs.existsSync(emailHtmlPath)) {
      throw new Error(`Email HTML not found at: ${emailHtmlPath}`);
    }

    const emailHtml = fs.readFileSync(emailHtmlPath, 'utf-8');

    console.log('🔄 Updating Mailchimp campaign...\n');

    // Update the campaign content
    await mailchimp.campaigns.setContent(CAMPAIGN_ID, {
      html: emailHtml,
    });

    console.log(`✅ Campaign ${CAMPAIGN_ID} updated successfully!\n`);

    // Get campaign details
    const campaign = await mailchimp.campaigns.get(CAMPAIGN_ID);

    console.log('📧 Updated Campaign Details:');
    console.log(`   Campaign: ${campaign.settings.title}`);
    console.log(`   Subject: ${campaign.settings.subject_line}`);
    console.log(`   Status: ${campaign.status}`);
    console.log(`   Recipients: ${campaign.recipients.list_name}`);
    console.log('');
    console.log('✨ New sections added:');
    console.log('   • 🚀 Ready to Get Discovered by AI?');
    console.log('   • 📬 About This Newsletter');
    console.log('   • 🌐 Connect With Us');
    console.log('   • 🎁 Founding Member Program (£15/month)');
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

updateCampaign();
