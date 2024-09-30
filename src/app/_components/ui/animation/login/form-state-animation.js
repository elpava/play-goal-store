'use client'

import * as React from 'react'
import { useIsMutating, useMutationState } from '@tanstack/react-query'
import { animated, useSprings, useSpringRef } from '@react-spring/web'
import clsx from 'clsx/lite'

const MUTATION_KEY = ['pending-form']
const SQUARES = Array.from({ length: 2 }, (_, i) => i)

export default function FormStateAnimation({ className }) {
  const isMutating = useIsMutating({ mutationKey: MUTATION_KEY })
  const data = useMutationState({
    filters: { exact: MUTATION_KEY },
    select: mutation => mutation.state.data,
  })
  const lastItem = data.at(-1)
  const error = lastItem?.error

  const squareRef = useSpringRef()
  const squareStyles = useSprings(
    SQUARES.length,
    SQUARES.map(id => ({
      ref: squareRef,
      from: {
        x: id === 0 ? '0%' : '-100%',
        y: id === 0 ? '0%' : '0%',
        borderRadius: '0%',
      },
      to: [
        { x: id === 0 ? '-100%' : '0%' },
        { y: id === 0 ? '100%' : '-100%' },
        { x: id === 0 ? '0%' : '-100%' },
        { y: id === 0 ? '0%' : '0%' },
      ],
      loop: true,
      config: { duration: 1000 },
    })),
  )

  React.useEffect(() => {
    if (isMutating) {
      squareRef.start()
    } else {
      squareRef.start(id => ({
        to: [
          { borderRadius: error === null ? '100%' : '0%' },
          { x: id === 0 ? '-100%' : '0%' },
          { y: id === 0 ? '100%' : '-100%' },
          { x: id === 0 ? '0%' : '-100%' },
          { y: id === 0 ? '0%' : '0%' },
        ],
      }))
    }
  }, [error, isMutating, squareRef])

  return (
    <div className={clsx('flex size-44 flex-col', className)}>
      {squareStyles.map((style, idx) => (
        <animated.div
          key={idx}
          className={clsx(
            'h-1/2 w-1/2 backdrop-blur-sm',
            error === null && '!bg-green-400/30',
            idx === 0 && 'bg-custom-orange-light/30',
            idx === 1 && 'bg-custom-orange/30',
          )}
          style={style}
        />
      ))}
    </div>
  )
}
