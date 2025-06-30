import { createClient } from 'redis'

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
})

client.on('error', (err) => console.log('Redis Client Error', err))

export const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect()
  }
  return client
}

export const redis = client

// Cache utilities
export const setCache = async (key: string, value: any, ttl = 3600) => {
  const redisClient = await connectRedis()
  await redisClient.setEx(key, ttl, JSON.stringify(value))
}

export const getCache = async (key: string) => {
  const redisClient = await connectRedis()
  const value = await redisClient.get(key)
  return value ? JSON.parse(value) : null
}

export const deleteCache = async (key: string) => {
  const redisClient = await connectRedis()
  await redisClient.del(key)
}

export const flushCache = async () => {
  const redisClient = await connectRedis()
  await redisClient.flushAll()
}