/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#28536b',
          light: '#7ea8be',
          dark: '#1e3f52'
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
          DEFAULT: '#f6f0ed',
          dark: '#e8e1dd'
        }
      }
    },
  },
  plugins: [],
}
