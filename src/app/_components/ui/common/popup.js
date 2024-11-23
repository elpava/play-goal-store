'use client'

import * as React from 'react'
import { animated, useTransition } from '@react-spring/web'
import clsx from 'clsx/lite'

export default function Popup({ children, className, show: isShow, onShow }) {
  const [show, setShow] = React.useState(false)
  const transitions = useTransition(show, {
    from: { opacity: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
  })

  React.useEffect(() => {
    setShow(isShow)
  }, [isShow])

  function clickPopupHandler() {
    setShow(prev => !prev)
    onShow()
  }

  return transitions(
    (style, show) =>
      show && (
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
