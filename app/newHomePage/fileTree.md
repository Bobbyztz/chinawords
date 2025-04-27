# New Home Page Directory

This directory contains the new homepage implementation with a full-screen scrolling card design.

## Files & Directories

- **page.tsx** - Main component for the new homepage. Imports and orchestrates the individual section components. Manages state for dynamic content (e.g., image galleries).
- **components/** - Directory containing the individual section components for the new homepage.
    - **NewHomePage_Hero.tsx** - Displays the main title, subtitle, and call-to-action buttons.
    - **NewHomePage_BasicThemes.tsx** - Displays the four basic theme cards (衣食住行).
    - **NewHomePage_AdvancedThemes.tsx** - Displays the four advanced theme cards (用育康乐).
    - **NewHomePage_CityGallery.tsx** - Displays a gallery of city images with refresh functionality.
    - **NewHomePage_FoodGallery.tsx** - Displays a gallery of food images with refresh functionality.
    - **NewHomePage_Records.tsx** - Displays statistics and metrics about the website.
    - **NewHomePage_Activities.tsx** - Displays information about online and offline activities.
    - **NewHomePage_NewsletterBio.tsx** - Contains the newsletter subscription form and about us information.

## Component Structure

The new homepage is structured as a series of full-screen cards, each represented by a dedicated component:

1.  **Hero Section** (`NewHomePage_Hero.tsx`) - Main title and call-to-action buttons
2.  **Basic Themes Section** (`NewHomePage_BasicThemes.tsx`) - Four basic theme cards (衣食住行)
3.  **Advanced Themes Section** (`NewHomePage_AdvancedThemes.tsx`) - Four advanced theme cards (用育康乐)
4.  **City Gallery Section** (`NewHomePage_CityGallery.tsx`) - Gallery of city images with refresh functionality
5.  **Food Gallery Section** (`NewHomePage_FoodGallery.tsx`) - Gallery of food images with refresh functionality
6.  **Records Section** (`NewHomePage_Records.tsx`) - Statistics and metrics about the website
7.  **Activities Section** (`NewHomePage_Activities.tsx`) - Information about online and offline activities
8.  **Newsletter & Bio Section** (`NewHomePage_NewsletterBio.tsx`) - Newsletter subscription form and about us information

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