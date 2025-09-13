/**** Tailwind Config ****/
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-red': '#9b0d17',
        'brand-red-dark': '#6e0911',
        'accent-gold': '#D4AF37',
        'surface-100': '#faf9f7',
        'surface-200': '#f2eee9',
        'surface-300': '#e7e1d8',
        'ink-900': '#1a1a1a',
        'ink-700': '#444',
        'ink-500': '#6d6d6d',
        'ink-300': '#b5b5b5',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(212,175,55,0.35)'
      }
    }
  },
  plugins: []
};
