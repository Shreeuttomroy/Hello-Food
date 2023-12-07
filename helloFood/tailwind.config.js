/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'roboto':['Roboto Slab', 'serif']
      },
    },
  },
  plugins: [require('daisyui')],
}

