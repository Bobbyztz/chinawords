# Food Components Directory

This directory contains components specific to the Food page.

## Files

- **FoodImageWall.tsx** - Main component that manages the state and layout for displaying food images with filtering by the eight major Chinese cuisine styles (八大菜系)
- **FoodImageCard.tsx** - Reusable component for displaying individual food images with styling and hover effects
- **FoodImageGrid.tsx** - Component that renders the grid of food images using the FoodImageCard component
- **FoodImageStyles.tsx** - Component containing all the CSS styles for the food image display
- **FoodPlugin.tsx** - React component for the browser plugin "Eat me!" section, including features, screenshots, and privacy information
- **FeedbackSuggestions.tsx** - Component that displays a three-column layout for user suggestions and feedback, categorized as "待做" (To Do), "正在进行" (In Progress), and "已完成" (Completed)
- **StyleDefinition.tsx** - Component that displays placeholder content for food traceability information ("食材溯源")

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
- Adds a frosted glass overlay to the bottom third of images on hover
- Implements a Kanban-style board for user suggestions with upvoting functionality
- Uses responsive grid layout that adapts to different screen sizes
- Provides interactive UI elements for adding new suggestions and upvoting existing ones
