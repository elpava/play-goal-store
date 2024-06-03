import {
  getProductsProperties,
  getProduct,
} from 'database/products/get-produtcs'
import ChangeQuantityProduct from '@/_components/ui/change-quantity-product'
import ProductSizeSelection from '@/_components/ui/product-size-selection'
import ProductColorSelection from '@/_components/ui/product-color-selection'
import AddCartButton from '@/_components/ui/add-cart-button'
import ImageGallery from '@/_components/ui/image-gallery'
import { formatNumberToPersian } from 'library/helper-functions'
import { VTF_REDZONE_CLASSIC } from 'util/share-font'

const productsProperties = await getProductsProperties({
  _id: 0,
  slug: 1,
  name: 1,
})

export async function generateStaticParams() {
  const data = productsProperties.map(item => item.slug)

  if (data.length > 0) {
    return data.map(slug => ({ slug }))
  }

  return null
}

export async function generateMetadata({ params: { slug } }) {
  const productName = productsProperties.filter(item => {
    if (item.slug === slug) {
      return item.name
    }
  })[0].name

  return {
    title: productName,
  }
}

export default async function ProductPage({ params: { slug } }) {
  const data = await getProduct(slug)
  const { _id, name, description, price, brand, images, attributes, stock } =
    data
  const { colors, sizes, more: features } = attributes

  return (
    <main
      className={`min-h-svh bg-zinc-900 text-zinc-100 sm:grid sm:h-svh sm:grid-cols-2 ${VTF_REDZONE_CLASSIC.variable}`}
    >
      <section
        className="before:vtf-font relative isolate space-y-6 px-4 pb-4 pt-16 before:absolute before:left-2 before:top-40 before:z-[-1] before:text-8xl before:text-zinc-900 before:shadow-lime-400/50 before:content-[attr(data-content)] before:text-shadow-md before:[writing-mode:vertical-rl] sm:max-h-svh sm:pt-4 sm:before:top-24 sm:before:text-9xl"
        data-content={brand}
      >
        <div className="space-y-8 pl-24 sm:mb-14 sm:pl-32">
          <h1 className="text-3xl sm:h-14 sm:text-4xl">{name}</h1>

          <div className="space-y-8">
            <div className="flex gap-10">
              <div>
                <h4 className="text-sm text-zinc-400 sm:text-base">قیمت</h4>

                <div className="relative mr-6 mt-2 rounded-md bg-lime-300 p-1.5">
                  <div className="text-sm font-bold text-zinc-800 md:text-lg">
                    {formatNumberToPersian(price * 56_000)}
                  </div>{' '}
                  <div className="absolute -top-3 left-0 rounded-md bg-zinc-900 px-0.5 pb-0.5 text-xs">
                    تومان
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-zinc-400 sm:text-base">تعداد</h4>

                <ChangeQuantityProduct
                  maxQuantity={stock}
                  productId={_id}
                  defaultColorId={colors[0].colorId}
                  defaultSizeId={sizes[0].sizeId}
                  productPrice={price}
                  className="mr-6 mt-2"
                />
              </div>
            </div>

            <div className="space-y-8 sm:flex sm:items-start sm:gap-4 sm:space-y-0">
              <div className="sm:basis-1/2">
                <h4 className="text-sm text-zinc-400 sm:text-base">رنگ‌ها</h4>

                <ProductColorSelection colorsData={colors} />
              </div>

              <div className="sm:basis-1/2">
                <h4 className="text-sm text-zinc-400 sm:text-base">اندازه</h4>

                <ProductSizeSelection sizesData={sizes} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-zinc-500">
          <label
            htmlFor="features"
            className="peer/features inline-grid h-12 w-1/2 cursor-pointer place-items-center border-b border-l border-zinc-500 transition-colors has-[:checked]:border-b-2 has-[:checked]:border-b-orange-500 sm:hover:bg-zinc-700"
          >
            <input
              id="features"
              type="radio"
              name="tab"
              className="hidden"
              defaultChecked
            />
            ویژگی‌ها
          </label>

          <label
            htmlFor="description"
            className="peer/descriptions inline-grid h-12 w-1/2 cursor-pointer place-items-center border-b border-l border-zinc-500 transition-colors has-[:checked]:border-b-2 has-[:checked]:border-b-orange-500 sm:hover:bg-zinc-700"
          >
            <input
              id="description"
              type="radio"
              name="tab"
              value="2"
              className="hidden"
            />
            توضیحات
          </label>

          <div className="hidden h-56 overflow-y-auto p-4 scrollbar scrollbar-w-2 scrollbar-thumb-zinc-400 scrollbar-track-zinc-700 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg peer-has-[:checked]/features:block sm:h-60">
            <ul className="list-inside list-disc">
              {features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="hidden h-56 overflow-y-auto p-4 scrollbar scrollbar-w-2 scrollbar-thumb-zinc-400 scrollbar-track-zinc-700 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg peer-has-[:checked]/descriptions:block sm:h-60">
            <p>{description}</p>
          </div>
        </div>

        <div>
          <AddCartButton productId={_id} />
        </div>
      </section>

      <section>
        <ImageGallery slides={images} />
      </section>
    </main>
  )
}
