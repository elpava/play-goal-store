'use client'

import * as React from 'react'
import clsx from 'clsx'
import { ShoppingBag, PackageCheck } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getOrdersAction } from 'action/orders/get-orders'
import { addOrderAction } from 'action/orders/add-order'

export default function ShoppingButton({ className, productId, ...props }) {
  const queryClient = useQueryClient()
  const { data: cartData, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getOrdersAction(),
  })
  const { mutate } = useMutation({
    mutationFn: newOrder => addOrderAction(newOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  let ordersIds = []
  let isAdded = false

  const isOrdersData = cartData?.length > 0

  if (isOrdersData) {
    ordersIds = cartData.map(order => order.productId)
    ordersIds = [...new Set(ordersIds)]
  }

  isAdded = ordersIds.includes(productId)

  React.useEffect(() => {
    // TODO read/write from local storage for cart
  }, [])

  function clickAddToOrdersHandler() {
    const products = queryClient.getQueryData(['products'])
    const prodctIdx = products.findIndex(product => product._id === productId)
    const {
      price,
      attributes: { colors, sizes },
    } = products[prodctIdx]

    const order = {
      productId,
      colorId: colors[0].colorId,
      sizeId: sizes[0].sizeId,
      quantity: 1,
      price: price,
      totalAmount: price,
    }

    mutate(order)
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
