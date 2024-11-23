'use client'

import * as React from 'react'

export default function useResize() {
  const width = React.useSyncExternalStore(subscribe, getSnapshot, () => {})

  return {
    desktop: width > 900 ? true : false,
    tablet: width <= 900 ? true : false,
    mobile: width <= 500 ? true : false,
    sm: width >= 640 ? true : false,
    md: width >= 768 ? true : false,
    lg: width >= 1024 ? true : false,
    xl: width >= 1280 ? true : false,
  }
}

function subscribe(callback) {
  window?.addEventListener('resize', callback)
  return () => window?.removeEventListener('resize', callback)
}

function getSnapshot() {
  return window.innerWidth
}
