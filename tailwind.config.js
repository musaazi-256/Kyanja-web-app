/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#002B7F',
        secondary: '#004AAD',
        accent: '#4197ff',
        accent2: '#fbbf24',
        'text-primary': '#111827',
        'text-secondary': '#374151',
        'text-muted': '#6B7280',
        'text-inverse': '#FFFFFF',
        'background-light': '#F8FAFC',
        'background-gray': '#E5E7EB',
        'background-dark': '#111827',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}
