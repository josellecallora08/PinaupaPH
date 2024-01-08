/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'light-blue': '#0099FF',
      'black': '#000000',
      'gray':'#E8E8E8',
      'red':'#FF0000',
      'lime':'#00C242',
      'dark-blue':'#0E67B4',
      'sky-blue':'#79B8EE',
      'white':'#FFFFFF',
      'blue':'#0E67B4',
      'dark-gray':'#9E9C9C',
      'light-gray':'#7A7A7A',
    }
  },
  plugins: [],
}