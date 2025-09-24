/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        limegreenPrimary: "#f8fff8",
        limegreenSecondary: "#9acd32",
        limegreenLight: "#f7fbec",
        limegreenCart: "#f8fff8",
        limegreenChat: "#89966a",
      },
    },
  },
  plugins: [],
};
