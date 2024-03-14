import MainHeader from '@/_components/header/main-header'
import Footer from '@/_components/footer/footer'

import '../globals.css'

export default function RestRoutesLayout({ children }) {
  return (
    <>
      <MainHeader />
      {children}
      <Footer />
    </>
  )
}
