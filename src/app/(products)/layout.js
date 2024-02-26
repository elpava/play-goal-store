import ProductsHeader from '@/_components/header/products-header'
import { VAZIRMATN_FONT } from 'util/share-font'
import { randomAddedProductsToCart } from 'library/dummy-data'

import '../globals.css'

export const metadata = {
  title: 'محصولات',
  description: 'محصولات فروشگاه',
}

export default function ProductsGroupLayout({ children }) {
  return (
    <html className={VAZIRMATN_FONT.className} lang="fa" dir="rtl">
      <body className="min-h-svh ">
        <ProductsHeader cartMenuData={randomAddedProductsToCart} />
        {children}
      </body>
    </html>
  )
}
