# NextAuth.js Configuration Directory

This directory contains the NextAuth.js configuration for the application.

## Files

- **route.ts** - NextAuth.js API route handler with configuration

## Purpose

This file configures NextAuth.js for the application, setting up:
- Authentication providers (Credentials)
- Session management (JWT strategy)
- Callbacks for token and session handling
- Custom pages for sign-in and error handling

## Configuration Details

- **Providers**: Uses CredentialsProvider for username/password authentication
- **Session Strategy**: JWT-based sessions with 30-day expiration
- **Callbacks**:
  - `jwt`: Adds user ID and username to the JWT token
  - `session`: Adds user ID and username to the session object
- **Custom Pages**:
  - `signIn`: Points to "/login" for custom login page
  - `error`: Points to "/login" for error handling

## Authentication Flow

1. User submits credentials via login form
2. NextAuth.js validates credentials using the `authorize` function
3. If valid, a JWT token is generated with user information
4. The token is stored in cookies and used for subsequent requests
5. Session information is available via `useSession` hook or `getServerSession` function

## Dependencies

- NextAuth.js: Core authentication framework
- Prisma: For database access to validate credentials
- bcryptjs: For password comparison
- JWT: For token generation and validation
