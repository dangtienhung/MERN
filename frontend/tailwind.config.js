/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-admin': '#00B0D7',
        primary: '#FF424E',
        secondary: '#5A6169',
      },
    },
  },
  plugins: [],
};
