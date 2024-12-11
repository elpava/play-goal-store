'use client'

import * as React from 'react'
import { animated, useTransition } from '@react-spring/web'
import clsx from 'clsx/lite'

export default React.forwardRef(function Popup(
  { children, className, show: isShow, onShow },
  ref,
) {
  const [show, setShow] = React.useState(false)
  const transitions = useTransition(show, {
    from: { opacity: 0, transform: 'translateX(-50%) translateY(-20px)' },
    enter: { opacity: 1, transform: 'translateX(-50%) translateY(0)' },
    leave: { opacity: 0, transform: 'translateX(-50%) translateY(-20px)' },
  })

  React.useEffect(() => {
    setShow(isShow)
  }, [isShow])

  function clickPopupHandler() {
    if (onShow) {
      setShow(prev => !prev)
      onShow()
    }
  }

  return transitions(
    (style, show) =>
      show && (
        <animated.div
          ref={ref}
          className={clsx('absolute left-1/2 top-full z-40', className)}
          style={style}
          onClick={clickPopupHandler}
        >
          {children}
        </animated.div>
      ),
  )
})
