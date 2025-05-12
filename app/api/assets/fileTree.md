# Assets API Directory

This directory contains API routes for managing digital assets (images, videos, etc.) in the application.

## Files

- **route.ts** - API route handler for asset management (GET and POST methods)
- **liked.ts** - 获取当前登录用户点赞的所有资源（Asset）
- **collected.ts** - 获取当前登录用户收藏的所有资源（Asset）
- **owned.ts** - 获取当前登录用户自己上传的所有资源（Asset）
- **fileTree.md** - 本文件，记录 assets 相关 API 路由结构和用途

## Purpose

This API route provides endpoints for:

1. Retrieving a list of all assets in the system
2. Creating new assets with metadata and file references

These endpoints enable the content management functionality of the application, allowing users to upload and browse digital content.

## API Endpoint Details

### GET /api/assets

Retrieves a list of all assets in the system.

- **Method**: GET
- **URL**: /api/assets
- **Response** (200):
  ```json
  [
    {
      "id": number,
      "ownerId": number,
      "title": "string",
      "prompt": "string" | null,
      "mediaType": number, // 0 = image, 1 = video
      "fileUri": "string",
      "createdAt": "date",
      "owner": {
        "id": number,
        "username": "string"
      }
    },
    ...
  ]
  ```

### POST /api/assets

Creates a new asset in the system.

- **Method**: POST
- **URL**: /api/assets
- **Request Body**:
  ```json
  {
    "ownerId": number,
    "title": "string",
    "prompt": "string" | null,
    "mediaType": number, // 0 = image, 1 = video
    "fileUri": "string"
  }
  ```
- **Response**:
  - Success (201):
    ```json
    {
      "id": number,
      "ownerId": number,
      "title": "string",
      "prompt": "string" | null,
      "mediaType": number,
      "fileUri": "string",
      "createdAt": "date"
    }
    ```
  - Error (400):
    ```json
    {
      "error": "string" // Error message
    }
    ```

## Implementation Details

- The GET endpoint retrieves all assets ordered by creation date (newest first)
- The POST endpoint validates required fields before creating a new asset
- The owner information is included in GET responses for displaying username
- The `mediaType` field indicates the type of media (0 = image, 1 = video)
- The `fileUri` field contains a reference to the stored file (not the actual file content)

## Usage

These endpoints are used by:

- The upload page to create new assets
- The profile page to display user's assets
- Gallery pages to display collections of assets

## Dependencies

- NextJS: For API route handling
- Prisma: For database access
- Authentication: These endpoints should be protected to ensure only authorized users can create assets

## Usage

- `GET /api/assets/liked` - 返回当前用户点赞的所有资源
- `GET /api/assets/collected` - 返回当前用户收藏的所有资源
- `GET /api/assets/owned` - 返回当前用户自己上传的所有资源
- `GET /api/assets` - 返回全部资源（或根据参数筛选）
