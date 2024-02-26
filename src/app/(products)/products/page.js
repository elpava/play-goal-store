import Link from 'next/link'
import Image from 'next/image'
import ProductsTabelContent from '@/_components/ui/products-table-content'
import { VTF_REDZONE_CLASSIC } from 'util/share-font'
import {
  brandsAnchors,
  groupedDataArray,
  randomAddedProductsIds,
} from 'library/dummy-data'
import { ArrowUpRight } from 'lucide-react'
import ShoppingButton from '@/_components/ui/shopping-button'
import clsx from 'clsx'

export default async function ProductsPage() {
  return (
    <main className="min-h-svh bg-zinc-900 text-zinc-100">
      <ProductsTabelContent brandsAnchors={brandsAnchors} />

      <section className="space-y-48 py-4 ps-4 md:relative">
        {groupedDataArray.map(({ brandName, products }, idx) => (
          <div
            key={brandName}
            className={clsx('md:flex md:items-start', {
              'md:pt-4': idx === 0,
            })}
          >
            <div
              className={`vertical-text sticky right-2 top-4 hidden basis-1/12 text-9xl text-zinc-800 shadow-zinc-100 text-shadow-sm md:block ${VTF_REDZONE_CLASSIC.className}`}
            >
              {brandName}
            </div>

            <div
              id={brandName}
              className="space-y-14 pe-20 md:grow md:pe-56 md:ps-20"
            >
              {products.map(
                ({ _id, slug, name, price, description, thumbnails }) => (
                  <div key={_id} className="flex gap-4">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg lg:h-36 lg:w-36">
                      <Image
                        src={`/images/sample images/${thumbnails[0]}`}
                        alt="عکس محصول"
                        fill
                        sizes="100vw"
                      />
                    </div>

                    <div className="grow space-y-2 border-b pb-2 md:flex md:flex-col">
                      <h2 className="text-1xl lg:text-4xl">{name}</h2>

                      <div className="flex items-end justify-between space-x-2 space-x-reverse p-0.5 md:grow md:text-lg">
                        <p className="hidden basis-3/5 text-zinc-400 lg:inline-block">
                          {truncate(description, 190)}
                        </p>

                        <div className="md: relative rounded-md bg-lime-300 p-1.5 md:basis-auto">
                          <div className="text-sm font-bold text-zinc-800 md:text-lg">
                            {formateNumber(price * 56_000)}
                          </div>{' '}
                          <div className="absolute -top-3 right-0 rounded-md bg-zinc-900 px-0.5 pb-0.5 text-xs">
                            تومان
                          </div>
                        </div>

                        <div className="grid grid-cols-2 items-center text-xs md:basis-auto md:text-base">
                          <Link
                            href={`/products/${slug}`}
                            className="relative p-1 underline underline-offset-4"
                          >
                            مشاهده
                            <ArrowUpRight className="absolute -top-3 right-0 w-4 stroke-1" />
                          </Link>

                          <ShoppingButton
                            addedProducts={randomAddedProductsIds.includes(_id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

function formateNumber(number) {
  return Intl.NumberFormat('fa').format(number)
}

function truncate(str, maxlength) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + '…' : str
}
