'use client'

import * as React from 'react'
import Link from 'next/link'
import clsx from 'clsx/lite'
import useIntersectionObserver from 'hook/useIntersectionObserver'
import { VTF_REDZONE_CLASSIC } from 'util/share-font'

export default function ProductsTabelContent({ brandsAnchors }) {
  const { observe, entries } = useIntersectionObserver()
  const currentHashRef = React.useRef(null)
  if (entries.length > 0) {
    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting && target.id !== currentHashRef.current) {
        currentHashRef.current = '#' + target.id
      }
    })
  }

  React.useEffect(() => {
    const brandEls = document.querySelectorAll('[id^=brand]')
    brandEls.forEach(el => {
      observe(el)
    })
  }, [observe])

  return (
    <nav
      className={`text-1xl fixed left-0 ml-4 flex h-svh flex-col items-center justify-center space-y-2 md:z-40 md:text-6xl ${VTF_REDZONE_CLASSIC.className}`}
    >
      {brandsAnchors.map(({ name, href }) => (
        <React.Fragment key={name}>
          <Link
            href={`/products${href}`}
            className={clsx(
              'border-b-2 border-transparent transition-[border] hover:border-b-2 hover:border-lime-400 md:pb-1',
              currentHashRef.current === href && '!border-lime-400',
            )}
          >
            {name.toUpperCase()}
          </Link>

          <span
            className={clsx(
              'h-10 w-0.5 rounded-md bg-zinc-700 md:h-16',
              currentHashRef.current === href &&
                'animate-scroll bg-gradient-to-b from-lime-400 to-lime-400 bg-[length:100%_5%] bg-no-repeat transition-[background-size]',
            )}
          />
        </React.Fragment>
      ))}
    </nav>
  )
}
