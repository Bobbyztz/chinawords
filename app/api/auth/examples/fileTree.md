# Auth Examples Directory

This directory contains example code for integrating with the authentication system.

## Files

- **extension-auth.js** - Example code for Chrome extension authentication

## Purpose

These examples demonstrate how to integrate with the authentication system from various client applications, such as browser extensions. They provide reference implementations that developers can use as a starting point for their own integrations.

## Example Details

### extension-auth.js

This file demonstrates how to:
1. Obtain a token from the `/api/auth/token` endpoint
2. Store the token securely in the extension's storage
3. Use the token to authenticate API requests
4. Handle token expiration and renewal

## Usage

These examples are not directly used by the application but serve as documentation and reference for developers building integrations with the authentication system.

## Dependencies

- Browser extension APIs (for extension-auth.js)
- Fetch API for making HTTP requests
- Local storage or similar for token persistence
