# API Directory

This directory contains API routes for the application using Next.js App Router.

## Directories

- **assets/** - API routes for managing assets (images, videos)

  - `route.ts` - Handles GET (list assets) and POST (create asset) requests

- **auth/** - API routes for authentication

  - **[...nextauth]/** - NextAuth.js configuration
    - `route.ts` - Handles authentication with Credentials provider
  - **register/** - User registration endpoint
    - `route.ts` - Handles user registration with password hashing
  - **token/** - Token endpoint for browser extension authentication
    - `route.ts` - Returns JWT token for authenticated users
  - **examples/** - Example code for API usage
    - `extension-auth.js` - Example code for Chrome extension authentication

- **test-prisma/** - API route for testing Prisma with Neon adapter

  - `route.ts` - Simple endpoint to verify Prisma connection with Neon serverless adapter

- **upload-url/** - API route for generating upload URLs

  - `route.ts` - Handles generating upload URLs for assets

- **user/** - API routes for user-related operations
  - **update/** - API route for updating user information
    - `route.ts` - Handles updating user information
  - **check/** - API route for checking user information
    - `route.ts` - Handles checking user information

## Authentication Flow

1. Users register via `/api/auth/register`
2. Users login via NextAuth.js at `/api/auth/[...nextauth]`
3. Browser extensions can get tokens via `/api/auth/token`

## Usage

These API routes can be accessed at:

- `/api/assets` - For asset management
- `/api/auth/...` - For authentication-related endpoints
- `/api/test-prisma` - For testing Prisma with Neon adapter connection
- `/api/upload-url` - For generating upload URLs
- `/api/user/update` - For updating user information
- `/api/user/check` - For checking user information
