/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        dark_primary: "#1D201F ",
        light_primary: "#ffffff",
        primary: "#369EFF",
        dark_secondary: "#26303B",
        light_secondary:"#F0F2F5"
      }
    },
  },
  plugins: [],
}
