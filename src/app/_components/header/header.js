'use client'

import * as React from 'react'
import { animated, useTransition } from '@react-spring/web'
import clsx from 'clsx/lite'
import { START_TRANSITION_DELAY, END_TRANSITION_DELAY } from 'library/constants'

export default function Header({ children, className }) {
  const [ready, setReady] = React.useState()
  const transition = useTransition(ready, {
    from: { y: -24, opacity: 0.25 },
    enter: { y: 0, opacity: 1 },
    leave: { y: -24, opacity: 0 },
  })

  React.useEffect(() => {
    let timeout

    const handleClick = e => {
      const element = e.target.closest('[data-close-animation]')

      if (element) {
        const isCloseAnimation = element?.dataset.closeAnimation === 'true'
        if (isCloseAnimation) {
          setReady(false)
        }
      }
    }

    setTimeout(
      () => {
        setReady(true)
      },
      START_TRANSITION_DELAY + END_TRANSITION_DELAY + 500,
    )

    window?.addEventListener('click', handleClick)

    return () => {
      clearTimeout(timeout)
      window?.removeEventListener('click', handleClick)
    }
  }, [])

  return transition(
    (style, show) =>
      show && (
        <animated.header className={clsx(className)} style={style}>
          {children}
        </animated.header>
      ),
  )
}
