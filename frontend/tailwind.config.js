/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0D1117',
        'card-bg': '#161B22',
        'primary': '#00C3FF', // Neon Cyan
        'secondary': '#FF7AC6', // Pink
        'accent': '#FFD700', // Gold
        'text-main': '#E6EDF3',
        'text-sub': '#9BA1A6',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 15px 5px rgba(0, 195, 255, 0.3)',
        'glow-secondary': '0 0 15px 5px rgba(255, 122, 198, 0.3)',
      }
    },
  },
  plugins: [],
}
