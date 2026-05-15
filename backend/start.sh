#!/bin/bash

# 🚀 Portfolio Backend Quick Start Script
# This script helps you quickly start your secure portfolio server

echo "╔════════════════════════════════════════════════════════════╗"
echo "║         🎯 Secure Portfolio Backend - Quick Start           ║"
echo "╚════════════════════════════════════════════════════════════╝"

# Check if we're in the right directory
if [ ! -f "server.js" ]; then
    echo "❌ Error: Please run this script from the backend directory"
    echo "   cd backend && bash start.sh"
    exit 1
fi

echo ""
echo "📋 Checking environment..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi
echo "✅ Node.js found: $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi
echo "✅ npm found: $(npm -v)"

echo ""
echo "📦 Checking dependencies..."

# Install if needed
if [ ! -d "node_modules" ]; then
    echo "📥 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🚀 Starting server..."
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                  📚 Server Starting...                     ║"
echo "║                                                            ║"
echo "║  🌐 Access at: http://localhost:8000                      ║"
echo "║  📂 Templates: ./templates/                               ║"
echo "║  📦 Static: ./static/                                     ║"
echo "║                                                            ║"
echo "║  Press Ctrl+C to stop the server                          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

npm start
