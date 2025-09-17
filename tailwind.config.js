/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'instagram-blue': '#0095f6',
        'instagram-gray': '#8e8e8e',
        'instagram-border': '#dbdbdb'
      }
    },
  },
  plugins: [],
}