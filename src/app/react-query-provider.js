'use client'

import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getProductsAction } from 'action/products/get-products'
import { getOrdersAction } from 'action/orders/get-orders'
import { useSession } from 'next-auth/react'

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
    queryKey: ['cart'],
    queryFn: () => getOrdersAction(userId),
  })
}

export default function ReactQueryProvider({ children }) {
  const { data } = useSession()

  React.useEffect(() => {
    prefetchProducts()

    let unknownUserId

    unknownUserId = localStorage.getItem('pg-user-id')
    const isRegisteredUser = data?.user.id && unknownUserId !== data?.user.id

    if (isRegisteredUser) {
      unknownUserId = data.user.id
      localStorage.setItem('pg-user-id', unknownUserId)
    }

    if (!unknownUserId) {
      unknownUserId = crypto.randomUUID()
      localStorage.setItem('pg-user-id', unknownUserId)
    }

    prefetchCart(unknownUserId)
  }, [data])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
