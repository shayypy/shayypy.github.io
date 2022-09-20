/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif',
      },
      colors: {
        shay: {
          teal: '#186360',
          darkteal: '#154e52',
        }
      }
    },
  },
  plugins: [],
}
