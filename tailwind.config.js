/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter, sans-serif",
      },
      colors: {
        shay: {
          teal: "#186360",
          darkteal: "#154e52",
        },
        ac: {
          beige: {
            DEFAULT: "#f8f5e6",
            dark: "#e1dac8",
          },
        },
      },
      cursor: {
        // https://www.cursor.cc/?action=icon&file_id=110031
        ac: "url(cursor.cur), auto",
      },
    },
  },
  plugins: [],
};
