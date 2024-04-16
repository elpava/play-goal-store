'use client'

import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getProductsAction } from 'action/products/get-products'
import { getOrdersAction } from 'action/orders/get-orders'

const queryClient = new QueryClient({
  defaultOptions: { queries: { gcTime: Infinity } },
})

async function prefetchProducts() {
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => getProductsAction(),
  })
}

async function prefetchCart(userId) {
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => getOrdersAction(userId),
  })
}

export default function ReactQueryProvider({ children }) {
  React.useEffect(() => {
    prefetchProducts()

    let unknownUserId = localStorage.getItem('pg-user-id')
    if (!unknownUserId) {
      unknownUserId = crypto.randomUUID()
      localStorage.setItem('pg-user-id', unknownUserId)
    }

    prefetchCart(unknownUserId)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
