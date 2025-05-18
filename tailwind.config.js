/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#93c5fd', // light blue
          DEFAULT: '#3b82f6', // blue-500
          dark: '#1e40af', // blue-900
        },
        background: {
          light: '#f8fafc', // slate-50
          dark: '#0f172a', // slate-900
        },
      },
    },
  },
  plugins: [],
}

