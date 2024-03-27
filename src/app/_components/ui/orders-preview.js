'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getOrdersAction } from 'action/orders/get-orders'
import ChangeQuantityProduct from '@/_components/ui/change-quantity-product'
import RemoveButton from './remove-button'
import GoToButton from './go-to-button'

export default function OrdersPreview() {
  const { data: cartData, isSuccess } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getOrdersAction(),
  })
  const queryClient = useQueryClient()
  const products = queryClient.getQueryData(['products'])
  let ordersData = []

  if (isSuccess) {
    cartData.forEach(order => {
      const product = products.find(product => product._id === order.productId)
      const productColor = product.attributes.colors.find(
        color => color.colorId === order.colorId,
      )
      const productSize = product.attributes.sizes.find(
        size => size.sizeId === order.sizeId,
      )

      ordersData.push({
        id: order._id,
        productId: order.productId,
        name: product.name,
        brand: product.brand,
        slug: product.slug,
        thumbnail: productColor.filename,
        color: productColor.title,
        colorId: productColor.colorId,
        size: productSize.size,
        sizeId: productSize.sizeId,
        stock: product.stock,
        price: order.price,
        quantity: order.quantity,
        totalAmount: order.quantity * order.price,
      })
    })
  }

  const ordersTotalAmount = ordersData.reduce((acc, { totalAmount }) => {
    return acc + totalAmount
  }, 0)

  return (
    <section className="p-2">
      <div className="flex flex-col gap-4 px-2 pb-2 pt-20 sm:flex-row sm:items-start sm:px-40">
        <div className="rounded-lg bg-gray-100 p-2 shadow-md shadow-gray-300 sm:basis-9/12">
          <div className="m-2 text-xl sm:text-2xl">
            <h2>سبد خرید</h2>
          </div>

          <ol className="space-y-2">
            {ordersData.map(
              ({
                id,
                productId,
                name,
                brand,
                slug,
                thumbnail,
                color,
                colorId,
                size,
                sizeId,
                stock,
                price,
                quantity,
                totalAmount,
              }) => (
                <li
                  key={id}
                  className="relative flex items-start gap-4 rounded-lg border-2 border-zinc-200 p-4"
                >
                  <div className="shrink-0 text-center">
                    <Link
                      href={slug}
                      className="relative inline-block size-14 sm:size-24"
                    >
                      <Image
                        src={`/images/sample images/${thumbnail}`}
                        alt="عکس توپ"
                        fill
                        className="object-cover"
                      />
                    </Link>

                    <hr className="my-2 sm:my-4" />

                    <span className="rounded-3xl bg-zinc-900 p-1 text-xs font-bold capitalize text-zinc-100 sm:p-1.5 sm:text-base">
                      {brand}
                    </span>
                  </div>

                  <div className="grow text-sm sm:text-lg [&>:first-child]:mb-3 [&>:last-child]:mt-3">
                    <h3>
                      محصول : <Tag>{name}</Tag>
                    </h3>
                    <div>
                      اندازه : <Tag>{size}</Tag>
                    </div>
                    <div>
                      رنگ : <Tag>{color}</Tag>
                    </div>
                    <div>
                      قیمت : <Tag>{formateNumber(price * 56_000)}</Tag>{' '}
                      <span className="text-xs">تومان</span>
                    </div>

                    <div className="flex flex-wrap justify-between">
                      <div className="flex items-center gap-2">
                        <ChangeQuantityProduct
                          defaultColorId={colorId}
                          defaultSizeId={sizeId}
                          initialQuantity={quantity}
                          maxQuantity={stock}
                          productId={productId}
                          productPrice={price}
                          updateDirectlyOnServer
                          orderId={id}
                        />
                        <div>
                          <Tag>{formateNumber(totalAmount * 56_000)}</Tag>{' '}
                          <span className="text-xs">تومان</span>
                        </div>
                      </div>

                      <RemoveButton label="حذف" itemId={id} icon />
                    </div>
                  </div>
                </li>
              ),
            )}
          </ol>
        </div>

        <div className="rounded-lg bg-slate-100 p-2 shadow-md shadow-slate-300 sm:sticky sm:left-0 sm:top-4 sm:basis-3/12 [&>:last-child]:mt-10">
          <div className="divide-y-2 divide-slate-300 rounded-lg border-2 border-slate-300 *:p-2">
            <div className="flex justify-between">
              <span>مبلغ کل: </span>
              <span>
                <Tag>{formateNumber(ordersTotalAmount * 56_000)}</Tag> تومان
              </span>
            </div>
            <div className="flex justify-between">
              <span>مالیات: </span>
              <Tag>٪9</Tag>
            </div>
            <div className="flex justify-between">
              <span>کرایه: </span>
              <span className="text-zinc-400">انتخاب در تکمیل سفارش</span>
            </div>
          </div>

          <GoToButton label="تکمیل سفارش" href="/payment" />
        </div>
      </div>
    </section>
  )
}

function Tag({ children }) {
  return <span className="font-bold">{children}</span>
}

function formateNumber(number) {
  return Intl.NumberFormat('fa').format(number)
}
