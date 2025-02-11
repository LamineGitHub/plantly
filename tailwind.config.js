import { theme } from "./src/theme";
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        colorGreen: theme.colorGreen,
        colorLeafyGreen: theme.colorLeafyGreen,
        colorAppleGreen: theme.colorAppleGreen,
        colorLimeGreen: theme.colorLimeGreen,
        colorLightGrey: theme.colorLightGrey,
      },
      fontFamily: {
        "inter-bold": ["Inter-bold", "sans-serif"],
        "inter-semiBold": ["Inter-semibold", "sans-serif"],
        "inter-medium": ["Inter-medium", "sans-serif"],
        inter: ["Inter-regular", "sans-serif"],
        "inter-italic": ["Inter-italic", "sans-serif"],
        caveat: ["Caveat", "sans-serif"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
