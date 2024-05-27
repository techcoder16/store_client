/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        'maincolor':'#20253F',
        'maincolor-light':'#FFFF8F',
        'extra-color':'#413b49',
        'subheading':'#581845',
        'background':'#20253F',
        'newbg':"#20253F",
        'line':'#F5F5F5',
        'background-main':'#008000',
        'rednotify':'#F6465D',
        'textColor':"#0ECB81",
        'line':'#20253F',
        'diffBackground':"#211C2B",
        'softColor':'#B9B8BC',
        'newTab':'#2B223F',
        'newcolortext':'#848e9c',
        'fundingButtonColor':'#221633',
        
      },


       fontFamily: {
        dmsans: ['Poppins', 'sans-serif'],

        novasans: ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
      },


    },
  },
  plugins: [require("tailwind-scrollbar")],
  
}