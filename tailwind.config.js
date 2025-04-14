/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'leaf-green': 'var(--color-leaf-green)',
        'moss-green': 'var(--color-moss-green)',
        'soft-green': 'var(--color-soft-green)',
        'earth-brown': 'var(--color-earth-brown)',
        'sand': 'var(--color-sand)',
        'sky-blue': 'var(--color-sky-blue)',
        'water-blue': 'var(--color-water-blue)',
        'stone-gray': 'var(--color-stone-gray)',
        'sunlight': 'var(--color-sunlight)',
        'blossom': 'var(--color-blossom)',
        'berry': 'var(--color-berry)',
        'background': 'var(--color-background)',
        'background-alt': 'var(--color-background-alt)',
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'medium': 'var(--shadow-medium)',
      },
      borderRadius: {
        'organic': '30% 70% 70% 30% / 30% 30% 70% 70%',
        'leaf': '0% 50% 0% 50% / 50% 0% 50% 0%',
        'pebble': '60% 40% 40% 60% / 40% 50% 50% 60%',
      },
      animation: {
        'sway': 'leafSway 4s ease-in-out infinite',
        'ripple': 'waterRipple 2s ease-out infinite',
        'drift': 'cloudDrift 60s linear infinite',
      },
      keyframes: {
        leafSway: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
        waterRipple: {
          '0%': { transform: 'scale(0)', opacity: 1 },
          '100%': { transform: 'scale(4)', opacity: 0 },
        },
        cloudDrift: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
