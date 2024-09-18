/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        customFont: ["acuminPro", "sans-serif"],
      },
      colors: {
        firstD: "#222831",
        secondD: "#393E46",
        thirdD: "#00FFF5",
        fourthD: "#FF2E63",
        firstL: "#00FFF5",
        secondL: "#00ADB5",
        thirdL: "#393E46",
        fourthL: "#222831",
      },
    },
  },
  plugins: [],
};
