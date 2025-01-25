/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        mg: '890px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      fontFamily: {
        brand: ['Gotham', 'sans-serif']
      },
      colors: {
        brand: {
          primary: '#0F5270',
          secondary: '#2AA8E2'
        }
      }
    }
  },
  plugins: []
}
