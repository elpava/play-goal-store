import * as React from 'react'

export default function useIntersectionObserver({
  root,
  rootMargin,
  threshold,
} = {}) {
  const [entries, setEntries] = React.useState([])
  const observerRef = React.useRef(null)

  React.useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      ioEntries => {
        setEntries(ioEntries)
      },
      {
        root,
        rootMargin,
        threshold,
      },
    )

    return () => observerRef.current.disconnect()
  }, [root, rootMargin, threshold])

  function observe(element) {
    if (element) observerRef.current.observe(element)
  }

  function unobserve(element) {
    if (element) observerRef.current.unobserve(element)
  }

  return { observe, unobserve, entries }
}
