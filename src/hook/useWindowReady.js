import * as React from 'react'

export default function useWindowReady() {
  const [isWindowReady, setIsWindowReady] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWindowReady(true)
    }
  }, [])

  return { isWindowReady }
}
