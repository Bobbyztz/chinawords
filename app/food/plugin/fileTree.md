# Food Plugin Directory

This directory contains the Food Plugin page and its subpages.

## Files

- **page.tsx** - Food Plugin page component that displays information about the "Eat me!" browser extension using a tab component structure

## Subdirectories

- **privacy/** - Contains the Privacy Policy page for the "Eat me!" browser extension

## Component Usage

The Food Plugin page imports and uses:
- `ContentPageLayout` from '../../components/ContentPageLayout' - Universal layout component for content pages
- `Image` from 'next/image' - Used for displaying images in tab content

## Tab Structure

The page implements a tab structure with the following tabs:
1. **产品理念** (Product Philosophy) - Information about the plugin's design philosophy
2. **语言适配** (Language Adaptation) - Details about the language adaptation feature
3. **下载与评分** (Download and Rating) - Information about how to download and rate the plugin
4. **价格比较** (Price Comparison) - Details about the price comparison feature
5. **美食文化信息** (Food Culture Information) - Information about the cultural context feature
6. **产品列表浏览** (Product List Browsing) - Details about the product listing feature


## Related Components and Data

- **ContentPageLayout.tsx** in `app/components/` - Universal layout component for content pages with tabs, background image and navigation
- **TabComponent.tsx** in `app/components/` - Used by ContentPageLayout to display content in tabs
- **environmentalData.ts** in `app/data/` - Provides navigation links and background image data

## Page Links

- Linked from `/food` page's "浏览器插件" tab
- The privacy policy page is accessible at `/food/plugin/privacy`
