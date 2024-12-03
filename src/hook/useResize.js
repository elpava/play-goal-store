import * as React from 'react'

import { BREAKPOINTS } from 'library/constants'

const { sm, md, lg, xl } = BREAKPOINTS

export default function useResize() {
  const width = React.useSyncExternalStore(subscribe, getSnapshot, () => {})

  return {
    sm: width >= sm,
    md: width >= md,
    lg: width >= lg,
    xl: width >= xl,
  }
}

function subscribe(callback) {
  window?.addEventListener('resize', callback)
  return () => window?.removeEventListener('resize', callback)
}

function getSnapshot() {
  return window.innerWidth
}
