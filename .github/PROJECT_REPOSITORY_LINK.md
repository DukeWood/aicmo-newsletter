# Repository ↔ Project Link Configuration

This document explains how the **aicmo-newsletter** repository is connected to the **aiCMO Marketing Orchestration** GitHub Project.

---

## Connection Overview

**Repository:** https://github.com/DukeWood/aicmo-newsletter
**Project:** https://github.com/users/DukeWood/projects/2

---

## 🔗 How They're Connected

### 1. **All Repository Issues Added to Project** ✅
All 9 repository issues have been manually added to the project:

```bash
# Issues #1-9 are in the project
gh project item-list 2 --owner DukeWood
```

### 2. **Automatic Issue/PR Linking** ✅
Workflow configured at `.github/workflows/add-to-project.yml`

**Triggers:**
- When new issue is opened → Automatically added to project
- When new PR is opened → Automatically added to project

**Requirements:**
- ✅ Workflow file exists
- ⚠️ Requires `ADD_TO_PROJECT_PAT` secret (see setup below)

### 3. **Project Automation** ✅
The project automatically:
- Tracks issue status changes
- Links PRs to issues
- Updates when issues are closed
- Shows repository name on project cards

---

## 🔧 Setup Required

### Create Personal Access Token (PAT)

The automatic linking workflow requires a GitHub Personal Access Token with project permissions.

**Steps:**

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/tokens

2. **Generate New Token (Classic)**
   - Click "Generate new token (classic)"
   - Name: `GitHub Projects - aiCMO`
   - Expiration: 90 days (recommended) or No expiration

3. **Select Scopes:**
   - ✅ `repo` (Full control of private repositories)
   - ✅ `project` (Full control of projects)
   - ✅ `read:project` (Read access to projects)

4. **Generate Token**
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

5. **Add to Repository Secrets**
   - Go to: https://github.com/DukeWood/aicmo-newsletter/settings/secrets/actions
   - Click "New repository secret"
   - Name: `ADD_TO_PROJECT_PAT`
   - Value: Paste your token
   - Click "Add secret"

---

## ✅ Verify Connection

### Test 1: Check Existing Issues
```bash
# List project items (should show 9 issues)
gh project item-list 2 --owner DukeWood --format json | jq '.items[].content.title'
```

### Test 2: Create Test Issue
```bash
# Create a test issue
gh issue create --repo DukeWood/aicmo-newsletter \
  --title "[TEST] Verify Project Auto-Link" \
  --body "This is a test issue to verify automatic project linking."

# Check if it appears in project within 30 seconds
gh project item-list 2 --owner DukeWood | grep TEST
```

### Test 3: Check Workflow Runs
```bash
# View recent workflow runs
gh run list --repo DukeWood/aicmo-newsletter --workflow "Add to Project"
```

---

## 🔄 How It Works

### When You Create an Issue:

1. **Issue created** in repository
   ```bash
   gh issue create --repo DukeWood/aicmo-newsletter --title "New task"
   ```

2. **Workflow triggers** (`.github/workflows/add-to-project.yml`)
   - Detects new issue event
   - Authenticates with `ADD_TO_PROJECT_PAT`

3. **Issue added to project** automatically
   - Appears in project board within seconds
   - Status set to "Todo" (default)
   - Ready for custom field assignment

4. **You can then:**
   - Assign Agent, Component, Priority, etc.
   - Move between Status columns
   - Add to Sprint

### When You Create a PR:

Same workflow applies to pull requests:
1. PR opened
2. Workflow triggers
3. PR added to project
4. Linked to related issues automatically

---

## 📊 Current Connection Status

### Issues in Project: ✅ 9/9

| Issue | Title | Status |
|-------|-------|--------|
| #1 | Configure GitHub Secrets | ✅ In Project |
| #2 | Newsletter Issue #2 | ✅ In Project |
| #3 | LinkedIn Standard Tier | ✅ In Project |
| #4 | Design Pricing Page | ✅ In Project |
| #5 | Improve Maggie Agent | ✅ In Project |
| #6 | Launch Founding Member Program | ✅ In Project |
| #7 | Build Autopilot Onboarding | ✅ In Project |
| #8 | Document Canva + Twitter | ✅ In Project |
| #9 | Add Competitive Intelligence | ✅ In Project |

### Workflow Status: ⚠️ Pending PAT

**Action Required:**
- Add `ADD_TO_PROJECT_PAT` secret to repository
- See "Create Personal Access Token" section above

---

## 🎯 Benefits of Connection

### 1. **Automatic Organization**
- New issues/PRs automatically added to project
- No manual copying needed
- All work tracked in one place

### 2. **Unified Workflow**
- Create issue in repo → Auto-appears in project
- Assign fields → Organize work
- Close issue → Project updates automatically

### 3. **Better Visibility**
- See all repository work in project board
- Track progress with custom fields
- Filter by Agent, Component, Sprint, etc.

### 4. **Cross-Repository Support** (Future)
If you add more repositories later:
- Same project can track multiple repos
- Unified view of all marketing work
- Component field helps distinguish sources

---

## 🔧 Troubleshooting

### Issue Not Auto-Added to Project

**Check:**
1. Is `ADD_TO_PROJECT_PAT` secret configured?
   - Go to: https://github.com/DukeWood/aicmo-newsletter/settings/secrets/actions
   - Verify `ADD_TO_PROJECT_PAT` exists

2. Is the workflow enabled?
   ```bash
   gh workflow view "Add to Project" --repo DukeWood/aicmo-newsletter
   ```

3. Check workflow run logs:
   ```bash
   gh run list --repo DukeWood/aicmo-newsletter --workflow "Add to Project"
   gh run view <run-id> --log
   ```

### PAT Expired

If your PAT expires:
1. Generate new token (same steps as above)
2. Update `ADD_TO_PROJECT_PAT` secret with new token
3. Test by creating a new issue

### Workflow Failed

Common causes:
- Missing or invalid PAT
- Insufficient PAT permissions
- Project URL incorrect in workflow file
- GitHub Actions disabled in repository

**Solution:**
1. Check workflow file: `.github/workflows/add-to-project.yml`
2. Verify project URL: `https://github.com/users/DukeWood/projects/2`
3. Regenerate PAT with correct scopes
4. Update secret

---

## 📋 Manual Linking (Backup Method)

If automatic linking fails, you can manually add issues:

```bash
# Add single issue to project
gh project item-add 2 --owner DukeWood \
  --url "https://github.com/DukeWood/aicmo-newsletter/issues/ISSUE_NUMBER"

# Add multiple issues
for issue in 10 11 12; do
  gh project item-add 2 --owner DukeWood \
    --url "https://github.com/DukeWood/aicmo-newsletter/issues/$issue"
done
```

---

## 🔮 Future Enhancements

### Potential Additions:

1. **Auto-Assign Fields**
   - Detect issue labels → Set Component automatically
   - Detect "high-priority" label → Set Priority to High

2. **Auto-Add to Sprint**
   - Issues with milestone → Auto-assign to Sprint

3. **Linked PR Auto-Close**
   - When PR merged → Close linked issue
   - Update project Status to "Done"

4. **Multi-Repository Support**
   - Add issues from related repos
   - Use Component field to distinguish sources

---

## 📚 Related Documentation

- **Project Guide:** `.github/PROJECT_GUIDE.md`
- **Project Setup:** `.github/PROJECT_SETUP_COMPLETE.md`
- **Field Assignments:** `.github/PROJECT_FIELD_ASSIGNMENTS.md`
- **GitHub Setup:** `.github/GITHUB_SETUP_SUMMARY.md`

---

## 🎯 Next Steps

1. **Create Personal Access Token** (see above)
2. **Add to Repository Secrets** as `ADD_TO_PROJECT_PAT`
3. **Test by Creating Issue** (workflow should auto-add to project)
4. **Verify in Project Board** within 30 seconds

---

**Repository:** https://github.com/DukeWood/aicmo-newsletter
**Project:** https://github.com/users/DukeWood/projects/2
**Workflow:** `.github/workflows/add-to-project.yml`

---

*Last Updated: October 18, 2025*
