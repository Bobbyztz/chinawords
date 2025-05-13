# User API Routes

This directory contains API routes for user-related operations.

## Structure

```
/user
├── check
│   └── route.ts - 检查用户信息的API (GET user info directly from DB)
└── update
    └── route.ts - 处理用户信息更新的API (UPDATE user info)
```

## Endpoints

### `/api/user/update`

- **Method**: PUT
- **Purpose**: Update user account settings such as display name and language preference
- **Auth Required**: Yes (via NextAuth session)
- **Request Body**:
  ```json
  {
    "name": "Display Name", // Optional
    "language": "chinese" // Optional - Supported values: "english", "chinese", "spanish"
  }
  ```
- **Response**: Updated user object with success message

### `/api/user/check`

- **Method**: GET
- **Purpose**: Retrieve current user data directly from the database
- **Auth Required**: Yes (via NextAuth session)
- **Response**: Current user data and token information

## Authentication

All endpoints in this directory require authentication. The user ID is extracted from the JWT token provided by NextAuth.
