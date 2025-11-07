const { firefox } = require('playwright');

async function scrapeProductHunt() {
  const browser = await firefox.launch({
    headless: true
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0'
  });
  const page = await context.newPage();

  try {
    console.log('🚀 Navigating to Product Hunt with Firefox...');
    await page.goto('https://www.producthunt.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    // Wait for page to fully load
    await page.waitForTimeout(3000);
    console.log('📊 Extracting today\'s launches...\n');

    // Extract today's products
    const products = await page.evaluate(() => {
      const productElements = document.querySelectorAll('[data-test^="post-item-"]');
      const results = [];

      productElements.forEach((element, index) => {
        try {
          // Get product name
          const nameElement = element.querySelector('a[href^="/posts/"]');
          const name = nameElement?.textContent?.trim() || 'N/A';
          const url = nameElement?.href || '';

          // Get tagline/description
          const taglineElement = element.querySelector('[class*="tagline"]') ||
                                  element.querySelector('[class*="description"]');
          const tagline = taglineElement?.textContent?.trim() || '';

          // Get upvotes
          const votesElement = element.querySelector('[class*="vote"]') ||
                               element.querySelector('[aria-label*="vote"]');
          const votes = votesElement?.textContent?.trim() || '0';

          // Get comments count
          const commentsElement = element.querySelector('[href*="#comments"]');
          const comments = commentsElement?.textContent?.trim() || '0';

          if (name && name !== 'N/A') {
            results.push({
              rank: index + 1,
              name,
              tagline,
              votes,
              comments,
              url
            });
          }
        } catch (err) {
          console.error(`Error extracting product ${index}:`, err.message);
        }
      });

      return results;
    });

    // Display results
    if (products.length === 0) {
      console.log('⚠️  No products found. Product Hunt may have changed their HTML structure.');
    } else {
      console.log(`✅ Found ${products.length} products launched today:\n`);
      console.log('═══════════════════════════════════════════════════════════════\n');

      products.forEach(product => {
        console.log(`#${product.rank} ${product.name}`);
        if (product.tagline) console.log(`   ${product.tagline}`);
        console.log(`   🔺 ${product.votes} upvotes | 💬 ${product.comments} comments`);
        if (product.url) console.log(`   🔗 ${product.url}`);
        console.log('');
      });
    }

    // Take a screenshot for reference
    await page.screenshot({ path: '/home/user/aiCMO_Growth/temp/producthunt-today.png', fullPage: true });
    console.log('📸 Screenshot saved to: temp/producthunt-today.png');

    return products;

  } catch (error) {
    console.error('❌ Error scraping Product Hunt:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

scrapeProductHunt()
  .then(() => {
    console.log('\n✅ Scraping complete!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Scraping failed:', error);
    process.exit(1);
  });
