'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { ShoppingBag, ArrowLeft, User, UserCheck } from 'lucide-react'
import Popup from '@/_components/ui/popup'
import RemoveButton from '@/_components/ui/remove-button'
import ChangeQuantityProduct from '@/_components/ui/change-quantity-product'
import GoToButton from '@/_components/ui/go-to-button'

export default function ProductsHeader({ cartMenuData }) {
  const { back, push } = useRouter()
  const [isCameFromInternalLink, setIsCameFromExternalLink] =
    React.useState(false)
  const [isOpenPopup, setIsOpenPopup] = React.useState(false)

  const isAuthurized = false
  const addedToCartCount = 3
  const isCounterShow = Boolean(addedToCartCount)

  React.useEffect(() => {
    // TODO read/write from local storage for cart
    // authurize states

    //BUG maybe!!
    if (history.length > 1 && document.referrer !== '') {
      setIsCameFromExternalLink(true)
    }
  }, [])

  function clickPopupButtonHandler() {
    setIsOpenPopup(!isOpenPopup)
  }

  function clickBackButtonHandler() {
    if (isCameFromInternalLink) {
      back()
    } else {
      push('/')
    }
  }

  return (
    <header className="text-1xl fixed left-0 top-4 z-50 ml-4 flex flex-col items-center justify-center gap-2 text-zinc-100 md:z-50 md:w-44 md:text-6xl">
      <div>
        <Link href={`${isAuthurized ? '/profile' : '/login'}`}>
          {isAuthurized ? (
            <UserCheck className="w-6 rounded-full bg-emerald-700 stroke-1 px-0.5" />
          ) : (
            <User className="w-5 stroke-1 md:w-7" />
          )}
        </Link>
      </div>

      <div className="relative flex gap-1.5">
        <button
          className="relative md:cursor-pointer"
          onClick={clickPopupButtonHandler}
        >
          <ShoppingBag className="w-5 stroke-1 md:w-6" />
          {isCounterShow && (
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
        <Popup open={isOpenPopup} onClose={setIsOpenPopup}>
          <CartMenu cartMenuData={cartMenuData} />
        </Popup>

        <button onClick={clickBackButtonHandler}>
          <ArrowLeft className="w-5 stroke-1 md:w-6" />
        </button>
      </div>
    </header>
  )
}

function CartMenu({ cartMenuData }) {
  const LAST_ITEM = cartMenuData?.length - 1

  return (
    <div className="absolute left-0 top-full bg-zinc-700 p-2 text-zinc-100">
      <div className="rounded-lg border-2 border-lime-400 px-2 py-2">
        <div className="h-96 w-80 overflow-auto overscroll-none pe-2 scrollbar scrollbar-w-1 scrollbar-track-transparent scrollbar-corner-transparent scrollbar-thumb-lime-700 scrollbar-thumb-rounded-full md:w-96 md:scrollbar-w-2">
          <ul className="divide-y-2 divide-lime-400">
            {cartMenuData.map(
              ({ _id, name, thumbnail, quantity, stock }, idx) => (
                <li
                  key={_id}
                  className={clsx(
                    'flex space-x-2 space-x-reverse py-3 md:space-x-4 md:space-x-reverse md:py-4',
                    {
                      'pt-0 md:pt-4': idx === 0,
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
                      sizes="100vw"
                    />
                  </div>

                  <div className="flex w-0 grow flex-col gap-1 md:gap-3">
                    <h4 className="truncate text-sm md:text-base">{name}</h4>

                    <div className="mt-auto flex space-x-10 space-x-reverse pr-2 md:items-end">
                      <div>
                        <ChangeQuantityProduct
                          initialQuantity={quantity}
                          maxQuantity={stock}
                        />
                      </div>

                      <div>
                        <RemoveButton
                          label="حذف"
                          productId={_id}
                          icon={false}
                        />
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
