# Food Plugin Directory

This directory contains the Food Plugin page and its subpages.

## Files

- **page.tsx** - Food Plugin page component that displays information about the "Eat me!" browser extension using a tab component structure

## Subdirectories

- **privacy/** - Contains the Privacy Policy page for the "Eat me!" browser extension

## Component Usage

The Food Plugin page imports and uses:
- `ChinawordsNavigation` from '../../components/ChinawordsNavigation'
- `TabComponent` from '../../components/TabComponent'
- `Link` from 'next/link' - Used to link back to the food page

## Tab Structure

The page implements a tab structure with the following tabs:
1. **产品理念** (Product Philosophy) - Information about the plugin's design philosophy
2. **价格比较** (Price Comparison) - Details about the price comparison feature
3. **美食文化信息** (Food Culture Information) - Information about the cultural context feature
4. **产品列表浏览** (Product List Browsing) - Details about the product listing feature
5. **返回美食页面** (Return to Food Page) - Link to return to the main food page

## Related Data

- **environmentalData.ts** in `app/data/` - Provides navigation links and footer data

## Page Links

- Links to `/food` from the "返回美食页面" tab
- Linked from `/food` page's "浏览器插件" tab
- The privacy policy page is accessible at `/food/plugin/privacy`
