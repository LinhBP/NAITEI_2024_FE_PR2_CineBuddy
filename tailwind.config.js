// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#636363', 
        'custom-border': '#e1e1e1', 
        'swiper-bullet': 'lightgray', 
        'swiper-bullet-active': '#E71A0F',
      },
      backgroundImage: {
        'brand-footer': "url('/public/images/brand-footer.png')",
        'home-menu': "url('/public/images/bg-header-home.png')",
      },
      backgroundPosition: {
        'brand-1': '-391px 5px', 
        'brand-2': '-160px 5px',
        'brand-3': '-236px 5px',
        'brand-4': '-292px 5px',
        'brand-5': '-82px 5px',
        'brand-6': '2px 3px',
        'brand-7': '-572px 3px',
        'brand-8': '-435px 2px',
        'brand-9': '-604px 2px',
        'brand-10': '-675px 3px',
        'brand-11': '-785px 3px',
        'brand-12': '-891px 2px',
        'menu-1': '10px 0', 
        'menu-2': '-140px 0',
        'menu-3': '-280px 0',
        'menu-4': '-420px 0',
        'menu-5': '-560px 0',
        'menu-6': '-700px 0',
        'menu-7': '-830px 0',
      },
      spacing: {
        'swiper-button-offset': '160px',
        'bullet-size': '15px',
      },
      textShadow: {
        'custom': '2px 2px 2px #b9b9b9',
      },
      fontSize: {
        'custom-xl': '48px',
      },
      textColor: {
        'custom-gray': '#717171',
      },
    },
  },
  plugins: [],
}
