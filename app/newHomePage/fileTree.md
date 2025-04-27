# New Home Page Directory

This directory contains the new homepage implementation with a full-screen scrolling card design.

## Files

- **page.tsx** - New homepage component that implements a full-screen scrolling card layout with scroll-snap functionality

## Component Structure

The new homepage is structured as a series of full-screen cards that snap into place when scrolled:

1. **Hero Section** - Main title and call-to-action buttons
2. **Basic Themes Section** - Four basic theme cards (衣食住行): clothing, food, housing, transportation
3. **Advanced Themes Section** - Four advanced theme cards (用育康乐): technology/tools, education, health, entertainment
4. **City Gallery Section** - Gallery of city images with refresh functionality
5. **Food Gallery Section** - Gallery of food images with refresh functionality
6. **Records Section** - Statistics and metrics about the website
7. **Activities Section** - Information about online and offline activities
8. **Newsletter & Bio Section** - Newsletter subscription form and about us information

## Key Features

- **Unified Background** - Uses the hero section background image as a fixed background for the entire page
- **Frosted Glass Cards** - Each section is contained in a semi-transparent card with backdrop blur
- **Scroll Snap** - Cards snap into place when scrolled
- **Dynamic Navigation** - Navigation bar appears when scrolling past the hero section
- **Responsive Design** - Adapts to different screen sizes

## Implementation Details

- Uses Intersection Observer API to detect when sections enter the viewport
- Implements a fixed header that appears when scrolling past the hero section
- Each card has exactly 16px spacing at top and bottom (py-4) as requested
- Cards use semi-transparent frosted glass background

## Usage

This is an alternative homepage design that can be accessed at `/newHomePage`. It does not replace the current homepage but serves as a new design option.