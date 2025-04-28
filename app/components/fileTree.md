# Components Directory

This directory contains reusable UI components used throughout the application.

## Navigation and Layout Components

- **ChinawordsNavigation.tsx** - Main navigation component used on all pages

## Authentication Components

- **auth/LoginForm.tsx** - Form component for user login with validation and error handling
- **auth/RegisterForm.tsx** - Form component for user registration with validation and error handling

## Utility Components

- **ContentPageLayout.tsx** - Universal layout component for content pages with tabs, background image and navigation
- **UnderConstructionContent.tsx** - Helper function that provides placeholder tabs for pages under construction
- **TabComponent.tsx** - Interactive tab component with curved tab interface for displaying content in tabs, using hover to switch between tabs

## Component Usage

- **ContentPageLayout.tsx** is the universal layout component used by all content pages including food, food/plugin, and pages under construction
- **UnderConstructionContent.tsx** provides placeholder tabs for pages that are still under construction
- **TabComponent.tsx** is used by ContentPageLayout to display content in tabs with hover-to-switch functionality
- The new homepage (`app/page.tsx`) uses components from the `app/components/homepage/` directory

