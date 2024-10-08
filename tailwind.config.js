/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'discord-green': '#43b581',
        'discord-dark': '#36393f',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}