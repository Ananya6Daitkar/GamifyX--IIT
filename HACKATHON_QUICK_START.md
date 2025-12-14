# 🚀 Hackathon Quick Start (8 Tasks, 8 Hours)

## What You're Building

AI-powered education platform with:
- GitHub integration for code tracking
- Local LLM (Ollama) for feedback generation
- Risk prediction for at-risk students
- Student & teacher dashboards
- Gamification system
- Grievance management

## Prerequisites

```bash
# Install these first
- Node.js 18+
- PostgreSQL (local)
- Redis (local)
- Ollama (free LLM)
```

## Setup (15 minutes)

### 1. Clone & Install
```bash
git clone https://github.com/Ananya6Daitkar/GamifyX--IIT.git
cd GamifyX--IIT
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 2. Start Services
```bash
# Terminal 1: PostgreSQL
docker run -d -p 5432:5432 postgres:latest

# Terminal 2: Redis
docker run -d -p 6379:6379 redis:latest

# Terminal 3: Ollama
ollama serve

# Terminal 4: Backend
cd backend
npm run dev

# Terminal 5: Frontend
cd frontend
npm run dev
```

### 3. Seed Database
```bash
cd backend
npm run db:seed
```

## 8 Tasks (8 Hours)

### Task 1: Database & Backend ✅
- Status: DONE
- Time: 0 hours (already complete)

### Task 2: GitHub OAuth & Sync
- Implement GitHub login
- Sync commits to database
- Time: 1-2 hours

### Task 3: Ollama Integration
- Set up local LLM
- Generate feedback
- Time: 1-2 hours

### Task 4: Risk Prediction
- Simple ML algorithm
- Calculate risk scores
- Time: 1 hour

### Task 5: Dashboards
- Student dashboard
- Teacher dashboard
- Time: 2 hours

### Task 6: Gamification
- Points system
- Badges
- Leaderboard
- Time: 1 hour

### Task 7: Grievance System
- File grievances
- Route to authority
- Audit trail
- Time: 1 hour

### Task 8: Demo & Testing
- Property tests
- Demo script
- Final polish
- Time: 0.5 hours

## Key Files

```
backend/
  src/index.ts - Server
  src/lib/redis.ts - Cache
  prisma/schema.prisma - Database
  
frontend/
  src/App.tsx - Main app
  src/store/themeStore.ts - Theme
  
.kiro/specs/
  requirements.md - What to build
  design.md - How to build it
  tasks.md - Task list
```

## Testing

```bash
# Run all tests
npm run test

# Run property tests
npm run test:properties

# Run with coverage
npm run test:coverage
```

## Demo Script (5 minutes)

1. Show GitHub push (30 sec)
2. Show AI feedback generation (1.5 min)
3. Show teacher dashboard (1 min)
4. Show metrics (1 min)

## Tips

- Start with Task 3 (Ollama) - get AI working first
- Use local services - no cloud needed
- Test constantly - run property tests
- Keep it simple - focus on core features
- Practice demo - should be smooth

## Troubleshooting

**Backend won't start?**
```bash
# Check database
psql -U postgres -c "SELECT 1"

# Check Redis
redis-cli ping

# Check Ollama
curl http://localhost:11434/api/tags
```

**Frontend won't start?**
```bash
# Clear cache
rm -rf node_modules/.vite
npm run dev
```

**Tests failing?**
```bash
# Run with verbose output
npm run test -- --verbose
```

## Success Criteria

- ✅ All 8 tasks completed
- ✅ All tests passing
- ✅ Demo works without crashes
- ✅ Code is clean
- ✅ Team can explain everything

## Resources

- Ollama: https://ollama.ai
- Prisma: https://prisma.io
- React: https://react.dev
- Tailwind: https://tailwindcss.com

## Questions?

Check these files:
- `backend/DATABASE_SETUP.md` - Database help
- `OLLAMA_SETUP.md` - LLM help
- `.kiro/specs/design.md` - Architecture help

**You've got this! 🚀**
