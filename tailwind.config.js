/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ["Comfortaa", "serif"],
        "cabin-sketch": ["Cabin Sketch", "serif"],
      },
      colors: {
        Bluebell: "#5068E2",
        DeepBlue: "#223FD2",
        Silvermist: "#BCC1CA",
        Pewter: "#565E6C",
        Whisper: "#F3F4F6",
      },
    },
  },
  plugins: [],
};
