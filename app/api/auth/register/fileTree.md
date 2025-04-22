# Register API Directory

This directory contains the API route for user registration.

## Files

- **route.ts** - API route handler for user registration

## Purpose

This API route handles user registration by:
1. Validating user input (username and password)
2. Checking if the username already exists
3. Hashing the password for secure storage
4. Creating a new user record in the database
5. Returning the created user information (without the password hash)

## API Endpoint Details

- **Method**: POST
- **URL**: /api/auth/register
- **Request Body**:
  ```json
  {
    "username": "string", // At least 3 characters
    "password": "string"  // At least 6 characters
  }
  ```
- **Response**:
  - Success (201):
    ```json
    {
      "id": "number",
      "username": "string",
      "createdAt": "date"
    }
    ```
  - Error (400, 409, 500):
    ```json
    {
      "error": "string" // Error message
    }
    ```

## Error Handling

- 400: Invalid input (missing fields, username too short, password too short)
- 409: Username already exists
- 500: Server error

## Dependencies

- NextJS: For API route handling
- Prisma: For database access
- bcryptjs: For password hashing
