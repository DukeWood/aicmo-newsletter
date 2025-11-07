const { firefox } = require('playwright');
const fs = require('fs');

async function scrapeProductHuntComments(productUrl, totalPages = 5) {
  const browser = await firefox.launch({
    headless: true
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0'
  });
  const page = await context.newPage();

  const allComments = [];

  try {
    console.log(`🚀 Starting to scrape comments from Product Hunt...\n`);

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const url = `${productUrl}?page=${pageNum}#comments`;
      console.log(`📄 Fetching page ${pageNum}/${totalPages}...`);
      console.log(`   URL: ${url}`);

      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });

      // Wait for comments to load
      await page.waitForTimeout(3000);

      // Extract comments from current page
      const pageComments = await page.evaluate(() => {
        const comments = [];

        // Try multiple selectors for comments
        const commentSelectors = [
          '[data-test^="comment-"]',
          '[class*="comment"]',
          '[class*="Comment"]',
          'article',
          '[role="article"]'
        ];

        let commentElements = [];
        for (const selector of commentSelectors) {
          commentElements = document.querySelectorAll(selector);
          if (commentElements.length > 0) break;
        }

        if (commentElements.length === 0) {
          // Fallback: extract all text content
          const mainContent = document.querySelector('main') || document.body;
          return [{
            type: 'raw_html',
            content: mainContent.innerHTML.substring(0, 5000) // First 5000 chars
          }];
        }

        commentElements.forEach((element, index) => {
          try {
            // Extract author
            const authorElement = element.querySelector('[class*="author"]') ||
                                 element.querySelector('[class*="user"]') ||
                                 element.querySelector('a[href*="/users/"]') ||
                                 element.querySelector('strong') ||
                                 element.querySelector('b');
            const author = authorElement?.textContent?.trim() || 'Unknown';

            // Extract comment text
            const textElement = element.querySelector('p') ||
                               element.querySelector('[class*="text"]') ||
                               element.querySelector('[class*="body"]') ||
                               element.querySelector('div');
            const text = textElement?.textContent?.trim() || '';

            // Extract timestamp
            const timeElement = element.querySelector('time') ||
                               element.querySelector('[datetime]') ||
                               element.querySelector('[class*="time"]');
            const timestamp = timeElement?.getAttribute('datetime') ||
                             timeElement?.textContent?.trim() || '';

            // Extract upvotes/likes
            const votesElement = element.querySelector('[class*="vote"]') ||
                                element.querySelector('[class*="like"]') ||
                                element.querySelector('[aria-label*="vote"]');
            const votes = votesElement?.textContent?.trim() || '0';

            // Check if it's a reply (usually indented or nested)
            const isReply = element.closest('[class*="reply"]') ||
                           element.closest('[class*="child"]') ||
                           element.classList.contains('reply') ||
                           element.getAttribute('data-depth') > 0;

            // Get depth/nesting level
            let depth = 0;
            let parent = element.parentElement;
            while (parent) {
              if (parent.classList.contains('reply') ||
                  parent.classList.contains('child') ||
                  parent.getAttribute('data-depth')) {
                depth++;
              }
              parent = parent.parentElement;
            }

            if (text && text.length > 10) { // Only include if there's substantial text
              comments.push({
                index: index + 1,
                author,
                text,
                timestamp,
                votes,
                isReply,
                depth,
                type: isReply ? 'reply' : 'comment'
              });
            }
          } catch (err) {
            console.error(`Error extracting comment ${index}:`, err.message);
          }
        });

        return comments;
      });

      console.log(`   ✅ Extracted ${pageComments.length} comments/replies\n`);

      // Add page number to each comment
      pageComments.forEach(comment => {
        comment.page = pageNum;
      });

      allComments.push(...pageComments);

      // Be polite - wait between requests
      if (pageNum < totalPages) {
        await page.waitForTimeout(2000);
      }
    }

    console.log(`\n📊 EXTRACTION SUMMARY`);
    console.log(`═══════════════════════════════════════════════════════════════`);
    console.log(`Total comments extracted: ${allComments.length}`);

    const mainComments = allComments.filter(c => c.type === 'comment');
    const replies = allComments.filter(c => c.type === 'reply');

    console.log(`  - Main comments: ${mainComments.length}`);
    console.log(`  - Replies: ${replies.length}`);
    console.log(`  - Pages scraped: ${totalPages}`);

    // Save to JSON file
    const outputPath = '/home/user/aiCMO_Growth/temp/producthunt-comments.json';
    fs.writeFileSync(outputPath, JSON.stringify(allComments, null, 2));
    console.log(`\n💾 Saved to: ${outputPath}`);

    // Display first few comments as preview
    console.log(`\n📝 PREVIEW (First 5 comments):`);
    console.log(`═══════════════════════════════════════════════════════════════\n`);

    allComments.slice(0, 5).forEach((comment, idx) => {
      const indent = '  '.repeat(comment.depth || 0);
      const icon = comment.isReply ? '↳' : '💬';
      console.log(`${indent}${icon} ${comment.author} (Page ${comment.page})`);
      if (comment.timestamp) console.log(`${indent}   📅 ${comment.timestamp}`);
      if (comment.votes !== '0') console.log(`${indent}   🔺 ${comment.votes} votes`);
      console.log(`${indent}   "${comment.text.substring(0, 150)}${comment.text.length > 150 ? '...' : ''}"`);
      console.log('');
    });

    // Take a screenshot of the last page
    const screenshotPath = '/home/user/aiCMO_Growth/temp/producthunt-comments-page.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot saved to: ${screenshotPath}\n`);

    return allComments;

  } catch (error) {
    console.error('❌ Error scraping Product Hunt comments:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

// Main execution
const productUrl = 'https://www.producthunt.com/products/blogbowl-4';
const totalPages = 5;

scrapeProductHuntComments(productUrl, totalPages)
  .then((comments) => {
    console.log('\n✅ Scraping complete!');
    console.log(`\nTo view full results, check: temp/producthunt-comments.json`);
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Scraping failed:', error);
    process.exit(1);
  });
