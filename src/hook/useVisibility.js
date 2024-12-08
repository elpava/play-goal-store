import * as React from 'react'

export default function useTemp({
  ref,
  root,
  rootMargin,
  threshold = 0.5,
  once,
}) {
  const observerRef = React.useRef()
  const isVisibleRef = React.useRef()

  const subscribeCB = React.useCallback(
    callback => {
      const element = ref.current

      observerRef.current = new IntersectionObserver(
        ([entry], internalObserver) => {
          isVisibleRef.current = entry.isIntersecting

          if (isVisibleRef.current && once) {
            internalObserver.unobserve(element)
          }

          callback()
        },
        { root, rootMargin, threshold },
      )

      if (element) {
        observerRef.current.observe(element)
      }

      return () => {
        if (element) observerRef.current.disconnect()
      }
    },
    [once, ref, root, rootMargin, threshold],
  )

  const result = React.useSyncExternalStore(
    subscribeCB,
    () => isVisibleRef.current,
    getServerSnapshot,
  )

  return result
}

const getServerSnapshot = () => false
