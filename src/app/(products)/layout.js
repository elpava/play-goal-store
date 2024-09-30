import { auth } from '@/auth'
import ProductsHeader from '@/_components/header/products-header'
import Main from '@/_components/main/main'

import '../globals.css'

export const metadata = {
  title: {
    template: '%s | محصول',
    default: 'محصولات',
  },
  description: 'محصولات فروشگاه',
}

export default async function ProductsGroupLayout({ children }) {
  const authentication = await auth()

  let isAuthurized

  if (authentication?.user.email) {
    isAuthurized = true
  } else {
    isAuthurized = false
  }

  return (
    <>
      <ProductsHeader isAuthurized={isAuthurized} />
      <Main className="bg-zinc-900 text-zinc-100">{children}</Main>
    </>
  )
}
