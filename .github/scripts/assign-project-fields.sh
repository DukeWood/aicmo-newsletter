#!/bin/bash

# Script to assign custom fields to GitHub Project items
# Project ID: PVT_kwHOB9bpmc4BF3Ku (Project #2)

PROJECT_ID="PVT_kwHOB9bpmc4BF3Ku"

# Field IDs
AGENT_FIELD="PVTSSF_lAHOB9bpmc4BF3Kuzg3E79s"
COMPONENT_FIELD="PVTSSF_lAHOB9bpmc4BF3Kuzg3E79w"
CAMPAIGN_TYPE_FIELD="PVTSSF_lAHOB9bpmc4BF3Kuzg3E7-4"
PRIORITY_FIELD="PVTSSF_lAHOB9bpmc4BF3Kuzg3E7-8"
EFFORT_FIELD="PVTSSF_lAHOB9bpmc4BF3Kuzg3E8Eo"
SPRINT_FIELD="PVTSSF_lAHOB9bpmc4BF3Kuzg3E8Hk"

# Agent Options
MAGGIE="46724582"
MARK="7cd480b6"
CHRIS="0b06b90d"
BRENDA="1054b954"
PETER="2a585e3c"
GRACE="0c8196f1"
EMILY="b5bbce0d"
SOPHIE="3290c06a"
NONE_AGENT="73eaa1ac"

# Component Options
NEWSLETTER="8a5c036d"
SOCIAL_MEDIA="92eaed9b"
AI_AGENTS="07ad5676"
INTEGRATIONS="7425561a"
AUTOMATION="71fc1b62"
KNOWLEDGE_BASE="a2328484"
DOCUMENTATION="a91dc035"
INFRASTRUCTURE="5efcb1b7"

# Campaign Type Options
NEWSLETTER_SERIES="2fa130b1"
SOCIAL_CAMPAIGN="8ad023c8"
PRODUCT_LAUNCH="8c61cbad"
EVENT_PROMOTION="68bb762a"
GROWTH_EXPERIMENT="f04cd7f6"
CONTENT_SERIES="9eb491fc"
BRAND_AWARENESS="0d316d6a"
NA_CAMPAIGN="6da59ba5"

# Priority Options
CRITICAL="d9fd3033"
HIGH="b3596935"
MEDIUM="e5bc287a"
LOW="ad7a428f"

# Effort Options
XS="25faad11"
S="a4878ffb"
M="b9525a92"
L="da9e7a91"
XL="e80548b7"

# Sprint Options
BACKLOG="8562198a"
SPRINT_1="fda5b6df"
SPRINT_2="1f37b88a"
SPRINT_3="69369643"
SPRINT_4="be78bf8c"
ICEBOX="b4405613"

# Item IDs (from issue numbers)
ISSUE_1="PVTI_lAHOB9bpmc4BF3KuzggCshk"  # Configure GitHub Secrets
ISSUE_2="PVTI_lAHOB9bpmc4BF3KuzggCsh4"  # Newsletter Issue #2
ISSUE_3="PVTI_lAHOB9bpmc4BF3KuzggCsiE"  # LinkedIn Standard Tier
ISSUE_4="PVTI_lAHOB9bpmc4BF3KuzggCsiQ"  # Design Pricing Page
ISSUE_5="PVTI_lAHOB9bpmc4BF3KuzggCsiY"  # Improve Maggie Agent
ISSUE_6="PVTI_lAHOB9bpmc4BF3KuzggCsig"  # Launch Founding Member Program
ISSUE_7="PVTI_lAHOB9bpmc4BF3KuzggCsik"  # Build Autopilot Onboarding
ISSUE_8="PVTI_lAHOB9bpmc4BF3KuzggCsiw"  # Document Canva + Twitter
ISSUE_9="PVTI_lAHOB9bpmc4BF3KuzggCsi8"  # Add Competitive Intelligence

echo "🚀 Assigning custom fields to GitHub Project items..."
echo ""

# Issue #1: Configure GitHub Secrets for Workflows
echo "📋 Issue #1: Configure GitHub Secrets for Workflows"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_1" --field-id "$AGENT_FIELD" --single-select-option-id "$NONE_AGENT"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_1" --field-id "$COMPONENT_FIELD" --single-select-option-id "$INFRASTRUCTURE"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_1" --field-id "$CAMPAIGN_TYPE_FIELD" --single-select-option-id "$NA_CAMPAIGN"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_1" --field-id "$PRIORITY_FIELD" --single-select-option-id "$CRITICAL"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_1" --field-id "$EFFORT_FIELD" --single-select-option-id "$XS"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_1" --field-id "$SPRINT_FIELD" --single-select-option-id "$SPRINT_1"
echo "✅ Issue #1 assigned"
echo ""

# Issue #2: Newsletter Issue #2: Plan and Create Content
echo "📋 Issue #2: Newsletter Issue #2"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_2" --field-id "$AGENT_FIELD" --single-select-option-id "$CHRIS"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_2" --field-id "$COMPONENT_FIELD" --single-select-option-id "$NEWSLETTER"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_2" --field-id "$CAMPAIGN_TYPE_FIELD" --single-select-option-id "$NEWSLETTER_SERIES"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_2" --field-id "$PRIORITY_FIELD" --single-select-option-id "$HIGH"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_2" --field-id "$EFFORT_FIELD" --single-select-option-id "$L"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_2" --field-id "$SPRINT_FIELD" --single-select-option-id "$SPRINT_1"
echo "✅ Issue #2 assigned"
echo ""

# Issue #3: Complete LinkedIn Standard Tier Approval
echo "📋 Issue #3: LinkedIn Standard Tier Approval"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_3" --field-id "$AGENT_FIELD" --single-select-option-id "$SOPHIE"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_3" --field-id "$COMPONENT_FIELD" --single-select-option-id "$SOCIAL_MEDIA"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_3" --field-id "$CAMPAIGN_TYPE_FIELD" --single-select-option-id "$NA_CAMPAIGN"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_3" --field-id "$PRIORITY_FIELD" --single-select-option-id "$MEDIUM"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_3" --field-id "$EFFORT_FIELD" --single-select-option-id "$S"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_3" --field-id "$SPRINT_FIELD" --single-select-option-id "$BACKLOG"
echo "✅ Issue #3 assigned"
echo ""

# Issue #4: Design Pricing Page and Founding Member Benefits Page
echo "📋 Issue #4: Design Pricing Page"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_4" --field-id "$AGENT_FIELD" --single-select-option-id "$BRENDA"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_4" --field-id "$COMPONENT_FIELD" --single-select-option-id "$DOCUMENTATION"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_4" --field-id "$CAMPAIGN_TYPE_FIELD" --single-select-option-id "$PRODUCT_LAUNCH"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_4" --field-id "$PRIORITY_FIELD" --single-select-option-id "$HIGH"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_4" --field-id "$EFFORT_FIELD" --single-select-option-id "$M"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_4" --field-id "$SPRINT_FIELD" --single-select-option-id "$SPRINT_1"
echo "✅ Issue #4 assigned"
echo ""

# Issue #5: Improve Maggie Agent's Multi-Channel Orchestration
echo "📋 Issue #5: Improve Maggie Agent"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_5" --field-id "$AGENT_FIELD" --single-select-option-id "$MAGGIE"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_5" --field-id "$COMPONENT_FIELD" --single-select-option-id "$AI_AGENTS"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_5" --field-id "$CAMPAIGN_TYPE_FIELD" --single-select-option-id "$NA_CAMPAIGN"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_5" --field-id "$PRIORITY_FIELD" --single-select-option-id "$MEDIUM"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_5" --field-id "$EFFORT_FIELD" --single-select-option-id "$L"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_5" --field-id "$SPRINT_FIELD" --single-select-option-id "$SPRINT_2"
echo "✅ Issue #5 assigned"
echo ""

# Issue #6: Launch Founding Member Program Marketing Campaign
echo "📋 Issue #6: Launch Founding Member Program"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_6" --field-id "$AGENT_FIELD" --single-select-option-id "$MAGGIE"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_6" --field-id "$COMPONENT_FIELD" --single-select-option-id "$NEWSLETTER"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_6" --field-id "$CAMPAIGN_TYPE_FIELD" --single-select-option-id "$PRODUCT_LAUNCH"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_6" --field-id "$PRIORITY_FIELD" --single-select-option-id "$CRITICAL"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_6" --field-id "$EFFORT_FIELD" --single-select-option-id "$XL"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_6" --field-id "$SPRINT_FIELD" --single-select-option-id "$SPRINT_1"
echo "✅ Issue #6 assigned"
echo ""

# Issue #7: Build Autopilot Onboarding Flow
echo "📋 Issue #7: Build Autopilot Onboarding"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_7" --field-id "$AGENT_FIELD" --single-select-option-id "$NONE_AGENT"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_7" --field-id "$COMPONENT_FIELD" --single-select-option-id "$AUTOMATION"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_7" --field-id "$CAMPAIGN_TYPE_FIELD" --single-select-option-id "$NA_CAMPAIGN"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_7" --field-id "$PRIORITY_FIELD" --single-select-option-id "$HIGH"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_7" --field-id "$EFFORT_FIELD" --single-select-option-id "$XL"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_7" --field-id "$SPRINT_FIELD" --single-select-option-id "$SPRINT_2"
echo "✅ Issue #7 assigned"
echo ""

# Issue #8: Document Canva + Twitter Integration Workflow
echo "📋 Issue #8: Document Canva + Twitter"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_8" --field-id "$AGENT_FIELD" --single-select-option-id "$SOPHIE"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_8" --field-id "$COMPONENT_FIELD" --single-select-option-id "$DOCUMENTATION"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_8" --field-id "$CAMPAIGN_TYPE_FIELD" --single-select-option-id "$NA_CAMPAIGN"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_8" --field-id "$PRIORITY_FIELD" --single-select-option-id "$LOW"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_8" --field-id "$EFFORT_FIELD" --single-select-option-id "$M"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_8" --field-id "$SPRINT_FIELD" --single-select-option-id "$BACKLOG"
echo "✅ Issue #8 assigned"
echo ""

# Issue #9: Add Competitive Intelligence to Knowledge Base
echo "📋 Issue #9: Add Competitive Intelligence"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_9" --field-id "$AGENT_FIELD" --single-select-option-id "$MARK"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_9" --field-id "$COMPONENT_FIELD" --single-select-option-id "$KNOWLEDGE_BASE"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_9" --field-id "$CAMPAIGN_TYPE_FIELD" --single-select-option-id "$NA_CAMPAIGN"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_9" --field-id "$PRIORITY_FIELD" --single-select-option-id "$MEDIUM"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_9" --field-id "$EFFORT_FIELD" --single-select-option-id "$L"
gh project item-edit --project-id "$PROJECT_ID" --id "$ISSUE_9" --field-id "$SPRINT_FIELD" --single-select-option-id "$SPRINT_2"
echo "✅ Issue #9 assigned"
echo ""

echo "🎉 All issues have been assigned custom fields!"
echo ""
echo "View your project: https://github.com/users/DukeWood/projects/2"
