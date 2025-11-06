# aiCMO Growth System

**AI-powered growth marketing orchestration with founding member acquisition**

Built with Claude Code agent framework, this system provides a comprehensive growth marketing suite led by Maggie, your AI Chief Marketing Officer (aiCMO). The primary focus is acquiring 500 founding members through coordinated acquisition, retention, and event marketing campaigns.

---

## Features

- **🚀 Growth Marketing Orchestration** - Maggie coordinates 7 specialized marketing agents for growth
- **👥 Founding Member Program** - Complete strategy for acquiring 500 founding members at £39/month
- **📧 Newsletter Automation** - Generate, design, and send retention-focused newsletters
- **📱 Social Media Management** - Automated posting to Twitter/X and LinkedIn for acquisition
- **🎨 Design Integration** - Canva API for automated campaign asset generation
- **📊 Performance Tracking** - Growth metrics, acquisition funnels, and ROI analysis
- **☁️ CDN Integration** - Cloudinary for image hosting and optimization

---

## Quick Links

### Documentation
- **[Canva Integration Guide](docs/CANVA_INTEGRATION_GUIDE.md)** - Complete guide for Canva Pro/Enterprise
- **[Canva Quick Reference](docs/CANVA_QUICK_REFERENCE.md)** - One-page cheat sheet
- **[CLAUDE.md](CLAUDE.md)** - Agent system architecture and usage

### Campaigns
- **Founding Member Acquisition** - See `campaigns/acquisition/founding-member-program/`
- **Newsletter (Retention)** - See `campaigns/retention/weekly-newsletter/`
- **Event Marketing** - See `campaigns/events/`

### Workflows
- **Social Media** - See `scripts/social/`
- **Image Generation** - See `scripts/canva/`
- **Newsletter Automation** - See `scripts/newsletter/`

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.template` and add your API keys:

```bash
cp .env.template .env
```

Required services:
- **Canva** - For design export ([Setup Guide](docs/CANVA_INTEGRATION_GUIDE.md))
- **Twitter/X** - For social media posting
- **Mailchimp** - For newsletter distribution
- **Cloudinary** - For image hosting

### 3. Authenticate Services

```bash
# Canva authentication
node scripts/canva/canva-oauth.js

# Test Twitter connection
node scripts/social/tweet.js "Test tweet from aiCMO! 🚀"
```

### 4. Export Canva Design & Post to Twitter

```bash
# Export design
node scripts/canva/export-design.js <DESIGN_ID> png ./temp/image.png

# Post to Twitter
node scripts/social/post-tweet-with-image.js "Your tweet text" ./temp/image.png
```

---

## Agent System

### Maggie (aiCMO) - The Orchestrator
Coordinates all marketing activities across 7 specialized agents.

### The Four Specialized Clusters

#### 1. Strategy & Research
- **Mark** - Market research, competitive intelligence, customer insights

#### 2. Content & Creative
- **Chris** - Content strategy, SEO/GEO optimization, editorial calendars
- **Brenda** - Brand strategy, messaging, voice/tone development

#### 3. Performance & Optimization
- **Peter** - Marketing analytics, A/B testing, ROI analysis
- **Grace** - Growth experiments, acquisition optimization, viral loops
- **Emily** - Email campaigns, automation workflows, segmentation

#### 4. Social & Community
- **Sophie** - Social media strategy, community management, content creation

**Learn more:** See [CLAUDE.md](CLAUDE.md) for complete agent documentation

---

## Common Workflows

### Event Promotion (Canva → Twitter)

```bash
# 1. Design event flyer in Canva (1200×675px)
# 2. Copy Design ID from URL
# 3. Export & post:

node scripts/canva/export-design.js DAG1wokOYPs png ./temp/event.png && \
node scripts/social/post-tweet-with-image.js "Event announcement 🎉" ./temp/event.png
```

### Newsletter Generation

```bash
# 1. Generate images
node scripts/newsletter/generate-images-canva.js campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md

# 2. Upload to Cloudinary
node scripts/newsletter/upload-to-cloudinary.js

# 3. Send test email
node scripts/newsletter/send-test-email.js campaigns/weekly-newsletter/issue-01/issue-01-newsletter.md your-email@example.com
```

### Social Media Batch Posts

```bash
# Export multiple designs
for id in DAG001 DAG002 DAG003; do
  node scripts/canva/export-design.js $id png ./temp/${id}.png
done

# Post with scheduling
node scripts/social/post-tweet-with-image.js "Post 1" ./temp/DAG001.png
node scripts/social/post-tweet-with-image.js "Post 2" ./temp/DAG002.png
node scripts/social/post-tweet-with-image.js "Post 3" ./temp/DAG003.png
```

---

## Repository Structure

```
aiCMO_Growth/
├── .claude/
│   ├── agents/              # 8 specialized marketing agents
│   └── mcp-config.json      # MCP server configuration
├── campaigns/
│   ├── acquisition/         # Growth & acquisition campaigns
│   │   └── founding-member-program/  # 500-member acquisition strategy
│   ├── retention/           # Engagement & retention campaigns
│   │   └── weekly-newsletter/        # Newsletter content & assets
│   ├── events/              # Event marketing campaigns
│   │   └── ldf25-post-event/         # Leeds Digital Festival
│   └── nov-2025-launch/     # Product launch campaign
├── docs/
│   ├── CANVA_INTEGRATION_GUIDE.md    # Canva full guide
│   ├── CANVA_QUICK_REFERENCE.md      # Canva cheat sheet
│   └── archive/                      # Archived documentation
├── knowledge_base/
│   ├── brand/               # Brand guidelines, competitive intel
│   ├── events/              # Event-specific content
│   └── guidelines/          # Platform policies
├── scripts/
│   ├── canva/               # Canva API integration
│   ├── newsletter/          # Newsletter automation
│   └── social/              # Social media posting
├── server/
│   └── oauth-server.js      # Production OAuth server
├── .env                     # Environment variables (secrets)
├── CLAUDE.md                # Agent system documentation
└── README.md                # This file
```

---

## Environment Variables

### Required

```bash
# Canva (for design export)
CANVA_CLIENT_ID=your-client-id
CANVA_CLIENT_SECRET=your-client-secret
CANVA_REDIRECT_URI=http://127.0.0.1:3001/oauth/redirect

# Twitter/X (for social media posting)
TWITTER_API_KEY=your-api-key
TWITTER_API_SECRET=your-api-secret
TWITTER_ACCESS_TOKEN=your-access-token
TWITTER_ACCESS_TOKEN_SECRET=your-access-token-secret

# Mailchimp (for newsletter distribution)
MAILCHIMP_API_KEY=your-api-key
MAILCHIMP_SERVER_PREFIX=us2
MAILCHIMP_LIST_ID=your-list-id

# Cloudinary (for image hosting)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Security:** Never commit `.env` to git! It's already in `.gitignore`.

---

## Technologies

- **Claude Code** - AI agent framework
- **Node.js** - Runtime environment
- **Canva Connect API** - Design automation
- **Twitter API v2** - Social media integration
- **Mailchimp API** - Email marketing
- **Cloudinary API** - Image CDN
- **Express.js** - OAuth server
- **MCP Servers** - Model Context Protocol integration

---

## Documentation

### Integration Guides
- **[Canva Integration](docs/CANVA_INTEGRATION_GUIDE.md)** - Complete Canva setup and usage
- **[Canva Quick Reference](docs/CANVA_QUICK_REFERENCE.md)** - One-page commands

### System Documentation
- **[CLAUDE.md](CLAUDE.md)** - Agent architecture and workflows
- **[Agent Definitions](.claude/agents/)** - Individual agent specifications

### Knowledge Base
- **[Brand Guidelines](knowledge_base/brand/)** - Brand identity, messaging, competitive landscape
- **[Events](knowledge_base/events/)** - Event-specific marketing content

---

## Troubleshooting

### Canva Issues
See [Canva Integration Guide](docs/CANVA_INTEGRATION_GUIDE.md#troubleshooting--faq)

### Twitter API
```bash
# Test connection
node scripts/social/tweet.js "Test tweet"
```

### Authentication
```bash
# Re-authenticate Canva
node scripts/canva/canva-oauth.js

# Check token expiry
cat .canva-tokens.json | jq '.expiresAt'
```

---

## Support

- **Canva API:** https://www.canva.dev/docs/connect/
- **Twitter API:** https://developer.twitter.com/en/docs
- **Mailchimp API:** https://mailchimp.com/developer/
- **Cloudinary API:** https://cloudinary.com/documentation

---

## License

Private - Internal use only

---

**Built with** ❤️ **by AI Marketing OS Ltd**

**Powered by:** Claude Code, Canva, Twitter, Mailchimp, Cloudinary
