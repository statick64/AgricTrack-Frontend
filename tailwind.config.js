
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D6A4F', // Forest Green
          light: '#40916C',
          dark: '#1B4332',
        },
        accent: {
          DEFAULT: '#B7791F', // Warm Gold
          light: '#D69E2E',
        },
        earth: {
          brown: '#8B6914',
          sand: '#F5F0E8',
          warm: '#FAFAF5',
        },
        bg: {
          main: '#F7F5F0', // Warm off-white
          card: '#FFFFFF',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#4A5568',
          muted: '#718096',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 4px 6px -1px rgba(139, 105, 20, 0.1), 0 2px 4px -1px rgba(139, 105, 20, 0.06)',
        'warm-lg': '0 10px 15px -3px rgba(139, 105, 20, 0.1), 0 4px 6px -2px rgba(139, 105, 20, 0.05)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
