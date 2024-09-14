/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        customFont: ["acuminPro", "sans-serif"],
      },
      colors: {
        primary: "#0B131E",
        secondary: "#001529",
        sub: "#1677FF",
      },
    },
  },
  plugins: [],
};
