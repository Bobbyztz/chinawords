# Profile Directory

This directory contains the user profile page components.

## Files

- `page.tsx`: The main profile page component that displays user information and content.

## Purpose

The profile page allows users to view their account information and uploaded content. It is only accessible to authenticated users and will redirect to the login page if the user is not logged in.

## Dependencies

- NextAuth.js: For user session management
- Next.js App Router: For routing and navigation
- React: For UI components
- Tailwind CSS: For styling

## Features

- Displays user information (username, ID)
- Shows a placeholder for user content
- Provides a link to upload new content
- Protected route (requires authentication)
