import ProductsHeader from '@/_components/header/products-header'
import { randomAddedProductsToCart } from 'library/dummy-data'

import '../globals.css'

export const metadata = {
  title: {
    template: '%s | محصول',
    default: 'محصولات',
  },
  description: 'محصولات فروشگاه',
}

export default function ProductsGroupLayout({ children }) {
  return (
    <>
      <ProductsHeader cartMenuData={randomAddedProductsToCart} />
      {children}
    </>
  )
}
