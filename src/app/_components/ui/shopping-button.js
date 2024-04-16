'use client'

import * as React from 'react'
import clsx from 'clsx'
import { ShoppingBag, PackageCheck } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getOrdersAction } from 'action/orders/get-orders'
import { addOrderAction } from 'action/orders/add-order'
import updateProductOrderAction from 'action/orders/update-product-order'

export default function ShoppingButton({ className, productId, ...props }) {
  const queryClient = useQueryClient()
  const [unknownUserId, setUnknownUserId] = React.useState(null)
  const {
    data: ordersData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getOrdersAction(unknownUserId),
    enabled: Boolean(unknownUserId),
  })
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

  React.useEffect(() => {
    if (window !== undefined) {
      const userId = localStorage.getItem('pg-user-id')
      setUnknownUserId(userId)
    }
    // TODO read/write from local storage for cart
  }, [])

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
        userId: unknownUserId,
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
        {
          'p-2 sm:p-1': isLoading,
          'border border-red-600 bg-transparent text-red-600': isAdded,
          'bg-red-600': !isAdded,
        },
        className,
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
          <PackageCheck className="mr-2 inline-block w-4 stroke-1" />
        </>
      ) : (
        <>
          افزودن
          <ShoppingBag className="mr-2 inline-block w-4 stroke-1" />
        </>
      )}
    </button>
  )
}
