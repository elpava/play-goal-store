import MainHeader from '@/_components/header/main-header'
import Main from '@/_components/main/main'
import Footer from '@/_components/footer/footer'

import '../globals.css'

export default function RestRoutesLayout({ children }) {
  return (
    <>
      <MainHeader />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
