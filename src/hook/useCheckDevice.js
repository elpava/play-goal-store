import * as React from 'react'
import { DEVICES_LIST } from 'library/constants'

export default function useCheckDevice() {
  const userAgent = React.useSyncExternalStore(subscribe, getSnapshot, () => {})
  const regexPattern = new RegExp(DEVICES_LIST.join('|'), 'i')

  return { is: regexPattern.test(userAgent) }
}

function subscribe(callback) {
  window?.addEventListener('online', callback)
  window?.addEventListener('offline', callback)
  return () => {
    window?.removeEventListener('online', callback)
    window?.removeEventListener('offline', callback)
  }
}

function getSnapshot() {
  return navigator?.userAgent
}
