/** @type {import('tailwindcss').Config} */
import withMt from "@material-tailwind/react/utils/withMT";

export default withMt({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      rubik: ['Rubik', 'sans-serif'],
      oswald: ['Oswald', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
      monoton: ['Monoton', 'sans-serif'],
    },
    extend: {
      colors: {
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        yellow: {
          50: '#FEFCE8',
          100: '#FEF3C7',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#F3A502',
          600: '#E18700',
        }
      },
      borderWidth: {
        '0.5': '0.5px',
        '1': '1px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
        'none': 'none',
      },
      backgroundImage: {
        'promo': "url('/images/featured/featured_home_3.jpg')",
        'black_guitar': "url('/images/featured/bg_login.jpg')"
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.neon-glow': {
          boxShadow: '0 4px 30px rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            bottom: '-2px',
            left: '-2px',
            zIndex: '-1',
            borderRadius: 'inherit',
            background: 'linear-gradient(210deg, rgba(0, 0, 0, 0.5), rgba(255, 234, 255, 0.3))',
            backdropFilter: 'blur(10px)',
          },
        },
      })
    },
    function ({ addComponents }) {
      addComponents({
        '.my-button:hover .my-icon': {
          fill: '#4CAF50',
          transition: 'all 0.3s ease'
        },
      });
    },
  ],

});



