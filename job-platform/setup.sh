#!/bin/bash

# JobHub - Complete Setup Script
# Usage: bash setup.sh

set -e

echo "🚀 JobHub Setup Script"
echo "======================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Backend Setup
echo ""
echo "📦 Setting up Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Check .env
if [ ! -f ".env" ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your MongoDB URI"
fi

echo "✅ Backend setup complete"

# Frontend Setup
echo ""
echo "📦 Setting up Frontend..."
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "✅ Frontend setup complete"

# Done
echo ""
echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your MongoDB URI"
echo "2. Run in terminal 1: cd backend && npm run seed && npm run dev"
echo "3. Run in terminal 2: cd frontend && npm start"
echo "4. Open http://localhost:3000"
echo ""
