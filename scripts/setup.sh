#!/bin/bash

# MechHub Setup Script
echo "🔧 Setting up MechHub - Mechanical Components Search Engine"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Create .env file from example
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your OpenAI API key and other settings"
else
    echo "✅ .env file already exists"
fi

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Start Docker services
echo "🐳 Starting Docker services (PostgreSQL & Redis)..."
docker-compose up -d postgres redis

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 10

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npx prisma generate

# Push database schema
echo "🗄️  Setting up database schema..."
npx prisma db push

# Seed the database
echo "🌱 Seeding database with sample data..."
npm run seed

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update your .env file with your OpenAI API key"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:3000 to access MechHub"
echo ""
echo "📧 Default login credentials:"
echo "- Admin: admin@mechhub.com / admin123"
echo "- Engineer: engineer@mechhub.com / engineer123"
echo ""
echo "Database Management:"
echo "- View database: npm run db:studio"
echo "- Reset database: npm run db:reset"
echo ""
echo "Docker Services:"
echo "- Stop services: docker-compose down"
echo "- View logs: docker-compose logs"