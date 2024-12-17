'use client'

import * as React from 'react'
import useLocalStorage from 'hook/useLocalStorage'
import { useSession } from 'next-auth/react'
import { USER_ID_KEY, USER_ID_INIT_KEY } from 'library/constants'

export default function UserIdManagement({ children }) {
  const { data } = useSession()
  const [userIdInitilization, setUserIdInitilization] =
    useLocalStorage(USER_ID_INIT_KEY)
  const [userId, setUserId] = useLocalStorage(USER_ID_KEY)

  React.useEffect(() => {
    const isRegisteredUser = data?.user.id && userId !== data?.user.id

    if (!userIdInitilization && isRegisteredUser) {
      setUserIdInitilization(userId)
    }

    if (isRegisteredUser) {
      setUserId(data.user.id)
    }
  }, [data, setUserId, setUserIdInitilization, userId, userIdInitilization])

  return <>{children}</>
}
