# 🚀 Quick Start - Development

**Status:** ✅ Environment Ready  
**Last Updated:** December 14, 2025

---

## ⚡ Start Development in 30 Seconds

### Option 1: Start Everything (Recommended)
```bash
npm run dev
```
This starts both frontend and backend in parallel.

### Option 2: Start Individually
```bash
# Terminal 1: Backend
npm run dev -w backend

# Terminal 2: Frontend
npm run dev -w frontend
```

---

## 🌐 Access Your Application

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:3001 |
| Backend Health | http://localhost:3001/health |

---

## 🧪 Run Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch -w frontend
npm run test:watch -w backend

# Property-based tests
npm run test:properties

# Coverage
npm run test:coverage
```

---

## 🔍 Code Quality

```bash
# Lint
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check -w frontend
npm run type-check -w backend
```

---

## 🐳 Docker Services

```bash
# Start all services
npm run docker:up

# Stop all services
npm run docker:down

# View logs
npm run docker:logs
```

---

## 📊 Monitoring

| Service | URL |
|---------|-----|
| Prometheus | http://localhost:9090 |
| Grafana | http://localhost:3001 |
| Kibana | http://localhost:5601 |

---

## 📦 Build for Production

```bash
npm run build
```

---

## 📚 Documentation

- **Requirements:** `.kiro/specs/ai-education-platform-mvp/requirements.md`
- **Design:** `.kiro/specs/ai-education-platform-mvp/design.md`
- **Tasks:** `.kiro/specs/ai-education-platform-mvp/tasks.md`
- **Setup:** `ENVIRONMENT_VERIFICATION.md`

---

## 🎯 Next Task

Start with task 2 in `tasks.md`: "Set up database and data models"

---

**Happy coding! 🚀**

