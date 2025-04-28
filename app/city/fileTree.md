# City Directory

This directory contains the "省市·山河印象" (City and Landscape Impressions) page.

## Files

- **page.tsx** - City page component that renders the ContentPageLayout component with placeholder tabs

## Component Usage

The City page imports and uses:
- `ContentPageLayout` component from '../components/ContentPageLayout'
- `getUnderConstructionTabs` function from '../components/UnderConstructionContent'

## Related Components

- **ContentPageLayout.tsx** in `app/components/` - Universal layout component for content pages with tabs, background image and navigation
- **UnderConstructionContent.tsx** in `app/components/` - Helper function that provides placeholder tabs for pages under construction
- **TabComponent.tsx** in `app/components/` - Used by ContentPageLayout to display content in tabs

## Navigation

This page is linked from:
- The footer's "进阶板块" (Advanced Section) in `app/data/environmentalData.ts`
- The "主题板块" (Initiatives) section on the homepage
