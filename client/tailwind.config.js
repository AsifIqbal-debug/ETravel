/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D4AF37', // Gold
          light: '#F4E5B1',
          dark: '#996515'
        },
        onyx: {
          DEFAULT: '#0F0F0F',
          light: '#1A1A1A',
          lighter: '#2A2A2A'
        },
        secondary: {
          DEFAULT: '#c2948a',
          light: '#d5b0a8'
        },
        accent: {
          DEFAULT: '#bbb193',
          light: '#dcd6c4'
        },
        background: {
          DEFAULT: '#0F0F0F',
          paper: '#1A1A1A'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
