import express from 'express'
import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { connectRedis, disconnectRedis, redisClient } from './lib/redis'

config()

const app = express()
const PORT = process.env.PORT || 3001
const prisma = new PrismaClient()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', async (_req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    
    // Check Redis connection
    const redisHealth = redisClient.isOpen ? 'connected' : 'disconnected'
    
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
      redis: redisHealth,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

// Metrics endpoint
app.get('/metrics', (_req, res) => {
  res.json({ message: 'Metrics endpoint' })
})

// Initialize and start server
async function startServer() {
  try {
    // Connect to Redis
    await connectRedis()
    console.log('✓ Redis connected')

    // Verify Prisma connection
    await prisma.$queryRaw`SELECT 1`
    console.log('✓ Database connected')

    // Start server
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...')
  await disconnectRedis()
  await prisma.$disconnect()
  process.exit(0)
})

startServer()

export default app
