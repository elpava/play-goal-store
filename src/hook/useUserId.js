import * as React from 'react'

export default function useUserId() {
  const [userId, setUserId] = React.useState(null)

  React.useEffect(() => {
    if (window !== undefined) {
      const userId = localStorage.getItem('pg-user-id')
      setUserId(userId)
    }
  }, [])

  return { userId }
}
