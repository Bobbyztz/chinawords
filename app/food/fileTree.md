# Food Directory

This directory contains the Food page and its subpages.

## Files

- **page.tsx** - Food page component that displays information about Chinese cuisine using a tab component

## Subdirectories

- **plugin/** - Contains the Food Plugin page and its subpages, including the privacy policy

## Component Usage

The Food page imports and uses:
- `ChinawordsNavigation` from '../components/ChinawordsNavigation'
- `TabComponent` from '../components/TabComponent'
- `Image` from 'next/image'
- `useState` and `useEffect` from 'react'

## Related Components

- **TabComponent.tsx** in `app/components/` - A custom tab component that displays content in tabs with a curved tab interface, using hover to switch between tabs
- **ChinawordsNavigation.tsx** in `app/components/` - The main navigation component
- **BiophilicFooter.tsx** in `app/components/` - The footer component

## Content Structure

The Food page contains tabs with the following sections:
1. 美食图片墙 (Food Image Wall) - Displays a grid of food images from different Chinese cities with filtering by the eight major Chinese cuisine styles (八大菜系)
2. 地方菜系 (Regional Cuisines) - Placeholder for regional cuisine content
3. 传统食谱 (Traditional Recipes) - Placeholder for traditional recipe content
4. 美食文化 (Food Culture) - Placeholder for food culture content

## Features

- **八大菜系筛选** (Eight Major Cuisine Styles Filter) - Buttons at the top of the food image wall allow filtering images by the eight major Chinese cuisine styles:
  - 鲁菜 (Lu Cuisine) - Shandong cuisine
  - 川菜 (Chuan Cuisine) - Sichuan cuisine
  - 粤菜 (Yue Cuisine) - Cantonese cuisine
  - 苏菜 (Su Cuisine) - Jiangsu cuisine
  - 浙菜 (Zhe Cuisine) - Zhejiang cuisine
  - 闽菜 (Min Cuisine) - Fujian cuisine
  - 湘菜 (Xiang Cuisine) - Hunan cuisine
  - 徽菜 (Hui Cuisine) - Anhui cuisine
