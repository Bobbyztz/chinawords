# Food Components Directory

This directory contains components specific to the Food page.

## Files

- **FoodImageWall.tsx** - Component that displays a grid of food images from different Chinese cities with filtering by the eight major Chinese cuisine styles (八大菜系)
- **FoodPlugin.mdx** - MDX content for the browser plugin "Eat me!" section, including features, screenshots, and privacy information
- **FoodPluginMDX.tsx** - Wrapper component that dynamically imports and renders the FoodPlugin.mdx content

## Component Features

- **八大菜系筛选** (Eight Major Cuisine Styles Filter) - Buttons at the top of the food image wall allow filtering images by the eight major Chinese cuisine styles:
  - 鲁菜 (Lu Cuisine) - Shandong cuisine
  - 川菜 (Chuan Cuisine) - Sichuan cuisine
  - 粤菜 (Yue Cuisine) - Cantonese cuisine
  - 苏菜 (Su Cuisine) - Jiangsu cuisine
  - 浙菜 (Zhe Cuisine) - Zhejiang cuisine
  - 闽菜 (Min Cuisine) - Fujian cuisine
  - 湘菜 (Xiang Cuisine) - Hunan cuisine
  - 徽菜 (Hui Cuisine) - Anhui cuisine

## Implementation Details

- Uses React hooks (useState, useEffect) for state management
- Implements image preloading for better user experience
- Provides visual feedback during loading with a spinner
- Displays images in a responsive grid layout (5 images per row on large screens)
- Includes hover effects with Chinese-style frame corners and yellow tape decoration
