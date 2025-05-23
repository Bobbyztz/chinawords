# Prisma Directory

This directory contains Prisma ORM configuration and migration files for database management.

## Files

- **schema.prisma** - Main Prisma schema file
  - Defines database connection using PostgreSQL provider
  - Configures Prisma Client with driver adapters preview feature
  - Contains data models for User and Asset with their relationships
  - Includes indexes for optimized queries

## Directories

- **migrations/** - Contains database migration files
  - Generated by Prisma when running `prisma migrate dev`
  - Includes SQL scripts for creating tables, indexes, and relationships
  - Has migration_lock.toml to track the database provider
  - Current migrations:
    - **20250421232251_init/** - Initial migration
      - Creates User and Asset tables
      - Sets up foreign key relationships
      - Creates indexes for optimized queries

## Data Models

### User Model

- `id` - Auto-incrementing primary key
- `username` - Unique username (with index)
- `passwordHash` - Hashed password for authentication
- `createdAt` - Timestamp of user creation
- `assets` - Relation to Asset model (one-to-many)

### Asset Model

- `id` - Auto-incrementing primary key
- `owner` - Relation to User model
- `ownerId` - Foreign key to User.id
- `title` - Asset title/description
- `prompt` - Optional prompt used for generation
- `mediaType` - Type of media (0 = image, 1 = video)
- `fileUri` - URI pointing to the stored file
- `createdAt` - Timestamp of asset creation
- `liked` - Number of times the asset has been liked
- `collected` - Number of times the asset has been collected
- `copied` - Number of times the asset has been copied
- `downloaded` - Number of times the asset has been downloaded
- Indexes on `[ownerId, createdAt]` and `[mediaType, createdAt]` for efficient queries

### UserLikeAsset Model

- 记录用户(User)喜欢(Like)的资产(Asset)的多对多关系
- 字段：`id`（主键），`userId`（用户 ID），`assetId`（资产 ID）
- 唯一约束：每个用户对同一资产只能喜欢一次

### UserCollectionAsset Model

- 记录用户(User)收藏(Collection)的资产(Asset)的多对多关系
- 字段：`id`（主键），`userId`（用户 ID），`assetId`（资产 ID）
- 唯一约束：每个用户对同一资产只能收藏一次

## Usage

The Prisma schema is used with the following commands:

```bash
# Generate Prisma Client based on schema
npx prisma generate

# Create a new migration
npx prisma migrate dev --name <migration-name>

# Apply migrations in production
npx prisma migrate deploy

# Open Prisma Studio to view/edit data
npx prisma studio
```

## Dependencies

- `@prisma/client` - The generated Prisma Client for database access
- `prisma` - The Prisma CLI for migrations and other operations
- `@prisma/adapter-neon` - Adapter for Neon PostgreSQL in serverless environments
