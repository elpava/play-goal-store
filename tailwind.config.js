/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': {
          lightest: '#ECDFCC',
          light: '#697565',
          DEFAULT: '#3C3D37',
          dark: '#1E201E',
        },
        custom: {
          orange: { light: '#FCBF49', DEFAULT: '#F77F00' },
          wheat: '#EAE2B7',
        },
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        md: '0 4px 8px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      screens: {
        xs: '475px',
      },
      spacing: {
        112: '26rem',
        128: '32rem',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, matchUtilities, theme }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.flex-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.position-center': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      }),
        matchUtilities(
          {
            'text-shadow': value => ({
              textShadow: value,
            }),
          },
          { values: theme('textShadow') },
        )
    }),
    require('./src/plugin/scrollbar.js'),
  ],
}
