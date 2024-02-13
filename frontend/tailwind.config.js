/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '818': '818px',
      },
      height: {
        '729': '729px',
      },
      backgroundImage: {
        'aqua-wave': 'linear-gradient(to bottom right, #07BEB8, #38CBC7, #68D8D6, #96ECE8, #C4FFF9)',
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
        'placebo-turquoise': {
          DEFAULT: '#E8FFF8',
          'text': '#E8FFF8',
        },
        'veiling-waterfalls': {
          DEFAULT: '#D3EEFF',
          'text': '#D3EEFF',
        },
        'pastel-red': {
          DEFAULT: '#FF6962',
          'text': '#FF6962',
        },
      },
      borderRadius: {
        '10px': '10px',
      },
      fontSize: {
        '200': '200px',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
