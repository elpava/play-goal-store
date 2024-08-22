'use client'

import * as React from 'react'
import {
  animated,
  useSpring,
  useTransition,
  useSpringRef,
  useChain,
} from '@react-spring/web'
import useVisibility from 'hook/useVisibility'
import useCheckDevice from 'hook/useCheckDevice'
import { DEVICES_LIST } from 'library/fix-values'
import { VTF_REDZONE_CLASSIC } from 'util/share-font'

export default function SvgText() {
  const { is: isMobileDevice } = useCheckDevice(DEVICES_LIST)
  const ROWS = isMobileDevice ? 3 : 6
  const COLUMNS = isMobileDevice ? 10 : 20
  const GRID = isMobileDevice ? 30 : 120
  const DIAGONAL_GRID = React.useMemo(
    () =>
      typeof isMobileDevice !== 'undefined'
        ? generateDiagonalGridCoordinates(GRID, ROWS, COLUMNS)
        : undefined,
    [COLUMNS, GRID, ROWS, isMobileDevice],
  )

  const wrapperRef = React.useRef(null)
  const isVisible = useVisibility({
    ref: wrapperRef,
    threshold: 0.8,
    once: true,
  })
  const svgSpringRef = useSpringRef()
  const frameSpringRef = useSpringRef()
  const gridSpringRef = useSpringRef()
  const [rerender, setRerender] = React.useState(true)
  const clickLockedRef = React.useRef(false)

  const svgStyle = useSpring({
    ref: svgSpringRef,
    from: { x: 0, fill: 'hsl(0 0% 0%)', stroke: 'hsl(0 0% 0%)' },
    to: [
      { x: 480, fill: 'hsl(0 0% 0%)', stroke: 'hsl(0 0% 100%)' },
      { x: 230, fill: 'hsl(0 0% 20%)', stroke: 'hsl(0 0% 100%)' },
      { x: 420, fill: 'hsl(0 0% 0%)', stroke: 'hsl(0 0% 100%)' },
      { x: 0, fill: 'hsl(0 0% 100%)', stroke: 'hsl(0 0% 0%)' },
    ],
    config: { mass: 3, friction: 35, tension: 1000 },
    onStart: () => {
      clickLockedRef.current = true
    },
  })
  const frameStyle = useSpring({
    ref: frameSpringRef,
    from: {
      width: '70%',
      aspectRatio: isMobileDevice ? '3/1' : '3.5/1',
      opacity: 0,
      borderRadius: 0,
    },
    to: {
      width: rerender ? '70%' : isMobileDevice ? '650%' : '250%',
      aspectRatio: isMobileDevice ? '3/1' : '3.5/1',
      opacity: 1,
      borderRadius: 32,
    },
    config: { mass: 3, friction: 35, tension: 800 },
    onRest: () => {
      if (rerender) {
        gridSpringRef.start()
      } else {
        clickLockedRef.current = false
      }
    },
  })
  const gridStyles = useTransition(rerender ? DIAGONAL_GRID : [], {
    ref: gridSpringRef,
    trail: 12,
    from: { x: -100, y: -100, opacity: 0, borderRadius: 6 },
    enter: [
      { x: 30, y: 30, opacity: 0.3, borderRadius: 6 },
      { x: 0, y: 0, opacity: 1, borderRadius: 0 },
      { x: 0, y: 0, opacity: 1, borderRadius: 6 },
    ],
    leave: { x: 40, y: -40, opacity: 0, borderRadius: 12 },
    pause: rerender ? true : false,
    config: { mass: 2, friction: 20, tension: 200 },
    onStart: () => {
      if (!rerender) {
        clickLockedRef.current = true
      }
    },
    onRest: () => {
      if (rerender) {
        clickLockedRef.current = false
      }
    },
  })

  useChain(
    isVisible
      ? rerender
        ? [svgSpringRef, frameSpringRef]
        : [gridSpringRef, frameSpringRef]
      : [],
  )

  return (
    <div
      ref={wrapperRef}
      className="grid h-screen place-items-center overflow-hidden bg-black"
      style={{ cursor: 'url(/shapes/cursor.svg), auto', direction: 'ltr' }}
      onClick={() => !clickLockedRef.current && setRerender(!rerender)}
    >
      <animated.div
        className="absolute grid skew-x-[35deg] overflow-hidden outline outline-2 outline-offset-4 outline-stone-100 *:bg-stone-100"
        style={{
          ...frameStyle,
          gridTemplateColumns: `repeat(${COLUMNS},1fr)`,
        }}
      >
        {gridStyles((style, item, _, idx) => (
          <animated.div
            key={idx}
            style={{
              ...style,
              gridArea: `${item[0]}/${item[1]}`,
            }}
          />
        ))}
      </animated.div>

      <svg
        width="800"
        height="110"
        viewBox="0 0 800 110"
        className="absolute z-10 mx-auto w-[85%] sm:w-auto"
      >
        <animated.text
          x="50%"
          y="50%"
          strokeWidth="2"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeDasharray="500"
          className={`text-9xl tracking-widest ${VTF_REDZONE_CLASSIC.className}`}
          style={{
            fill: svgStyle.fill,
            stroke: svgStyle.stroke,
            strokeDashoffset: svgStyle.x,
            opacity: svgStyle.opacity,
          }}
        >
          PLAY GOAL
        </animated.text>
      </svg>
    </div>
  )
}

function generateDiagonalGridCoordinates(cells = 48, row = 6, column = 8) {
  const GRID = Array.from({ length: cells }, (_, i) => i)
  const ROW_LIMIT = row
  const COLUMN_LIMIT = column
  let columnCounterInRow = 1
  let rowCounterInColumn = 1

  const dtc = [[1, 1]] // Diagonal Travesal Coordinates

  for (let i = 1; i < GRID.length; i++) {
    const [row, column] = dtc[i - 1]

    if (row !== ROW_LIMIT) {
      if (column === 1) {
        dtc.push([1, row + 1])
      } else {
        dtc.push([row + 1, column - 1])
      }
    } else {
      if (column === columnCounterInRow) {
        if (row + column > COLUMN_LIMIT) {
          dtc.push([1 + rowCounterInColumn, row + (COLUMN_LIMIT - row)])
          rowCounterInColumn++
          columnCounterInRow++
        } else {
          dtc.push([1, row + columnCounterInRow])
          columnCounterInRow++
        }
      } else {
        dtc.push([row + 1, column - 1])
      }
    }
  }

  return dtc
}
