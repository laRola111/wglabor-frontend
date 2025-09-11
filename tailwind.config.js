// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-background': '#1A1A1A',
        'dark-surface': '#262626',
        'dark-border': '#3D3D3D',
        'dark-text': '#F5F5F5',
        'dark-text-muted': '#A3A3A3',
        'accent-primary': '#D7B441', // Un dorado vibrante para botones y acentos
        'accent-hover': '#C0A038',
        'gray-light': '#D4D4D4',
      },
    },
  },
   plugins: [
    require('@tailwindcss/typography'),
  ],
}