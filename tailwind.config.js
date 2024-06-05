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
      keyframes: {
        scroll: {
          '0%, 100%, 88%': { backgroundSize: '100% 10%' },
          '33%, 44%': { backgroundSize: '100% 100%' },
        },
      },
      animation: {
        scroll: 'scroll 2.5s cubic-bezier(0, 0, 0.03, 0.9) infinite',
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
