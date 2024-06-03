'use client'

import * as React from 'react'
import useWindowReady from 'hook/useWindowReady'
import { ArrowUp } from 'lucide-react'
import { backToTop } from 'library/helper-functions'

export default function BackToTop() {
  const { isWindowReady } = useWindowReady()
  const [isVisible, setIsVisible] = React.useState(null)

  React.useEffect(() => {
    function toggleVisibility() {
      window.scrollY > 100 ? setIsVisible(true) : setIsVisible(false)
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  if (!isWindowReady || !isVisible) return null

  function clickButtonHandler() {
    backToTop()
  }

  return (
    <button
      className="fixed bottom-6 right-6 z-50 rounded-lg bg-zinc-900 p-1.5 text-zinc-50 md:bottom-12 md:right-12 md:p-2"
      onClick={clickButtonHandler}
    >
      {<ArrowUp className="md:size-8" />}
    </button>
  )
}
