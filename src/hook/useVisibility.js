import * as React from 'react'

let observer
let isVisible

export default function useVisibility({
  ref,
  root,
  rootMargin,
  threshold = 0.5,
  once,
}) {
  const subscribeCB = React.useCallback(
    callback => subscribe(callback, ref, once, { root, rootMargin, threshold }),
    [once, ref, root, rootMargin, threshold],
  )

  React.useSyncExternalStore(subscribeCB, getSnapshot, getServerSnapshot)

  return isVisible
}

const subscribe = (callback, ref, once, config) => {
  const element = ref.current
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      isVisible = true

      if (element && once) {
        observer.unobserve(element)
      }
    } else {
      isVisible = false
    }

    callback()
  }, config)

  if (element) {
    observer.observe(element)
  }

  return () => {
    if (element) observer.disconnect()
  }
}

const getSnapshot = () => isVisible

const getServerSnapshot = () => false
