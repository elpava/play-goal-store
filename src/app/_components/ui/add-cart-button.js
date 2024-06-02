'use client'

import * as React from 'react'
import {
  useMutation,
  useQueryClient,
  QueriesObserver,
} from '@tanstack/react-query'
import useUserId from 'hook/useUserId'
import useOrders from 'hook/useOrders'
import { addOrderAction } from 'action/orders/add-order'
import updateProductOrderAction from 'action/orders/update-product-order'
import clsx from 'clsx'

export default function AddCartButton({
  label,
  productId,
  className,
  ...props
}) {
  const queryClient = useQueryClient()
  const { userId } = useUserId()
  const { ordersData, isSuccess } = useOrders()
  let lastOrderData
  const { mutate: mutateToAddOrder } = useMutation({
    mutationFn: newOrder => addOrderAction(newOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
  const { mutate: mutateToUpdateOrderProducts } = useMutation({
    mutationFn: ({ orderId, existOrderProductId, newOrder }) =>
      updateProductOrderAction(orderId, existOrderProductId, newOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const activeColorIdRef = React.useRef(null)
  const activeSizeIdRef = React.useRef(null)
  const productsSelectionRef = React.useRef(null)

  let isLastOrderData

  const observer = new QueriesObserver(queryClient, [
    { queryKey: ['active-color-id'] },
    { queryKey: ['active-size-id'] },
    { queryKey: ['products-selection'] },
  ])
  observer.subscribe(result => {
    if (result[0].data !== activeColorIdRef.current) {
      activeColorIdRef.current = result[0].data
    }
    if (result[1].data !== activeSizeIdRef.current) {
      activeSizeIdRef.current = result[1].data
    }
    if (result[2].data !== productsSelectionRef.current) {
      productsSelectionRef.current = result[2].data
    }
  })

  if (isSuccess) {
    lastOrderData = ordersData?.at(-1)
    isLastOrderData = lastOrderData !== undefined && !lastOrderData?.isPaid
  }

  function clickAddToOrdersHandler() {
    const productSelectionIdx = productsSelectionRef.current.findIndex(
      product =>
        product.productId === productId &&
        product.colorId === activeColorIdRef.current &&
        product.sizeId === activeSizeIdRef.current,
    )
    const productSelection = productsSelectionRef.current[productSelectionIdx]

    if (!isLastOrderData) {
      mutateToAddOrder({
        userId,
        orders: [productSelection],
        isPaid: null,
        isDelivered: null,
        isFailured: null,
        shipment: {},
        totalAmountPayment: null,
        orderDate: new Date().getTime(),
        updatedOrderAt: null,
        paymentDate: null,
        deliveryDate: null,
        trackingCode: null,
      })
    } else {
      const orderProductIdx = lastOrderData?.orders.findIndex(
        order => order.id === productSelection.id,
      )

      const existOrderProductId =
        orderProductIdx > -1 ? lastOrderData.orders[orderProductIdx].id : 0

      mutateToUpdateOrderProducts({
        orderId: lastOrderData._id,
        existOrderProductId,
        newOrder: productSelection,
      })
    }
  }

  return (
    <button
      className={clsx(
        'w-full rounded-lg bg-lime-500 p-2 font-semibold text-lime-950 md:text-lg',
        className,
        { 'bg-zinc-300 text-zinc-400': !userId },
      )}
      onClick={clickAddToOrdersHandler}
      disabled={!isSuccess}
      {...props}
    >
      {label || 'افزدون به سبد خرید'}
    </button>
  )
}
