/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        unsa: {
          azul: "#131D41",    // Azul profundo
          gris: "#6E6E6D",    // Gris secundario
          granate: "#641529", // Granate principal
          blanco: "#FFFFFF",
        }
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif', 'system-ui'],
      }
    },
  },
  plugins: [],
}