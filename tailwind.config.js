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
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
        }
      },
      animation: {
        overlayShow: 'overlayShow 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 600ms cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
}
