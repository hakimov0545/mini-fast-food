/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFAB08",
        secondary: "#FF5C00",
      },
    },
  },
  plugins: [],
};
