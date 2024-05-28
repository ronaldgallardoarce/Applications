/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cbaBlue': '#002E5F',
        'cbaRed': '#D50032',
      }
    },
  },
  plugins: [],
}

