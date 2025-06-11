# Custom CSS Usage Report

This document analyzes the usage of custom CSS throughout the frontend and assesses its convertibility to Tailwind CSS.

## 1. Global Stylesheet (`app/globals.css`)

This file is the primary source of custom styling. Here's an analysis of its components for Tailwind CSS conversion:

- **CSS Variables (`:root`)**:
    - **Convertible**: Most color, spacing, border-radius, and transition variables can be integrated into `tailwind.config.js` via `theme.extend`. This is the recommended approach for consistency.
    - **Potentially Keep**: If variables are heavily manipulated by JavaScript for dynamic theming in ways Tailwind doesn't easily support, some might need to remain. However, this should be minimized.

- **Global Styles & Utilities**:
    - `@import` for Google Fonts: Standard practice, remains as is.
    - `@media (prefers-color-scheme: dark)` override: Currently forces light theme. If a proper dark mode is implemented, Tailwind's `dark:` variant system is preferred. Forcing light theme, this small override is acceptable.
    - `@layer utilities` (e.g., `.no-scrollbar`): These are good candidates to become Tailwind plugins or remain if highly specific. Many scrollbar utilities are now part of Tailwind.
    - `body` styles: Base styles (background, color, font) can be applied via Tailwind classes on `<body>` or through `@layer base` customizations.
    - `section` z-index: Convertible to Tailwind's z-index utilities (e.g., `z-10`, `z-0`).

- **Component Styles & Effects**:
    - `.perspective-1200`, `.handwritten`: Can be converted to utility classes or small components styled with Tailwind.
    - `.image-card`, `.image-thumbnail`, `.handwritten-title`, `.handwritten-date`, `.filter-tabs`, `.filter-tab`: High convertibility. Properties like background, shadow, padding, transitions, display (flex), typography, and hover/active states map well to Tailwind utilities.
    - `.font-serif-sc`, `.font-sans-sc`, `.font-playfair`: Perfect for Tailwind font family utilities (defined in `tailwind.config.js`).
    - **Animations (`@keyframes pageTurn`, `pageReveal`, `drawSketch`, `magnifyIn`)**: The `@keyframes` definitions themselves **cannot** be converted to Tailwind. They must remain as custom CSS. Tailwind can then be used to *apply* these animation classes (e.g., `className="animate-pageTurn"` if `pageTurn` is added to `tailwind.config.js` theme). 
    - **Complex Pseudo-elements (`.washi-tape::before`, `.magnify-glass::after`, `.nav-link::after`)**: Styling for `::before` and `::after` pseudo-elements, especially those involving complex positioning, transforms, or `content` properties, is often best kept as custom CSS. Tailwind has basic pseudo-element support (e.g., `before:content-[''] before:block`), but complex cases can become unwieldy or unsupported directly by utilities.

## 2. Inline JSX Styles

Scoped styling using `<style jsx>` is used in a few components.

### `app/food/components/FoodPlugin.tsx`

This component uses `<style jsx>` for several elements:

- **`.plugin-container` animation (`fadeIn`)**: The `@keyframes fadeIn` definition will remain custom CSS (either in `<style jsx>` or moved to `globals.css`). Tailwind can apply the animation class.
- **`.feature-card`, `.card-header`, `.image-showcase`, `.image-container`, `.image-caption`, `.privacy-card`, `.privacy-icon`**: These styles (layout, shadows, padding, transitions, typography, hover effects) are **highly convertible** to Tailwind utility classes.
- **Responsive styles (`@media (max-width: 768px)`)**: Directly convertible using Tailwind's breakpoint prefixes (e.g., `md:`, `lg:`).

### `app/food/plugin/page.tsx`

Contains a small, targeted `<style jsx>` block:

- **`.image-container img { display: block; max-width: 100%; }`**: This is **fully convertible** to Tailwind: `className="block w-full"` (or `max-w-full` depending on exact need).

## Summary of Tailwind CSS Conversion Strategy:

*   **Prioritize Tailwind**: Convert as much as possible to Tailwind utility classes for consistency, maintainability, and leveraging the design system defined in `tailwind.config.js`.
*   **Extend Tailwind Theme**: Integrate custom design tokens (colors, fonts, spacing) into `tailwind.config.js`.
*   **Keep Custom CSS for**: 
    1.  `@keyframes` definitions.
    2.  Complex pseudo-element styling (`::before`, `::after`) that goes beyond Tailwind's direct capabilities.
    3.  Potentially, a very small subset of CSS variables if dynamic JS manipulation is critical and complex.
    4.  External font imports (`@import url(...)`).
*   **Evaluate `<style jsx>`**: For styles that are highly convertible, migrate them to Tailwind classes directly on the JSX elements. If some styles remain complex and truly component-specific (and not reusable), `<style jsx>` can be kept for those, but aim to minimize its use in favor of Tailwind. 
}
```

## 3. CSS Modules

A search for `*.module.css` files yielded no results. This indicates that the project does not currently use CSS Modules for component-level styling.

## Summary

Custom CSS in this project is primarily managed through a central `globals.css` file, with a few components using inline `<style jsx>` for specific, scoped styles. There is no usage of CSS Modules.
