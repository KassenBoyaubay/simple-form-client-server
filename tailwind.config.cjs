const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Lobster', 'Kumbh\\ Sans', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {

          "primary": "#ff9bb6",

          "secondary": "#7ff4a2",

          "accent": "#126d6c",

          "neutral": "#222735",

          "base-100": "#46464E",

          "info": "#9CA9E8",

          "success": "#119C83",

          "warning": "#D57610",

          "error": "#be123c",
        },
      },
      {
        dark: {

          "primary": "#76bc38",

          "secondary": "#f25cb3",

          "accent": "#da31e2",

          "neutral": "#222E3A",

          "base-100": "#2B314A",

          "info": "#83A4E7",

          "success": "#23BEAE",

          "warning": "#FBB709",

          "error": "#e11d48",
        },
      },],
  },
}