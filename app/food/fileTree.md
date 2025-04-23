# Food Directory

This directory contains the Food page and its subpages.

## Files

- **page.tsx** - Food page component that displays information about Chinese cuisine using a tab component

## Subdirectories

- **plugin/** - Contains the Food Plugin page and its subpages, including the privacy policy

## Component Usage

The Food page imports and uses:
- `ChinawordsNavigation` from '../components/ChinawordsNavigation'
- `BiophilicFooter` from '../components/BiophilicFooter'
- `TabComponent` from '../components/TabComponent'

## Related Components

- **TabComponent.tsx** in `app/components/` - A custom tab component that displays content in tabs with a curved tab interface, using hover to switch between tabs
- **ChinawordsNavigation.tsx** in `app/components/` - The main navigation component
- **BiophilicFooter.tsx** in `app/components/` - The footer component

## Content Structure

The Food page contains tabs with the following sections:
1. 中国美食概览 (Chinese Cuisine Overview)
2. 地方特色菜系 (Regional Cuisine Specialties)
3. 传统饮食习俗 (Traditional Food Customs)
4. 现代美食发展 (Modern Food Development)
