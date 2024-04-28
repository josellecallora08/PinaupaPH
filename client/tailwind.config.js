/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        inherit: 'calc(100% - 80px)'
      }
    },
    colors: {
      'primary-color': '#183044',
      'light-blue': '#0099FF',
      black: '#000000',
      gray: '#E8E8E8',
      red: '#FF0000',
      'light-red': '#ffcbd1',
      lime: '#00c242',
      'dark-blue': '#183044',
      'sky-blue': '#79B8EE',
      white: '#FFFFFF',
      white1: '#F5F5F5',
      blue: '#0E67B4',
      'dark-gray': '#9E9C9C',
      'light-gray': '#7A7A7A',
    },
    fontFamily:{
      'regular': ['Poppins-regular', 'sans-serif'],
      'semibold': ['Poppins-semibold', 'sans-serif'],
      'bold': ['Poppins-bold', 'sans-serif'],
      'light': ['Poppins-light', 'sans-serif'],
    }

  },
  daisyui: {
    darkTheme: "light",
   },
  plugins: [
    require('tailwindcss-animate'),
    require("daisyui")
  ],
}
