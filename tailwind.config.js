/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#0958d9",
        secondary: "#f5f7fa",
        accent: "#1cc5dc",
        dark: "#131313",
        "dark-bg": "#121212",
        "dark-card": "#1E1E1E",
      },
    },
  },
  plugins: [],
}
