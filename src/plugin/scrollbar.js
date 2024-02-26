const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addUtilities, matchUtilities, theme }) {
  const scrollbarTrackColorValue = value => ({
    '--scrollbar-track': value,
    '&::-webkit-scrollbar-track': {
      'background-color': value,
    },
  })

  const scrollbarTrackRoundedValue = value => ({
    '&::-webkit-scrollbar-track': {
      'border-radius': value,
    },
  })

  const scrollbarThumbColorValue = value => ({
    '--scrollbar-thumb': value,
    '&::-webkit-scrollbar-thumb': {
      'background-color': value,
    },
  })

  const scrollbarThumbRoundedValue = value => ({
    '&::-webkit-scrollbar-thumb': {
      'border-radius': value,
    },
  })

  const scrollbarCornerColorValue = value => ({
    '&::-webkit-scrollbar-corner': {
      'background-color': value,
    },
  })

  const scrollbarCornerRoundedValue = value => ({
    '&::-webkit-scrollbar-corner': {
      'border-radius': value,
    },
  })

  addUtilities({
    '.scrollbar': {
      '--scrollbar-thumb': '#cdcdcd',
      '--scrollbar-track': '#f0f0f0',
      '--scrollbar-corner': '#f0f0f0',
      'scrollbar-color':
        'var(--scrollbar-thumb) var(--scrollbar-track) var(--scrollbar-corner)',
      '&::-webkit-scrollbar': {
        width: 'var(--scrollbar-width)',
        height: 'var(--scrollbar-width)',
      },
    },
    '.scrollbar-w-px': {
      '--scrollbar-width': '1px',
      'scrollbar-width': '1px',
    },
    '.scrollbar-w-0.5': {
      '--scrollbar-width': '0.125rem',
      'scrollbar-width': '0.125rem',
    },
    '.scrollbar-w-1': {
      '--scrollbar-width': '0.25rem',
      'scrollbar-width': '0.25rem',
    },
    '.scrollbar-w-1.5': {
      '--scrollbar-width': '0.375rem',
      'scrollbar-width': '0.375rem',
    },
    '.scrollbar-w-2': {
      '--scrollbar-width': '0.5rem',
      'scrollbar-width': '0.5rem',
    },
    '.scrollbar-w-2.5': {
      '--scrollbar-width': '0.625rem',
      'scrollbar-width': '0.625rem',
    },
    '.scrollbar-w-3': {
      '--scrollbar-width': '0.75rem',
      'scrollbar-width': '0.75rem',
    },
    '.scrollbar-w-3.5': {
      '--scrollbar-width': '0.875rem',
      'scrollbar-width': '0.875rem',
    },
    '.scrollbar-w-4': {
      '--scrollbar-width': '1rem',
      'scrollbar-width': '1rem',
    },
  })

  Object.entries(theme('colors')).forEach(([colorName, color]) => {
    switch (typeof color) {
      case 'object':
        matchUtilities(
          {
            [`scrollbar-track-${colorName}`]: value =>
              scrollbarTrackColorValue(value),
            [`scrollbar-thumb-${colorName}`]: value =>
              scrollbarThumbColorValue(value),
            [`scrollbar-corner-${colorName}`]: value =>
              scrollbarCornerColorValue(value),
          },
          {
            values: color,
          },
        )
        break
      case 'function':
        addUtilities({
          [`.scrollbar-track-${colorName}`]: scrollbarTrackColorValue(
            color({}),
          ),
          [`.scrollbar-thumb-${colorName}`]: scrollbarThumbColorValue(
            color({}),
          ),
          [`.scrollbar-corner-${colorName}`]: scrollbarCornerColorValue({}),
        })
        break
      case 'string':
        addUtilities({
          [`.scrollbar-track-${colorName}`]: scrollbarTrackColorValue(color),
          [`.scrollbar-thumb-${colorName}`]: scrollbarThumbColorValue(color),
          [`.scrollbar-corner-${colorName}`]: scrollbarCornerColorValue(color),
        })
        break
    }
  })

  matchUtilities(
    {
      'scrollbar-track-rounded': value => scrollbarTrackRoundedValue(value),
      'scrollbar-thumb-rounded': value => scrollbarThumbRoundedValue(value),
      'scrollbar-corner-rounded': value => scrollbarCornerRoundedValue(value),
    },
    {
      values: theme('borderRadius'),
    },
  )
})
