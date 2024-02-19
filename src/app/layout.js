import VAZIRMATN_FONT from 'util/share-font'
import Footer from '@/_components/footer/footer'
import Header from '@/_components/header/header'

import './globals.css'

export const metadata = {
  title: 'پلی گل',
  description: 'فروشگاه پلی گل',
}

export default function RootLayout({ children }) {
  return (
    <html className={VAZIRMATN_FONT.className} lang="fa" dir="rtl">
      <body className="flex min-h-svh flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
