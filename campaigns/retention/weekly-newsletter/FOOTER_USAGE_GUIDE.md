# Newsletter Footer Usage Guide

## "Discovered by AI Weekly" by aiCMO

---

## 📁 Files Created

1. **`newsletter-footer.html`** - Full HTML document with complete structure
2. **`footer-copy-paste.html`** - Simplified version ready to copy and paste
3. **`newsletter-footer-template.md`** - Original Markdown template with documentation

---

## 🎯 How to Use

### For LinkedIn Articles

1. **Open:** `footer-copy-paste.html` in your browser or text editor
2. **Copy:** Everything between the "COPY FROM HERE" and "COPY UNTIL HERE" markers
3. **Paste into LinkedIn:**
   - Go to LinkedIn → Write Article
   - Switch to HTML mode (click `</>` icon in editor)
   - Paste the HTML code at the bottom of your article
   - Switch back to visual editor to preview
   - Publish

**LinkedIn HTML Editor Access:**
- Click on "Write article" from your LinkedIn homepage
- Look for the three dots (`...`) in the toolbar
- Select "Edit HTML" or press `Ctrl + Shift + H` (Windows) or `Cmd + Shift + H` (Mac)

### For Email (Mailchimp, Gmail, etc.)

1. **Open:** `footer-copy-paste.html` in your text editor
2. **Copy:** The entire HTML code
3. **Paste into your email client:**

   **Mailchimp:**
   - Drag "Code" block into your email template
   - Paste the HTML code
   - Preview and send test

   **Gmail (Rich Text):**
   - Open the HTML file in Chrome/Firefox
   - The browser will render the footer
   - Right-click → "Select All" on the rendered output
   - Copy and paste into Gmail compose window

   **Other Email Platforms:**
   - Most email platforms have an "HTML" or "Code" editor mode
   - Paste the HTML code directly into that editor

### For Substack or Ghost

1. **Open:** `newsletter-footer-template.md`
2. **Copy:** The Markdown version under "Footer Design (Markdown Format)"
3. **Paste:** At the bottom of your Substack/Ghost post
4. **Adjust:** Platform-specific merge tags if needed

---

## 🎨 What's Included in the Footer

### Sections:

1. **🚀 Main CTA** - "Ready to Get Discovered by AI?"
   - Start Free button
   - Upgrade to Autopilot button
   - Learn More About GEO button

2. **📬 About Newsletter** - Description of "Discovered by AI Weekly"
   - What readers get each week
   - Publisher info (aiCMO)

3. **🌐 Connect** - Social media links
   - Twitter/X: @aiCMO_uk
   - LinkedIn: aiCMO company page
   - Website: aicmo.co
   - Email: hello@aimarketing.so

4. **🎁 Founding Member CTA** - Urgency banner
   - £39/month locked forever
   - 347/500 spots remaining
   - 5 key benefits listed
   - CTA button

5. **🤝 Referral** - Spread the word section
   - Forward email link
   - Social sharing buttons
   - Referral bonus (3 friends = 3 months free)

6. **⚙️ Preferences** - Subscription management
   - Update preferences link
   - Unsubscribe link

7. **📍 Legal** - Compliance footer
   - Company info
   - Business address (UK)
   - Privacy policy & terms links

8. **© Copyright** - Branding tagline
   - "Powered by AI. Built for Humans." 🤖❤️

---

## 🔧 Customization

### Update These Fields Before Using:

1. **Company Number:**
   ```html
   Company No. [TBC]
   ```
   Replace `[TBC]` with your actual UK company registration number

2. **Subscriber Email:**
   ```html
   <strong>Your email:</strong> [subscriber@email.com]
   ```
   Replace with dynamic merge tag:
   - **Mailchimp:** `*|EMAIL|*`
   - **ConvertKit:** `{{ subscriber.email_address }}`
   - **Substack:** Automatically populated

3. **Spots Remaining:**
   ```html
   <strong>347 of 500 spots remaining</strong>
   ```
   Update this number manually as spots fill up, or connect to a dynamic counter

4. **Social Media Handles:**
   - Confirm Twitter handle is correct: `@aiCMO_uk`
   - Update LinkedIn company ID if needed: `108297743`

---

## 🎨 Brand Colors Used

- **Crimson Red:** `#C8102E` (primary CTAs, headings)
- **Navy Blue:** `#012169` (secondary CTAs, subheadings)
- **White:** `#ffffff` (card backgrounds)
- **Light Gray:** `#f9f9f9` (section backgrounds)
- **Dark Gray:** `#333333` (body text)
- **Medium Gray:** `#666666` (secondary text)
- **Border Gray:** `#E0E0E0` (dividers)
- **Legal Gray:** `#999999` (fine print)

---

## 📱 Mobile Responsive

The footer is **fully responsive** with:
- Buttons stack vertically on mobile
- Text sizes adjust for readability
- Sections maintain proper spacing
- Links are tap-friendly (44px minimum)

**Test on these devices:**
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Desktop (Chrome, Firefox, Edge)

---

## ✅ Compliance Checklist

The footer includes all required elements for:

**✅ CAN-SPAM Act (US):**
- Physical mailing address
- Clear unsubscribe link
- Reason for receiving email

**✅ GDPR (UK/EU):**
- Privacy policy link
- Preference management
- Data controller information

**✅ Email Best Practices:**
- Social proof (500+ subscribers)
- Forward/share options
- Reply encouragement
- Clear branding

---

## 🚀 Quick Start (3 Steps)

### Step 1: Choose Your Platform
- **LinkedIn Article** → Use `footer-copy-paste.html`
- **Email (Mailchimp)** → Use `footer-copy-paste.html`
- **Substack/Ghost** → Use Markdown version from `newsletter-footer-template.md`

### Step 2: Customize
- Update company number
- Confirm social media links
- Update spots remaining (347/500)

### Step 3: Copy & Paste
- Copy HTML code
- Paste into your platform
- Preview to verify rendering
- Send test email to yourself

---

## 🔍 Testing Checklist

Before sending to your full list:

- [ ] All links work (click every button)
- [ ] Colors display correctly (crimson + navy)
- [ ] Mobile responsive (test on phone)
- [ ] Buttons are clickable (not too small)
- [ ] Text is readable (not cut off)
- [ ] Unsubscribe link works
- [ ] Social links go to correct profiles
- [ ] Legal info is accurate
- [ ] No typos in company name/address

---

## 💡 Pro Tips

### Tip 1: Dynamic Countdown
To make the "347/500 spots" countdown dynamic:
- Store count in your database
- Use platform merge tags to inject value
- Update automatically when someone signs up

### Tip 2: Personalization
Add subscriber's first name:
```html
<p>Hi {{first_name}},</p>
```

### Tip 3: A/B Testing
Test different versions:
- Footer with/without founding member CTA
- Long footer vs short footer
- CTA button colors (red vs blue)

### Tip 4: Analytics Tracking
Add UTM parameters to links:
```html
https://aicmo.co/signup?utm_source=newsletter&utm_medium=email&utm_campaign=discovered_by_ai_weekly
```

---

## 🆘 Troubleshooting

### Issue: Footer looks broken in email client

**Solution:**
- Gmail/Outlook may strip some CSS
- Use inline styles (already done in this footer)
- Test with Litmus or Email on Acid
- Send test to multiple email clients

### Issue: Links don't work

**Solution:**
- Verify URLs are correct (no typos)
- Ensure `https://` is included
- Check for URL encoding issues
- Test in incognito/private browser

### Issue: Footer is too long

**Solution:**
- Remove referral section if not needed
- Shorten founding member benefits to 3 items
- Use "Minimal Footer" version (create if needed)

### Issue: Colors don't match brand

**Solution:**
- Find/replace hex codes:
  - `#C8102E` (crimson) → your primary color
  - `#012169` (navy) → your secondary color
- Maintain sufficient contrast for readability

---

## 📞 Support

If you need help with the footer:

1. **Check this guide first** - Most answers are here
2. **Test in different platforms** - LinkedIn, Gmail, Mailchimp
3. **View rendered HTML** - Open `.html` file in browser to see visual output

---

## 📊 Performance Metrics to Track

Monitor these footer metrics:

- **CTA click rate:** % who click "Start Free" or "Upgrade"
- **Social follows:** New Twitter/LinkedIn followers from footer
- **Founding member conversions:** % who click founding member CTA
- **Referral clicks:** % who click "Get your referral link"
- **Unsubscribe rate:** Keep below 0.5% per send

**Goal:** 5-10% click-through rate on primary CTAs

---

## 🎉 You're Ready!

Your "Discovered by AI Weekly" footer is:
✅ Professionally designed
✅ Mobile responsive
✅ Legally compliant
✅ Brand consistent
✅ Conversion optimized

**Next step:** Copy, paste, and start sending! 🚀

---

**Questions?** Email hello@aimarketing.so

**Last Updated:** November 2025
