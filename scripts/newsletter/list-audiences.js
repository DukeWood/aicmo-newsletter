#!/usr/bin/env node

/**
 * List Mailchimp Audiences
 * Verifies access to your configured audience list
 */

require('dotenv').config();
const mailchimp = require('@mailchimp/mailchimp_marketing');

async function listAudiences() {
  console.log('📋 Fetching Mailchimp Audiences...\n');

  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX
  });

  try {
    // Get all lists
    const response = await mailchimp.lists.getAllLists();

    console.log(`Found ${response.lists.length} audience(s):\n`);

    response.lists.forEach((list, index) => {
      console.log(`${index + 1}. ${list.name}`);
      console.log(`   ID: ${list.id}`);
      console.log(`   Members: ${list.stats.member_count}`);
      console.log(`   Unsubscribed: ${list.stats.unsubscribe_count}`);
      console.log(`   Cleaned: ${list.stats.cleaned_count}`);

      if (list.id === process.env.MAILCHIMP_LIST_ID) {
        console.log(`   ✅ This is your configured list!`);
      }
      console.log('');
    });

    // Get specific list details
    if (process.env.MAILCHIMP_LIST_ID) {
      console.log('📊 Your Configured List Details:\n');
      const list = await mailchimp.lists.getList(process.env.MAILCHIMP_LIST_ID);

      console.log(`Name: ${list.name}`);
      console.log(`ID: ${list.id}`);
      console.log(`Total Subscribers: ${list.stats.member_count}`);
      console.log(`Open Rate: ${(list.stats.open_rate * 100).toFixed(2)}%`);
      console.log(`Click Rate: ${(list.stats.click_rate * 100).toFixed(2)}%`);
      console.log(`\nFrom: ${list.campaign_defaults.from_name} <${list.campaign_defaults.from_email}>`);
      console.log(`Subject: ${list.campaign_defaults.subject}`);

      console.log('\n✅ Successfully connected to your audience list!');
      console.log('You can now create and send campaigns to this list.\n');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response?.body) {
      console.error('Details:', error.response.body);
    }
    process.exit(1);
  }
}

listAudiences().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
