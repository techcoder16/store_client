/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        'maincolor':'#000000',
        'maincolor-light':'#FFFF8F',
        'extra-color':'#413b49',
        'subheading':'#581845',
        'background':'#006400',
        'newbg':"#181322",
        'line':'#F5F5F5',
        'background-main':'#008000',
        'rednotify':'#F6465D',
        'textColor':"#0ECB81",
        
        'diffBackground':"#211C2B",
        'softColor':'#B9B8BC',
        'newTab':'#2B223F',
        'newcolortext':'#848e9c',
        'fundingButtonColor':'#221633',
        
      },


       fontFamily: {
        dmsans: ['Poppins', 'sans-serif'],
      },


    },
  },
  plugins: [require("tailwind-scrollbar")],
  
}