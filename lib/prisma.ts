// Prisma Client singleton for Next.js (App Router) with Neon serverless adapter
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Configure Neon to use WebSockets in Node.js environment
neonConfig.webSocketConstructor = ws;

// Type definitions for global Prisma instance
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create a connection pool and adapter
const connectionString = process.env.DATABASE_URL || '';
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

// Create or reuse Prisma Client instance
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// Save Prisma instance to global in development to prevent multiple instances
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
