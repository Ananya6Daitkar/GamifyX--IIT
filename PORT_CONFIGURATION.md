# Port Configuration

## Updated Port Assignments

Due to Grafana using port 3001, the backend has been moved to port 3002.

### Service Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend API | 3002 | http://localhost:3002 |
| Backend Health | 3002 | http://localhost:3002/health |
| Grafana | 3001 | http://localhost:3001 |
| Prometheus | 9090 | http://localhost:9090 |
| Elasticsearch | 9200 | http://localhost:9200 |
| Kibana | 5601 | http://localhost:5601 |
| PostgreSQL | 5433 | localhost:5433 |
| Redis | 6379 | localhost:6379 |

## Environment Files Updated

### Backend (.env)
```
PORT=3002
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3002
```

### Frontend Vite Config
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3002',
    changeOrigin: true,
  },
}
```

## Starting Development

### Terminal 1: Backend
```bash
npm run dev -w backend
# Runs on http://localhost:3002
```

### Terminal 2: Frontend
```bash
npm run dev -w frontend
# Runs on http://localhost:3000
```

## API Calls

When making API calls from the frontend:
- Use relative paths: `/api/endpoint`
- Or use: `http://localhost:3002/api/endpoint`

The frontend's Vite proxy will automatically forward `/api/*` requests to the backend.

## Verification

Check that services are running:
```bash
# Backend health check
curl http://localhost:3002/health

# Frontend
open http://localhost:3000

# Grafana
open http://localhost:3001
```
