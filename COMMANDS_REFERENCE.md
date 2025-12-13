# 📋 Commands Reference

**Quick reference for all common development commands**

---

## 🚀 Start Development

### Start Everything
```bash
npm run dev
```
Starts both frontend and backend in parallel.

### Start Backend Only
```bash
npm run dev -w backend
```
Backend runs on: http://localhost:3001

### Start Frontend Only
```bash
npm run dev -w frontend
```
Frontend runs on: http://localhost:3000

---

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

### Generate Coverage Reports
```bash
npm run test:coverage -w frontend
npm run test:coverage -w backend
```

---

## 🔍 Code Quality

### Lint All Code
```bash
npm run lint
```

### Fix Linting Issues
```bash
npm run lint:fix
```

### Type Check Frontend
```bash
npm run type-check -w frontend
```

### Type Check Backend
```bash
npm run type-check -w backend
```

---

## 🏗️ Build

### Build All Projects
```bash
npm run build
```

### Build Frontend Only
```bash
npm run build -w frontend
```

### Build Backend Only
```bash
npm run build -w backend
```

---

## 🐳 Docker

### Start All Docker Services
```bash
npm run docker:up
```

### Stop All Docker Services
```bash
npm run docker:down
```

### View Docker Logs
```bash
npm run docker:logs
```

### View Specific Service Logs
```bash
docker compose logs postgres
docker compose logs redis
docker compose logs grafana
```

### Check Docker Status
```bash
docker compose ps
```

---

## 🗄️ Database

### View Database with Prisma Studio
```bash
cd backend
npx prisma studio
```

### Create a Database Migration
```bash
cd backend
npx prisma migrate dev --name migration_name
```

### Reset Database (WARNING: Deletes all data)
```bash
cd backend
npx prisma migrate reset
```

### Check Migration Status
```bash
cd backend
npx prisma migrate status
```

### Seed Database
```bash
cd backend
npm run db:seed
```

---

## 📦 Package Management

### Install a Package in Frontend
```bash
npm install package-name -w frontend
```

### Install a Package in Backend
```bash
npm install package-name -w backend
```

### Install a Dev Package in Frontend
```bash
npm install --save-dev package-name -w frontend
```

### Install a Dev Package in Backend
```bash
npm install --save-dev package-name -w backend
```

---

## 🔧 Troubleshooting

### Find Process Using Port
```bash
lsof -i :3000
lsof -i :3001
lsof -i :5433
```

### Kill Process Using Port
```bash
kill -9 <PID>
```

### Clear Node Modules and Reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear Build Artifacts
```bash
rm -rf backend/dist frontend/dist
npm run build
```

### Check Docker Status
```bash
docker ps
```

### Restart Docker Services
```bash
docker compose restart
```

### View Docker Logs
```bash
docker compose logs
```

---

## 📊 Monitoring

### Access Prometheus
```
http://localhost:9090
```

### Access Grafana
```
http://localhost:3001
```
Default credentials: admin/admin

### Access Kibana
```
http://localhost:5601
```

### Access Elasticsearch
```
http://localhost:9200
```

---

## 🌐 Application URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:3001 |
| Backend Health | http://localhost:3001/health |
| Prometheus | http://localhost:9090 |
| Grafana | http://localhost:3001 |
| Kibana | http://localhost:5601 |
| Elasticsearch | http://localhost:9200 |

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| `README.md` | Complete setup guide |
| `QUICK_START_DEV.md` | Quick start guide |
| `ENVIRONMENT_VERIFICATION.md` | Verification report |
| `COMMANDS_REFERENCE.md` | This file |
| `.kiro/specs/ai-education-platform-mvp/requirements.md` | Feature requirements |
| `.kiro/specs/ai-education-platform-mvp/design.md` | System design |
| `.kiro/specs/ai-education-platform-mvp/tasks.md` | Implementation tasks |

---

## 💡 Tips

### Run Multiple Commands in Parallel
```bash
# Use concurrently (already installed)
npm run dev
```

### Watch Mode for Development
```bash
npm run test:watch -w frontend
npm run test:watch -w backend
```

### Generate Coverage Reports
```bash
npm run test:coverage
```

### Format Code Automatically
```bash
npm run lint:fix
```

### Check for Type Errors
```bash
npm run type-check -w frontend
npm run type-check -w backend
```

---

## 🎯 Common Workflows

### Start Development
```bash
# Terminal 1
npm run dev

# Or individually:
# Terminal 1
npm run dev -w backend

# Terminal 2
npm run dev -w frontend
```

### Make Changes and Test
```bash
# Make your changes
# Then run tests
npm test

# Check code quality
npm run lint
npm run type-check -w frontend
npm run type-check -w backend
```

### Build for Production
```bash
npm run build
```

### Deploy
```bash
# Build
npm run build

# Docker services are already running
# Deploy your built artifacts
```

---

**Happy coding! 🚀**

