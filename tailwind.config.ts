/** @type {import('tailwindcss').Config} */

// Custom config
const colors = require('./config/tailwind/colors');
const fontSize = require('./config/tailwind/fontSize');
const fontFamily = require('./config/tailwind/fonts');
const boxShadow = require('./config/tailwind/shadow');
const borderRadius = require('./config/tailwind/borderRadius');

export default {
  darkMode: "class",
  content: [
    "./resources/react/**/*.ts",
    "./resources/react/**/*.tsx",
    "./resources/react/**/*.scss",
    "./resources/react/**/*.css",
    "./resources/react/**/*.sass",
    "./resources/views/**/*.php",
    "./storage/framework/views/**/*.php"
  ],
  theme: {
    extend: {
      colors,
      fontSize,
      fontFamily,
      boxShadow,
      borderRadius
    },
  },
  plugins: [],
}

