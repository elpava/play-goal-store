'use client'

import * as React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import useLocalStorage from 'hook/useLocalStorage'
import { useSession } from 'next-auth/react'
import { getQueryClient } from './getQueryClient'
import { USER_ID_KEY } from 'library/constants'

export default function ReactQueryProvider({ children }) {
  const [userId, setUserId] = useLocalStorage(USER_ID_KEY)

  const { data } = useSession()
  const queryClient = getQueryClient()

  React.useEffect(() => {
    const isRegisteredUser = data?.user.id && userId !== data?.user.id

    if (isRegisteredUser) {
      setUserId(data.user.id)
    }
  }, [data, setUserId, userId])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
