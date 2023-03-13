/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        first : "#08A0F7",
        second : "#252836",
        third : "#6C5ECF",
        fourth : "#FFFFFF",
        
      }
    },
    screens: {
      's' : '350px',
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    },
  },
  plugins: [],
}
