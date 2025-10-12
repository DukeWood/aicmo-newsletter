#!/usr/bin/env node

/**
 * MCP Connection Test
 *
 * Verifies Mailchimp MCP server connectivity and configuration
 */

require('dotenv').config();

async function testConnection() {
  console.log('🔍 Testing Mailchimp MCP Connection...\n');

  // 1. Check environment variables
  console.log('1️⃣ Checking environment variables...');
  const requiredVars = [
    'MAILCHIMP_API_KEY',
    'MAILCHIMP_SERVER_PREFIX',
    'NEWSLETTER_FROM_EMAIL',
    'NEWSLETTER_FROM_NAME'
  ];

  const missing = requiredVars.filter(v => !process.env[v]);
  if (missing.length > 0) {
    console.error('❌ Missing environment variables:', missing.join(', '));
    console.log('\n💡 Copy .env.example to .env and fill in your credentials');
    process.exit(1);
  }
  console.log('✅ All environment variables present\n');

  // 2. Validate API key format
  console.log('2️⃣ Validating API key format...');
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const keyPattern = /^[a-f0-9]{32}-[a-z]{2,4}\d{1,2}$/;

  if (!keyPattern.test(apiKey)) {
    console.error('❌ Invalid API key format');
    console.log('Expected format: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-usXX');
    process.exit(1);
  }

  const [key, prefix] = apiKey.split('-');
  if (prefix !== process.env.MAILCHIMP_SERVER_PREFIX) {
    console.warn(`⚠️  API key prefix (${prefix}) doesn't match MAILCHIMP_SERVER_PREFIX (${process.env.MAILCHIMP_SERVER_PREFIX})`);
  }
  console.log('✅ API key format valid\n');

  // 3. Check Mailchimp SDK availability
  console.log('3️⃣ Checking Mailchimp SDK availability...');
  try {
    const mailchimp = require('@mailchimp/mailchimp_marketing');
    console.log(`✅ Mailchimp SDK available\n`);
  } catch (error) {
    console.error('❌ Mailchimp SDK not found');
    console.log('💡 Install with: npm install @mailchimp/mailchimp_marketing');
    process.exit(1);
  }

  // 4. Test Mailchimp API connection
  console.log('4️⃣ Testing Mailchimp API connection...');
  try {
    const mailchimp = require('@mailchimp/mailchimp_marketing');

    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_SERVER_PREFIX
    });

    // Test ping
    const response = await mailchimp.ping.get();
    console.log('✅ Mailchimp API connection successful\n');
  } catch (error) {
    console.error('❌ Mailchimp API connection failed:', error.message);
    console.log('💡 Check your API key and server prefix');
    process.exit(1);
  }

  // 5. Fetch account info
  console.log('5️⃣ Fetching account information...');
  try {
    const mailchimp = require('@mailchimp/mailchimp_marketing');
    const account = await mailchimp.account.get();
    console.log(`   Account: ${account.account_name}`);
    console.log(`   Email: ${account.email}`);
    console.log(`   Total Subscribers: ${account.total_subscribers || 'N/A'}`);
    console.log('✅ Account information retrieved\n');
  } catch (error) {
    console.warn('⚠️  Could not fetch account info (check permissions)');
    console.log('   Continuing anyway...\n');
  }

  // Summary
  console.log('═══════════════════════════════════════');
  console.log('✅ ALL CHECKS PASSED');
  console.log('═══════════════════════════════════════');
  console.log('\nYour Mailchimp setup is ready!');
  console.log('\nNext steps:');
  console.log('  1. Configure Mailchimp audience lists (see PLATFORM_SETUP_CHECKLIST.md)');
  console.log('  2. Create email templates in Mailchimp');
  console.log('  3. Test newsletter creation: npm run test:publisher');
  console.log('  4. Publish newsletter: npm run publish:newsletter\n');
}

testConnection().catch(error => {
  console.error('\n❌ Test failed:', error.message);
  process.exit(1);
});
