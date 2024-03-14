import localFont from 'next/font/local'

export const VAZIRMATN_FONT = localFont({
  src: [
    {
      path: '../../public/fonts/Vazirmatn-FD-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Vazirmatn-FD-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Vazirmatn-FD-Bold.woff2',
      weight: '700',
      style: 'bold',
    },
  ],
})

export const VTF_REDZONE_CLASSIC = localFont({
  src: [
    {
      path: '../../public/fonts/VTFRedzone-Classic.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/VTFRedzone-ClassicOblique.woff2',
      weight: '500',
      style: 'oblique',
    },
  ],
  variable: '--vtfredzone-classic-font',
})
