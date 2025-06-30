# BoltDB - Fastener & Component Search Engine

> Professional engineering tool for fastener and component specifications with CAD links and AI-powered search.

## 🔧 Overview

BoltDB is a modern, AI-enhanced search engine specifically designed for engineers and technical professionals who need to find, specify, and download fastener and component data quickly and accurately. Built with the latest web technologies and powered by OpenAI, BoltDB revolutionizes how engineers search for and work with fastener specifications.

## ✨ Key Features

### 🤖 AI-Powered Search
- **Intelligent Query Enhancement**: AI understands engineering terminology and context
- **Smart Recommendations**: Get component suggestions based on your requirements
- **Natural Language Processing**: Search using natural engineering language

### 🔍 Advanced Search Capabilities
- **Fuzzy Search**: Find components even with partial or approximate terms
- **Multi-Filter Support**: Filter by material, standard, size, manufacturer, and more
- **Real-time Results**: Sub-second search responses with Redis caching
- **Popular Searches**: See what other engineers are searching for

### 📐 Comprehensive Database
- **10M+ Components**: Extensive fastener and hardware database
- **500K+ CAD Files**: Ready-to-download 3D models and technical drawings
- **1000+ Standards**: ISO, DIN, ANSI, JIS, and more international standards
- **Detailed Specifications**: Complete technical data for every component

### 📁 CAD Integration
- **Multiple Formats**: STEP, IGES, STL, DWG support
- **Instant Downloads**: No registration required for basic downloads
- **3D Viewer**: Preview CAD models before downloading
- **Version Control**: Track CAD file versions and updates

### 🏢 Professional Features
- **User Management**: Role-based access for teams and organizations
- **Download Analytics**: Track usage and popular components
- **API Access**: RESTful API for integration with CAD software
- **Enterprise Support**: Dedicated support for business users

## 🚀 Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom design system
- **Framer Motion**: Smooth animations and interactions
- **React Query**: Data fetching and caching
- **Heroicons**: Beautiful SVG icons

### Backend
- **Node.js**: JavaScript runtime
- **PostgreSQL**: Primary database with Prisma ORM
- **Redis**: Caching and session management
- **OpenAI GPT-4**: AI-powered search enhancement

### Infrastructure
- **Docker**: Containerized development and deployment
- **Prisma**: Type-safe database toolkit
- **JWT**: Secure authentication
- **Multer**: File upload handling

## 📦 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/zbest1000/BoltDB.git
cd BoltDB
```

2. **Run the setup script**
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your OpenAI API key and other settings
```

4. **Start the development server**
```bash
npm run dev
```

5. **Access the application**
- Open http://localhost:3000 in your browser
- Database UI: http://localhost:3000/api/db-studio (Prisma Studio)

### Manual Setup (Alternative)

If you prefer manual setup:

```bash
# Install dependencies
npm install

# Start database services
docker-compose up -d postgres redis

# Setup database
npx prisma generate
npx prisma db push
npm run seed

# Start development server
npm run dev
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
npm run seed         # Seed database with sample data

# Docker
docker-compose up -d          # Start all services
docker-compose down           # Stop all services
docker-compose logs           # View logs
```

### Project Structure

```
BoltDB/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── home/          # Home page components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # Reusable UI components
│   ├── lib/               # Utility libraries
│   │   ├── prisma.ts      # Database client
│   │   ├── redis.ts       # Redis client
│   │   ├── openai.ts      # AI integration
│   │   └── search.ts      # Search engine
│   └── types/             # TypeScript type definitions
├── prisma/                # Database schema and migrations
├── docker-compose.yml     # Docker services
├── tailwind.config.js     # Tailwind CSS configuration
└── scripts/               # Setup and utility scripts
```

## 🎯 API Endpoints

### Search API
```bash
GET  /api/search?q=M8+bolts&aiEnhanced=true
POST /api/search
```

### AI Features
```bash
POST /api/ai/recommendations
POST /api/ai/analyze
```

### Components
```bash
GET  /api/components
GET  /api/components/:id
POST /api/components/:id/download
```

### User Management
```bash
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/profile
```

## 🔐 Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/boltdb"

# Redis
REDIS_URL="redis://localhost:6379"

# OpenAI (Required for AI features)
OPENAI_API_KEY="sk-your-openai-api-key-here"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-here"
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# File Storage
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE="10485760"
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## 📊 Default Users

After running the seed script, you can log in with:

- **Admin User**: admin@boltdb.com / admin123
- **Engineer User**: engineer@boltdb.com / engineer123

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Docker Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Environment-specific Configurations

- **Development**: Uses local PostgreSQL and Redis
- **Staging**: Uses cloud databases with staging data
- **Production**: Uses production databases with SSL

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check our [Wiki](https://github.com/zbest1000/BoltDB/wiki)
- **Issues**: Report bugs on [GitHub Issues](https://github.com/zbest1000/BoltDB/issues)
- **Discussions**: Join our [GitHub Discussions](https://github.com/zbest1000/BoltDB/discussions)
- **Email**: support@boltdb.com

## 🎖️ Acknowledgments

- OpenAI for providing the GPT-4 API
- The engineering community for feedback and requirements
- All contributors who help make BoltDB better

---

**Built with ❤️ for engineers, by engineers.**
