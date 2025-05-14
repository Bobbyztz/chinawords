# Library Directory

This directory contains utility functions and shared code used throughout the application.

## Files

- **prisma.ts** - Prisma client singleton for database access
- **auth.ts** - NextAuth.js configuration options
- **utils.ts** - Utility functions for className handling and other common operations

## Purpose

The library directory provides centralized, reusable code that can be imported by multiple components and API routes. This helps maintain consistency and reduces code duplication.

## Auth Configuration

The `auth.ts` file contains the NextAuth.js configuration options, including:

- Authentication providers (Credentials)
- Session management (JWT strategy)
- Callbacks for token and session handling
- Custom pages for sign-in and error handling
- Default language setting (English)

The auth configuration uses type definitions from `app/types/auth.ts` for NextAuth.js session and JWT types. Users can change their language preference after logging in via the settings page.

## Prisma Client

The `prisma.ts` file provides a singleton instance of the Prisma client to prevent connection issues in serverless environments. It's used throughout the application for database access.

## Utility Functions

The `utils.ts` file contains common utility functions like `cn()` which combines class names using clsx and tailwind-merge, used by Shadcn UI components.
