'use client'

import * as React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import useOrders from 'hook/useOrders'
import PageTransition from '@/_components/ui/animation/page-transition'
import ChangeQuantityProduct from './change-quantity-product'
import RemoveButton from './remove-button'
import Button from '../common/button'
import Empty from '../common/empty'
import { startPageTransition, endPageTransition } from 'library/dom-helper'
import { formatNumberToPersian } from 'library/helper-functions'
import { DOLLAR_RATE } from 'library/constants'

export default function OrdersPreview() {
  const { push } = useRouter()
  const queryClient = useQueryClient()
  const { ordersData, isLoading, isSuccess } = useOrders()
  const products = queryClient.getQueryData(['products'])
  let lastOrderData
  let cartData = []

  let isLastOrderData
  let isLoadingOrdersPreview = true

  if (isSuccess) {
    isLoadingOrdersPreview = isLoading
    lastOrderData = ordersData?.at(-1)
    isLastOrderData = lastOrderData?.orders.length > 0 && !lastOrderData.isPaid

    if (isLastOrderData) {
      lastOrderData.orders.forEach(order => {
        const product = products.find(
          product => product._id === order.productId,
        )
        const productColor = product.attributes.colors.find(
          color => color.colorId === order.colorId,
        )
        const productSize = product.attributes.sizes.find(
          size => size.sizeId === order.sizeId,
        )

        cartData.push({
          orderProductId: order.id,
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
  }

  const ordersTotalAmount = cartData.reduce((acc, { totalAmount }) => {
    return acc + totalAmount
  }, 0)

  async function clickRedirectHandler() {
    await startPageTransition()
    push('/payment')
    await endPageTransition()
  }

  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <div className="rounded-lg bg-gray-100 p-6 shadow-md shadow-gray-300 xs:p-8 sm:basis-9/12">
        {isLoadingOrdersPreview ? (
          <div className="h-[80svh]">در حال بارگذاری...</div>
        ) : isLastOrderData ? (
          <>
            <h2>سبد خرید</h2>

            <hr className="mb-8 xs:mb-10" />

            <ol className="space-y-2">
              {isSuccess &&
                cartData.map(
                  ({
                    orderProductId,
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
                      key={orderProductId}
                      className="relative flex items-start gap-4 rounded-lg border-2 border-zinc-200 p-4"
                    >
                      <div className="shrink-0 text-center">
                        <PageTransition
                          href={`/products/${slug}`}
                          className="relative inline-block size-14 overflow-hidden rounded-lg sm:size-24"
                        >
                          <Image
                            src={`/images/products/${thumbnail}`}
                            alt="عکس توپ"
                            fill
                            sizes="(min-width: 768px) 100vw, (min-width: 640px) 50vw, (min-width: 475px) 33vw, 85vw"
                            className="object-cover"
                          />
                        </PageTransition>

                        <hr className="my-2 sm:my-4" />

                        <span className="rounded-3xl bg-zinc-900 p-1 text-xs font-bold capitalize text-zinc-100 sm:p-1.5 sm:text-base">
                          {brand}
                        </span>
                      </div>

                      <div className="grow space-y-2 text-sm sm:text-base [&>:last-child]:pt-6">
                        <div>
                          محصول : <Tag>{name}</Tag>
                        </div>
                        <div>
                          اندازه : <Tag>{size}</Tag>
                        </div>
                        <div>
                          رنگ : <Tag>{color}</Tag>
                        </div>
                        <div>
                          قیمت :{' '}
                          <Tag>
                            {formatNumberToPersian(price * DOLLAR_RATE)}
                          </Tag>{' '}
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
                              orderId={lastOrderData._id}
                              orderProductId={orderProductId}
                            />
                            <div>
                              <Tag>
                                {formatNumberToPersian(
                                  totalAmount * DOLLAR_RATE,
                                )}
                              </Tag>{' '}
                              <span className="text-xs">تومان</span>
                            </div>
                          </div>

                          <RemoveButton
                            label="حذف"
                            orderId={lastOrderData._id}
                            itemId={orderProductId}
                            icon
                          />
                        </div>
                      </div>
                    </li>
                  ),
                )}
            </ol>
          </>
        ) : (
          <Empty />
        )}
      </div>

      <div className="rounded-lg bg-slate-100 p-2 shadow-md shadow-slate-300 sm:sticky sm:left-0 sm:top-4 sm:basis-3/12 [&>:last-child]:mt-10">
        <div className="divide-y-2 divide-slate-300 rounded-lg border-2 border-slate-300 *:p-2">
          <div className="flex justify-between">
            <span>مبلغ کل: </span>
            <span>
              {isLastOrderData ? (
                <Tag>
                  {formatNumberToPersian(ordersTotalAmount * DOLLAR_RATE)} تومان
                </Tag>
              ) : (
                <span>—</span>
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span>مالیات: </span>
            {isLastOrderData ? <Tag>٪9</Tag> : <span>—</span>}
          </div>
          <div className="flex justify-between">
            <span>کرایه: </span>
            {isLastOrderData ? (
              <span className="text-zinc-400">انتخاب در تکمیل سفارش</span>
            ) : (
              <span>—</span>
            )}
          </div>
        </div>

        <Button
          label="تکمیل سفارش"
          onClick={clickRedirectHandler}
          disabled={!isLastOrderData}
        />
      </div>
    </section>
  )
}

function Tag({ children }) {
  return <span className="font-bold">{children}</span>
}
