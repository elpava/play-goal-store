import { VAZIRMATN_FONT } from 'util/share-font'
import MainHeader from '@/_components/header/main-header'
import Footer from '@/_components/footer/footer'

import '../globals.css'

export const metadata = {
  title: 'پلی گل',
  description: 'فروشگاه پلی گل',
}

export default function RootLayout({ children }) {
  return (
    <html className={VAZIRMATN_FONT.className} lang="fa" dir="rtl">
      <body>
        <MainHeader />
        {children}
        <Footer />
      </body>
    </html>
  )
}
