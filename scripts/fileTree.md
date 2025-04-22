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

- **create-test-user.js** - Script to create a test user for development
  - Creates a user with username 'testuser' and password 'password123'
  - Hashes the password using bcrypt before storing in the database
  - Checks if the user already exists to prevent duplicates

## Root Directory Scripts

In addition to the scripts in this directory, there are utility scripts in the root directory:

- **rename-files.sh** - Bash script for batch renaming files
  - Located in the project root directory
  - Removes the "-twi" suffix from PNG files in the "public/34个省级行政区-3d" directory
  - Used for cleaning up file names in the 3D province models collection

## Usage

Run these scripts using Node.js or Bash:

```bash
# Check environment variables
node scripts/check-env.js

# Generate Neon connection strings
node scripts/generate-neon-urls.js

# Create test user
node scripts/create-test-user.js

# Rename files (from project root)
./rename-files.sh
```

## Dependencies

These scripts depend on:
- `dotenv` - For loading environment variables from .env file
- Node.js built-in modules (readline, etc.)
- Bash shell (for rename-files.sh)
