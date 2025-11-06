#!/bin/bash

# Canva OAuth Vercel Setup Script
# This script helps you configure Vercel environment variables for Canva OAuth

echo "╔═══════════════════════════════════════════╗"
echo "║   Canva OAuth Vercel Setup                ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if logged in
echo "🔍 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel"
    echo "Please run: vercel login"
    exit 1
fi

echo "✅ Vercel CLI authenticated"
echo ""

# Current environment variables
echo "📋 Current Vercel environment variables:"
vercel env ls
echo ""

# Prompt for Client Secret
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔐 Canva Client Secret Required"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "To get your Client Secret:"
echo "1. Go to: https://www.canva.com/developers/"
echo "2. Open your integration: OC-AZndiQDmxUJT"
echo "3. Find 'Client Secret' section"
echo "4. Copy the secret (or regenerate if needed)"
echo ""
read -p "Enter your Canva Client Secret: " CANVA_SECRET

if [ -z "$CANVA_SECRET" ]; then
    echo "❌ No secret provided. Exiting."
    exit 1
fi

echo ""
echo "🔄 Adding CANVA_CLIENT_SECRET to Vercel..."

# Add environment variable
echo "$CANVA_SECRET" | vercel env add CANVA_CLIENT_SECRET production

if [ $? -eq 0 ]; then
    echo "✅ Environment variable added successfully"
else
    echo "❌ Failed to add environment variable"
    exit 1
fi

echo ""
echo "🚀 Redeploying to Vercel with new environment variables..."
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "╔═══════════════════════════════════════════╗"
    echo "║   ✅ Deployment Successful!               ║"
    echo "╚═══════════════════════════════════════════╝"
    echo ""
    echo "📝 Next Steps:"
    echo ""
    echo "1. Update Canva Developer Portal:"
    echo "   • Go to: https://www.canva.com/developers/"
    echo "   • Open your integration: OC-AZndiQDmxUJT"
    echo "   • Authentication → Add redirect URL:"
    echo "     https://aicmo-canva-oauth.vercel.app/oauth/redirect"
    echo "   • Set as default"
    echo ""
    echo "2. Test OAuth Flow:"
    echo "   • Open: https://aicmo-canva-oauth.vercel.app/oauth/authorize"
    echo "   • Click 'Authorize' on Canva"
    echo "   • Copy tokens from success page"
    echo "   • Save to .canva-tokens.json"
    echo ""
    echo "3. Verify Health:"
    echo "   • Check: https://aicmo-canva-oauth.vercel.app/health"
    echo ""
    echo "4. Submit for Review:"
    echo "   • Go to Canva Developer Portal"
    echo "   • Submit for review"
    echo "   • All checks should pass ✅"
    echo ""
else
    echo "❌ Deployment failed"
    exit 1
fi
