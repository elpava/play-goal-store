'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx/lite'
import { animated, useSprings } from '@react-spring/web'
import Logo from '/public/play-goal.png'
import useScreenSize from 'hook/useScreenSize'

const menu = [
  ({ style, itemClassName }) => (
    <Link href="/">
      <animated.div style={style} className={itemClassName}>
        <Image
          src={Logo}
          alt="لوگو"
          priority
          sizes="(min-width: 768px) 100vw, (min-width: 640px) 50vw, (min-width: 475px) 33vw, 85vw"
          className="hidden w-7 min-w-7 md:block"
        />
        <span className="md:hidden">صفحه اصلی</span>
      </animated.div>
    </Link>
  ),
  ({ style, itemClassName }) => (
    <Link href="/products">
      <animated.div style={style} className={itemClassName}>
        محصولات
      </animated.div>
    </Link>
  ),
  ({ style, itemClassName }) => (
    <Link href="/cart">
      <animated.div style={style} className={itemClassName}>
        سبد خرید
      </animated.div>
    </Link>
  ),
  ({ style, itemClassName }) => (
    <Link href="/contact-us">
      <animated.div style={style} className={itemClassName}>
        تماس
      </animated.div>
    </Link>
  ),
]

export default function Menu({ className, itemClassName, isVisible }) {
  const screenSize = useScreenSize()
  const [springs, api] = useSprings(menu.length, () => ({
    from: { opacity: 0, transform: 'translateX(-25px)' },
  }))

  React.useEffect(() => {
    if (screenSize?.md) {
      api.start(idx => ({
        to: {
          opacity: 1,
          transform: 'translateX(0px)',
        },
        delay: idx * 100,
        config: { mass: 0.5, friction: 13, tension: 200 },
      }))
    } else {
      api.start(idx => ({
        to: {
          opacity: isVisible ? 1 : 0,
          transform: `translateX(${isVisible ? 0 : -25}px)`,
        },
        delay: idx * 150,
        config: { mass: 0.5, friction: 8, tension: 200 },
      }))
    }
  }, [api, isVisible, screenSize])

  return (
    <div
      className={clsx(
        'overflow-hidden whitespace-nowrap border-b border-b-rose-500 bg-[var(--bg-menu-clr,black)] text-inherit md:border-b-0',
        className,
      )}
    >
      {springs.map((style, idx) => {
        const MenuItem = menu[idx]
        return (
          <MenuItem key={idx} style={style} itemClassName={itemClassName} />
        )
      })}
    </div>
  )
}
