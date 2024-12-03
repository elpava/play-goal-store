import * as React from 'react'

let observer = [],
  entries = [],
  serverSnapshot = []

export default function useIntersectionObserver({
  root,
  rootMargin,
  threshold,
} = {}) {
  if (observer.length > 0) observer.disconnect()

  const subscribeCB = React.useCallback(
    callback => subscribe(callback, { root, rootMargin, threshold }),
    [root, rootMargin, threshold],
  )

  const entries = React.useSyncExternalStore(
    subscribeCB,
    getSnapshot,
    getServerSnapshot,
  )

  const observe = React.useCallback(element => {
    if (element) observer.observe(element)
  }, [])

  const unobserve = React.useCallback(element => {
    if (element) observer.unobserve(element)
  }, [])

  return { entries, observe, unobserve }
}

const subscribe = (callback, config) => {
  observer = new IntersectionObserver(ents => {
    entries = ents
    callback()
  }, config)

  return () => observer.disconnect()
}

const getSnapshot = () => entries

const getServerSnapshot = () => serverSnapshot
