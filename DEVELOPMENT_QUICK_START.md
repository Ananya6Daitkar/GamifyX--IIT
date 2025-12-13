# 🚀 Development Quick Start

Your environment is ready! Here's how to get started in 2 minutes.

## Step 1: Start Docker Services (Already Running ✅)

Services are already running. Verify:
```bash
docker compose ps
```

You should see 6 containers running.

## Step 2: Start Backend (Terminal 1)

```bash
npm run dev -w backend
```

You'll see:
```
Server running on http://localhost:3001
```

## Step 3: Start Frontend (Terminal 2)

```bash
npm run dev -w frontend
```

You'll see:
```
VITE v4.5.14  ready in 123 ms

➜  Local:   http://localhost:3000/
```

## Step 4: Open in Browser

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/health

## 🎯 What's Running

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | React app |
| Backend | http://localhost:3001 | Express API |
| PostgreSQL | localhost:5433 | Database |
| Redis | localhost:6379 | Cache |
| Prometheus | http://localhost:9090 | Metrics |
| Grafana | http://localhost:3001 | Dashboards |
| Elasticsearch | http://localhost:9200 | Logs |
| Kibana | http://localhost:5601 | Log viewer |

## 📝 Common Commands

```bash
# Run tests
npm test

# Run property-based tests
npm run test:properties

# Lint code
npm run lint

# Type check
npm run type-check -w frontend
npm run type-check -w backend

# Build for production
npm run build

# View database
cd backend && npx prisma studio

# Stop Docker services
npm run docker:down
```

## 🔗 Database Access

### Prisma Studio (Visual Database Browser)
```bash
cd backend
npx prisma studio
```

Opens at http://localhost:5555

### Direct PostgreSQL Connection
```bash
# Connection string
postgresql://ai_education_user:ai_education_password@localhost:5433/ai_education

# Using psql
psql -h localhost -p 5433 -U ai_education_user -d ai_education
```

## 📊 Monitoring

### Grafana (Dashboards)
- URL: http://localhost:3001
- Username: admin
- Password: admin

### Prometheus (Metrics)
- URL: http://localhost:9090

### Kibana (Logs)
- URL: http://localhost:5601

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch -w frontend
npm run test:watch -w backend
```

### Run Property-Based Tests
```bash
npm run test:properties
```

### Generate Coverage
```bash
npm run test:coverage -w frontend
npm run test:coverage -w backend
```

## 🐛 Debugging

### Backend Debugging
```bash
# Start backend with debugger
node --inspect-brk dist/index.js

# Then open chrome://inspect in Chrome
```

### Frontend Debugging
- Open DevTools in browser (F12)
- Use React DevTools extension
- Use Redux DevTools for state management

## 📚 Next Steps

1. Read the implementation plan: `.kiro/specs/ai-education-platform-mvp/tasks.md`
2. Start with task 2: "Set up database and data models"
3. Follow the tasks in order
4. Run tests after each feature

## 🆘 Quick Troubleshooting

### Backend won't start
```bash
# Check if port 3001 is in use
lsof -i :3001

# Kill the process
kill -9 <PID>

# Try again
npm run dev -w backend
```

### Frontend won't start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill the process
kill -9 <PID>

# Try again
npm run dev -w frontend
```

### Database connection error
```bash
# Check PostgreSQL is running
docker compose ps postgres

# Check connection string in backend/.env
# Should be: postgresql://ai_education_user:ai_education_password@localhost:5433/ai_education
```

### Docker services not running
```bash
# Start them
npm run docker:up

# Check status
docker compose ps
```

## 📖 Documentation

- **Setup Guide**: `README.md`
- **Setup Complete**: `SETUP_COMPLETE.md`
- **Requirements**: `.kiro/specs/ai-education-platform-mvp/requirements.md`
- **Design**: `.kiro/specs/ai-education-platform-mvp/design.md`
- **Tasks**: `.kiro/specs/ai-education-platform-mvp/tasks.md`

## ✨ You're Ready!

Everything is set up. Start coding! 🎉

---

**Pro Tips:**
- Keep 3 terminals open: Backend, Frontend, and one for git/commands
- Run tests frequently: `npm test`
- Check types: `npm run type-check`
- Format code: `npm run lint:fix`
- Monitor with Grafana: http://localhost:3001
