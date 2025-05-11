# Settings Directory

This directory contains the user settings page components.

## Files

- `page.tsx`: The main settings page component that displays user information and settings options.

## Purpose

The settings page allows users to view and manage their account information and preferences. It is only accessible to authenticated users and will redirect to the login page if the user is not logged in.

## Dependencies

- NextAuth.js: For user session management
- Next.js App Router: For routing and navigation
- React: For UI components
- Tailwind CSS: For styling

## Features

- Displays user information (username, ID)
- Provides options to change password and notification settings
- Shows user content upload history (placeholder)
- Protected route (requires authentication)
