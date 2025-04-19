# Food Plugin Directory

This directory contains the Food Plugin page and its subpages.

## Files

- **page.tsx** - Food Plugin page component that displays information about the "Eat me!" browser extension

## Subdirectories

- **privacy/** - Contains the Privacy Policy page for the "Eat me!" browser extension

## Component Usage

The Food Plugin page imports and uses:
- `ChinawordsNavigation` from '../../components/ChinawordsNavigation'
- `BiophilicFooter` from '../../components/BiophilicFooter'
- `Link` from 'next/link' - Used to link to the privacy policy page

## Related Data

- **environmentalData.ts** in `app/data/` - Provides navigation links and footer data

## Page Links

- The main plugin page links to `/food/plugin/privacy` for the privacy policy
