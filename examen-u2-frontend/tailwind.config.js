/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
      // "login-pattern": "url('https://i.postimg.cc/HxK4Pqcr/bg-login.jpg')",
       "login-pattern": "url('https://i.postimg.cc/tJp3JTZZ/DALL-E-2024-11-15-00-53-11-An-epic-battle-scene-between-the-web-browsers-Edge-and-Firefox-depicte.png')",
      
      },
    },
  },
  plugins: [
  //  require('@tailwindcss/typography'),
  ],
}