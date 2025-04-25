# Configuration Files

This document provides an overview of the configuration files used in the Chinawords project.

## Next.js Configuration

- **next.config.js** - Main Next.js configuration file
  - Configures page extensions (ts, tsx, js, jsx)
  - Configures image optimization settings
  - Allows images from trusted domains (images.unsplash.com)
  - Sets up remote patterns for external images
  - Disables image optimization for local files with `unoptimized: true`
  - Disables webpack cache in development mode to prevent file system errors

- **next.config.ts** - TypeScript version of Next.js configuration
  - Used for type checking during development
  - The compiled JavaScript version is used at runtime

- **next-env.d.ts** - TypeScript declarations for Next.js
  - Provides type definitions for Next.js-specific features
  - Automatically generated and should not be edited manually

## TypeScript Configuration

- **tsconfig.json** - TypeScript compiler configuration
  - Sets compilation options for the TypeScript compiler
  - Configures path aliases for imports (e.g., `@/components/*`)
  - Specifies which files to include/exclude from compilation

## CSS Configuration

- **tailwind.config.js** - Tailwind CSS configuration
  - Defines content paths for Tailwind's JIT compiler
  - Extends the default theme with custom colors:
    - Nature-inspired colors (leaf-green, moss-green, earth-brown, etc.)
    - UI colors (background, background-alt)
  - Adds custom box shadows (soft, medium)
  - Defines organic border radius styles (organic, leaf, pebble)
  - Sets up custom animations (sway, ripple, drift) with keyframes

- **postcss.config.mjs** - PostCSS configuration
  - Configures PostCSS plugins
  - Integrates Tailwind CSS and Autoprefixer

## Linting Configuration

- **.eslintrc.json** - ESLint configuration
  - Sets up linting rules for JavaScript/TypeScript
  - Extends Next.js recommended ESLint configuration

- **eslint.config.mjs** - Modern ESLint configuration (flat config)
  - Alternative to .eslintrc.json for newer ESLint versions
  - Used when ESLint is configured to use the flat config format

## Other Configuration

- **.windsurfrules** - Configuration for the Windsurf CSS framework
  - Defines custom rules for the Windsurf CSS utility classes
  - Used to extend or customize the default Windsurf behavior
