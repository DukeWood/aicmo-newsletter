#!/usr/bin/env node

import mailchimp from '@mailchimp/mailchimp_marketing';
import dotenv from 'dotenv';

dotenv.config();

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

async function listAudiences() {
  try {
    console.log('📋 Fetching Mailchimp audiences...\n');

    const response = await mailchimp.lists.getAllLists();

    if (!response.lists || response.lists.length === 0) {
      console.log('❌ No audiences found.');
      return;
    }

    console.log(`✅ Found ${response.lists.length} audience(s):\n`);

    response.lists.forEach((list, index) => {
      console.log(`${index + 1}. ${list.name}`);
      console.log(`   ID: ${list.id}`);
      console.log(`   Members: ${list.stats.member_count}`);
      console.log(`   Unsubscribed: ${list.stats.unsubscribe_count}`);
      console.log('');
    });

    return response.lists;
  } catch (error) {
    console.error('❌ Error fetching audiences:', error.message);
    if (error.response) {
      console.error('Response:', error.response.body);
    }
  }
}

listAudiences();
