import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx/lite'
import { getProducts } from 'database/products/get-produtcs'
import ProductsTabelContent from '@/_components/ui/products/products-table-content'
import Price from '@/_components/ui/products/price'
import ShoppingButton from '@/_components/ui/products/shopping-button'
import { convertToShortDescription } from 'library/helper-functions'
import { ArrowUpRight } from 'lucide-react'
import { VTF_REDZONE_CLASSIC } from 'util/share-font'

export default async function ProductsPage() {
  const ProductsData = await getProducts()
  const groupedData = {}

  ProductsData.forEach(item => {
    const { brand } = item

    if (!groupedData[brand]) {
      groupedData[brand] = { brandName: brand, products: [] }
    }

    groupedData[brand].products.push(item)
  })

  const groupedProducts = Object.values(groupedData)

  ProductsData.sort((a, b) => {
    if (a.brand < b.brand) return -1
    if (a.brand > b.brand) return 1
    return 0
  })
  const filteredByBrand = ProductsData.map(data => data.brand)
  const uniqueBrand = [...new Set(filteredByBrand)]
  const brandsAnchors = uniqueBrand.map(brand => ({
    name: brand,
    href: `#brand-${brand}`,
  }))

  return (
    <section className="ignore bg-zinc-900 text-zinc-100">
      <ProductsTabelContent brandsAnchors={brandsAnchors} />

      <div className="space-y-48 py-4 ps-4 pt-16 md:relative md:pt-20">
        {groupedProducts.map(({ brandName, products }, idx) => (
          <div
            key={brandName}
            className={clsx('md:flex md:items-start', idx === 0 && 'md:pt-4')}
          >
            <div
              className={`vertical-text sticky right-2 top-4 hidden basis-1/12 text-9xl text-zinc-800 shadow-zinc-100 text-shadow-sm md:block ${VTF_REDZONE_CLASSIC.className}`}
            >
              {brandName}
            </div>

            <div
              id={`brand-${brandName}`}
              className="space-y-14 pe-20 md:grow md:pe-56 md:ps-20"
            >
              {products.map(
                ({ _id, slug, name, price, description, thumbnails }, idx) => (
                  <div key={_id} className="flex gap-4">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg lg:h-36 lg:w-36">
                      <Image
                        src={`/images/products/${thumbnails[0]}`}
                        alt="عکس محصول"
                        fill
                        sizes="(min-width: 768px) 100vw, (min-width: 640px) 50vw, (min-width: 475px) 33vw, 25vw"
                        className="object-cover"
                      />
                    </div>

                    <div
                      className={clsx(
                        'grow space-y-2 border-b pb-2 md:flex md:flex-col',
                        idx === products.length - 1 && 'border-none',
                      )}
                    >
                      <h2>{name}</h2>

                      <div className="flex items-end justify-between space-x-2 space-x-reverse p-0.5 md:grow md:text-lg">
                        <p className="hidden basis-3/5 text-zinc-400 lg:inline-block">
                          {convertToShortDescription(description, 190)}
                        </p>

                        <Price className="md:basis-auto" price={price} />

                        <div className="grid grid-cols-2 items-center text-xs md:basis-auto md:text-base">
                          <Link
                            href={`/products/${slug}`}
                            className="relative p-1 underline underline-offset-4"
                          >
                            مشاهده
                            <ArrowUpRight className="absolute -top-3 right-0 w-4 stroke-1" />
                          </Link>

                          <ShoppingButton productId={_id} />
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
