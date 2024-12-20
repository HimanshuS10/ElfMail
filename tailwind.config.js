/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
        'press-start': ['"Press Start 2P"', 'serif'],
      },
    },
  },
  plugins: [],
}

