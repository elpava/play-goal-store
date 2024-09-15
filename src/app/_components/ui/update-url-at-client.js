'use client'

import * as React from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function UpdateURLAtClient({ queries }) {
  const pathname = usePathname()
  const { push } = useRouter()

  React.useEffect(() => {
    if (window && queries) {
      push(pathname + '?' + queries)
    }
  }, [pathname, push, queries])

  return null
}
