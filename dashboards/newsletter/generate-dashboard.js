#!/usr/bin/env node

/**
 * Newsletter Performance Dashboard Generator
 *
 * Creates real-time performance dashboards combining Mailchimp + GA4 data
 * Used by Peter (performance-analyst) for weekly reporting
 *
 * Usage:
 *   node generate-dashboard.js --format html
 *   node generate-dashboard.js --format json
 *   node generate-dashboard.js --week 1
 */

require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const { format, subDays, startOfWeek, endOfWeek } = require('date-fns');

class DashboardGenerator {
  constructor() {
    this.thresholds = {
      open_rate: parseFloat(process.env.ALERT_THRESHOLD_OPEN_RATE || 30) / 100,
      ctr: parseFloat(process.env.ALERT_THRESHOLD_CTR || 5) / 100,
      leads: parseInt(process.env.ALERT_THRESHOLD_LEADS || 7)
    };
  }

  async generateWeeklyDashboard(week = null) {
    console.log('📊 Generating weekly newsletter dashboard...\n');

    // Fetch data (simulated - would use actual MCP + GA4 APIs)
    const newsletterData = await this.fetchNewsletterMetrics(week);
    const conversionData = await this.fetchConversionMetrics(week);
    const contentData = await this.fetchContentPerformance(week);

    const dashboard = {
      period: {
        week: week || 'current',
        start: format(startOfWeek(new Date()), 'yyyy-MM-dd'),
        end: format(endOfWeek(new Date()), 'yyyy-MM-dd')
      },
      summary: this.generateSummary(newsletterData, conversionData),
      email_performance: this.generateEmailMetrics(newsletterData),
      conversion_funnel: this.generateConversionFunnel(conversionData),
      content_insights: this.generateContentInsights(contentData),
      alerts: this.generateAlerts(newsletterData, conversionData),
      recommendations: this.generateRecommendations(newsletterData, conversionData),
      generated_at: new Date().toISOString()
    };

    return dashboard;
  }

  async fetchNewsletterMetrics(week) {
    // Simulated data - would fetch from Mailchimp MCP
    return {
      campaign_id: 'campaign_001',
      campaign_title: 'aiCMO Newsletter #01',
      send_date: '2025-01-13',
      subscribers: 1250,
      delivered: 1245,
      opens: {
        total: 512,
        unique: 495,
        rate: 0.3976 // 39.76%
      },
      clicks: {
        total: 128,
        unique: 98,
        rate: 0.0787 // 7.87%
      },
      conversions: 12,
      bounces: 5,
      unsubscribes: 3,
      forwards: 45,
      complaints: 0
    };
  }

  async fetchConversionMetrics(week) {
    // Simulated data - would fetch from GA4
    return {
      newsletter_clicks: 98,
      landing_page_views: 87,
      form_starts: 42,
      platform_signups: 12,
      qualified_leads: 10,
      conversion_rate: 0.1149 // 11.49% click-to-signup
    };
  }

  async fetchContentPerformance(week) {
    // Simulated data
    return {
      top_links: [
        { url: '/platform', clicks: 45, ctr: 0.0361 },
        { url: '/geo-whitepaper', clicks: 32, ctr: 0.0257 },
        { url: '/blog/geo-fundamentals', clicks: 21, ctr: 0.0169 }
      ],
      engagement_by_section: {
        opening_hook: { avg_time: 18 },
        feature_section: { avg_time: 95 },
        quick_wins: { avg_time: 52 },
        community_spotlight: { avg_time: 34 },
        cta_section: { conversion_rate: 0.459 }
      }
    };
  }

  generateSummary(newsletter, conversion) {
    const meetsOpenTarget = newsletter.opens.rate >= 0.40;
    const meetsCTRTarget = newsletter.clicks.rate >= 0.08;
    const meetsLeadTarget = conversion.qualified_leads >= 10;

    let status = '🔴 Needs Attention';
    if (meetsOpenTarget && meetsCTRTarget && meetsLeadTarget) {
      status = '🟢 Exceeding Targets';
    } else if (newsletter.opens.rate >= 0.35 && newsletter.clicks.rate >= 0.05) {
      status = '🟡 On Track';
    }

    return {
      status,
      headline: this.generateHeadline(newsletter, conversion),
      key_metrics: {
        open_rate: {
          value: (newsletter.opens.rate * 100).toFixed(2) + '%',
          target: '40%',
          status: meetsOpenTarget ? '✅' : '⚠️',
          vs_target: this.calculateVsTarget(newsletter.opens.rate, 0.40)
        },
        ctr: {
          value: (newsletter.clicks.rate * 100).toFixed(2) + '%',
          target: '8%',
          status: meetsCTRTarget ? '✅' : '⚠️',
          vs_target: this.calculateVsTarget(newsletter.clicks.rate, 0.08)
        },
        qualified_leads: {
          value: conversion.qualified_leads,
          target: 10,
          status: meetsLeadTarget ? '✅' : '⚠️',
          vs_target: conversion.qualified_leads - 10
        }
      }
    };
  }

  generateHeadline(newsletter, conversion) {
    if (newsletter.opens.rate >= 0.40 && newsletter.clicks.rate >= 0.08) {
      return `Strong performance: ${(newsletter.opens.rate * 100).toFixed(1)}% open, ${(newsletter.clicks.rate * 100).toFixed(1)}% CTR`;
    } else if (newsletter.opens.rate < 0.30) {
      return `Low engagement: Open rate needs improvement (${(newsletter.opens.rate * 100).toFixed(1)}%)`;
    } else {
      return `Moderate performance: ${conversion.qualified_leads} leads generated this week`;
    }
  }

  generateEmailMetrics(newsletter) {
    return {
      delivery: {
        sent: newsletter.subscribers,
        delivered: newsletter.delivered,
        delivery_rate: (newsletter.delivered / newsletter.subscribers * 100).toFixed(2) + '%',
        bounced: newsletter.bounces,
        bounce_rate: (newsletter.bounces / newsletter.subscribers * 100).toFixed(2) + '%'
      },
      engagement: {
        opens: newsletter.opens.unique,
        open_rate: (newsletter.opens.rate * 100).toFixed(2) + '%',
        clicks: newsletter.clicks.unique,
        click_rate: (newsletter.clicks.rate * 100).toFixed(2) + '%',
        ctor: ((newsletter.clicks.unique / newsletter.opens.unique) * 100).toFixed(2) + '%',
        forwards: newsletter.forwards,
        forward_rate: (newsletter.forwards / newsletter.delivered * 100).toFixed(2) + '%'
      },
      list_health: {
        unsubscribes: newsletter.unsubscribes,
        unsub_rate: (newsletter.unsubscribes / newsletter.delivered * 100).toFixed(3) + '%',
        complaints: newsletter.complaints,
        complaint_rate: (newsletter.complaints / newsletter.delivered * 100).toFixed(3) + '%'
      }
    };
  }

  generateConversionFunnel(conversion) {
    return {
      steps: [
        {
          name: 'Email Click',
          count: conversion.newsletter_clicks,
          rate: 100,
          dropoff: 0
        },
        {
          name: 'Landing Page View',
          count: conversion.landing_page_views,
          rate: (conversion.landing_page_views / conversion.newsletter_clicks * 100).toFixed(1),
          dropoff: ((1 - conversion.landing_page_views / conversion.newsletter_clicks) * 100).toFixed(1)
        },
        {
          name: 'Form Start',
          count: conversion.form_starts,
          rate: (conversion.form_starts / conversion.newsletter_clicks * 100).toFixed(1),
          dropoff: ((1 - conversion.form_starts / conversion.landing_page_views) * 100).toFixed(1)
        },
        {
          name: 'Platform Signup',
          count: conversion.platform_signups,
          rate: (conversion.platform_signups / conversion.newsletter_clicks * 100).toFixed(1),
          dropoff: ((1 - conversion.platform_signups / conversion.form_starts) * 100).toFixed(1)
        },
        {
          name: 'Qualified Lead',
          count: conversion.qualified_leads,
          rate: (conversion.qualified_leads / conversion.newsletter_clicks * 100).toFixed(1),
          dropoff: ((1 - conversion.qualified_leads / conversion.platform_signups) * 100).toFixed(1)
        }
      ],
      overall_conversion: (conversion.qualified_leads / conversion.newsletter_clicks * 100).toFixed(2) + '%'
    };
  }

  generateContentInsights(content) {
    return {
      top_performing_links: content.top_links.map(link => ({
        url: link.url,
        clicks: link.clicks,
        ctr: (link.ctr * 100).toFixed(2) + '%'
      })),
      section_engagement: Object.entries(content.engagement_by_section).map(([section, data]) => ({
        section,
        ...data
      })),
      recommendations: [
        content.top_links[0].ctr > 0.03 ? 'Top link performing well - consider similar CTAs' : 'Strengthen primary CTA',
        content.engagement_by_section.feature_section.avg_time > 60 ? 'Feature section engaging - maintain depth' : 'Feature section needs hooks',
        content.engagement_by_section.quick_wins.avg_time < 60 ? 'Quick wins section optimal' : 'Shorten quick wins'
      ]
    };
  }

  generateAlerts(newsletter, conversion) {
    const alerts = [];

    if (newsletter.opens.rate < this.thresholds.open_rate) {
      alerts.push({
        severity: 'high',
        type: 'open_rate',
        message: `Open rate (${(newsletter.opens.rate * 100).toFixed(1)}%) below threshold (${(this.thresholds.open_rate * 100)}%)`,
        action: 'Review subject lines, test send times, check deliverability'
      });
    }

    if (newsletter.clicks.rate < this.thresholds.ctr) {
      alerts.push({
        severity: 'high',
        type: 'click_rate',
        message: `CTR (${(newsletter.clicks.rate * 100).toFixed(1)}%) below threshold (${(this.thresholds.ctr * 100)}%)`,
        action: 'Strengthen CTAs, improve content relevance, test link placement'
      });
    }

    if (conversion.qualified_leads < this.thresholds.leads) {
      alerts.push({
        severity: 'high',
        type: 'lead_generation',
        message: `Qualified leads (${conversion.qualified_leads}) below target (${this.thresholds.leads})`,
        action: 'Optimize landing page, simplify form, test value proposition'
      });
    }

    if (newsletter.unsubscribes / newsletter.delivered > 0.005) {
      alerts.push({
        severity: 'medium',
        type: 'unsubscribe_rate',
        message: `Unsubscribe rate elevated (${(newsletter.unsubscribes / newsletter.delivered * 100).toFixed(2)}%)`,
        action: 'Survey unsubscribers, review content expectations, check frequency'
      });
    }

    if (newsletter.bounces / newsletter.subscribers > 0.02) {
      alerts.push({
        severity: 'medium',
        type: 'bounce_rate',
        message: 'Bounce rate high - list hygiene needed',
        action: 'Clean list, remove hard bounces, verify email addresses'
      });
    }

    return alerts.length > 0 ? alerts : [{ severity: 'info', message: 'All metrics within acceptable ranges' }];
  }

  generateRecommendations(newsletter, conversion) {
    const recs = [];

    // Subject line optimization
    if (newsletter.opens.rate < 0.40) {
      recs.push({
        priority: 'high',
        category: 'subject_lines',
        recommendation: 'Test alternative subject line formulas',
        details: 'Current open rate suggests subject lines need optimization. Try curiosity-driven or data-driven variants.'
      });
    }

    // Content optimization
    if (newsletter.clicks.rate < 0.08) {
      recs.push({
        priority: 'high',
        category: 'content',
        recommendation: 'Strengthen CTAs and link placement',
        details: 'Low CTR indicates content-CTA disconnect. Test multiple CTA placements and clearer benefit statements.'
      });
    }

    // Conversion funnel optimization
    const landingPageConversion = conversion.form_starts / conversion.landing_page_views;
    if (landingPageConversion < 0.40) {
      recs.push({
        priority: 'high',
        category: 'landing_page',
        recommendation: 'Optimize landing page conversion',
        details: `Only ${(landingPageConversion * 100).toFixed(1)}% of visitors start form. Test headline, reduce friction, add social proof.`
      });
    }

    // List growth
    if (newsletter.forwards < newsletter.delivered * 0.03) {
      recs.push({
        priority: 'medium',
        category: 'growth',
        recommendation: 'Increase referral mechanics',
        details: 'Low forward rate suggests content isn\'t shareable. Add quotable insights, referral incentives, social sharing.'
      });
    }

    // Engagement
    const ctor = newsletter.clicks.unique / newsletter.opens.unique;
    if (ctor < 0.15) {
      recs.push({
        priority: 'medium',
        category: 'engagement',
        recommendation: 'Improve content relevance for openers',
        details: `CTOR is ${(ctor * 100).toFixed(1)}% - opened but didn't click. Strengthen hook-to-CTA journey.`
      });
    }

    return recs;
  }

  calculateVsTarget(actual, target) {
    const diff = actual - target;
    const pct = (diff / target * 100).toFixed(1);
    return diff >= 0 ? `+${pct}%` : `${pct}%`;
  }

  async generateHTML(dashboard) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>aiCMO Newsletter Dashboard - Week ${dashboard.period.week}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #1E1E1E;
      background: #f5f5f5;
      padding: 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h1 {
      font-family: 'Montserrat', sans-serif;
      color: #C8102E;
      font-size: 32px;
      margin-bottom: 10px;
    }
    .status {
      font-size: 24px;
      margin-bottom: 30px;
    }
    .metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    .metric-card {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #C8102E;
    }
    .metric-label {
      font-size: 14px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .metric-value {
      font-size: 36px;
      font-weight: bold;
      color: #012169;
      margin: 10px 0;
    }
    .metric-target {
      font-size: 14px;
      color: #666;
    }
    .alert {
      background: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 8px;
      padding: 15px;
      margin: 10px 0;
    }
    .alert.high {
      background: #f8d7da;
      border-color: #dc3545;
    }
    .recommendation {
      background: #d1ecf1;
      border: 1px solid #0dcaf0;
      border-radius: 8px;
      padding: 15px;
      margin: 10px 0;
    }
    .funnel {
      margin: 30px 0;
    }
    .funnel-step {
      background: #f9f9f9;
      padding: 15px;
      margin: 10px 0;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      text-align: left;
      padding: 12px;
      border-bottom: 1px solid #ddd;
    }
    th {
      background: #012169;
      color: white;
      font-weight: 600;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>aiCMO Newsletter Performance Dashboard</h1>
    <div class="status">${dashboard.summary.status}</div>
    <p><strong>${dashboard.summary.headline}</strong></p>
    <p>Period: ${dashboard.period.start} to ${dashboard.period.end}</p>

    <div class="metrics">
      <div class="metric-card">
        <div class="metric-label">Open Rate ${dashboard.summary.key_metrics.open_rate.status}</div>
        <div class="metric-value">${dashboard.summary.key_metrics.open_rate.value}</div>
        <div class="metric-target">Target: ${dashboard.summary.key_metrics.open_rate.target} (${dashboard.summary.key_metrics.open_rate.vs_target})</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Click Rate ${dashboard.summary.key_metrics.ctr.status}</div>
        <div class="metric-value">${dashboard.summary.key_metrics.ctr.value}</div>
        <div class="metric-target">Target: ${dashboard.summary.key_metrics.ctr.target} (${dashboard.summary.key_metrics.ctr.vs_target})</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Qualified Leads ${dashboard.summary.key_metrics.qualified_leads.status}</div>
        <div class="metric-value">${dashboard.summary.key_metrics.qualified_leads.value}</div>
        <div class="metric-target">Target: ${dashboard.summary.key_metrics.qualified_leads.target} (${dashboard.summary.key_metrics.qualified_leads.vs_target >= 0 ? '+' : ''}${dashboard.summary.key_metrics.qualified_leads.vs_target})</div>
      </div>
    </div>

    <h2>Conversion Funnel</h2>
    <div class="funnel">
      ${dashboard.conversion_funnel.steps.map(step => `
        <div class="funnel-step">
          <div>
            <strong>${step.name}</strong><br>
            <span style="color: #666;">${step.count} (${step.rate}%)</span>
          </div>
          <div style="color: #dc3545;">${step.dropoff > 0 ? `↓ ${step.dropoff}%` : ''}</div>
        </div>
      `).join('')}
      <p><strong>Overall Conversion: ${dashboard.conversion_funnel.overall_conversion}</strong></p>
    </div>

    <h2>Alerts & Issues</h2>
    ${dashboard.alerts.map(alert => `
      <div class="alert ${alert.severity}">
        <strong>${alert.type || 'Info'}:</strong> ${alert.message}
        ${alert.action ? `<br><em>Action: ${alert.action}</em>` : ''}
      </div>
    `).join('')}

    <h2>Recommendations</h2>
    ${dashboard.recommendations.map(rec => `
      <div class="recommendation">
        <strong>${rec.category?.toUpperCase() || 'GENERAL'} [${rec.priority?.toUpperCase()}]:</strong> ${rec.recommendation}
        <br><em>${rec.details}</em>
      </div>
    `).join('')}

    <h2>Top Performing Links</h2>
    <table>
      <thead>
        <tr>
          <th>URL</th>
          <th>Clicks</th>
          <th>CTR</th>
        </tr>
      </thead>
      <tbody>
        ${dashboard.content_insights.top_performing_links.map(link => `
          <tr>
            <td>${link.url}</td>
            <td>${link.clicks}</td>
            <td>${link.ctr}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="footer">
      <p>Generated: ${new Date(dashboard.generated_at).toLocaleString()}</p>
      <p>Dashboard by Peter (performance-analyst) • aiCMO Marketing OS</p>
    </div>
  </div>
</body>
</html>
    `;

    return html;
  }

  async saveDashboard(dashboard, format = 'json') {
    const timestamp = format(new Date(), 'yyyy-MM-dd-HHmmss');
    const filename = `dashboard-week-${dashboard.period.week}-${timestamp}.${format}`;
    const filepath = path.join(__dirname, filename);

    if (format === 'html') {
      const html = await this.generateHTML(dashboard);
      await fs.writeFile(filepath, html);
    } else {
      await fs.writeFile(filepath, JSON.stringify(dashboard, null, 2));
    }

    console.log(`✅ Dashboard saved: ${filepath}`);
    return filepath;
  }
}

// CLI Handler
async function main() {
  const args = process.argv.slice(2);
  const week = getArg(args, '--week') || null;
  const format = getArg(args, '--format') || 'json';

  const generator = new DashboardGenerator();
  const dashboard = await generator.generateWeeklyDashboard(week);

  console.log('\n📊 Dashboard Generated:\n');
  console.log(JSON.stringify(dashboard, null, 2));

  await generator.saveDashboard(dashboard, format);
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

module.exports = { DashboardGenerator };
