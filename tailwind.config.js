/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'scan': 'scan 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        // tailwind.config.js
        keyframes: {
          // ... existing keyframes
          scan: {
            '0%': { top: '0%', opacity: '0' },
            '10%': { opacity: '1' },
            '90%': { opacity: '1' },
            '100%': { top: '100%', opacity: '0' },
          },
          slideDown: {
            '0%': { backgroundPosition: '0 0' },
            '100%': { backgroundPosition: '0 100px' },
          }
        },
        animation: {
          // ... existing animations
          'scan': 'scan 2.5s linear infinite',
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}