/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
      "login-pattern": "url('https://i.postimg.cc/HxK4Pqcr/bg-login.jpg')",
      
      },
    },
  },
  plugins: [
  //  require('@tailwindcss/typography'),
  ],
}