'use client'

import * as React from 'react'
import { animated, useSprings } from '@react-spring/web'
import useWindowReady from 'hook/useWindowReady'
import Adidas from '@/_components/ui/logo/adidas'
import Mikasa from '@/_components/ui/logo/mikasa'
import Nike from '@/_components/ui/logo/nike'
import Wilson from '@/_components/ui/logo/wilson'

const logos = [Adidas, Nike, Mikasa, Wilson]

const layers = [
  {
    Logo: logos[0],
    size: 70,
    duration: 9800,
    top: 20,
    zIndex: 1,
  },
  {
    Logo: logos[1],
    size: 70,
    duration: 7560,
    top: 25,
    zIndex: 1,
  },
  {
    Logo: logos[1],
    size: 70,
    duration: 7560,
    top: 35,
    zIndex: 1,
  },
  {
    Logo: logos[3],
    size: 70,
    duration: 8525,
    top: 50,
    zIndex: 1,
  },
  {
    Logo: logos[2],
    size: 70,
    duration: 6900,
    top: 70,
    zIndex: 1,
  },
  {
    Logo: logos[1],
    size: 70,
    duration: 8200,
    top: 90,
    zIndex: 1,
  },
  {
    Logo: logos[2],
    size: 160,
    duration: 11500,
    top: 15,
    zIndex: 2,
  },

  {
    Logo: logos[2],
    size: 160,
    duration: 13590,
    top: 45,
    zIndex: 2,
  },
  {
    Logo: logos[0],
    size: 70,
    duration: 7530,
    top: 80,
    zIndex: 2,
  },
  {
    Logo: logos[0],
    size: 180,
    duration: 21000,
    top: 30,
    zIndex: 3,
  },
  {
    Logo: logos[3],
    size: 260,
    duration: 18000,
    top: 80,
    zIndex: 3,
  },
]

export default function Brands() {
  useWindowReady()
  const wrapperRef = React.useRef(null)

  const layersStyles = useSprings(
    layers.length,
    layers.map((_, idx) => ({
      from: { x: 2 },
      to: [{ x: 90 }, { x: 2 }],
      loop: true,
      config: { duration: layers[idx].duration },
    })),
  )

  return (
    <div
      ref={wrapperRef}
      className="relative flex h-[75vh] flex-col items-center justify-evenly overflow-hidden bg-gradient-to-b from-black via-slate-800 via-60% to-slate-900 sm:flex-row"
      style={{ direction: 'ltr' }}
    >
      {logos.map((Logo, idx) => (
        <Logo key={idx} className="z-10 basis-[10%] fill-white sm:basis-1/6" />
      ))}
      <div className="absolute inset-0 size-full">
        {layersStyles.map(({ x, ...styles }, idx) => {
          const { Logo, top, size, zIndex } = layers[idx]

          return (
            <animated.div
              key={idx}
              className="absolute -translate-y-1/2 mix-blend-overlay"
              style={{
                ...styles,
                ...(idx % 2 === 0 && { left: x.to(v => `${v}%`) }),
                ...(idx % 2 === 1 && { right: x.to(v => `${v}%`) }),
                top: `${top}%`,
                width: size,
                zIndex,
                filter: x.to({
                  range: [20, 40, 60],
                  output: [`blur(${0}px)`, `blur(${2}px)`, `blur(${0}px)`],
                }),
              }}
            >
              <Logo className="size-full fill-white" />
            </animated.div>
          )
        })}
      </div>
    </div>
  )
}
