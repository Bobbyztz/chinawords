# Upload Directory

This directory contains the content upload page components.

## Files

- `page.tsx`: The main upload page component that allows users to upload content.

## Purpose

The upload page provides a form for users to upload images or videos with titles and descriptions. It is only accessible to authenticated users and will redirect to the login page if the user is not logged in.

## Dependencies

- NextAuth.js: For user session management
- Next.js App Router: For routing and navigation
- React: For UI components
- Tailwind CSS: For styling

## Features

- Form for uploading content (title, description, file)
- Media type selection (image or video)
- Protected route (requires authentication)
- Form validation
- Upload status feedback

## Notes

Currently, the actual file upload functionality is not implemented. The page only provides a UI demonstration of how the feature would work. The backend implementation for file storage and database updates will be added in a future update.
