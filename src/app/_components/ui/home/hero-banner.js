'use client'

import * as React from 'react'
import Image from 'next/image'
import {
  animated,
  useSpring,
  useSpringRef,
  easings,
  to,
} from '@react-spring/web'
import useWindowReady from 'hook/useWindowReady'
import SoccerField2 from '/public/images/soccer-field-2.jpg'
import { VTF_REDZONE_CLASSIC } from 'util/share-font'

const DARK_COLOR = '#3C3D37'
const LIGHT_COLOR = '#ECDFCC'

export default function HeroBanner() {
  useWindowReady()

  return (
    <div
      className="pointer-events-none grid min-h-svh grid-cols-1 grid-rows-[repeat(2,80svh)] bg-black sm:h-screen sm:grid-cols-2 sm:grid-rows-none"
      style={{ direction: 'ltr' }}
    >
      <FieldSpotlight />
      <Text />
    </div>
  )
}

function FieldSpotlight() {
  const { x } = useSpring({
    from: { x: 0 },
    to: [{ x: 100 }, { x: 0 }],
    loop: true,
    config: { duration: 9000, easing: easings.easeInOutQuad },
  })

  const spotlightRotationValue = x.to({
    range: [0, 100],
    output: [285, 225],
    extrapolate: 'clamp',
  })
  const spotlightDistanceValue = x.to({
    range: [25, 100],
    output: [65, 90],
    extrapolate: 'clamp',
  })

  return (
    <div className="relative isolate row-start-2 sm:row-start-auto">
      <animated.div
        data-shade
        className="absolute inset-0 bg-gradient-to-r from-black to-black"
        style={{
          mask: to(
            [spotlightRotationValue, spotlightDistanceValue],
            (r, d) => `
                conic-gradient(
                  from -${r}deg at 90% 90%,
                  black 52%,
                  transparent 55.5%,
                  hsl(0 0% 0% / 0.6) 58.5%,
                  transparent 61%,
                  black 63%),
                radial-gradient(ellipse at 90% 90%,
                  transparent 35%, black ${d}%)
              `,
          ),
        }}
      />
      <div
        data-spotlight-color
        className="absolute inset-0 -z-10 bg-dark-green-lightest opacity-40"
      />

      <Image
        src={SoccerField2}
        alt="زمین فوتبال"
        fill
        sizes="(min-width: 768px) 100vw, (min-width: 640px) 50vw, (min-width: 475px) 33vw, 85vw"
        className="-z-20 object-cover"
      />
    </div>
  )
}

function Text() {
  const [nextStep, setNextStep] = React.useState(false)
  const underlineRef = useSpringRef()

  const wrapperStyle = useSpring({
    from: { y: nextStep ? -15 : -300 },
    to: nextStep ? [{ y: -15 }, { y: 15 }, { y: -15 }] : { y: 0 },
    loop: nextStep ? true : false,
    config: {
      duration: nextStep ? 3500 : 4500,
      ...(nextStep && { easing: easings.easeInOutSine }),
    },
    onChange: state => {
      if (typeof state === 'object' && state.value.y === 0) {
        setNextStep(true)
        underlineRef.start()
      }
    },
  })
  const underlineStyle = useSpring({
    ref: underlineRef,
    from: { transform: 'scaleX(0)', transformOrigin: 'left' },
    to: [
      { transform: 'scaleX(1)', transformOrigin: 'right' },
      { transform: 'scaleX(0.05)', transformOrigin: 'right' },
      { transform: 'scaleX(1)', transformOrigin: 'right' },
      { transform: 'scaleX(0)', transformOrigin: 'left' },
    ],
    config: { mass: 3, friction: 30, tension: 500 },
  })

  return (
    <div className="relative row-start-1 grid place-content-center overflow-hidden sm:row-start-auto sm:overflow-visible">
      <div
        className="col-start-1 row-start-1 size-72 [--line:1px] [--size:37px] [perspective:1000px] sm:size-128 sm:[--line:0.5px] sm:[--size:51px]"
        style={{
          '--color': LIGHT_COLOR,
          background: `linear-gradient(to right, var(--color) var(--line), transparent var(--line))
          50% 0% /var(--size) var(--size),
          linear-gradient(var(--color) var(--line), transparent var(--line))
          0% 50% / var(--size) var(--size)`,
          mask: `conic-gradient(from 290deg at 40% 90%,
                transparent 4%, black 24%, transparent 35%)`,
          transform:
            'rotate3d(360, 120, -90, 60deg) rotateZ(60deg) scale(1.25)',
        }}
      />
      <animated.div
        className="relative col-start-1 row-start-1 place-self-center [perspective:1000px]"
        style={{
          ...wrapperStyle,
          ...(!nextStep && {
            transform: wrapperStyle.y.to({
              range: [-300, 0],
              output: [
                'rotate3d(360, 120, -90, 20deg) rotateZ(0deg) scale(0.75)',
                'rotate3d(360, 120, -90, 60deg) rotateZ(60deg) scale(1.65)',
              ],
            }),
            opacity: wrapperStyle.y.to({ range: [-100, 0], output: [0, 1] }),
          }),
          ...(nextStep && {
            transform:
              'rotate3d(360, 120, -90, 60deg) rotateZ(60deg) scale(1.65)',
          }),
        }}
      >
        <animated.span
          className="absolute left-4 top-7 -z-10 size-full rounded-md bg-dark-green-lightest"
          style={underlineStyle}
        />
        <h1
          className={`text-5xl font-normal tracking-[8px] sm:text-7xl sm:font-bold ${VTF_REDZONE_CLASSIC.className}`}
          style={{
            '--c1': DARK_COLOR,
            '--c2': LIGHT_COLOR,
            color: 'var(--c1)',
            textShadow: `
              0.8px 1px 0 var(--c2),
              1.6px 2px 0 var(--c2),
              2.4000000000000004px 3px 0 var(--c2),
              3.2px 4px 0 var(--c2),
              4px 5px 0 var(--c1),
              4.800000000000001px 6px 0 var(--c1),
              5.6000000000000005px 7px 0 var(--c1),
              6.4px 8px 0 var(--c1),
              7.2px 9px 0 var(--c2),
              8px 10px 0 var(--c2),
              8.8px 11px 0 var(--c2),
              9.600000000000001px 12px 0 var(--c2),
              10.4px 13px 0 var(--c1),
              11.200000000000001px 14px 0 var(--c1),
              12px 15px 0 var(--c1),
              12.8px 16px 0 var(--c1),
              13.600000000000001px 17px 0 var(--c2),
              14.4px 18px 0 var(--c2),
              15.200000000000001px 19px 0 var(--c2),
              16px 20px 0 var(--c2)
          `,
          }}
        >
          PLAY GOAL
        </h1>
      </animated.div>
    </div>
  )
}
