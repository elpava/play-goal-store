'use client'

import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import getProductsAction from 'action/products/get-products'
import getOrdersAction from 'action/orders/get-orders'
import { useSession } from 'next-auth/react'
import { v4 as uuidv4 } from 'uuid'

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

    let userId

    userId = localStorage.getItem('pg-user-id')
    const isRegisteredUser = data?.user.id && userId !== data?.user.id

    if (isRegisteredUser) {
      userId = data.user.id
      localStorage.setItem('pg-user-id', userId)
    }

    if (!userId) {
      userId = uuidv4()
      localStorage.setItem('pg-user-id', userId)
    }

    prefetchCart(userId)
  }, [data])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
