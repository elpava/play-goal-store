import dynamic from 'next/dynamic'
import clsx from 'clsx/lite'
import {
  getProductsProperties,
  getProduct,
} from 'database/products/get-produtcs'
import Price from '@/_components/ui/products/price'
import ChangeQuantityProduct from '@/_components/ui/products/change-quantity-product'
import ProductSizeSelection from '@/_components/ui/products/product-size-selection'
import ProductColorSelection from '@/_components/ui/products/product-color-selection'
import AddCartButton from '@/_components/ui/products/add-cart-button'
import ImageGallery from '@/_components/ui/products/image-gallery'
import { VTF_REDZONE_CLASSIC } from 'util/share-font'
import { START_TRANSITION_DELAY, END_TRANSITION_DELAY } from 'library/constants'
const DynamicUpdateDomAttrAtClient = dynamic(
  () => import('@/_components/ui/update-dom-attr-at-client'),
  { ssr: false },
)

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
    <section
      data-bg-dark
      data-product-page
      className={`ignore grid grid-cols-1 md:h-screen md:grid-cols-2 ${VTF_REDZONE_CLASSIC.variable}`}
    >
      <DynamicUpdateDomAttrAtClient
        searchByDataAttr="[data-product-page]"
        newAttribute="data-page-ready"
        newAttributeValue="true"
        delay={START_TRANSITION_DELAY + END_TRANSITION_DELAY}
      />
      <div
        className={clsx(
          'relative isolate space-y-6 px-4 pb-4 pt-16 sm:max-h-screen md:pt-4',
          'before:vtf-font before:absolute before:left-2 before:top-40 before:z-[-1] before:text-8xl before:text-zinc-900 before:shadow-lime-400/50 before:content-[attr(data-content)] before:text-shadow-md before:[writing-mode:vertical-rl] sm:before:top-24',
        )}
        data-content={brand}
      >
        <div className="space-y-8 pl-24 sm:mb-14 sm:pl-32">
          <h1 className="text-3xl md:h-14 md:text-2xl lg:text-4xl">{name}</h1>

          <div className="space-y-8">
            <div className="flex gap-10">
              <div>
                <Title>قیمت</Title>

                <Price className="mr-6 mt-2" price={price} />
              </div>

              <div>
                <Title>تعداد</Title>

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
                <Title>رنگ‌ها</Title>

                <ProductColorSelection colorsData={colors} />
              </div>

              <div className="sm:basis-1/2">
                <Title>اندازه</Title>

                <ProductSizeSelection sizesData={sizes} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-zinc-500">
          <Tab
            id="features"
            label="ویژگی‌ها"
            className="peer/features has-[:checked]:border-b-2 has-[:checked]:border-b-orange-500"
            defaultChecked
          />
          <Tab
            id="description"
            label="توضیحات"
            className="peer/descriptions has-[:checked]:border-b-2 has-[:checked]:border-b-orange-500"
          />

          <Content className="peer-has-[:checked]/features:block">
            <ul className="list-inside list-disc">
              {features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </Content>
          <Content className="peer-has-[:checked]/descriptions:block">
            <p>{description}</p>
          </Content>
        </div>

        <div>
          <AddCartButton productId={_id} />
        </div>
      </div>

      <div>
        <ImageGallery slides={images} />
      </div>
    </section>
  )
}

function Title({ children }) {
  return <div className="text-sm text-zinc-400 sm:text-base">{children}</div>
}

function Tab({ id, label, className, defaultChecked }) {
  return (
    <label
      htmlFor={id}
      className={clsx(
        'inline-grid h-12 w-1/2 cursor-pointer place-items-center border-b border-l border-zinc-500 transition-colors sm:hover:bg-zinc-700',
        className,
      )}
    >
      <input
        id={id}
        type="radio"
        name="tab"
        className="hidden"
        defaultChecked={defaultChecked}
      />
      {label}
    </label>
  )
}

function Content({ children, className }) {
  return (
    <div
      className={clsx(
        'hidden h-56 overflow-y-auto p-4 scrollbar scrollbar-w-2 scrollbar-thumb-zinc-400 scrollbar-track-zinc-700 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg sm:h-60',
        className,
      )}
    >
      {children}
    </div>
  )
}
