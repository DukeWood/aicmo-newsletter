# MCP Configuration Fixed

## What Was Wrong

The `/mcp` command showed "No MCP servers configured" because:

1. **MCP config was in the wrong location:**
   - You had: `.claude/mcp-config.json` (project-specific)
   - Claude Code expects: `~/.claude/mcp-config.json` (global)

2. **Environment variables weren't globally accessible:**
   - Variables were only in project `.env` file
   - MCP servers need them in shell environment

## What Was Fixed

### 1. Copied MCP Config to Global Location
```bash
cp .claude/mcp-config.json ~/.claude/mcp-config.json
```

**Result:** 3 MCP servers now configured globally:
- `mailchimp` - Mailchimp email campaign management
- `cloudinary` - Image hosting and optimization
- `twitter` - Twitter/X social media posting

### 2. Added Environment Variables to `~/.zshrc`

Added the following to `~/.zshrc`:
```bash
# Mailchimp API
export MAILCHIMP_API_KEY="..."
export MAILCHIMP_SERVER_PREFIX="us2"

# Cloudinary
export CLOUDINARY_CLOUD_NAME="dmaw7i3gz"
export CLOUDINARY_API_KEY="..."
export CLOUDINARY_API_SECRET="..."

# Twitter/X API (OAuth 1.0a)
export TWITTER_API_KEY="..."
export TWITTER_API_SECRET="..."
export TWITTER_ACCESS_TOKEN="..."
export TWITTER_ACCESS_TOKEN_SECRET="..."
```

## Next Steps

### REQUIRED: Restart Claude Code

**The MCP servers will NOT be detected until you restart Claude Code.**

1. Exit Claude Code completely (quit the application)
2. Reopen Claude Code
3. Navigate back to this project directory
4. Run `/mcp` command to verify servers are detected

### Expected Output After Restart

When you run `/mcp` after restarting, you should see:

```
MCP Servers:
1. mailchimp - Mailchimp email campaign management
2. cloudinary - Image hosting and optimization
3. twitter - Twitter/X social media posting
```

### Troubleshooting

**If `/mcp` still shows "No MCP servers configured":**

1. **Open a new terminal** and verify environment variables are set:
   ```bash
   echo $MAILCHIMP_API_KEY
   echo $CLOUDINARY_CLOUD_NAME
   echo $TWITTER_API_KEY
   ```

   If they're empty, run:
   ```bash
   source ~/.zshrc
   ```

2. **Check global MCP config exists:**
   ```bash
   cat ~/.claude/mcp-config.json
   ```

3. **Verify MCP server packages are available:**
   ```bash
   npx @bryangsmith/mailchimp-mcp-server --version
   npx @cloudinary/asset-management --version
   npx @mbelinky/x-mcp-server --version
   ```

**If servers are detected but fail to connect:**
- Check API credentials are correct
- Test individual APIs:
  - Mailchimp: https://mailchimp.com/developer/
  - Cloudinary: https://cloudinary.com/console
  - Twitter: https://developer.twitter.com/en/portal/dashboard

## Configuration Files

### Global MCP Config
**Location:** `~/.claude/mcp-config.json`
**Purpose:** Defines MCP servers for all Claude Code sessions

### Project MCP Config (Backup)
**Location:** `.claude/mcp-config.json`
**Purpose:** Project-specific backup (can be deleted if not needed)

### Environment Variables
**Location:** `~/.zshrc` (global shell configuration)
**Purpose:** Provides API credentials to MCP servers

**Also in:** `.env` (project-specific backup)

## Testing MCP Servers

Once `/mcp` shows your servers, test each one:

### 1. Mailchimp
```javascript
// Use Mailchimp MCP tools to fetch lists
mcp__mailchimp__getLists()
```

### 2. Cloudinary
```javascript
// Use Cloudinary MCP tools to list assets
mcp__cloudinary__listAssets()
```

### 3. Twitter/X
```javascript
// Use Twitter MCP tools to post a test tweet
mcp__twitter__createTweet({ text: "Testing MCP integration!" })
```

## Security Note

**Credentials are now in two places:**
1. `~/.zshrc` - Global shell environment (all terminal sessions)
2. `.env` - Project-specific file (for Node.js scripts)

**Recommendation:**
- Keep `.env` in `.gitignore` (already done)
- Don't commit `~/.zshrc` to version control
- Rotate API keys if accidentally exposed

## Why This Configuration

**Global vs Project-Specific:**
- **Global** (`~/.claude/mcp-config.json`): MCP servers work in all Claude Code sessions
- **Project** (`.claude/mcp-config.json`): Would only work in this project (not supported by `/mcp`)

**Trade-off:** Global config means MCP servers are always available, but credentials are accessible to all projects. If you need project-specific isolation, you'll need to manage credentials differently.
