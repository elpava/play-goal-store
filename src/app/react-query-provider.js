'use client'

import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getProductsAction } from 'action/products/get-products'

const queryClient = new QueryClient({
  defaultOptions: { queries: { gcTime: Infinity } },
})

async function prefetchQuery() {
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => getProductsAction(),
  })
}

export default function ReactQueryProvider({ children }) {
  React.useEffect(() => {
    prefetchQuery()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
