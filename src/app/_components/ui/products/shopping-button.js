'use client'

import * as React from 'react'
import clsx from 'clsx/lite'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useLocalStorage from 'hook/useLocalStorage'
import useOrders from 'hook/useOrders'
import addOrderAction from 'action/orders/add-order'
import updateProductOrderAction from 'action/orders/update-product-order'
import { ShoppingBag, PackageCheck } from 'lucide-react'
import { USER_ID_KEY } from 'library/constants'

export default function ShoppingButton({ className, productId, ...props }) {
  const queryClient = useQueryClient()
  const [userId] = useLocalStorage(USER_ID_KEY)
  const { ordersData, isLoading, isSuccess } = useOrders()
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
  let lastOrderData
  let ordersIds = []

  let isLastOrderData
  let isAdded = false

  if (isSuccess) {
    lastOrderData = ordersData?.at(-1)
    isLastOrderData = lastOrderData !== undefined && !lastOrderData?.isPaid
    if (isLastOrderData) {
      ordersIds = lastOrderData?.orders.map(order => order.productId)
      ordersIds = [...new Set(ordersIds)]
      isAdded = ordersIds.includes(productId) && !lastOrderData?.isPaid
    }
  }

  function clickAddToOrdersHandler() {
    const products = queryClient.getQueryData(['products'])

    const orderProductId =
      isLastOrderData && lastOrderData.orders.length > 0
        ? lastOrderData.orders.at(-1).id + 1
        : 1

    const productIdx = products.findIndex(product => product._id === productId)
    const {
      price,
      attributes: { colors, sizes },
    } = products[productIdx]

    const order = {
      id: orderProductId,
      productId,
      colorId: colors[0].colorId,
      sizeId: sizes[0].sizeId,
      quantity: 1,
      price: price,
    }

    if (!isLastOrderData) {
      mutateToAddOrder({
        userId,
        orders: [order],
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
      mutateToUpdateOrderProducts({
        orderId: lastOrderData._id,
        existOrderProductId: 0,
        newOrder: order,
      })
    }
  }

  return (
    <button
      className={clsx(
        'rounded-lg p-1',
        className,
        isLoading && 'p-2 sm:p-1',
        !isAdded && 'bg-red-600',
        isAdded && 'border border-red-600 bg-transparent text-red-600',
      )}
      disabled={isAdded}
      onClick={clickAddToOrdersHandler}
      {...props}
    >
      {isLoading ? (
        'بارگذاری ...'
      ) : isAdded ? (
        <>
          افزوده
          <PackageCheck className="mr-1.5 inline-block w-4 stroke-1" />
        </>
      ) : (
        <>
          افزودن
          <ShoppingBag className="mr-1.5 inline-block w-4 stroke-1" />
        </>
      )}
    </button>
  )
}
