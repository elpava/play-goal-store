'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { animated, useSprings, easings } from '@react-spring/web'
import clsx from 'clsx/lite'
import useIntersectionObserver from 'hook/useIntersectionObserver'
import { VTF_REDZONE_CLASSIC } from 'util/share-font'

export default function ProductsTabelContent({ brandsAnchors }) {
  const router = useRouter()
  const { entries, observe } = useIntersectionObserver()
  const [active, setActive] = React.useState(0)
  const isScrollingRef = React.useRef(false)
  const brandsAnchorsLength = brandsAnchors.length - 1
  const [barStyles, barApi] = useSprings(brandsAnchors.length, () => ({
    from: { x: 0 },
  }))

  const linkClickHandler = React.useCallback(
    (hash, e) => {
      if (e) e.preventDefault()
      const { pathname, search } = window.location
      router.replace(`${pathname}${search}#${hash}`, {
        scroll: e ? true : false,
      })

      isScrollingRef.current = false
    },
    [router],
  )

  React.useEffect(() => {
    const brandEls = document?.querySelectorAll('[id^=brand]')
    brandEls.forEach(el => {
      observe(el)
    })

    function handleScroll() {
      isScrollingRef.current = true
    }

    if (entries.length > 0) {
      entries.forEach(({ isIntersecting, target }) => {
        const idx = +target.dataset.index
        if (isIntersecting && active !== idx) {
          if (isScrollingRef.current) linkClickHandler(target.id)
          setActive(idx)
        }
      })
    }

    window.addEventListener('wheel', handleScroll)
    window.addEventListener('touchmove', handleScroll)

    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
    }
  }, [active, entries, linkClickHandler, observe])

  React.useEffect(() => {
    barApi.start(idx => ({
      to: active === idx ? [{ x: 100 }, { x: 5 }] : { x: 30 },
      loop: true,
      config: { duration: 1300, easing: easings.easeInOutSine },
    }))
  }, [active, barApi])

  return (
    <nav
      className={`text-1xl fixed left-0 ml-4 h-svh flex-col space-y-2 flex-center md:z-40 md:ml-6 md:text-5xl ${VTF_REDZONE_CLASSIC.className} select-none`}
    >
      {barStyles.map(({ x }, idx) => (
        <React.Fragment key={idx}>
          <Link
            href={{ hash: brandsAnchors[idx].hash }}
            className={clsx(
              'border-b-2 border-transparent transition-transform md:hover:scale-105',
              active === idx && 'scale-100 font-bold',
              active !== idx && 'scale-90 text-zinc-400',
            )}
            onClick={e => linkClickHandler(brandsAnchors[idx].hash, e)}
          >
            {brandsAnchors[idx].name.toUpperCase(brandsAnchors[idx].hash)}
          </Link>

          {idx !== brandsAnchorsLength && (
            <animated.div
              className={clsx(
                'h-10 w-0.5 rounded-md bg-zinc-700 md:h-16',
                active === idx &&
                  'bg-gradient-to-b from-lime-400 to-lime-400 bg-no-repeat',
              )}
              style={{
                ...(x && { backgroundSize: x.to(v => `100% ${v}%`) }),
              }}
            />
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
