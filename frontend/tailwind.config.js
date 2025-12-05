/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          pink: '#ec4899',
          blue: '#3b82f6'
        }
      },
      boxShadow: {
        'neon-purple': '0 0 15px rgba(139, 92, 246, 0.5)',
        'neon-cyan': '0 0 15px rgba(6, 182, 212, 0.5)',
        'neon-pink': '0 0 15px rgba(236, 72, 153, 0.5)',
        'neon-purple-lg': '0 0 30px rgba(139, 92, 246, 0.6)',
        'neon-cyan-lg': '0 0 30px rgba(6, 182, 212, 0.6)',
      },
      animation: {
        'scan': 'scan 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
