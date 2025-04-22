# Auth Components Directory

This directory contains authentication-related UI components.

## Files

- **LoginForm.tsx** - Form component for user login
- **RegisterForm.tsx** - Form component for user registration

## Purpose

These components provide the user interface for authentication, allowing users to register new accounts and log in to existing ones. They handle form validation, error display, and submission to the appropriate API endpoints.

## Component Details

### LoginForm.tsx

- Provides a form for username and password input
- Validates input before submission
- Submits credentials to NextAuth.js for authentication
- Displays error messages for failed login attempts
- Supports a success callback for post-login navigation

### RegisterForm.tsx

- Provides a form for username, password, and password confirmation
- Validates input (username length, password length, password match)
- Submits registration data to the `/api/auth/register` endpoint
- Automatically logs in the user after successful registration
- Displays error messages for failed registration attempts
- Supports callbacks for success and login redirection

## Usage

These components are used in the `/app/login/page.tsx` file, which provides a tabbed interface to switch between login and registration forms.

## Dependencies

- React: For component framework
- NextAuth.js: For authentication functionality
- Tailwind CSS: For styling
- React Hooks: For state management
