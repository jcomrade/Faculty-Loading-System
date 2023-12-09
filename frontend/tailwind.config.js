/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'aqua-wave': 'linear-gradient(to right, #07BEB8, #38CBC7, #68D8D6, #96ECE8, #C4FFF9)',
      },
      colors: {
        'blizzard': {
          DEFAULT: '#F9FFFF',
          'text': '#F9FFFF',
        },
        'enamelled-jewel': {
          DEFAULT: '#035C65',
          'text': '#035C65',
        },
        'black-mana': {
          DEFAULT: '#858585',
          'text': '#858585',
        },
      },
      borderRadius: {
        '10px': '10px',
      },
      fontSize: {
        '200': '200px',
      },
    },
  },
  plugins: [],
};
