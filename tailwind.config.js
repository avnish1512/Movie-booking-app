/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0c',
        card: '#131317',
        cardBorder: '#22232a',
        mint: '#3ddc97',
        'mint-light': '#5ff5b5',
        'mint-dark': '#29b87a',
        seatAvailable: '#36373e',
        seatTakenBorder: '#27282f',
        reclinerAvailable: '#883348',
        reclinerTakenBorder: '#4a1e2a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'mint-glow': '0 0 15px rgba(61, 220, 151, 0.45)',
        'screen-glow': '0 10px 40px rgba(255, 255, 255, 0.15)',
      }
    },
  },
  plugins: [],
}

