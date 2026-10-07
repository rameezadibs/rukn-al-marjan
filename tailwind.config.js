/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: '#1B2B52',
        evergreen: '#0F1C3F',
        mint: '#00A8E8',
        'soft-mint': '#E6F7FF',
        gold: '#E5B800',
        'warm-white': '#FAFAF7',
        charcoal: '#141B2D',
        'muted-grey': '#616B7C',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        'widest-luxury': '0.22em',
        'wider-luxury': '0.15em',
      },
    },
  },
  plugins: [],
}
