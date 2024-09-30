'use client'

import * as React from 'react'

export default function Main({ children, style, ...props }) {
  const [initialPage, setInitialPage] = React.useState(true)

  React.useEffect(() => {
    let timeout

    timeout = setTimeout(() => {
      setInitialPage(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <main
      {...props}
      style={{
        ...(initialPage && {
          opacity: 0,
          transform: 'translateY(32px)',
          filter: 'blur(8px)',
        }),
        ...style,
      }}
    >
      {children}
    </main>
  )
}
