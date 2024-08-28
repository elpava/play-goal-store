'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import clsx from 'clsx/lite'
import { useQueryClient } from '@tanstack/react-query'
import useOrders from 'hook/useOrders'
import Popup from '@/_components/ui/common/popup'
import RemoveButton from '@/_components/ui/products/remove-button'
import Button from '@/_components/ui/common/button'
import LoginButton from './login-button'
import { formatNumberToPersian } from 'library/helper-functions'
import { ShoppingBag, ArrowLeft } from 'lucide-react'
import Logo from '/public/play-goal.png'
import { DOLLAR_RATE } from 'library/fix-values'

export default function ProductsHeader({ isAuthurized }) {
  const { ordersData, isSuccess } = useOrders()
  let lastOrderData
  const { back } = useRouter()
  const [toggle, setToggle] = React.useState(false)

  let isLastOrderData = false
  let ordersCount = 0
  let isShowCounter = false

  if (isSuccess) {
    lastOrderData = ordersData?.at(-1)
    isLastOrderData = lastOrderData?.orders.length > 0 && !lastOrderData?.isPaid
    ordersCount = isLastOrderData ? lastOrderData.orders.length : 0
    isShowCounter = Boolean(ordersCount)
  }

  function clickBackButtonHandler() {
    back()
  }

  function clickPopupHandler() {
    setToggle(prev => !prev)
  }

  return (
    <header className="fixed inset-x-0 z-50 mx-auto grid justify-center">
      <div className="flex items-center gap-4 rounded-ee-lg rounded-es-lg border-b-4 border-zinc-500 bg-zinc-700 px-6 py-2 text-2xl text-zinc-100 backdrop-blur-lg md:px-10 md:py-3 md:text-6xl">
        <button
          className="relative md:cursor-pointer"
          onClick={clickPopupHandler}
        >
          <ShoppingBag className="w-5 stroke-1 md:w-6" />
          {isShowCounter && (
            <span
              className={clsx(
                'absolute rounded-full bg-red-600 px-1 text-xs md:text-base',
                ordersCount < 10 &&
                  '-right-1.5 -top-1 w-4 md:-right-3 md:-top-3 md:w-6',
                ordersCount >= 10 &&
                  '-right-2.5 -top-2.5 w-5 py-0.5 md:-right-3 md:-top-3 md:w-6 md:text-sm',
              )}
            >
              {ordersCount}
            </span>
          )}
        </button>

        <LoginButton isAuthurized={isAuthurized} />

        <button onClick={clickBackButtonHandler}>
          <ArrowLeft className="w-5 stroke-1 md:w-6" />
        </button>

        <Link href="/" className="relative block h-7 w-5 sm:h-8 sm:w-6">
          <Image
            src={Logo}
            alt="لوگو"
            fill
            priority
            sizes="(min-width: 768px) 100vw, (min-width: 640px) 50vw, (min-width: 475px) 33vw, 25vw"
          />
        </Link>
      </div>

      <Popup
        className="flex items-start justify-center pt-14"
        toggle={toggle}
        onToggle={clickPopupHandler}
      >
        {isLastOrderData ? (
          <CartMenu
            orderId={lastOrderData._id}
            userId={lastOrderData.userId}
            ordersData={lastOrderData.orders}
          />
        ) : (
          <EmptyCartMenu />
        )}
      </Popup>
    </header>
  )
}

function CartMenu({ orderId, ordersData }) {
  const { push } = useRouter()
  const queryClient = useQueryClient()
  const products = queryClient.getQueryData(['products'])
  let cartMenuData = []

  if (ordersData.length > 0) {
    ordersData?.forEach(orderProduct => {
      const product = products.find(
        product => product._id === orderProduct.productId,
      )
      const productColor = product.attributes.colors.find(
        color => color.colorId === orderProduct.colorId,
      )
      const productSize = product.attributes.sizes.find(
        size => size.sizeId === orderProduct.sizeId,
      )

      cartMenuData.push({
        id: orderProduct.id,
        slug: product.slug,
        name: product.name,
        thumbnail: productColor.filename,
        size: productSize.size,
        quantity: orderProduct.quantity,
        price: orderProduct.price,
        stock: product.stock,
        totalAmount: orderProduct.quantity * product.price * DOLLAR_RATE,
      })
    })
  }

  const last_item = cartMenuData?.length - 1

  function clickRedirectHandler() {
    push('/cart')
  }

  return (
    <div
      className="flex rounded-lg border-2 border-zinc-500 bg-zinc-700 p-2 text-zinc-100"
      onClick={e => e.stopPropagation()}
    >
      <div className="rounded-lg border-2 border-lime-400 px-2 py-2">
        <div className="max-h-96 w-80 overflow-auto overscroll-none py-0.5 pe-2 scrollbar scrollbar-w-1 scrollbar-track-transparent scrollbar-corner-transparent scrollbar-thumb-lime-700 scrollbar-thumb-rounded-full md:w-96 md:scrollbar-w-2">
          <ul className="divide-y-2 divide-lime-400">
            {cartMenuData.map(
              (
                { id, slug, name, thumbnail, size, quantity, totalAmount },
                idx,
              ) => (
                <li
                  key={id}
                  className={clsx(
                    'flex gap-2 py-3 md:gap-4 md:py-4',
                    idx === 0 && 'pt-0 md:pt-0',
                    idx === last_item && 'md:pb-0',
                  )}
                >
                  <Link
                    href={`/products/${slug}`}
                    className="flex basis-5/6 gap-2 md:gap-4"
                  >
                    <div className="relative size-10 shrink-0 basis-1/6 md:size-16">
                      <Image
                        src={`/images/products/${thumbnail}`}
                        alt="عکس محصول"
                        fill
                        sizes="(min-width: 768px) 100vw, (min-width: 640px) 50vw, (min-width: 475px) 33vw, 25vw"
                        className="object-contain"
                      />
                    </div>

                    <div className="flex w-0 grow flex-col gap-1 md:gap-3">
                      <div className="truncate text-sm md:text-base">
                        {name}
                      </div>

                      <div className="mt-auto flex items-center justify-between px-2 text-sm md:items-end md:text-base">
                        <div>
                          {quantity} عدد × اندازه {size}
                        </div>

                        <span className="text-zinc-400">
                          {formatNumberToPersian(totalAmount)}{' '}
                          <span className="text-xs">تومان</span>
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="basis-1/6 self-end">
                    <RemoveButton
                      label="حذف"
                      orderId={orderId}
                      itemId={id}
                      icon={false}
                    />
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="mt-0 text-center md:mt-4">
          <Button label="مشاهده سبد خرید" onClick={clickRedirectHandler} />
        </div>
      </div>
    </div>
  )
}

function EmptyCartMenu() {
  return (
    <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-lg border-2 border-zinc-500 bg-zinc-700 p-2 text-zinc-100">
      <div className="grid h-28 w-80 place-items-center rounded-lg border-2 border-lime-400 px-2 py-2 text-center text-base sm:text-lg">
        سبد خرید شما خالی است.
      </div>
    </div>
  )
}
