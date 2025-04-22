# Test Prisma API Directory

This directory contains an API route for testing the Prisma ORM connection with the database.

## Files

- **route.ts** - API route handler for testing Prisma connection

## Purpose

This API route serves as a diagnostic endpoint to verify that:
1. The Prisma ORM is correctly configured
2. The database connection is working properly
3. The Prisma client can execute queries successfully

It's particularly useful for verifying that the Prisma client with the Neon adapter is functioning correctly in serverless environments.

## API Endpoint Details

- **Method**: GET
- **URL**: /api/test-prisma
- **Response**:
  - Success (200):
    ```json
    {
      "success": true,
      "message": "Prisma with Neon adapter is working!",
      "userCount": number // Count of users in the database
    }
    ```
  - Error (500):
    ```json
    {
      "success": false,
      "message": "Failed to connect to database",
      "error": "string" // Error message
    }
    ```

## Implementation Details

The endpoint performs a simple `count()` query on the User model to verify database connectivity. This is a lightweight operation that doesn't require complex data processing but confirms that:

1. The database connection string is valid
2. The Prisma client is properly initialized
3. The User table exists and is accessible
4. The query execution pipeline is working

## Usage

This endpoint can be called during application deployment or startup to verify database connectivity. It's also useful for debugging database connection issues in development and production environments.

Example usage:
```javascript
// Check database connectivity
fetch('/api/test-prisma')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Database connection successful:', data.message);
      console.log('User count:', data.userCount);
    } else {
      console.error('Database connection failed:', data.error);
    }
  });
```

## Dependencies

- NextJS: For API route handling
- Prisma: For database access
- Neon adapter: For serverless database connectivity
