/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marriott: {
          burgundy: '#8B1538',
          darkBurgundy: '#6B0F2A',
          gold: '#C5A572',
          lightGold: '#E8D7B8',
          cream: '#F5F1E8',
          charcoal: '#2C2C2C',
          warmGray: '#8B8680',
          white: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
