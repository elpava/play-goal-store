import * as React from 'react'

export default function useVisibility({
  ref,
  root,
  rootMargin,
  threshold = 0.5,
  once = false,
}) {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const elRef = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          if (once && elRef) {
            observer.unobserve(elRef)
          }
        } else {
          setIsVisible(false)
        }
      },
      { root, rootMargin, threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (elRef) {
        observer.unobserve(elRef)
      }
    }
  }, [once, ref, root, rootMargin, threshold])

  return isVisible
}
