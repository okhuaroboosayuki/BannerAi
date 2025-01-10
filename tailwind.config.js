/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ["Comfortaa", "serif"],
        "cabin-sketch": ["Cabin Sketch", "serif"],
      },
    },
  },
  plugins: [],
};
