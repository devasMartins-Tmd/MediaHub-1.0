/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pop: ['Poppins', 'serif'],
        mukta: ['Mukta'],
        open: ['Open Sans', 'serif'],
        fira: ['Fira Code', 'mono'],
        play: ['Playfair Display', 'mono'],
      },
      rotate: {
        270: '270deg',
        360: '360deg',
      },
    },
  },
  plugins: [require('tailgrids/plugin')],
};
