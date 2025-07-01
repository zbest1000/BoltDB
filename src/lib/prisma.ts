import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Only initialize Prisma if DATABASE_URL is provided
let prisma: PrismaClient

if (process.env.DATABASE_URL) {
  prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: ['query'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
} else {
  // Create a mock client for build time
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: 'postgresql://user:pass@localhost:5432/db',
      },
    },
  })
}

export { prisma }