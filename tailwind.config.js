/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          blue: '#c92924', // Primary Red
          purple: '#f9e7c9', // Cream/Gold
          black: '#280b0b', // Deep Background
          dark: '#1d0808', // Darker Red-Black
          grey: '#3a0f0f', // Muted Red-Grey
        }
      },
      fontFamily: {
        mono: ['"Monigue Regular"', '"Space Mono"', 'monospace'],
        sans: ['"Helvetica Now Display XBlack"', '"Outfit"', '"Inter"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'haptic-shake': 'shake 0.2s cubic-bezier(.36,.07,.19,.97) both',
        'mesh-flow': 'mesh 20s ease infinite',
        'border-scan': 'scan 3s linear infinite',
        'glitch': 'glitch 5s infinite',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        mesh: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        scan: {
          '0%': { left: '-100%' },
          '100%': { left: '200%' },
        },
        glitch: {
          '0%, 100%': { textShadow: 'none' },
          '92%': { textShadow: '2px 0 #c92924, -2px 0 #f9e7c9' },
          '94%': { textShadow: '-2px 0 #c92924, 2px 0 #f9e7c9' },
          '96%': { textShadow: '2px 0 #c92924, -2px 0 #f9e7c9' },
        }
      }
    }
  },
  plugins: [],
}
