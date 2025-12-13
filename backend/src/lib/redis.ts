import { createClient } from 'redis'

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

export const redisClient = createClient({
  url: redisUrl,
})

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err)
})

redisClient.on('connect', () => {
  console.log('Redis Client Connected')
})

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect()
  }
}

export async function disconnectRedis() {
  if (redisClient.isOpen) {
    await redisClient.disconnect()
  }
}

// Session management utilities
export async function setSession(userId: string, sessionData: Record<string, any>, ttl = 3600) {
  const key = `session:${userId}`
  await redisClient.setEx(key, ttl, JSON.stringify(sessionData))
}

export async function getSession(userId: string) {
  const key = `session:${userId}`
  const data = await redisClient.get(key)
  return data ? JSON.parse(data) : null
}

export async function deleteSession(userId: string) {
  const key = `session:${userId}`
  await redisClient.del(key)
}

// Cache utilities
export async function setCache(key: string, value: any, ttl = 3600) {
  await redisClient.setEx(key, ttl, JSON.stringify(value))
}

export async function getCache(key: string) {
  const data = await redisClient.get(key)
  return data ? JSON.parse(data) : null
}

export async function deleteCache(key: string) {
  await redisClient.del(key)
}

export async function invalidatePattern(pattern: string) {
  const keys = await redisClient.keys(pattern)
  if (keys.length > 0) {
    await redisClient.del(keys)
  }
}
