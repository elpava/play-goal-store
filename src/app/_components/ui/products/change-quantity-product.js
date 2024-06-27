'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx/lite'
import { useDebounce } from 'use-debounce'
import {
  useQueryClient,
  QueriesObserver,
  useMutation,
} from '@tanstack/react-query'
import useOrders from 'hook/useOrders'
import updateQuantityOrderAction from 'action/orders/update-quantity-order'
import { Plus, Minus, Loader } from 'lucide-react'

export default function ChangeQuantityProduct({
  className,
  initialQuantity,
  maxQuantity,
  productId,
  defaultColorId,
  defaultSizeId,
  productPrice,
  updateDirectlyOnServer,
  orderId,
  orderProductId,
  ...props
}) {
  const queryClient = useQueryClient()
  const pathname = usePathname()
  const { ordersData, isSuccess } = useOrders()
  let lastOrderData
  const [quantity, setQuantity] = React.useState(initialQuantity || 1)
  const [selectNewType, setSelectNewType] = React.useState(false)
  // for update quantity directly on server
  const { mutate: mutateToUpdateQuantityOrder, isPending } = useMutation({
    mutationFn: ({ orderId, orderProductId, quantity }) =>
      updateQuantityOrderAction(orderId, orderProductId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
  const [allowUpdateOnServer, setAllowUpdateOnServer] = React.useState(false)
  const [debouncedQuantity] = useDebounce(allowUpdateOnServer && quantity, 750)

  const activeColorIdRef = React.useRef(defaultColorId)
  const activeSizeIdRef = React.useRef(defaultSizeId)
  const productsSelectionCache = queryClient.getQueryData([
    'products-selection',
  ])

  const isProductsPath = pathname.startsWith('/product')
  const isUndefinedCache = productsSelectionCache === undefined
  if (isUndefinedCache) {
    queryClient.setQueryData(['products-selection'], [])
  }
  let isLastOrderData

  if (isSuccess) {
    lastOrderData = ordersData?.at(-1)
    isLastOrderData =
      lastOrderData !== undefined && lastOrderData.orders.length > 0
  }

  const isMinimumQty = quantity < 2
  const isMaximumQty = quantity === maxQuantity

  React.useEffect(() => {
    const observer = new QueriesObserver(queryClient, [
      { queryKey: ['active-color-id'] },
      { queryKey: ['active-size-id'] },
    ])
    observer.subscribe(result => {
      if (activeColorIdRef.current !== result[0].data) {
        activeColorIdRef.current = result[0].data
        setSelectNewType(true)
      }
      if (activeSizeIdRef.current !== result[1].data) {
        activeSizeIdRef.current = result[1].data
        setSelectNewType(true)
      }
    })

    queryClient.setQueryData(['products-selection'], (prevState = []) => {
      let lastOrderProductId = 1

      setSelectNewType(false)

      if (isLastOrderData) {
        lastOrderProductId = lastOrderData.orders.at(-1).id + 1
      }

      const order = {
        id: lastOrderProductId,
        productId,
        colorId: activeColorIdRef.current,
        sizeId: activeSizeIdRef.current,
        quantity,
        price: productPrice,
      }

      const productsSelectionIdx = prevState.findIndex(
        item =>
          item.productId === productId &&
          item.colorId === activeColorIdRef.current &&
          item.sizeId === activeSizeIdRef.current,
      )
      if (productsSelectionIdx > -1) {
        prevState[productsSelectionIdx].quantity = order.quantity
        prevState[productsSelectionIdx].price = order.price

        return prevState
      }

      prevState.push(order)

      return prevState
    })
  }, [
    isLastOrderData,
    lastOrderData,
    productId,
    productPrice,
    quantity,
    queryClient,
    selectNewType,
  ])

  // for update quantity directly on server
  React.useEffect(() => {
    if (allowUpdateOnServer && updateDirectlyOnServer && debouncedQuantity) {
      mutateToUpdateQuantityOrder({
        orderId,
        orderProductId,
        quantity: debouncedQuantity,
      })
    }
  }, [
    allowUpdateOnServer,
    debouncedQuantity,
    mutateToUpdateQuantityOrder,
    orderId,
    orderProductId,
    updateDirectlyOnServer,
  ])

  function clickIncreaseButton() {
    setAllowUpdateOnServer(true)
    setQuantity(prevState => prevState + 1)
  }

  function clickDecreaseButton() {
    setAllowUpdateOnServer(true)
    setQuantity(prevState => prevState - 1)
  }

  return (
    <div className={clsx('relative flex gap-1.5', className)} {...props}>
      <QtyButton
        isDark={isProductsPath}
        disabled={isMaximumQty}
        onClick={clickIncreaseButton}
      >
        <Plus className="w-3 md:w-5" />
      </QtyButton>

      <div className="inline-block w-7 select-none rounded-md border border-zinc-900 text-center text-base font-bold shadow-inner shadow-zinc-500 md:text-lg">
        {quantity}
      </div>

      <QtyButton
        isDark={isProductsPath}
        disabled={isMinimumQty}
        onClick={clickDecreaseButton}
      >
        <Minus className="w-3 md:w-5" />
      </QtyButton>

      {isPending && (
        <div className="absolute inset-0 flex justify-center backdrop-blur-[1px]">
          <Loader className="animate-spin" />
        </div>
      )}
    </div>
  )
}

function QtyButton({ children, isDark, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'transition-colors',
        isDark && 'md:text-zinc-400 md:hover:text-white',
        isDark && disabled && '!text-zinc-700',
        !isDark && 'md:text-zinc-500 md:hover:text-black',
        !isDark && disabled && '!text-zinc-300',
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
