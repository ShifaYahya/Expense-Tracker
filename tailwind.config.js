/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode based on a class called dark
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: '#1a1a1a', // Background color for dark mode
        textDark: '#ffffff', // Text color for dark mode
      },
      fontFamily: {
        'sans': ['Lato', 'sans-serif']
      },
    },
  },
  plugins: [],
};