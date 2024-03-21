'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { ShoppingBag, ArrowLeft, User, UserCheck } from 'lucide-react'
import Popup from '@/_components/ui/popup'
import RemoveButton from '@/_components/ui/remove-button'
import GoToButton from '@/_components/ui/go-to-button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getOrdersAction } from 'action/orders/get-orders'
import Logo from '/public/play-goal.png'

export default function ProductsHeader() {
  const { data, isSuccess } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getOrdersAction(),
  })
  let ordersData = []
  const { back, push } = useRouter()
  const [isCameFromInternalLink, setIsCameFromExternalLink] =
    React.useState(false)
  const [isOpenPopup, setIsOpenPopup] = React.useState(false)

  const isOrdersData = data?.length > 0
  const isAuthurized = false
  const addedToCartCount = data?.length
  const isCounterShow = Boolean(addedToCartCount)

  if (isOrdersData) {
    ordersData = data
  }

  React.useEffect(() => {
    // TODO read/write from local storage for cart
    // authurize states

    //BUG maybe!!
    if (history.length > 1 && document.referrer !== '') {
      setIsCameFromExternalLink(true)
    }
  }, [])

  function clickBackButtonHandler() {
    if (isCameFromInternalLink) {
      back()
    } else {
      push('/products')
    }
  }

  function clickPopupButtonHandler() {
    setIsOpenPopup(!isOpenPopup)
  }

  return (
    <header className="fixed left-1/2 top-0 z-50 flex -translate-x-1/2 items-center gap-4 rounded-ee-lg rounded-es-lg border-b-4 border-zinc-500 bg-zinc-300/40 px-6 py-2 text-2xl text-zinc-100 backdrop-blur-lg md:px-10 md:py-4 md:text-6xl">
      <div className="relative contents">
        <button
          className="relative md:cursor-pointer"
          onClick={clickPopupButtonHandler}
        >
          <ShoppingBag className="w-5 stroke-1 md:w-6" />
          {isSuccess && isCounterShow && (
            <span
              className={clsx(
                'absolute rounded-full bg-red-600 px-1 text-xs md:text-base',
                {
                  '-right-1.5 -top-1 w-4 md:-right-3 md:-top-3 md:w-6':
                    addedToCartCount < 10,
                  '-right-2.5 -top-2.5 w-5 py-0.5 md:-right-3 md:-top-3 md:w-6 md:text-sm':
                    addedToCartCount >= 10,
                },
              )}
            >
              {addedToCartCount}
            </span>
          )}
        </button>
      </div>
      <Popup open={isOpenPopup && isOrdersData} onClose={setIsOpenPopup}>
        <CartMenu ordersData={ordersData} />
      </Popup>

      <div>
        <Link href={`${isAuthurized ? '/profile' : '/login'}`}>
          {isAuthurized ? (
            <UserCheck className="w-6 rounded-full bg-emerald-700 stroke-1 px-0.5" />
          ) : (
            <User className="w-5 stroke-1 md:w-7" />
          )}
        </Link>
      </div>

      <div>
        <button className="contents" onClick={clickBackButtonHandler}>
          <ArrowLeft className="w-5 stroke-1 md:w-6" />
        </button>
      </div>

      <div className="relative h-7 w-5 sm:h-8 sm:w-6">
        <Image src={Logo} alt="لوگو" fill priority />
      </div>
    </header>
  )
}

function CartMenu({ ordersData }) {
  const queryClient = useQueryClient()
  const products = queryClient.getQueryData(['products'])
  let cartMenuData = []

  if (ordersData.length > 0) {
    ordersData?.forEach(order => {
      const product = products.find(product => product._id === order.productId)
      const productColor = product.attributes.colors.find(
        color => color.colorId === order.colorId,
      )
      const productSize = product.attributes.sizes.find(
        size => size.sizeId === order.sizeId,
      )

      cartMenuData.push({
        id: order._id,
        name: product.name,
        thumbnail: productColor.filename,
        size: productSize.size,
        quantity: order.quantity,
        stock: product.stock,
      })
    })
  }

  const LAST_ITEM = cartMenuData?.length - 1

  return (
    <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-lg border-2 border-zinc-500 bg-zinc-700 p-2 text-zinc-100">
      <div className="rounded-lg border-2 border-lime-400 px-2 py-2">
        <div className="max-h-96 w-80 overflow-auto overscroll-none pe-2 scrollbar scrollbar-w-1 scrollbar-track-transparent scrollbar-corner-transparent scrollbar-thumb-lime-700 scrollbar-thumb-rounded-full md:w-96 md:scrollbar-w-2">
          <ul className="divide-y-2 divide-lime-400">
            {cartMenuData.map(
              ({ id, name, thumbnail, size, quantity }, idx) => (
                <li
                  key={id}
                  className={clsx(
                    'flex space-x-2 space-x-reverse py-3 md:space-x-4 md:space-x-reverse md:py-4',
                    {
                      'pt-0 md:pt-0': idx === 0,
                      'md:pb-0': idx === LAST_ITEM,
                    },
                  )}
                >
                  <div className="relative size-14 shrink-0 basis-1/6 md:size-16">
                    <Image
                      src={`/images/sample images/${thumbnail}`}
                      alt="عکس محصول"
                      className="object-contain"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  <div className="flex w-0 grow flex-col gap-1 md:gap-3">
                    <h4 className="truncate text-sm md:text-base">{name}</h4>

                    <div className="mt-auto flex items-center justify-between px-2 md:items-end">
                      <h4 className="text-sm md:text-base">
                        {quantity} عدد × اندازه {size}
                      </h4>

                      <div>
                        <RemoveButton label="حذف" productId={id} icon={false} />
                      </div>
                    </div>
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="mt-4 text-center md:mt-0">
          <GoToButton label="مشاهده سبد خرید" href="/cart" />
        </div>
      </div>
    </div>
  )
}
