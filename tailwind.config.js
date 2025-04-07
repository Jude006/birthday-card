/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        birthday: ['"Dancing Script"', 'cursive'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        primary: '#FF80AB',     // Pink
        secondary: '#FFB74D',   // Peach/Orange
        accent: '#BA68C8',      // Purple
        cream: '#FFF8E1',       // Soft background
      },
    },
  },
  plugins: [],
}
