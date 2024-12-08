'use client'

import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

const INITIAL_ID = uuidv4()

export default function useLocalStorage(key) {
  const subscribe = React.useCallback(
    callback => {
      const handleStorageChange = event => {
        if (event.storageArea === localStorage && event.key === key) {
          callback()
        }
      }

      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    },
    [key],
  )

  const getSnapshot = React.useCallback(() => {
    if (typeof localStorage !== 'undefined' && key) {
      const storedValue = localStorage.getItem(key)

      if (!storedValue || storedValue === 'undefined') {
        localStorage.setItem(key, JSON.stringify(INITIAL_ID))
      }

      return storedValue && storedValue !== 'undefined'
        ? JSON.parse(storedValue)
        : INITIAL_ID
    }
  }, [key])

  const getServerSnapshot = React.useCallback(() => null, [])

  const value = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )

  const setValue = React.useCallback(
    newValue => {
      localStorage.setItem(key, JSON.stringify(newValue))
      window.dispatchEvent(new Event('storage'))
    },
    [key],
  )

  return [value, setValue]
}
