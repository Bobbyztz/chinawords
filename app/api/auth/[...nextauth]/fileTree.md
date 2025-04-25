# NextAuth.js Configuration Directory

This directory contains the NextAuth.js API route handler for the application.

## Files

- **route.ts** - NextAuth.js API route handler that imports configuration from `/app/lib/auth.ts`

## Purpose

This directory contains the API route handler for NextAuth.js, which processes authentication requests. The actual configuration has been moved to `/app/lib/auth.ts` to follow Next.js App Router best practices and allow the configuration to be imported by other parts of the application.

## Authentication Flow

1. User submits credentials via login form
2. NextAuth.js validates credentials using the `authorize` function defined in `/app/lib/auth.ts`
3. If valid, a JWT token is generated with user information
4. The token is stored in cookies and used for subsequent requests
5. Session information is available via `useSession` hook or `getServerSession` function

## Dependencies

- NextAuth.js: Core authentication framework
- Configuration imported from `/app/lib/auth.ts`
