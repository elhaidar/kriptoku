/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Hind", "sans-serif"],
      heading: ["Montserrat", "sans-serif"],
    },
    extend: {
      screens: {
        sm: "480px",
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [],
};
