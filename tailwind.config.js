/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        limegreenPrimary: "#f8fff8",
        limegreenSecondary: "#9acd32",
        limegreenLight: "#f7fbec",
        limegreenCart: "#f8fff8",
        limegreenChat: "#89966a",
      },
      screens: {
        sm: "393px" /* small tablets / large phones */,
        // md: "640px" /* tablets */,
        // lg: "768px" /* small desktops / landscape tablets */,
        // xl: "1024px" /* large desktops */,
      },
    },
  },
  plugins: [],
};
