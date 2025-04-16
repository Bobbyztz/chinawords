# Root Layout

The root layout (`app/layout.tsx`) is the base layout for the entire application.

## Files

- **layout.tsx** - Root layout component that wraps all pages

## Imports

The root layout imports:
- `./globals.css` - Global CSS styles
- `./assets/textures/paper-texture-refined.css` - Paper texture styles
- `./assets/textures/chinese-frame.css` - Chinese frame styles
- `./assets/styles/biophilic-design.css` - Biophilic design styles
- `./assets/styles/chinawords-design.css` - Chinawords design styles

## Metadata

The layout defines metadata for the application:
- title: "Chinawords"
- description: "从衣、食、住、行到历史人文，探索中国传统与创新的精彩故事"
- keywords: ["中国文化", "中国生活方式", "中国传统", "中国创新", "衣食住行", "中国美学", "文化遗产"]

## Structure

The layout provides the basic HTML structure:
```tsx
<html lang="en">
  <body className="antialiased bg-background">
    {children}
  </body>
</html>
```

All page content is rendered within this layout through the `children` prop.
