// Prisma Client singleton for Next.js (App Router)
import { PrismaClient } from '@prisma/client';

// Type definitions for global Prisma instance
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create or reuse Prisma Client instance
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// Save Prisma instance to global in development to prevent multiple instances
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
