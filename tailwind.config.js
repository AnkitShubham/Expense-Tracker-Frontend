const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        clashDisplay: ["ClashDisplay", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
