/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#090B10',
          surface: '#10131A',
          card: '#171B25',
          border: '#252B38',
          'border-subtle': '#1E2430',
          'border-hover': '#323B4E',
        },
        brand: {
          50: '#F0F5FA',
          100: '#E1EBF5',
          200: '#C3D7EB',
          300: '#95BCE0',
          400: '#5E9CD1',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#0B1329',
          950: '#070C1B',
        },
        navy: {
          900: '#090B10',
          950: '#05070A',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.35)',
        'premium': '0 12px 32px -4px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.3)',
        'elevated': '0 20px 48px -10px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
        'glow': '0 0 25px -4px rgba(139, 92, 246, 0.35)',
        'glow-teal': '0 0 25px -4px rgba(20, 184, 166, 0.3)',
      }
    },
  },
  plugins: [],
}
