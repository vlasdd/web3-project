/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark-gray': '#1b2028',
        'custom-light-gray': '#31353f',
        'custom-gray': '#9E9E9E',
        'custom-blue': '#3A6FF8',
        'custom-border-gray': '#606060',
        'custom-green': '#1ecb4f',
        'custom-purple': '#644fb6',
        'custom-red': '#f53340'
      },
      fontFamily: {
        custom: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

