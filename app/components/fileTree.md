# Components Directory

This directory contains reusable UI components used throughout the application.

## Navigation and Layout Components

- **BiophilicFooter.tsx** - Footer component used on all pages
- **ChinawordsNavigation.tsx** - Main navigation component used on all pages

## Authentication Components

- **auth/LoginForm.tsx** - Form component for user login with validation and error handling
- **auth/RegisterForm.tsx** - Form component for user registration with validation and error handling

## Utility Components

- **MagnifyingGlass.tsx** - Magnifying glass effect component
- **NatureCard.tsx** - Card component for displaying nature-related content
- **UnderConstruction.tsx** - Legacy component used for pages that are under construction
- **StandardUnderConstruction.tsx** - Legacy component, replaced by ContentPageLayout
- **ContentPageLayout.tsx** - Universal layout component for content pages with tabs, background image and navigation
- **UnderConstructionContent.tsx** - Helper function that provides placeholder tabs for pages under construction
- **ProgressUnderConstruction.tsx** - Specialized version of UnderConstruction with GitHub link for the Project Progress page
- **TabComponent.tsx** - Interactive tab component with curved tab interface for displaying content in tabs, using hover to switch between tabs

## Component Usage

- **ContentPageLayout.tsx** is the universal layout component used by all content pages including food, food/plugin, and pages under construction
- **UnderConstructionContent.tsx** provides placeholder tabs for pages that are still under construction
- **TabComponent.tsx** is used by ContentPageLayout to display content in tabs with hover-to-switch functionality
- The new homepage (`app/page.tsx`) uses components from the `app/components/homepage/` directory
- **BiophilicFooter.tsx** is used in multiple pages including profile, login, upload, and food plugin privacy pages
- **UnderConstruction.tsx** and **StandardUnderConstruction.tsx** are legacy components that have been replaced by the new architecture
