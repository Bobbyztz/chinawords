# Assets Directory

This directory contains various assets used throughout the application, organized into subdirectories.

## Subdirectories

- **decorations/** - Decorative elements for the UI
- **styles/** - CSS style files
- **textures/** - Texture-related CSS files

## Styles

- **biophilic-design.css** - Styles for the biophilic design theme
- **chinawords-design.css** - Styles specific to the Chinawords theme

## Textures

- **animations.css** - CSS animations for various effects
- **chinese-frame.css** - Styles for Chinese-style frames used for images
- **paper-texture.css** - Styles for paper texture effects
- **paper-texture-refined.css** - Refined version of paper texture styles

## Usage

These assets are imported in various places:

- The root layout (`app/layout.tsx`) imports:
  - "../globals.css"
  - "./assets/textures/paper-texture-refined.css"
  - "./assets/textures/chinese-frame.css"
  - "./assets/styles/biophilic-design.css"
  - "./assets/styles/chinawords-design.css"

- The Chinese frame styles are used by components that display images with frame effects
- The texture styles provide the paper-like background effects throughout the site
- The animation styles are used for various UI animations
