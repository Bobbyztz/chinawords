# API Directory

This directory contains API routes for the application using Next.js App Router.

## Directories

- **assets/** - API routes for managing assets (images, videos)
  - `route.ts` - Handles GET (list assets) and POST (create asset) requests
  
- **test-prisma/** - API route for testing Prisma with Neon adapter
  - `route.ts` - Simple endpoint to verify Prisma connection with Neon serverless adapter

## Usage

These API routes can be accessed at:
- `/api/assets` - For asset management
- `/api/test-prisma` - For testing Prisma with Neon adapter connection
