/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Paper & Ink
        "paper-cream": "var(--paper-cream)",
        "paper-tan": "var(--paper-tan)",
        "paper-gray": "var(--paper-gray)",
        "paper-white": "var(--paper-white)",
        "ink-dark": "var(--ink-dark)",
        "ink-blue": "var(--ink-blue)",
        "ink-red": "var(--ink-red)",

        // Chinawords Palette
        "film-red": "var(--color-film-red)",
        "jade-green": "var(--color-jade-green)",
        "ink-gray": "var(--color-ink-gray)",
        "porcelain-white": "var(--color-porcelain-white)",
        "dark-gray": "var(--color-dark-gray)",
        "light-gray": "var(--color-light-gray)",
        gold: "var(--color-gold)",
        teal: "var(--color-teal)",
        terracotta: "var(--color-terracotta)",

        // Washi tape colors
        "tape-blue": "var(--tape-blue)",
        "tape-yellow": "var(--tape-yellow)",
        "tape-pink": "var(--tape-pink)",
        "tape-green": "var(--tape-green)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
      },
      fontFamily: {
        "noto-sans": ['"Noto Sans SC"', "sans-serif"],
        "noto-serif": ['"Noto Serif SC"', "serif"],
        playfair: ['"Playfair Display"', "serif"],
        caveat: ['"Caveat"', "cursive"],
        "sans-sc": ['"Noto Sans SC"', "sans-serif"],
        "serif-sc": ['"Noto Serif SC"', "serif"],
      },
      transitionDuration: {
        slow: "500ms",
        medium: "300ms",
        fast: "150ms",
      },
      borderRadius: {
        small: "var(--border-radius-small)",
        medium: "var(--border-radius-medium)",
        large: "var(--border-radius-large)",
      },
      perspective: {
        1200: "1200px",
      },
      animation: {
        pageTurn: "pageTurn 0.8s cubic-bezier(0.645, 0.045, 0.355, 1) forwards",
        pageReveal:
          "pageReveal 0.8s cubic-bezier(0.645, 0.045, 0.355, 1) forwards",
        drawSketch: "drawSketch 2s ease-in-out forwards",
        fadeIn: "fadeIn 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".perspective-1200": {
          perspective: "1200px",
        },
        ".handwritten": {
          fontFamily: '"Caveat", "Indie Flower", cursive',
          color: "var(--ink-dark)",
          lineHeight: "1.4",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
