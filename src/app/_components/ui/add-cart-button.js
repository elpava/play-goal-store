'use client'

import * as React from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueriesObserver,
} from '@tanstack/react-query'
import { getOrdersAction } from 'action/orders/get-orders'
import { addOrderAction } from 'action/orders/add-order'

export default function AddCartButton({ label, productId, ...props }) {
  const queryClient = useQueryClient()
  const { data: ordersData } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getOrdersAction(),
  })
  const { mutate } = useMutation({
    mutationFn: ({ newOrder, existOrderId }) =>
      addOrderAction(newOrder, existOrderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const activeColorIdRef = React.useRef(null)
  const activeSizeIdRef = React.useRef(null)
  const productsSelectionRef = React.useRef(null)

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

  React.useEffect(() => {
    // localStorage.setItem('pg-user-id')
  }, [])

  // TODO define load state

  function clickAddToOrdersHandler() {
    const productSelectionIdx = productsSelectionRef.current.findIndex(
      product =>
        product.productId === productId &&
        product.colorId === activeColorIdRef.current &&
        product.sizeId === activeSizeIdRef.current,
    )
    const productSelection = productsSelectionRef.current[productSelectionIdx]

    const orderIdx = ordersData?.findIndex(
      order =>
        order.productId === productSelection.productId &&
        order.colorId === productSelection.colorId &&
        order.sizeId === productSelection.sizeId,
    )
    const orderId = orderIdx > -1 ? ordersData[orderIdx]._id : 0

    mutate({ newOrder: productSelection, existOrderId: orderId })
  }

  return (
    <button
      className="w-full rounded-lg bg-lime-500 p-2 font-semibold text-lime-950 md:text-lg"
      onClick={clickAddToOrdersHandler}
      {...props}
    >
      {label || 'افزدون به سبد خرید'}
    </button>
  )
}
