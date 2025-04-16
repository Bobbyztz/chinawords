# Gallery Directory

This directory contains the gallery page of the application.

## Files

- **page.tsx** - Gallery page component that renders the RefinedGallery component

## Component Usage

The gallery page imports and uses:
- `RefinedGallery` component from '../components/RefinedGallery'
- `galleryImages` and `filterTabs` data from '../data/refinedGalleryData'

## Related Components

- **RefinedGallery.tsx** in `app/components/` - The main gallery component that displays images in a grid with filtering capabilities
- **FrameToggleIcon.tsx** in `app/components/` - Used by RefinedGallery to toggle Chinese-style frames for images

## Related Styles

- **chinese-frame.css** in `app/assets/textures/` - Provides the Chinese-style frame styling for gallery images
