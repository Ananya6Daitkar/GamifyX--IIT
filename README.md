# AI-Powered Education Platform - Local Development Setup

This guide will help you set up the complete local development environment for the AI-Powered Education Platform.

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **Docker & Docker Compose** - [Download](https://www.docker.com/products/docker-desktop)
- **Git** - [Download](https://git-scm.com/)
- **Ollama** (for local LLM) - [Download](https://ollama.ai)

Verify installations:
```bash
node --version      # v18.0.0 or higher
npm --version       # 9.0.0 or higher
docker --version    # 24.0.0 or higher
docker-compose --version  # 2.20.0 or higher
```

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
npm install -w frontend

# Install backend dependencies
npm install -w backend
```

### 2. Start Docker Services
```bash
# Start PostgreSQL, Redis, Prometheus, Grafana, Elasticsearch
npm run docker:up

# Verify services are running
docker-compose ps
```

### 3. Set Up Database
```bash
# Create .env file for backend
cp backend/.env.example backend/.env

# Run database migrations
cd backend
npx prisma migrate dev --name init

# Seed database with demo data
npx prisma db seed

cd ..
```

### 4. Set Up Frontend Environment
```bash
# Create .env file for frontend
cp frontend/.env.example frontend/.env
```

### 5. Start Development Servers

Open three terminal windows:

**Terminal 1 - Backend:**
```bash
npm run dev -w backend
# Server runs on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
npm run dev -w frontend
# App runs on http://localhost:3000
```

**Terminal 3 - Ollama (optional, for AI features):**
```bash
# Download Ollama from https://ollama.ai
# Start Ollama service, then pull the model:
ollama pull mistral
```

## Detailed Setup Guide

### Environment Variables

#### Backend (.env)
```bash
DATABASE_URL="postgresql://ai_education_user:ai_education_password@localhost:5432/ai_education"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-secret-key-here-change-in-production"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
OLLAMA_API_URL="http://localhost:11434"
NODE_ENV="development"
PORT=3001
```

#### Frontend (.env)
```bash
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development
```

### Docker Services

The `docker-compose.yml` includes:

- **PostgreSQL 15** - Primary database (port 5432)
- **Redis 7** - Cache layer (port 6379)
- **Prometheus** - Metrics collection (port 9090)
- **Grafana** - Dashboards (port 3001)
- **Elasticsearch** - Log storage (port 9200)
- **Kibana** - Log visualization (port 5601)

Access services:
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3001` (admin/admin)
- Elasticsearch: `http://localhost:9200`
- Kibana: `http://localhost:5601`

### Database Setup

```bash
# Create migrations
cd backend
npx prisma migrate dev --name <migration_name>

# View database
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch -w frontend
npm run test:watch -w backend

# Run property-based tests
npm run test:properties

# Generate coverage report
npm run test:coverage -w backend
npm run test:coverage -w frontend
```

### Linting and Type Checking

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check -w frontend
npm run type-check -w backend
```

## Project Structure

```
ai-education-platform/
├── frontend/                 # React TypeScript app
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API clients
│   │   ├── store/           # Zustand stores
│   │   ├── i18n/            # Translations
│   │   └── tests/           # Unit & property tests
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── jest.config.js
│
├── backend/                  # Node.js/Express app
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Route handlers
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Express middleware
│   │   └── tests/           # Unit & property tests
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── migrations/      # DB migrations
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.js
│
├── docker-compose.yml       # Local dev environment
├── prometheus.yml           # Prometheus config
├── package.json             # Root workspace config
└── README.md
```

## Common Commands

```bash
# Development
npm run dev                  # Start all dev servers
npm run dev -w frontend     # Start frontend only
npm run dev -w backend      # Start backend only

# Building
npm run build               # Build frontend and backend
npm run build -w frontend   # Build frontend only
npm run build -w backend    # Build backend only

# Testing
npm test                    # Run all tests
npm run test:watch -w frontend
npm run test:watch -w backend
npm run test:properties     # Run property-based tests
npm run test:coverage       # Generate coverage reports

# Database
cd backend
npx prisma migrate dev      # Create and run migrations
npx prisma studio          # Open Prisma Studio
npx prisma db seed         # Seed database

# Docker
npm run docker:up           # Start all services
npm run docker:down         # Stop all services
npm run docker:logs         # View logs
```

## Troubleshooting

### PostgreSQL Connection Error
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart PostgreSQL
docker-compose restart postgres

# Check connection string in backend/.env
```

### Redis Connection Error
```bash
# Check if Redis is running
docker-compose ps

# Restart Redis
docker-compose restart redis

# Test connection
redis-cli ping
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Ollama Not Responding
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Restart Ollama service
# Or download from https://ollama.ai
```

### Database Migration Issues
```bash
# Reset database (WARNING: deletes all data)
cd backend
npx prisma migrate reset

# Or manually drop and recreate
docker-compose exec postgres psql -U ai_education_user -d ai_education -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test**
   ```bash
   npm test
   npm run lint
   npm run type-check
   ```

3. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

4. **Create a pull request**
   - GitHub Actions will run tests automatically
   - Request review from team members
   - Merge after approval

## Performance Tips

- Use Redis for caching frequently accessed data
- Implement database query optimization
- Monitor with Prometheus and Grafana
- Use Elasticsearch for log analysis
- Profile with Node.js built-in profiler

## Security Notes

- Never commit `.env` files with real credentials
- Use strong JWT secrets in production
- Enable HTTPS in production
- Implement rate limiting on APIs
- Validate and sanitize all inputs
- Use environment variables for sensitive data

## Next Steps

1. Read the [requirements.md](.kiro/specs/ai-education-platform-mvp/requirements.md)
2. Review the [design.md](.kiro/specs/ai-education-platform-mvp/design.md)
3. Check the [tasks.md](.kiro/specs/ai-education-platform-mvp/tasks.md) for implementation tasks
4. Start implementing features from the task list

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the spec documents
3. Check GitHub issues
4. Ask in the team chat

---

**Happy coding! 🚀**
