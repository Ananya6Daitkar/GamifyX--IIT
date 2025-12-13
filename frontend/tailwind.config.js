/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          50: '#f0f9ff',
          100: '#e0f7ff',
          200: '#b3ecff',
          300: '#80e1ff',
          400: '#4dd9ff',
          500: '#00d4ff',
          600: '#00b8d4',
          700: '#0099b3',
          800: '#007a99',
          900: '#005f7a',
        },
        magenta: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f8b4d8',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 212, 255, 0.5)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
