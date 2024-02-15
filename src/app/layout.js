import VAZIRMATN_FONT from '../util/share-font'

import './globals.css'

export const metadata = {
  title: 'پلی گل',
  description: 'فروشگاه پلی گل',
}

export default function RootLayout({ children }) {
  return (
    <html className={VAZIRMATN_FONT.className} lang="fa" dir="rtl">
      <body className="min-h-svh">{children}</body>
    </html>
  )
}
