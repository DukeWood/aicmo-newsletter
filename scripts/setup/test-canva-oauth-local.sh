#!/bin/bash

# Test Canva OAuth Flow Locally
# This script helps you test the OAuth flow before deploying to production

echo "╔═══════════════════════════════════════════╗"
echo "║   Test Canva OAuth Locally                ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

# Check if .env has Canva credentials
if ! grep -q "CANVA_CLIENT_SECRET=OC-" .env 2>/dev/null; then
    echo "⚠️  Canva credentials not found in .env file"
    echo ""
    echo "📋 Please add your Canva credentials to .env:"
    echo ""
    echo "CANVA_CLIENT_ID=OC-AZndiQDmxUJT"
    echo "CANVA_CLIENT_SECRET=your-actual-secret-here"
    echo "CANVA_REDIRECT_URI=http://127.0.0.1:3001/oauth/redirect"
    echo ""
    echo "Get your credentials from: https://www.canva.com/developers/"
    echo ""
    read -p "Press Enter after you've added the credentials to .env..."
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if port 3001 is available
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 3001 is already in use"
    echo "Killing the process..."
    kill -9 $(lsof -Pi :3001 -sTCP:LISTEN -t)
    sleep 1
fi

echo "🚀 Starting local OAuth server..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📍 Server will start on:"
echo "   http://127.0.0.1:3001"
echo ""
echo "🔗 OAuth authorization URL:"
echo "   http://127.0.0.1:3001/oauth/authorize"
echo ""
echo "✨ The browser will open automatically"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
node server/oauth-server.js &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Open browser
if command -v open &> /dev/null; then
    open "http://127.0.0.1:3001/oauth/authorize"
elif command -v xdg-open &> /dev/null; then
    xdg-open "http://127.0.0.1:3001/oauth/authorize"
fi

echo "✅ Server started (PID: $SERVER_PID)"
echo ""
echo "📝 After successful authorization:"
echo "   1. Copy the JSON from the success page"
echo "   2. Save to .canva-tokens.json"
echo "   3. Press Ctrl+C to stop the server"
echo ""

# Wait for user to stop
wait $SERVER_PID
