# Root Page

The root page (`app/page.tsx`) is the homepage of the application.

## Files

- **page.tsx** - Homepage component that renders the main sections of the website

## Component Usage

The homepage imports and uses:
- `ChinawordsNavigation` from './components/ChinawordsNavigation'
- `HeroSection` from './components/HeroSection'
- `InitiativesSection` from './components/InitiativesSection'
- `SustainabilitySection` from './components/SustainabilitySection'
- `CommunitySection` from './components/CommunitySection'
- `NewsletterSection` from './components/NewsletterSection'
- `BiophilicFooter` from './components/BiophilicFooter'

Data for these components is imported from './data/environmentalData':
- `navigationLinks` - Navigation links for the header
- `heroData` - Data for the hero section
- `initiativesData` - Data for the initiatives section
- `sustainabilityData` - Data for the sustainability section
- `communityData` - Data for the community section
- `newsletterData` - Data for the newsletter section
- `footerData` - Data for the footer

## Structure

The homepage is structured as follows:
1. Navigation header
2. Main content sections:
   - Hero section with background image and call-to-action buttons
   - Initiatives section with cards for different initiatives
   - Sustainability section with metrics and description
   - Community section with upcoming events
   - Newsletter subscription section
3. Footer with links and social media icons
