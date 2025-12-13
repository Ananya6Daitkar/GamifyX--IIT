# Technology Stack & Setup Guide

## Complete Tech Stack (Open-Source Only)

### Frontend
```
React 18.2.0
TypeScript 5.0
Tailwind CSS 3.3
react-i18next 13.0 (multilingual)
Zustand (state management)
Axios (HTTP client)
fast-check (property-based testing)
Jest (unit testing)
Cypress (E2E testing)
```

### Backend
```
Node.js 18 LTS
Express 4.18
TypeScript 5.0
Prisma 5.0 (ORM)
PostgreSQL 15
Redis 7
Passport.js (authentication)
OpenTelemetry (instrumentation)
Jest (unit testing)
fast-check (property-based testing)
```

### AI/ML
```
Ollama (local LLM runtime)
Mistral 7B (open-source LLM)
scikit-learn (risk prediction model)
TensorFlow.js (browser ML)
```

### Observability
```
OpenTelemetry SDK
Prometheus 2.45
Grafana 10.0
Elasticsearch 8.0
Kibana 8.0
```

### DevOps
```
Docker 24.0
Docker Compose 2.20
GitHub Actions (CI/CD)
GitHub (version control)
```

---

## Local Development Setup

### Prerequisites
```bash
# Install Node.js 18+
node --version  # v18.0.0 or higher

# Install Docker & Docker Compose
docker --version
docker-compose --version

# Install Ollama (for local LLM)
# Download from https://ollama.ai
ollama --version
```

### Project Structure
```
ai-education-platform/
├── frontend/                 # React app
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API clients
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # Context providers
│   │   ├── i18n/            # Translation files
│   │   ├── styles/          # Global styles
│   │   └── tests/           # Unit & property tests
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── jest.config.js
│
├── backend/                  # Node.js/Express app
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Route handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Data models
│   │   ├── middleware/      # Express middleware
│   │   ├── utils/           # Utility functions
│   │   ├── tests/           # Unit & property tests
│   │   └── observability/   # OpenTelemetry setup
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── migrations/      # DB migrations
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.js
│
├── docker-compose.yml       # Local dev environment
├── .github/
│   └── workflows/           # CI/CD pipelines
└── README.md
```

### Setup Steps

#### 1. Clone and Install Dependencies
```bash
# Clone repository
git clone <repo-url>
cd ai-education-platform

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Return to root
cd ..
```

#### 2. Set Up Environment Variables
```bash
# Backend .env
cat > backend/.env << EOF
DATABASE_URL="postgresql://user:password@localhost:5432/ai_education"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-secret-key-here"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
OLLAMA_API_URL="http://localhost:11434"
NODE_ENV="development"
EOF

# Frontend .env
cat > frontend/.env << EOF
REACT_APP_API_URL="http://localhost:3001"
REACT_APP_ENVIRONMENT="development"
EOF
```

#### 3. Start Local Services with Docker Compose
```bash
# Start PostgreSQL, Redis, Prometheus, Grafana, Elasticsearch
docker-compose up -d

# Verify services are running
docker-compose ps
```

#### 4. Set Up Database
```bash
cd backend

# Run Prisma migrations
npx prisma migrate dev --name init

# Seed database with demo data (optional)
npx prisma db seed

cd ..
```

#### 5. Download and Run Ollama
```bash
# Download Ollama from https://ollama.ai
# Install and start Ollama service

# Pull Mistral 7B model
ollama pull mistral

# Verify Ollama is running
curl http://localhost:11434/api/tags
```

#### 6. Start Development Servers
```bash
# Terminal 1: Backend
cd backend
npm run dev
# Server runs on http://localhost:3001

# Terminal 2: Frontend
cd frontend
npm start
# App runs on http://localhost:3000

# Terminal 3: Observability (optional)
# Prometheus: http://localhost:9090
# Grafana: http://localhost:3000 (admin/admin)
# Elasticsearch: http://localhost:9200
```

---

## Database Schema (Prisma)

```prisma
// User model
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  role          Role      @default(STUDENT)
  institution   Institution @relation(fields: [institutionId], references: [id])
  institutionId String
  theme         Theme     @default(DARK)
  language      String    @default("en")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// Student model
model Student {
  id              String    @id @default(cuid())
  user            User      @relation(fields: [userId], references: [id])
  userId          String    @unique
  githubUsername  String?
  githubConnected Boolean   @default(false)
  points          Int       @default(0)
  level           Int       @default(1)
  streak          Int       @default(0)
  riskScore       Float     @default(0)
  riskLevel       RiskLevel @default(LOW)
  badges          Badge[]
  submissions     Submission[]
  feedback        Feedback[]
  grievances      Grievance[]
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

// Submission model
model Submission {
  id              String    @id @default(cuid())
  student         Student   @relation(fields: [studentId], references: [id])
  studentId       String
  assignment      Assignment @relation(fields: [assignmentId], references: [id])
  assignmentId    String
  githubUrl       String?
  codeQuality     Float     @default(0)
  complexity      Float     @default(0)
  submittedAt     DateTime  @default(now())
  feedback        Feedback[]
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

// Feedback model
model Feedback {
  id          String    @id @default(cuid())
  submission  Submission @relation(fields: [submissionId], references: [id])
  submissionId String
  teacher     User      @relation(fields: [teacherId], references: [id])
  teacherId   String
  student     Student   @relation(fields: [studentId], references: [id])
  studentId   String
  aiSuggested Boolean   @default(false)
  content     String
  rating      Int?      // 1-5
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

// Grievance model
model Grievance {
  id          String    @id @default(cuid())
  student     Student   @relation(fields: [studentId], references: [id])
  studentId   String
  category    GrievanceCategory
  severity    Severity
  description String
  status      GrievanceStatus @default(OPEN)
  assignedTo  User?     @relation(fields: [assignedToId], references: [id])
  assignedToId String?
  resolution  String?
  createdAt   DateTime  @default(now())
  resolvedAt  DateTime?
  updatedAt   DateTime  @updatedAt
}

// Badge model
model Badge {
  id        String    @id @default(cuid())
  name      String
  description String
  iconUrl   String
  criteria  String
  rarity    Rarity
  students  Student[]
  createdAt DateTime  @default(now())
}

// Enums
enum Role {
  STUDENT
  TEACHER
  MENTOR
  ADMIN
}

enum Theme {
  DARK
  LIGHT
}

enum RiskLevel {
  LOW
  MEDIUM
  HIGH
}

enum GrievanceCategory {
  GRADE
  FEEDBACK
  FAIRNESS
  OTHER
}

enum Severity {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum GrievanceStatus {
  OPEN
  IN_PROGRESS
  RESOLVED
  CLOSED
}

enum Rarity {
  COMMON
  RARE
  EPIC
  LEGENDARY
}
```

---

## API Endpoints Overview

### Authentication
```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me
```

### Students
```
GET    /api/students/{id}
GET    /api/students/{id}/progress
GET    /api/students/{id}/feedback
GET    /api/students/{id}/achievements
POST   /api/students/{id}/grievance
```

### Teachers
```
GET    /api/teachers/{id}/class
GET    /api/teachers/{id}/students
POST   /api/teachers/{id}/feedback
GET    /api/teachers/{id}/grievances
POST   /api/teachers/{id}/intervention
```

### Gamification
```
POST   /api/gamification/award-points
POST   /api/gamification/unlock-badge
GET    /api/gamification/leaderboard
GET    /api/gamification/streaks
```

### GitHub
```
POST   /api/github/connect
GET    /api/github/activity/{student_id}
POST   /api/github/analyze
```

### Chatbot
```
POST   /api/chatbot/message
GET    /api/chatbot/history/{user_id}
```

### Admin
```
GET    /api/admin/institution/health
GET    /api/admin/reports
GET    /api/admin/audit-logs
GET    /api/admin/metrics
```

---

## Testing

### Run Unit Tests
```bash
# Frontend
cd frontend
npm test

# Backend
cd backend
npm test
```

### Run Property-Based Tests
```bash
# Frontend
cd frontend
npm run test:properties

# Backend
cd backend
npm run test:properties
```

### Run E2E Tests
```bash
# Frontend
cd frontend
npm run test:e2e
```

### Generate Coverage Report
```bash
# Backend
cd backend
npm run test:coverage
```

---

## Deployment

### Build for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
```

### Docker Build
```bash
# Build images
docker build -t ai-education-frontend ./frontend
docker build -t ai-education-backend ./backend

# Run containers
docker run -p 3000:3000 ai-education-frontend
docker run -p 3001:3001 ai-education-backend
```

### GitHub Actions CI/CD
- Automatically runs tests on PR
- Builds Docker images
- Deploys to staging on merge
- Requires approval for production
- Automatic rollback on failure

---

## Troubleshooting

### PostgreSQL Connection Error
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart PostgreSQL
docker-compose restart postgres

# Check connection string in .env
```

### Redis Connection Error
```bash
# Check if Redis is running
docker-compose ps

# Restart Redis
docker-compose restart redis
```

### Ollama Not Responding
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Restart Ollama service
# Or download from https://ollama.ai
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

---

## Performance Optimization

### Frontend
- Code splitting with React.lazy()
- Image optimization with next-gen formats
- CSS minification with Tailwind
- Bundle analysis with webpack-bundle-analyzer

### Backend
- Database query optimization with Prisma
- Redis caching for frequently accessed data
- Connection pooling with PgBouncer
- API response compression with gzip

### Observability
- Monitor latency with OpenTelemetry
- Track errors with Sentry integration
- Profile with Node.js profiler
- Load test with k6

---

## Security

### Authentication
- OAuth 2.0 with GitHub/Google
- JWT tokens with 1-hour expiration
- Refresh token rotation
- CSRF protection

### Data Protection
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- PII masking in logs
- GDPR compliance

### API Security
- Rate limiting (100 req/min per IP)
- Input validation and sanitization
- SQL injection prevention with Prisma
- XSS protection with Content Security Policy

---

## Monitoring & Alerts

### Key Metrics
- API latency (p50, p95, p99)
- Error rate (5xx, 4xx)
- Throughput (requests/sec)
- Database query time
- Cache hit rate

### Alerts
- Error rate > 1%
- Latency p99 > 1s
- Database connection pool exhausted
- Disk space < 10%
- Memory usage > 80%

---

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the spec documents
3. Check GitHub issues
4. Ask in the team chat

Good luck! 🚀
