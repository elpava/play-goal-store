'use client'

import * as React from 'react'
import clsx from 'clsx'
import { Plus, Minus } from 'lucide-react'
import {
  useQueryClient,
  QueriesObserver,
  useMutation,
} from '@tanstack/react-query'
import { useDebounce } from 'use-debounce'
import updateQuantityOrderAction from 'action/orders/update-quantity-order'
import { Loader } from 'lucide-react'

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
  ...props
}) {
  const queryClient = useQueryClient()
  const [quantity, setQuantity] = React.useState(initialQuantity || 1)
  const [selectNewType, setSelectNewType] = React.useState(false)
  // for update quantity directly on server
  const { mutate, isPending } = useMutation({
    mutationFn: ({ orderId, quantity }) =>
      updateQuantityOrderAction(orderId, quantity),
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

  const isUndefinedCache = productsSelectionCache === undefined
  if (isUndefinedCache) {
    queryClient.setQueryData(['products-selection'], [])
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
      setSelectNewType(false)

      const order = {
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

    // TODO read/write from local storage for cart
  }, [queryClient, selectNewType, productId, productPrice, quantity])

  // for update quantity directly on server
  React.useEffect(() => {
    if (allowUpdateOnServer && updateDirectlyOnServer && debouncedQuantity) {
      mutate({ orderId, quantity: debouncedQuantity })
    }
  }, [
    allowUpdateOnServer,
    debouncedQuantity,
    mutate,
    orderId,
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
      <button
        onClick={clickIncreaseButton}
        className={clsx({ 'text-zinc-500': isMaximumQty })}
        disabled={isMaximumQty}
      >
        <Plus className="w-3 md:w-5" />
      </button>

      <div className="inline-block w-7 select-none rounded-md border border-zinc-900 text-center text-base font-bold shadow-inner shadow-zinc-500 md:text-lg">
        {quantity}
      </div>

      <button
        onClick={clickDecreaseButton}
        className={clsx({ 'text-zinc-500': isMinimumQty })}
        disabled={isMinimumQty}
      >
        <Minus className="w-3 md:w-5" />
      </button>

      {isPending && (
        <div className="absolute inset-0 flex justify-center backdrop-blur-[1px]">
          <Loader className="animate-spin" />
        </div>
      )}
    </div>
  )
}
