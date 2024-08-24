/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0d6ff0',
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        vazir: ['vazir', 'sans-serif'],
        vazirLight: ['vazir-Light', 'sans-serif'],
        vazirBold: ['vazir-Bold', 'sans-serif'],
        jadid: ['jadid', 'sans-serif'],
        lotous: ['BLotus', 'sans-serif'],
        mitra: ['BMitra', 'sans - serif'],
        roya: ['BRoya', 'sans - serif'],
        sans: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

