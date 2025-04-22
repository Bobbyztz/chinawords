# Library Directory

This directory contains utility functions and shared code used throughout the application.

## Files

- **prisma.ts** - Prisma Client singleton for Next.js (App Router) with Neon serverless adapter configuration
  - Configures Prisma to use the Neon serverless driver via `@prisma/adapter-neon`
  - Sets up connection pooling for serverless environments
  - Handles WebSocket configuration for Node.js environments
  - Maintains a singleton pattern to prevent multiple Prisma Client instances

## Usage

Import the Prisma client from this file to use it in your application:

```typescript
import { prisma } from '@/lib/prisma';

// Example: Query the database
const users = await prisma.user.findMany();
```

## Dependencies

The Prisma client implementation depends on:
- `@prisma/client` - The main Prisma ORM client
- `@prisma/adapter-neon` - Adapter for Neon PostgreSQL
- `@neondatabase/serverless` - Neon's serverless driver
- `ws` - WebSocket implementation for Node.js environments
