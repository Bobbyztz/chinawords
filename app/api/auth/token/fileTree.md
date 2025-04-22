# Token API Directory

This directory contains the API route for generating authentication tokens for external applications.

## Files

- **route.ts** - API route handler for token generation

## Purpose

This API route generates JWT tokens for authenticated users, primarily for use in browser extensions or other external applications that need to authenticate with the API.

## API Endpoint Details

- **Method**: GET
- **URL**: /api/auth/token
- **Authentication**: Requires an authenticated session
- **Response**:
  - Success (200):
    ```json
    {
      "token": "string" // JWT token
    }
    ```
  - Error (401):
    ```json
    {
      "error": "string" // Error message
    }
    ```

## Token Usage

The generated token can be used to authenticate API requests from external applications by including it in the Authorization header:

```
Authorization: Bearer <token>
```

## Security Considerations

- Tokens have a limited lifespan (typically matching the session duration)
- Tokens should be stored securely in the client application
- The endpoint requires an authenticated session to prevent unauthorized token generation

## Dependencies

- NextJS: For API route handling
- NextAuth.js: For session validation
- JWT: For token generation
