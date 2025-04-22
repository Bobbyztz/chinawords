# Scripts Directory

This directory contains utility scripts for development and maintenance tasks.

## Files

- **check-env.js** - Script to verify environment variables
  - Checks if required environment variables like `DATABASE_URL` and `DIRECT_URL` are defined
  - Provides a preview of the first 20 characters of each variable for verification
  - Useful for debugging environment configuration issues

- **generate-neon-urls.js** - Helper script for generating Neon database connection strings
  - Takes a base Neon connection string and generates both pooled and direct URLs
  - Creates properly formatted `DATABASE_URL` and `DIRECT_URL` for .env file
  - Helps developers correctly configure Prisma with Neon in both development and production

## Usage

Run these scripts using Node.js:

```bash
# Check environment variables
node scripts/check-env.js

# Generate Neon connection strings
node scripts/generate-neon-urls.js
```

## Dependencies

These scripts depend on:
- `dotenv` - For loading environment variables from .env file
- Node.js built-in modules (readline, etc.)
