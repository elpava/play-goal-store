'use client'

import * as React from 'react'
import {
  animated,
  useSpring,
  useSpringRef,
  useChain,
  easings,
} from '@react-spring/web'
import clsx from 'clsx'
import useVisibility from 'hook/useVisibility'

export default function DividerText() {
  const wrapperRef = React.useRef(null)
  const isVisible = useVisibility({
    ref: wrapperRef,
    threshold: 1,
    once: false,
  })
  const rightSpringRef = useSpringRef()
  const leftSpringRef = useSpringRef()

  const rightStyle = useSpring({
    ref: rightSpringRef,
    from: { x: 200 },
    to: { x: -101 },
    config: { duration: 3000, easing: easings.easeInOutExpo },
    reset: isVisible,
  })
  const leftStyle = useSpring({
    ref: leftSpringRef,
    from: { y: -100 },
    to: { y: 200 },
    config: { duration: 3000, easing: easings.easeInOutExpo },
    reset: isVisible,
  })

  useChain(isVisible ? [leftSpringRef, rightSpringRef] : [], [0, 1], 1100)

  return (
    <div
      ref={wrapperRef}
      className="border-y-[0.5px] border-y-[currentColor] text-sm text-custom-wheat sm:text-base"
    >
      <div className="mx-auto h-60 max-w-128 flex-center">
        <div className="flex h-full flex-wrap items-center border-x-[0.5px] border-x-[currentColor]">
          <animated.div
            className="basis-4/5 bg-gradient-to-tr from-custom-wheat to-custom-wheat bg-no-repeat pl-8 pr-4 text-justify"
            style={{
              backgroundSize: '200% 100%',
              backgroundPositionX: rightStyle.x.to(v => `${v}%`),
            }}
          >
            مجموعه ما با سال‌ها تجربه در عرضه انواع برندهای توپ فوتبال سرتاسر
            دنیا، ارائه‌دهنده محصولات متنوع با کیفیت بالا برای بازیکنان حرفه‌ای
            و آماتور است. ارائه توپ‌های مقاوم و با عملکرد عالی و دارای
            تکنولوژی‌های پیشرفته از اهداف مجموعه جهت دسترسی تیم‌ها و بازیکنان به
            توپ‌های روز دنیا می‌باشد.
          </animated.div>
          <animated.div
            className={clsx(
              'relative basis-1/5 self-stretch border-r-[0.5px] border-r-[currentColor] text-center flex-center',
              "before:absolute before:-right-4 before:h-full before:w-[0.25px] before:bg-[currentColor] before:content-['']",
              'bg-gradient-to-b from-custom-wheat to-custom-wheat bg-no-repeat',
            )}
            style={{
              backgroundSize: '100% 200%',
              backgroundPositionY: leftStyle.y.to(v => `${v}%`),
            }}
          >
            <div className="-rotate-90 text-xl md:text-base">پلی گل</div>
          </animated.div>
        </div>
      </div>
    </div>
  )
}
