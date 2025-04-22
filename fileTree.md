# Chinawords Project Structure

This document provides an overview of the project structure for the Chinawords website, a Next.js application showcasing Chinese culture through various themes including clothing, food, housing, transportation, and cultural heritage.

## Root Directory Structure

- **app/** - Main application code using Next.js App Router
- **lib/** - Shared utilities and library code
- **prisma/** - Database schema, migrations, and documentation using Prisma ORM
- **public/** - Static assets like images and icons
- **scripts/** - Utility scripts for development and maintenance
- **node_modules/** - External dependencies (not tracked in version control)
- **.next/** - Build output directory (not tracked in version control)

## Configuration Files

- **.env** - Environment variables for local development (see .env.fileTree.md for documentation)
- **next.config.js** - Next.js configuration
- **tailwind.config.js** - Tailwind CSS configuration
- **tsconfig.json** - TypeScript configuration
- **package.json** - Project dependencies and scripts
- **postcss.config.mjs** - PostCSS configuration
- **.eslintrc.json** - ESLint configuration
- **eslint.config.mjs** - Modern ESLint flat configuration

See **config.fileTree.md** for detailed documentation on configuration files.

## Project Documentation

- **fileTree.md** - This file, providing an overview of the project structure
- **.env.fileTree.md** - Documentation for environment variables
- **config.fileTree.md** - Documentation for configuration files
- **todoList.md** - Project implementation plan and task tracking
- **全栈逐步实现路线图：Next .js (App Router) + Prisma + Vercel Postgres.md** - Implementation roadmap
- **初级MVP数据结构设计.md** - MVP data structure design
- **PRIVACY.md** - Privacy policy

## Main Application Structure

The application follows the Next.js App Router pattern, with each route having its own directory containing a `page.tsx` file. Most pages currently use the `UnderConstruction` component as placeholders.

See the `app/fileTree.md` for more details on the application structure.

## Database Structure

The project uses Prisma ORM with PostgreSQL (via Neon serverless Postgres):

- **User Model** - Stores user authentication information
- **Asset Model** - Stores uploaded media assets (images and videos)

See the `prisma/fileTree.md` for more details on the database structure.
