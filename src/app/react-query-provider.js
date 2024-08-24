'use client'

import * as React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useSession } from 'next-auth/react'
import { v4 as uuidv4 } from 'uuid'
import { getQueryClient } from './getQueryClient'

export default function ReactQueryProvider({ children }) {
  const { data } = useSession()
  const queryClient = getQueryClient()

  React.useEffect(() => {
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
  }, [data])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
