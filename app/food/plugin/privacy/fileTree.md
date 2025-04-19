# Food Plugin Privacy Directory

This directory contains the Privacy Policy page for the "Eat me!" browser extension.

## Files

- **page.tsx** - Privacy Policy page component that displays the privacy policy content from PRIVACY.md

## Component Usage

The Privacy Policy page imports and uses:
- `ChinawordsNavigation` from '../../../components/ChinawordsNavigation'
- `BiophilicFooter` from '../../../components/BiophilicFooter'

## Related Data

- **environmentalData.ts** in `app/data/` - Provides navigation links and footer data

## Content Source

The content for this page is based on the PRIVACY.md file in the root directory of the project.

## Styling Notes

- The page uses Tailwind's prose classes with text color overrides to ensure black text
- Text color is explicitly set with classes like `text-black`, `prose-headings:text-black`, etc. to override any default prose text colors
