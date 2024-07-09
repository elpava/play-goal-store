'use client'

import * as React from 'react'
import { animated, useTransition } from '@react-spring/web'
import clsx from 'clsx/lite'

export default function Popup({ children, className, toggle, onToggle }) {
  const [isToggle, setIsToggle] = React.useState(false)
  const transitions = useTransition(isToggle, {
    from: { opacity: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
  })

  React.useEffect(() => {
    setIsToggle(toggle)
  }, [toggle])

  function clickPopupHandler() {
    setIsToggle(prev => !prev)
    onToggle()
  }

  return transitions(
    (style, isToggle) =>
      isToggle && (
        <animated.div
          className={clsx('absolute left-0 top-0 z-40 h-svh w-full', className)}
          style={style}
          onClick={clickPopupHandler}
        >
          {children}
        </animated.div>
      ),
  )
}
