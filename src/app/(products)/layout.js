import { auth } from '@/auth'
import ProductsHeader from '@/_components/header/products-header'

import '../globals.css'

export const metadata = {
  title: {
    template: '%s | محصول',
    default: 'محصولات',
  },
  description: 'محصولات فروشگاه',
}

export default async function ProductsGroupLayout({ children }) {
  const { user } = await auth()

  let isAuthurized

  if (user.email) {
    isAuthurized = true
  } else {
    isAuthurized = false
  }

  return (
    <>
      <ProductsHeader isAuthurized={isAuthurized} />
      {children}
    </>
  )
}
