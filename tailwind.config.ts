/** @type {import('tailwindcss').Config} */

// Custom config
const colors = require('./config/tailwind/colors'),
  fontSize = require('./config/tailwind/fontSize'),
  fonts = require('./config/tailwind/fonts'),
  container = require('./config/tailwind/container'),
  boxShadow = require('./config/tailwind/shadow'),
  borderRadius = require('./config/tailwind/borderRadius');


export default {
  content: [
    "./resources/react/**/*.ts",
    "./resources/react/**/*.tsx",
    "./resources/views/**/*.php",
    "./storage/framework/views/**/*.php"
  ],
  theme: {
    container,
    extend: {
      colors,
      fontSize,
      fonts,
      boxShadow,
      borderRadius
    },
  },
  plugins: [],
}

