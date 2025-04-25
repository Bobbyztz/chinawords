# Library Directory

This directory contains utility functions and shared code used throughout the application.

## Files

- **prisma.ts** - Prisma client singleton for database access
- **auth.ts** - NextAuth.js configuration options

## Purpose

The library directory provides centralized, reusable code that can be imported by multiple components and API routes. This helps maintain consistency and reduces code duplication.

## Auth Configuration

The `auth.ts` file contains the NextAuth.js configuration options, including:
- Authentication providers (Credentials)
- Session management (JWT strategy)
- Callbacks for token and session handling
- Custom pages for sign-in and error handling

This configuration is imported by the NextAuth.js API route handler and can also be used by other parts of the application that need access to authentication settings.

## Prisma Client

The `prisma.ts` file provides a singleton instance of the Prisma client to prevent connection issues in serverless environments. It's used throughout the application for database access.
