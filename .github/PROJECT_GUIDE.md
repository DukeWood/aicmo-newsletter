# GitHub Project Guide: aiCMO Marketing Orchestration

This guide explains how to use the GitHub Project board to manage the aiCMO marketing orchestration codebase and related tasks.

**Project URL:** https://github.com/users/DukeWood/projects/2

---

## Project Overview

The **aiCMO Marketing Orchestration** project board is designed to track:
- Newsletter content creation and automation
- Social media campaigns and posting
- AI agent improvements and enhancements
- Marketing infrastructure and integrations
- Content strategy and campaigns
- Knowledge base updates

---

## Custom Fields

The project includes the following custom fields to organize and prioritize work:

### 1. **Agent** (Single Select)
Assign work to specific AI marketing agents:
- Maggie (aiCMO) - Orchestrator
- Mark (Market Researcher)
- Chris (Content Strategist)
- Brenda (Brand Strategist)
- Peter (Performance Analyst)
- Grace (Growth Hacker)
- Emily (Email Marketer)
- Sophie (Social Media Manager)
- None

**Usage:** Indicates which AI agent is responsible for or would benefit from this task.

### 2. **Component** (Single Select)
Categorize by system component:
- Newsletter
- Social Media
- AI Agents
- Integrations
- Automation
- Knowledge Base
- Documentation
- Infrastructure

**Usage:** Helps filter issues by technical area.

### 3. **Campaign Type** (Single Select)
For marketing campaign tasks:
- Newsletter Series
- Social Campaign
- Product Launch
- Event Promotion
- Growth Experiment
- Content Series
- Brand Awareness
- N/A

**Usage:** Track what type of marketing initiative this task supports.

### 4. **Priority** (Single Select)
Task urgency:
- Critical (blocking, must do now)
- High (important, do soon)
- Medium (normal priority)
- Low (nice to have)

**Usage:** Prioritize work and identify blockers.

### 5. **Effort** (Single Select)
Estimated time to complete:
- XS (< 1 hour)
- S (1-3 hours)
- M (3-8 hours)
- L (1-2 days)
- XL (2+ days)

**Usage:** Plan sprint capacity and estimate workload.

### 6. **Sprint** (Single Select)
Sprint planning:
- Backlog (not yet scheduled)
- Sprint 1, Sprint 2, Sprint 3, Sprint 4
- Icebox (future ideas)

**Usage:** Organize work into time-boxed sprints.

### 7. **Target Date** (Date)
Optional deadline for task completion.

**Usage:** Track time-sensitive campaigns and launches.

---

## How to Use the Project Board

### Adding New Issues

**Via GitHub UI:**
```bash
# Navigate to:
https://github.com/DukeWood/aicmo-newsletter/issues/new/choose

# Select template:
- Bug Report
- Feature Request
- Agent Improvement
- Campaign Idea
```

**Via GitHub CLI:**
```bash
# Create and add to project in one command
gh issue create --repo DukeWood/aicmo-newsletter \
  --title "Issue title" \
  --body "Issue description" \
  --label "label1,label2" \
  --assignee @me

# Then add to project
gh project item-add 2 --owner DukeWood \
  --url "https://github.com/DukeWood/aicmo-newsletter/issues/NUMBER"
```

### Organizing Work

**1. Triage New Issues:**
- Review inbox regularly
- Set Priority (Critical/High/Medium/Low)
- Assign Component and Agent
- Estimate Effort
- Add to Sprint or Backlog

**2. Sprint Planning:**
- Move items from Backlog to Sprint X
- Balance effort across sprint
- Set Target Dates for time-sensitive work
- Assign Campaign Type for marketing initiatives

**3. Active Work:**
- Update Status as work progresses
- Add comments with updates
- Link related issues and PRs
- Close when complete

### Filtering and Views

**Filter by Agent:**
```
Agent:"Chris (Content Strategist)"
```

**Filter by Priority:**
```
Priority:"High" or Priority:"Critical"
```

**Filter by Component:**
```
Component:"Newsletter"
```

**Filter by Sprint:**
```
Sprint:"Sprint 1"
```

**Complex Filters:**
```
Priority:"High" Component:"Social Media" Status:"In Progress"
```

---

## Project Workflows

### Newsletter Content Creation
1. Create issue with label `newsletter` and `content`
2. Set Component: `Newsletter`
3. Set Agent: `Chris (Content Strategist)`
4. Set Campaign Type: `Newsletter Series`
5. Add checklist:
   - [ ] Research topic (Mark)
   - [ ] Write content (Chris)
   - [ ] Generate images (ChatGPT-4o)
   - [ ] Upload to Cloudinary
   - [ ] Send test email
   - [ ] Cross-post to social media

### Social Media Campaign
1. Create issue with label `social-media` and `campaign`
2. Set Component: `Social Media`
3. Set Agent: `Sophie (Social Media Manager)`
4. Set Campaign Type based on objective
5. Define success metrics in issue description

### Agent Improvement
1. Create issue with label `agent` and `enhancement`
2. Set Component: `AI Agents`
3. Set Agent: (which agent needs improvement)
4. Describe current vs desired behavior
5. Provide use cases and examples

### Integration Work
1. Create issue with label `integration`
2. Set Component: `Integrations`
3. Set Priority: `High` (if blocking other work)
4. Document API credentials needed
5. Link to relevant docs

---

## Labels Reference

| Label | Color | Description |
|-------|-------|-------------|
| `infrastructure` | Blue | Infrastructure and tooling |
| `newsletter` | Light Blue | Newsletter content and automation |
| `social-media` | Yellow | Social media posting and engagement |
| `content` | Purple | Content creation and strategy |
| `integration` | Dark Purple | Third-party integrations |
| `high-priority` | Red | High priority tasks |
| `agent` | Light Blue | AI agent improvements |
| `campaign` | Light Yellow | Marketing campaigns |
| `bug` | Red | Bug reports (auto-added via template) |
| `enhancement` | Green | Feature requests (auto-added via template) |

---

## Automation Rules

The project includes automatic workflow rules:

1. **New issues** → Automatically added to project
2. **Status: Done** → Issue auto-closes
3. **PR merged** → Linked issue moves to Done
4. **Label: high-priority** → Priority field set to "High"

---

## Best Practices

### 1. Keep Issues Focused
- One task per issue
- Break large tasks into smaller issues
- Use checklists for sub-tasks
- Link related issues

### 2. Update Regularly
- Comment on progress
- Update Status field
- Close completed issues promptly
- Archive old issues

### 3. Use Templates
- Always use issue templates when creating issues
- Fill out all required fields
- Provide context and examples
- Link to relevant documentation

### 4. Tag Appropriately
- Use labels consistently
- Assign relevant Agent
- Set realistic Effort estimates
- Update Priority as needed

### 5. Sprint Hygiene
- Review Backlog weekly
- Plan sprints with balanced effort
- Close or move incomplete sprint items
- Reflect on completed work

---

## Quick Commands

### View Project
```bash
gh project view 2 --owner DukeWood
```

### List Issues in Project
```bash
gh project item-list 2 --owner DukeWood
```

### Create Issue and Add to Project
```bash
gh issue create --repo DukeWood/aicmo-newsletter \
  --title "Task title" \
  --body "Task description" \
  --label "newsletter" && \
gh project item-add 2 --owner DukeWood \
  --url "https://github.com/DukeWood/aicmo-newsletter/issues/ISSUE_NUMBER"
```

### Close Issue
```bash
gh issue close ISSUE_NUMBER --repo DukeWood/aicmo-newsletter
```

---

## Support

- **Project Board:** https://github.com/users/DukeWood/projects/2
- **Issues:** https://github.com/DukeWood/aicmo-newsletter/issues
- **Discussions:** https://github.com/DukeWood/aicmo-newsletter/discussions
- **Documentation:** See CLAUDE.md for agent and workflow details

---

## Next Steps

1. ✅ Project created with custom fields
2. ✅ Initial issues added (9 starter tasks)
3. ✅ Labels configured
4. ✅ Issue templates ready
5. ⏳ **Your Turn:** Configure GitHub Secrets (Issue #1)
6. ⏳ **Your Turn:** Review and prioritize issues
7. ⏳ **Your Turn:** Plan Sprint 1
8. ⏳ **Your Turn:** Start working on high-priority items

Happy managing! 🚀
