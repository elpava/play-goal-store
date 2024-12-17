'use client'

import * as React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from './getQueryClient'

export default function ReactQueryProvider({ children }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
