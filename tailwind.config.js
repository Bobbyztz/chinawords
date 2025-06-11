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
      },
    },
  },
  plugins: [],
};
