# Prisma with Neon Serverless Adapter

This document explains how the Prisma Neon adapter is configured in this project to work with serverless environments.

## Overview

The Neon serverless driver is a low-latency Postgres driver for JavaScript and TypeScript that allows you to query data from serverless and edge environments over HTTP or WebSockets in place of TCP. This is particularly important for serverless environments where connection pooling is essential to prevent connection limits from being exceeded.

## Configuration

### 1. Dependencies

The following dependencies are required:

```bash
pnpm add @prisma/adapter-neon @neondatabase/serverless ws
pnpm add -D @types/ws
```

### 2. Prisma Schema Configuration

The Prisma schema is configured to use the driver adapters preview feature:

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### 3. Environment Variables

Two environment variables are required:

- `DATABASE_URL`: The pooled connection string for Prisma Client (used by the application)
- `DIRECT_URL`: The direct connection string for Prisma CLI operations (migrations, etc.)

Example:

```
# Pooled connection string for Prisma Client
DATABASE_URL="postgresql://user:password@ep-example-pooler.region.aws.neon.tech/dbname?sslmode=require&connect_timeout=15&pool_timeout=15"

# Direct connection string for Prisma CLI operations
DIRECT_URL="postgresql://user:password@ep-example.region.aws.neon.tech/dbname?sslmode=require&connect_timeout=15"
```

### 4. Prisma Client Implementation

The Prisma client is configured to use the Neon adapter in `lib/prisma.ts`:

```typescript
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
    log: ['query', 'info', 'warn', 'error'],
  });

// Save Prisma instance to global in development to prevent multiple instances
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

## Usage

Once configured, you can use the Prisma client as you normally would in your application:

```typescript
import { prisma } from '@/lib/prisma';

// Example: Get all users
const users = await prisma.user.findMany();
```

## Benefits

- **Serverless Compatibility**: Works well in serverless environments like Vercel Functions
- **Connection Pooling**: Prevents connection limit issues in high-traffic applications
- **Performance**: Low-latency connections to Neon PostgreSQL
- **Type Safety**: Maintains all the type safety benefits of Prisma

## Troubleshooting

If you encounter connection issues:

1. Check that your connection strings are correct
2. Ensure the `connect_timeout` and `pool_timeout` parameters are set appropriately
3. Verify that the WebSocket configuration is correct for your environment
4. For edge environments, you may need to enable `neonConfig.poolQueryViaFetch = true`

## Additional Resources

- [Prisma Documentation on Driver Adapters](https://www.prisma.io/docs/orm/overview/databases/database-drivers#driver-adapters)
- [Neon Serverless Driver Documentation](https://neon.tech/docs/serverless/serverless-driver)
- [Prisma with Neon Guide](https://neon.tech/docs/guides/prisma)
