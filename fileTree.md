# Chinawords Project Structure

This document provides an overview of the project structure for the Chinawords website, a Next.js application showcasing Chinese culture through various themes including clothing, food, housing, transportation, and cultural heritage.

## Root Directory Structure

- **app/** - Main application code using Next.js App Router
- **docs/** - Project documentation and technical guides
- **lib/** - Shared utilities and library code
- **prisma/** - Database schema and migrations using Prisma ORM
- **public/** - Static assets like images and icons
- **scripts/** - Utility scripts for development and maintenance
- **node_modules/** - External dependencies (not tracked in version control)

## Configuration Files

- **.env** - Environment variables for local development
- **next.config.js** - Next.js configuration
- **tailwind.config.js** - Tailwind CSS configuration
- **tsconfig.json** - TypeScript configuration
- **package.json** - Project dependencies and scripts
- **todoList.md** - Project implementation plan and task tracking

## Main Application Structure

The application follows the Next.js App Router pattern, with each route having its own directory containing a `page.tsx` file. Most pages currently use the `UnderConstruction` component as placeholders.

See the `app/fileTree.md` for more details on the application structure.
