# Food Directory

This directory contains the Food page and its subpages.

## Files

- **page.tsx** - Food page component that displays information about Chinese cuisine using a tab component

## Subdirectories

- **components/** - Contains components specific to the Food page
- **plugin/** - Contains the Food Plugin page and its subpages, including the privacy policy

## Component Usage

The Food page imports and uses:

- `ContentPageLayout` from '../components/ContentPageLayout'
- `FoodImageWall` from './components/FoodImageWall'
- `FoodPlugin` from './components/FoodPlugin'
- `FeedbackSuggestions` from './components/FeedbackSuggestions'

## Related Components

- **ContentPageLayout.tsx** in `app/components/` - Universal layout component for content pages with tabs, background image and navigation
- **TabComponent.tsx** in `app/components/` - A custom tab component used by ContentPageLayout to display content in tabs with hover-to-switch functionality
- **ChinawordsNavigation.tsx** in `app/components/` - The main navigation component used by ContentPageLayout

## Content Structure

The Food page contains tabs with the following sections:

1. 图片墙总览 (Image Wall) - Displays a grid of images from different Chinese cities with filtering by the eight major Chinese cuisine styles (八大菜系)
2. 地方菜系 (Regional Cuisines) - Placeholder for regional cuisine content
3. 食材溯源 (Food Traceability) - Placeholder for food traceability content
4. 个性食谱 (Personalized Recipes) - Placeholder for personalized recipes content Recipes)
5. 相册制作 (Album Making) - Placeholder for album making content
6. 浏览器插件 (Food Plugin) - Displays information about the "Eat me!" browser extension, including features, screenshots, and privacy information
7. 意见与建议 (Feedback) - Placeholder for feedback content

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
