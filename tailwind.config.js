const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display:  ["Poppins", "sans-serif"],
      body:  ["Poppins", "sans-serif"],
    },
    extend: {
      screens: {
        mf: '990px',
        cr: '500px'
      },

    },
  },
   fontFamily: {
      globalFont: ["Poppins", "sans-serif"],
    },
  variants: {
    extend: {},
  },
  plugins: [

  ],

}