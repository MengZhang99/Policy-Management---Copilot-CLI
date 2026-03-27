/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'lrn-navy':       '#003366',
        'lrn-navy-light': '#004488',
        'lrn-navy-dark':  '#002244',
        'lrn-gold':       '#F5A623',
        'lrn-gold-light': '#F7B84B',
        'lrn-gold-dark':  '#D4891E',
      },
    },
  },
  plugins: [],
}
