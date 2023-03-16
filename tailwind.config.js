/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryColor:"#6B1D73",
        secondaryColor:"#201F1E",
        greenColor:"#107C10",
        greyColor:'#CFCFCF'
      }
    },
  },
  // important:true,
  plugins: [],
}