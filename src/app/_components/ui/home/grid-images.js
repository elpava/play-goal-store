'use client'

import * as React from 'react'
import Image from 'next/image'
import { animated, useSpring, useSprings, to } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import clsx from 'clsx/lite'
import useCheckDevice from 'hook/useCheckDevice'
import { DEVICES_LIST } from 'library/constants'
import Adidas1 from '/public/images/grid-adidas-1.jpg'
import Adidas2 from '/public/images/grid-adidas-2.jpg'
import Adidas3 from '/public/images/grid-adidas-3.jpg'
import Adidas4 from '/public/images/grid-adidas-4.jpg'
import Nike1 from '/public/images/grid-nike-1.jpg'
import Nike2 from '/public/images/grid-nike-2.jpg'
import Nike3 from '/public/images/grid-nike-3.jpg'
import Nike4 from '/public/images/grid-nike-4.jpg'

const gridImages = [
  { id: 1, image: Adidas1, alt: 'توپ' },
  { id: 2, image: Nike1, alt: 'توپ' },
  { id: 3, image: Adidas2, alt: 'توپ' },
  { id: 4, image: Nike2, alt: 'توپ' },
  { id: 5, image: Adidas3, alt: 'توپ' },
  { id: 6, image: Nike3, alt: 'توپ' },
  { id: 7, image: Adidas4, alt: 'توپ' },
  { id: 8, image: Nike4, alt: 'توپ' },
]
const ROWS = [
  [3, 6, 7, 0, 1, 2, 5, 4],
  [2, 7, 5, 1, 6, 4, 3, 0],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [4, 5, 6, 7, 0, 1, 2, 3],
  [1, 0, 3, 5, 6, 4, 7, 2],
]
const IMAGES_QUANTITY = gridImages.length
const LENGTH = ROWS.length
const HALF_LENGTH = Math.floor(LENGTH / 2) + (LENGTH % 2)
const MAX_DELAY = 200
const STEP = 80

export default function GridImages() {
  const { is: isMobileDevice } = useCheckDevice()
  const [{ x }, wrapperApi] = useSpring(() => ({
    from: { x: 0 },
  }))
  const [gridSprings, gridApi] = useSprings(LENGTH, () => ({
    from: { x: 0 },
  }))

  const handleGesture = ({ movement: [mx], xy: [xx] }) => {
    wrapperApi.start({
      to: {
        x: xx
          ? isMobileDevice
            ? (xx - window.innerWidth / 2) * 1.6
            : xx - window.innerWidth / 2
          : 0,
      },
    })

    gridApi.start(i => {
      const positionLikeACone =
        i <= LENGTH / 2 ? i % HALF_LENGTH : LENGTH - i - 1

      return {
        to: { x: mx ? (isMobileDevice ? mx : mx / 2) : 0 },
        delay: MAX_DELAY - positionLikeACone * STEP,
      }
    })
  }

  const bind = useGesture({
    onMove: state => {
      if (!isMobileDevice) handleGesture(state)
    },
    onDrag: state => {
      if (isMobileDevice) handleGesture(state)
    },
  })

  const wrapperContrastValue = x.to({
    map: Math.abs,
    range: !isMobileDevice ? [50, 500] : [50, 300],
    output: [100, 200],
    extrapolate: 'clamp',
  })
  const wrapperBrightnessValue = x.to({
    map: Math.abs,
    range: !isMobileDevice ? [50, 500] : [50, 300],
    output: [1, 0.45],
    extrapolate: 'clamp',
  })
  const textOpacityValue = x.to({
    map: Math.abs,
    range: !isMobileDevice ? [200, 300] : [80, 180],
    output: [0, 1],
    extrapolate: 'clamp',
  })

  return (
    <div
      {...bind()}
      className={clsx(
        'relative grid h-screen overflow-hidden',
        isMobileDevice && 'touch-pan-y',
      )}
      style={{ direction: 'ltr' }}
    >
      <animated.div
        className={clsx(
          'absolute grid h-[110vh] w-[450vw] -rotate-12 grid-rows-[repeat(5,1fr)] gap-4 place-self-center md:h-[200vh] md:w-[200vw]',
          'before:absolute before:z-10 before:h-full before:w-full before:place-self-center before:bg-[url("/images/noise.png")] before:content-[""]',
        )}
        style={{
          filter: to(
            [wrapperContrastValue, wrapperBrightnessValue],
            (c, b) => `contrast(${c}%) brightness(${b})`,
          ),
          willChange: 'filter',
        }}
      >
        {gridSprings.map(({ x }, idx) => (
          <animated.div
            key={idx}
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${IMAGES_QUANTITY},1fr)`,
              transform: x.to(v => `translateX(${v}px)`),
              willChange: 'transform',
            }}
          >
            {ROWS[idx].map(id => (
              <div
                key={'' + idx + id}
                className="relative overflow-hidden rounded-lg"
              >
                <Image
                  src={gridImages[id].image}
                  alt={gridImages[id].alt}
                  fill
                  sizes="(min-width: 768px) 100vw, (min-width: 640px) 50vw, (min-width: 475px) 33vw, 85vw"
                  className="object-cover"
                />
              </div>
            ))}
          </animated.div>
        ))}
      </animated.div>

      <div
        className="absolute inset-0 grid place-items-center"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, hsl(0 0% 0% / 0.9) 1%, transparent 15% 85%, hsl(0 0% 0% / 0.9) 99%)',
        }}
      >
        <animated.h1
          className="grid size-60 place-items-center border border-custom-wheat text-lg font-bold tracking-wide text-custom-wheat sm:size-96 sm:border-2 sm:text-3xl"
          style={{ opacity: textOpacityValue.to(v => v) }}
        >
          تنوع محصولات
        </animated.h1>
      </div>
    </div>
  )
}
