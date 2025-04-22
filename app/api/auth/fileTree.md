# Auth API Directory

This directory contains API routes for authentication-related functionality.

## Directories

- **[...nextauth]/** - NextAuth.js configuration and route handlers
- **register/** - User registration endpoint
- **token/** - Token generation endpoint for extensions
- **examples/** - Example code for authentication integration

## Purpose

These API routes handle user authentication, registration, and token management for the application. They work together with the NextAuth.js library to provide a complete authentication system.

## Authentication Flow

1. Users register via `/api/auth/register`
2. Users login via NextAuth.js at `/api/auth/signin` (handled by [...nextauth])
3. Session management is handled by NextAuth.js
4. Browser extensions can get tokens via `/api/auth/token`

## Dependencies

- NextAuth.js: For authentication framework
- Prisma: For database access
- bcryptjs: For password hashing
- JWT: For token generation and validation
