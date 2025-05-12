# Settings Directory

This directory contains the user settings page components.

## Files

- `page.tsx`: The main settings page component that displays user information and settings options.
- `components/SettingsImageWall.tsx`: A reusable component for displaying image grids with filtering and upload capabilities.

## Purpose

The settings page allows users to view and manage their account information and preferences. It is only accessible to authenticated users and will redirect to the login page if the user is not logged in.

## Dependencies

- NextAuth.js: For user session management
- Next.js App Router: For routing and navigation
- React: For UI components
- Tailwind CSS: For styling
- Lucide React: For icons
- Vercel Blob: For image upload functionality

## Features

### Profile Section

- Displays and manages user profile information
- Username display (non-editable)
- Email management with dropdown selection
- Bio editing
- Website and social media links management

### Account Settings

- Name management
- Date of birth selection
- Language preferences
- Timezone settings

### Content Management

- My Likes: View and filter liked content
- My Favorites: View and filter saved content
- My Assets: View and filter owned content
- Content filtering by categories:
  - Style definitions
  - Cuisines
  - Ingredients
  - Recipes
  - Albums

### Image Management

- Image grid display
- Search functionality
- Category filtering
- Image upload capability (when enabled)
- Responsive image grid layout

## Security

- Protected route (requires authentication)
- Session-based access control
- Secure image upload handling
