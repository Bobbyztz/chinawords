# Components Directory

This directory contains reusable UI components used throughout the application.

## Navigation and Layout Components

- **BiophilicFooter.tsx** - Footer component used on all pages
- **ChinawordsNavigation.tsx** - Main navigation component used on all pages

## Section Components (Used on Homepage)

- **HeroSection.tsx** - Hero section for the homepage
- **InitiativesSection.tsx** - Initiatives section for the homepage
- **SustainabilitySection.tsx** - Sustainability section for the homepage
- **CommunitySection.tsx** - Community section for the homepage
- **NewsletterSection.tsx** - Newsletter section for the homepage

## Gallery Components

- **RefinedGallery.tsx** - Gallery component used on the gallery page
- **FrameToggleIcon.tsx** - Toggle icon for enabling/disabling Chinese-style frames in the gallery

## Utility Components

- **MagnifyingGlass.tsx** - Magnifying glass effect component
- **NatureCard.tsx** - Card component for displaying nature-related content
- **UnderConstruction.tsx** - Component used for pages that are under construction
- **ProgressUnderConstruction.tsx** - Specialized version of UnderConstruction with GitHub link for the Project Progress page

## Component Usage

- **UnderConstruction.tsx** is used by most page components as they are currently placeholders
- **RefinedGallery.tsx** is used by the gallery page (`app/gallery/page.tsx`)
- The homepage (`app/page.tsx`) uses multiple section components:
  - ChinawordsNavigation
  - HeroSection
  - InitiativesSection
  - SustainabilitySection
  - CommunitySection
  - NewsletterSection
  - BiophilicFooter
