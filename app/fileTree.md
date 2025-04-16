# App Directory Structure

This directory contains the main application code using Next.js App Router structure.

## Key Files

- **layout.tsx** - Root layout that wraps all pages
- **page.tsx** - Homepage component
- **globals.css** - Global CSS styles

## Main Subdirectories

- **assets/** - Contains styles, textures, and decorations
- **components/** - Reusable UI components
- **data/** - Data files for the application

## Page Directories

Each of these directories represents a route in the application and contains a `page.tsx` file:

- **about/** - About Us page
- **careers/** - Careers page
- **community/** - Community page
- **contact/** - Contact page
- **cookies/** - Cookies Policy page
- **culture/** - Culture page
- **events/** - Events page
- **explore/** - Explore page
- **fashion/** - Fashion page and subpages
- **food/** - Food page and subpages
- **gallery/** - Gallery page
- **get-involved/** - Get Involved page and subpages
- **home/** - Home page
- **initiatives/** - Initiatives page and subpages
- **join/** - Join page
- **living/** - Living page and subpages
- **privacy/** - Privacy Policy page
- **terms/** - Terms of Service page
- **travel/** - Travel page and subpages
- **under-construction/** - Under Construction page

Most pages currently use the `UnderConstruction` component from `app/components/UnderConstruction.tsx`.

## Main Page (page.tsx)

The homepage imports and uses the following components:
- ChinawordsNavigation from './components/ChinawordsNavigation'
- HeroSection from './components/HeroSection'
- InitiativesSection from './components/InitiativesSection'
- SustainabilitySection from './components/SustainabilitySection'
- CommunitySection from './components/CommunitySection'
- NewsletterSection from './components/NewsletterSection'
- BiophilicFooter from './components/BiophilicFooter'

Data for these components is imported from './data/environmentalData'.
