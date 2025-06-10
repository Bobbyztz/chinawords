# Homepage Components Directory

This directory contains components specific to the new homepage design.

## Files

- **NewHomePage_Hero.tsx** - Hero section with navigation for the homepage
- **NewHomePage_BasicThemes.tsx** - Basic themes section displaying the 衣食住行 (clothing, food, housing, transportation) cards
- **NewHomePage_AdvancedThemes.tsx** - Advanced themes section displaying the 用育康乐 (technology, education, health, entertainment) cards
- **NewHomePage_CityGallery.tsx** - City gallery section with image showcase and refresh functionality
- **NewHomePage_FoodGallery.tsx** - Food gallery section with image showcase and refresh functionality
- **NewHomePage_Records.tsx** - Statistics and records section displaying metrics about the platform
- **NewHomePage_Activities.tsx** - Activities and events section for community engagement
- **NewHomePage_NewsletterBio.tsx** - Newsletter subscription and bio section with footer links

## Component Features

- All components use a consistent card-based design with frosted glass effect (white background with transparency and blur)
- Components are designed to be full-screen height with 16px spacing between them
- Each component receives a `registerSection` function to register itself for scroll observation
- Gallery components include image refresh functionality with loading states and blur effects
- **Theme Alignment**: All components listed in the 'Files' section above have been refactored to consistently use Tailwind CSS utility classes and theme variables defined in `tailwind.config.js` and `globals.css` (e.g., `film-red`, `jade-green`, `ink-dark`, `shadow-medium`). Legacy or hardcoded styles (hex codes, non-standard Tailwind classes like `shadow-lg`) have been replaced to ensure a unified visual appearance and maintainability across the homepage.

## Implementation Details

- Components use React hooks (useState, useRef) for state management and DOM references
- The Hero section includes the ChinawordsNavigation component
- Basic and Advanced themes sections use data from environmentalData.ts
- City and Food gallery sections use the getRandomImages utility to fetch random images
- The NewsletterBio component includes a complete footer with links to all sections of the site

## Usage

These components are exclusively used by the main homepage (`app/page.tsx`) and are not intended to be reused in other pages.
