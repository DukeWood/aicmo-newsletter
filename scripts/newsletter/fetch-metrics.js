#!/usr/bin/env node

/**
 * Newsletter Metrics Fetcher
 *
 * Pulls performance data from Mailchimp via MCP and generates reports.
 * Used by Peter (performance-analyst) for dashboard updates.
 *
 * Usage:
 *   node fetch-metrics.js --campaign-id abc123
 *   node fetch-metrics.js --all --since "2025-01-01"
 *   node fetch-metrics.js --dashboard
 */

require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const { format } = require('date-fns');

class MetricsFetcher {
  constructor(apiKey, serverPrefix) {
    this.apiKey = apiKey;
    this.serverPrefix = serverPrefix;
  }

  async getCampaignReport(campaignId) {
    console.log(`📊 Fetching report for campaign: ${campaignId}`);

    // This would use actual MCP server
    // For now, simulating the structure
    const report = {
      campaign_id: campaignId,
      campaign_title: 'aiCMO Newsletter #01',
      send_time: new Date().toISOString(),
      emails_sent: 1250,
      abuse_reports: 0,
      unsubscribed: 3,
      hard_bounces: 2,
      soft_bounces: 5,
      syntax_errors: 0,
      forwards: 45,
      forwards_opens: 38,
      opens: {
        opens_total: 512,
        unique_opens: 495,
        open_rate: 0.396, // 39.6%
        last_open: new Date().toISOString()
      },
      clicks: {
        clicks_total: 128,
        unique_clicks: 98,
        click_rate: 0.0784, // 7.84%
        last_click: new Date().toISOString()
      },
      list_stats: {
        sub_rate: 0.12,
        unsub_rate: 0.0024,
        open_rate: 0.396,
        click_rate: 0.0784
      }
    };

    return report;
  }

  async getClickDetails(campaignId) {
    console.log(`🖱️ Fetching click details for campaign: ${campaignId}`);

    return {
      campaign_id: campaignId,
      links: [
        {
          id: 'link_001',
          url: 'https://ai.cmo.so/platform?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_issue_01',
          total_clicks: 52,
          unique_clicks: 45,
          click_percentage: 0.36
        },
        {
          id: 'link_002',
          url: 'https://ai.cmo.so/geo-whitepaper?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_issue_01',
          total_clicks: 38,
          unique_clicks: 32,
          click_percentage: 0.256
        },
        {
          id: 'link_003',
          url: 'https://ai.cmo.so/blog/geo-fundamentals?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_issue_01',
          total_clicks: 28,
          unique_clicks: 21,
          click_percentage: 0.168
        }
      ],
      total_clicks: 128,
      unique_subscriber_clicks: 98
    };
  }

  async getEmailActivity(campaignId, subscriberEmail) {
    console.log(`👤 Fetching activity for: ${subscriberEmail}`);

    return {
      campaign_id: campaignId,
      email_address: subscriberEmail,
      activity: [
        { action: 'open', timestamp: new Date().toISOString() },
        { action: 'click', timestamp: new Date().toISOString(), url: 'https://ai.cmo.so/platform' }
      ]
    };
  }

  async getAllCampaigns(since = null) {
    console.log(`📋 Fetching all campaigns${since ? ` since ${since}` : ''}...`);

    // Would fetch from MCP
    return {
      campaigns: [
        { id: 'campaign_001', title: 'aiCMO Newsletter #01', send_time: '2025-01-13T09:00:00Z' },
        { id: 'campaign_002', title: 'aiCMO Newsletter #02', send_time: '2025-01-20T09:00:00Z' }
      ],
      total_items: 2
    };
  }

  calculateKPIs(report) {
    const {
      emails_sent,
      opens: { unique_opens, open_rate },
      clicks: { unique_clicks, click_rate },
      unsubscribed,
      forwards
    } = report;

    return {
      // Primary KPIs
      open_rate_pct: (open_rate * 100).toFixed(2),
      ctr_pct: (click_rate * 100).toFixed(2),
      ctor_pct: ((unique_clicks / unique_opens) * 100).toFixed(2), // Click-to-Open Rate
      unsub_rate_pct: ((unsubscribed / emails_sent) * 100).toFixed(3),
      forward_rate_pct: ((forwards / emails_sent) * 100).toFixed(2),

      // Performance indicators
      status: this.getPerformanceStatus(open_rate, click_rate),
      meets_target: open_rate >= 0.40 && click_rate >= 0.08,

      // Benchmarks
      open_rate_vs_target: this.compareToTarget(open_rate, 0.40),
      ctr_vs_target: this.compareToTarget(click_rate, 0.08),
      open_rate_vs_industry: this.compareToTarget(open_rate, 0.21),
      ctr_vs_industry: this.compareToTarget(click_rate, 0.026)
    };
  }

  getPerformanceStatus(openRate, clickRate) {
    if (openRate >= 0.40 && clickRate >= 0.08) return '🟢 Exceeds target';
    if (openRate >= 0.35 && clickRate >= 0.05) return '🟡 On track';
    if (openRate >= 0.30 && clickRate >= 0.03) return '🟠 Below target';
    return '🔴 Needs attention';
  }

  compareToTarget(actual, target) {
    const diff = actual - target;
    const pct = (diff / target * 100).toFixed(1);
    return diff >= 0 ? `+${pct}%` : `${pct}%`;
  }

  async generateReport(campaignId, options = {}) {
    const report = await this.getCampaignReport(campaignId);
    const clicks = await getClickDetails(campaignId);
    const kpis = this.calculateKPIs(report);

    const output = {
      campaign: {
        id: report.campaign_id,
        title: report.campaign_title,
        sent: report.send_time,
        recipients: report.emails_sent
      },
      performance: {
        opens: {
          total: report.opens.opens_total,
          unique: report.opens.unique_opens,
          rate: kpis.open_rate_pct + '%'
        },
        clicks: {
          total: report.clicks.clicks_total,
          unique: report.clicks.unique_clicks,
          rate: kpis.ctr_pct + '%'
        },
        engagement: {
          ctor: kpis.ctor_pct + '%',
          forwards: report.forwards,
          forward_rate: kpis.forward_rate_pct + '%'
        },
        list_health: {
          unsubscribes: report.unsubscribed,
          unsub_rate: kpis.unsub_rate_pct + '%',
          bounces: report.hard_bounces + report.soft_bounces
        }
      },
      kpis: {
        status: kpis.status,
        meets_target: kpis.meets_target,
        vs_target: {
          open_rate: kpis.open_rate_vs_target,
          ctr: kpis.ctr_vs_target
        },
        vs_industry: {
          open_rate: kpis.open_rate_vs_industry,
          ctr: kpis.ctr_vs_industry
        }
      },
      top_links: clicks.links.slice(0, 5).map(link => ({
        url: link.url.split('?')[0],
        clicks: link.unique_clicks,
        percentage: (link.click_percentage * 100).toFixed(1) + '%'
      })),
      timestamp: new Date().toISOString()
    };

    if (options.save) {
      const filename = `campaign_${campaignId}_${format(new Date(), 'yyyy-MM-dd')}.json`;
      const filepath = path.join(__dirname, '../../dashboards/newsletter/reports', filename);
      await fs.mkdir(path.dirname(filepath), { recursive: true });
      await fs.writeFile(filepath, JSON.stringify(output, null, 2));
      console.log(`✅ Report saved to: ${filepath}`);
    }

    return output;
  }

  async generateDashboard(since = null) {
    console.log('📊 Generating performance dashboard...');

    const campaigns = await this.getAllCampaigns(since);
    const reports = await Promise.all(
      campaigns.campaigns.map(c => this.getCampaignReport(c.id))
    );

    const dashboard = {
      period: {
        start: since || 'All time',
        end: new Date().toISOString(),
        campaigns_count: campaigns.total_items
      },
      aggregate: {
        total_emails_sent: reports.reduce((sum, r) => sum + r.emails_sent, 0),
        avg_open_rate: (reports.reduce((sum, r) => sum + r.opens.open_rate, 0) / reports.length * 100).toFixed(2) + '%',
        avg_ctr: (reports.reduce((sum, r) => sum + r.clicks.click_rate, 0) / reports.length * 100).toFixed(2) + '%',
        total_unsubscribes: reports.reduce((sum, r) => sum + r.unsubscribed, 0),
        total_forwards: reports.reduce((sum, r) => sum + r.forwards, 0)
      },
      trends: reports.map(r => ({
        campaign: r.campaign_title,
        sent: r.send_time,
        open_rate: (r.opens.open_rate * 100).toFixed(2) + '%',
        ctr: (r.clicks.click_rate * 100).toFixed(2) + '%',
        status: this.getPerformanceStatus(r.opens.open_rate, r.clicks.click_rate)
      })),
      generated: new Date().toISOString()
    };

    const filepath = path.join(__dirname, '../../dashboards/newsletter/dashboard.json');
    await fs.mkdir(path.dirname(filepath), { recursive: true });
    await fs.writeFile(filepath, JSON.stringify(dashboard, null, 2));

    console.log(`✅ Dashboard generated: ${filepath}`);
    return dashboard;
  }
}

// CLI Handler
async function main() {
  const args = process.argv.slice(2);

  const fetcher = new MetricsFetcher(
    process.env.MAILCHIMP_API_KEY,
    process.env.MAILCHIMP_SERVER_PREFIX
  );

  const campaignId = getArg(args, '--campaign-id');
  const since = getArg(args, '--since');
  const save = args.includes('--save');
  const dashboard = args.includes('--dashboard');
  const all = args.includes('--all');

  if (dashboard) {
    const result = await fetcher.generateDashboard(since);
    console.log('\n📊 Dashboard Data:');
    console.log(JSON.stringify(result, null, 2));
  } else if (all) {
    const campaigns = await fetcher.getAllCampaigns(since);
    console.log('\n📋 All Campaigns:');
    console.log(JSON.stringify(campaigns, null, 2));
  } else if (campaignId) {
    const report = await fetcher.generateReport(campaignId, { save });
    console.log('\n📊 Campaign Report:');
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(`
Usage: node fetch-metrics.js [options]

Options:
  --campaign-id <id>    Fetch report for specific campaign
  --all                 Fetch all campaigns
  --since <date>        Filter campaigns since date (ISO8601)
  --dashboard           Generate aggregate dashboard
  --save                Save report to file

Examples:
  node fetch-metrics.js --campaign-id abc123 --save
  node fetch-metrics.js --all --since "2025-01-01"
  node fetch-metrics.js --dashboard
    `);
  }
}

function getArg(args, flag) {
  const index = args.indexOf(flag);
  return index >= 0 && args[index + 1] ? args[index + 1] : null;
}

if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { MetricsFetcher };
