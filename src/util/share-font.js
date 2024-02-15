import localFont from 'next/font/local'

const VAZIRMATN_FONT = localFont({
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

export default VAZIRMATN_FONT
