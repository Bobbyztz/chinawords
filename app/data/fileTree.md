# Data Directory

This directory contains data files used throughout the application.

## Files

- **chinawordsData.ts** - Data for the Chinawords theme, including navigation links, hero section, initiatives, sustainability metrics, community events, newsletter, and footer
- **environmentalData.ts** - Similar data structure to chinawordsData.ts but with different content, currently used by the main application

## Data Structure

### chinawordsData.ts and environmentalData.ts

Both files export similar data structures:
- `navigationLinks` - Navigation links for the header
- `heroData` - Data for the hero section
- `initiativesData` - Data for the initiatives section
- `sustainabilityData` - Data for the sustainability section
- `communityData` - Data for the community section
- `newsletterData` - Data for the newsletter section
- `footerData` - Data for the footer

## Usage

- **environmentalData.ts** is imported by the main page (`app/page.tsx`) and provides data for all the main components
