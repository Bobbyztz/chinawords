# Login Directory

This directory contains the Login/Register page for user authentication.

## Files

- **page.tsx** - Login/Register page component with tab switching between login and registration forms

## Component Usage

The Login/Register page imports and uses:
- `ChinawordsNavigation` component from '../components/ChinawordsNavigation'
- `BiophilicFooter` component from '../components/BiophilicFooter'
- `LoginForm` component from '../components/auth/LoginForm'
- `RegisterForm` component from '../components/auth/RegisterForm'
- Navigation links and footer data from '../data/environmentalData'

## Features

- Tab-based interface to switch between login and registration
- Form validation for both login and registration
- Error handling for authentication failures
- Automatic redirection after successful authentication

## Authentication Flow

- Login form uses NextAuth.js `signIn()` function with credentials provider
- Register form submits to `/api/auth/register` endpoint and then auto-logs in
- Successful authentication redirects to homepage

## Navigation

This page is linked from:
- The top navigation bar in `app/data/environmentalData.ts`
- The "注册/登录" link in the ChinawordsNavigation component
