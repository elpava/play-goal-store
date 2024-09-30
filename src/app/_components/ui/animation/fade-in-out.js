'use client'

import * as React from 'react'
import { animated, useTransition, easings } from '@react-spring/web'
import clsx from 'clsx/lite'

export default function FadeInOut({ children, className }) {
  const transition = useTransition(children, {
    from: { x: 25, opacity: 0, scale: 1 },
    enter: { x: 0, opacity: 1, scale: 1 },
    leave: { x: 0, opacity: 0, scale: 0.9 },
    exitBeforeEnter: true,
    config: { easing: easings.easeInBack },
  })

  return transition(
    (style, item) =>
      item && (
        <animated.div style={style} className={clsx('h-full', className)}>
          {item}
        </animated.div>
      ),
  )
}
