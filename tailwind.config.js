/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#6D5DED",
        primary: "#33CC99",
        'primary-bold': "#035663",
        dark: "#121826",
        "txt-main": "#333333",
        "input-bg": "#F4F4F6",
        "txt-white": "#ECECF1",
        active: "#72728F",
        'main-bg':"#F7F7F7"
      },
      
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@headlessui/tailwindcss"),
    require("daisyui"),
  ],
  daisyui: {
    themes: ["dark"],
  },
  darkMode: "class",
};
