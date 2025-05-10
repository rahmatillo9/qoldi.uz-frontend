const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/skeleton.js"
],
  theme: {
    extend: {
      screens: {
        'custom950': '950px', // 🎯 bu yerga to'g'ri qo'shamiz
      },
      // istasang boshqa extendlar ham shu yerga qo‘shilaveradi
    },
  },
  darkMode: 'class', // bu yaxshi
  plugins: [
    heroui({
      layout: {
        disabledOpacity: "0.3", // opacity-[0.3]
        radius: {
          small: "2px", // rounded-small
          medium: "4px", // rounded-medium
          large: "6px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "1px", // border-medium
          large: "2px", // border-large
        },
      },
      themes: {
        light: {},
        dark: {},
      },
    }),
  ],
};
