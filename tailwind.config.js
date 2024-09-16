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
        thirdD: "#00ADB5",
        fourthD: "#EEEEEE",
        firstL: "#F5F5F5",
        secondL: "#48CFCB",
        thirdL: "#229799",
        fourthL: "#424242",
      },
    },
  },
  plugins: [],
};
