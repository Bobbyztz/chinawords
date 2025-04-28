# Root Page

The root page (`app/page.tsx`) is the homepage of the application.

## Files

- **page.tsx** - Homepage component that renders the main sections of the website using the new homepage components

## Component Usage

The homepage imports and uses components from the `./components/homepage/` directory:
- `NewHomePage_Hero` - Hero section with navigation
- `NewHomePage_BasicThemes` - Basic themes section (衣食住行)
- `NewHomePage_AdvancedThemes` - Advanced themes section (用育康乐)
- `NewHomePage_CityGallery` - City gallery with image showcase
- `NewHomePage_FoodGallery` - Food gallery with image showcase
- `NewHomePage_Records` - Statistics and records section
- `NewHomePage_Activities` - Activities and events section
- `NewHomePage_NewsletterBio` - Newsletter subscription and bio section

Data for these components is imported from './data/environmentalData':
- `heroData` - Data for the hero section
- `initiativesData` - Data for the themes sections

## Structure

The homepage is structured as follows:
1. Fixed background image with gradient overlay
2. Scrollable container with sections:
   - Hero section with navigation
   - Basic themes section (衣食住行)
   - Advanced themes section (用育康乐)
   - City gallery with image showcase and refresh functionality
   - Food gallery with image showcase and refresh functionality
   - Records section with statistics
   - Activities section with events
   - Newsletter and bio section with footer links
