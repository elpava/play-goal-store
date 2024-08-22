'use client'

import * as React from 'react'
import Image from 'next/image'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { animated, useSpring, config } from '@react-spring/web'
import clsx from 'clsx/lite'
import useVisibility from 'hook/useVisibility'
import useCheckDevice from 'hook/useCheckDevice'
import { DEVICES_LIST } from 'library/fix-values'
import { clamp } from 'library/helper-functions'
import AdidasTelestar1970 from '/public/images/adidas-telestar-1970.jpg'
import AdidasTrazuca2014 from '/public/images/adidas-brazuca-2014.jpg'
import AdidasAlRiha2022 from '/public/images/adidas-al-riha-2022.jpg'
import Nike2 from '/public/images/nike-2.jpg'
import { ArrowRight, ArrowDown } from 'lucide-react'

const data = [
  {
    id: 1,
    image: AdidasTelestar1970,
    alt: 'توپ',
    text: 'توپ رسمی جام جهانی 1970، آدیداس تلستار، اولین توپی بود که با طرح سیاه و سفید ساخته شد تا در تلویزیون‌های سیاه و سفید بهتر دیده شود.',
  },
  {
    id: 2,
    image: AdidasTrazuca2014,
    alt: 'توپ',
    text: 'توپ فوتبال جام جهانی 2014 به نام برازوکا، بیش از 6000 کیلومتر آزمایش شد و 30 تیم از 10 کشور مختلف در آزمایش های آن شرکت کردند.',
  },
  {
    id: 3,
    image: AdidasAlRiha2022,
    alt: 'توپ',
    text: 'توپ جام جهانی 2022 قطر اولین توپی بود که منحصراً با جوهر و چسب مبتنی بر آب ساخته شد که در پایداری توپ بسیار موثر بود.',
  },
  {
    id: 4,
    image: Nike2,
    alt: 'توپ',
  },
]
const LAST_ITEM = data.length - 1

export default function ParallaxBalls() {
  const { is: isMobileDevice } = useCheckDevice(DEVICES_LIST)
  const wrapperRef = React.useRef()
  const parallaxRef = React.useRef()
  const isVisible = useVisibility({ ref: wrapperRef, threshold: 0.7 })
  const [currentPage, setCurrentPage] = React.useState(null)
  const [wavyArrowStyle, wavyArrowApi] = useSpring(() => ({ length: 0 }))

  React.useEffect(() => {
    let clientXStart = 0
    const parallax = parallaxRef.current
    let { container } = parallax
    container = container.current

    const handleTouchstart = e => {
      const { clientX } = e.touches[0]
      clientXStart = clientX
    }

    const handleScroll = e => {
      const { type } = e
      let { scrollY } = window
      const { scrollLeft, offsetWidth, scrollWidth } = container
      scrollY = Math.round(scrollY)

      switch (type) {
        case 'wheel':
          if (isVisible && !isMobileDevice) {
            container.scrollLeft += e.deltaY * 0.5

            if (e.deltaY > 0) {
              if (scrollLeft + offsetWidth >= scrollWidth - 20) {
                document.body.style.overflow = ''
              }
            }
            if (e.deltaY < 0) {
              if (scrollLeft <= 20) {
                document.body.style.overflow = ''
              }
            }
          }
          break
        case 'touchmove':
          if (e.touches[0].clientX < clientXStart) {
            if (scrollLeft + offsetWidth >= scrollWidth) {
              document.body.style.overflow = ''
            }
          }
          if (e.touches[0].clientX > clientXStart) {
            if (scrollLeft <= 0) {
              document.body.style.overflow = ''
            }
          }
          break
        default:
          break
      }

      if (scrollY <= 20) {
        container.scrollLeft = 0
      }

      const parallaxCurrentPage = Math.round(parallax.current / parallax.space)
      if (currentPage !== parallaxCurrentPage) {
        setCurrentPage(parallaxCurrentPage)
      }

      wavyArrowApi.start({ length: Math.min(parallax.current, 550) })
    }

    if (parallaxRef.current && !currentPage) setCurrentPage([0])

    window.addEventListener('wheel', handleScroll, { passive: false })
    window.addEventListener('touchstart', handleTouchstart, { passive: true })
    window.addEventListener('touchmove', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchstart', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
    }
  }, [currentPage, isMobileDevice, isVisible, wavyArrowApi])

  React.useEffect(() => {
    let timeout

    if (isVisible) {
      document.body.style.overflow = 'hidden'
      timeout = setTimeout(() => {
        wrapperRef.current.scrollIntoView({ behavior: 'instant' })
      }, 100)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isVisible])

  return (
    <div
      ref={wrapperRef}
      className="h-screen bg-black"
      style={{ direction: 'ltr' }}
    >
      <Parallax
        ref={parallaxRef}
        className={clsx(
          'no-scrollbar',
          isMobileDevice && !isVisible && '!overflow-hidden',
        )}
        pages={data.length}
        horizontal
      >
        <ParallaxLayer sticky={{ start: 0, end: LAST_ITEM - 1 }}>
          <ArrowRight className="absolute left-6 top-6 z-20 stroke-dark-green-lightest" />
        </ParallaxLayer>

        <ParallaxLayer offset={0.99} speed={0.65} className="z-10 sm:z-0">
          <div className="absolute bottom-24 left-14">
            <animated.svg
              width={wavyArrowStyle.length.to(v => v)}
              height="100"
              viewBox={wavyArrowStyle.length.to(v => `0 0 ${v} 100`)}
              className="ml-24 mt-4 scale-[0.35] sm:ml-6 md:ml-24 md:scale-50 lg:scale-90 xl:scale-100"
            >
              <WavyArrow />
            </animated.svg>
          </div>
        </ParallaxLayer>

        {data.map(({ id, image, alt, text }, idx) => (
          <React.Fragment key={id}>
            <ParallaxLayer
              offset={idx === LAST_ITEM ? idx + 1 - 0.33 : idx}
              speed={idx === 0 || idx === LAST_ITEM ? 0.85 : 3}
            >
              <div
                data-below-rectangle
                className={clsx(
                  'h-full w-[75%] bg-custom-orange',
                  (idx === 0 || idx === LAST_ITEM) && '!bg-transparent',
                )}
                style={{
                  clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0% 100%)',
                }}
              />
            </ParallaxLayer>

            <ParallaxLayer offset={idx} speed={0.5}>
              <div
                className={clsx(
                  'position-center h-[60%] w-[90%] sm:h-[60%] sm:w-[70%]',
                  idx === LAST_ITEM && 'w-[80%]',
                )}
              >
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 100vw, (min-width: 640px) 50vw, (min-width: 475px) 33vw, 25vw"
                  className="rounded-md object-cover"
                />

                {idx !== 0 && (
                  <>
                    <animated.svg
                      width="100%"
                      height="4"
                      className="absolute -left-4 -top-4 stroke-custom-wheat"
                    >
                      <AnimationLayer
                        element="line"
                        x1={10}
                        y1={0}
                        y2={0}
                        strokeWidth="8"
                        strokeLinecap="round"
                        initialSpring={{ from: { x2: 1 } }}
                        startSpring={{
                          to: { x2: 100 },
                          delay: isMobileDevice ? 0 : 350,
                          config: config.molasses,
                        }}
                        onApplySpring={styles => ({
                          x2: styles.x2.to(v => `${v}%`),
                        })}
                        index={idx}
                        currentIndex={currentPage}
                      />
                    </animated.svg>
                    <animated.svg
                      width="4"
                      height="100%"
                      className="absolute -left-4 -top-4 stroke-custom-wheat"
                    >
                      <AnimationLayer
                        element="line"
                        x1={0}
                        y1={10}
                        x2={0}
                        strokeWidth="8"
                        strokeLinecap="round"
                        initialSpring={{ from: { y2: 1 } }}
                        startSpring={{
                          to: { y2: 100 },
                          delay: isMobileDevice ? 0 : 750,
                          config: config.molasses,
                        }}
                        onApplySpring={styles => ({
                          y2: styles.y2.to(v => `${v}%`),
                        })}
                        index={idx}
                        currentIndex={currentPage}
                      />
                    </animated.svg>
                  </>
                )}
              </div>
            </ParallaxLayer>

            <ParallaxLayer offset={clamp(idx + 0.55, 0, LAST_ITEM)} speed={1}>
              <div
                data-over-rectangle
                className={clsx(
                  'position-center h-full w-[60%] bg-custom-wheat',
                  idx === LAST_ITEM && '!bg-transparent',
                )}
                style={{
                  clipPath: 'polygon(25% 0, 100% 0, 75% 100%, 0% 100%)',
                }}
              />
              {text && (
                <h2
                  className={clsx(
                    'position-center w-40 text-sm italic sm:w-64 sm:!text-[1.25rem] sm:leading-[1.75] lg:w-80',
                    idx % 2 === 0 && '-mt-8 ',
                    idx % 2 === 1 && 'mt-10 ',
                    idx === LAST_ITEM &&
                      '!mt-72 text-nowrap !text-base font-bold',
                  )}
                  style={{ direction: 'rtl' }}
                >
                  <AnimationLayer
                    element="span"
                    className={clsx(
                      'bg-gradient-to-r from-dark-green-dark to-dark-green bg-clip-text bg-no-repeat text-black/30',
                      'after:absolute after:-bottom-4 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-lg after:transition-transform after:delay-0 after:content-[""]',
                      idx !== LAST_ITEM && 'after:bg-dark-green-dark',
                      idx === LAST_ITEM && 'after:bg-custom-wheat',
                    )}
                    activeClassName="after:origin-right after:scale-x-100 after:delay-500 after:duration-700 after:ease-in"
                    initialSpring={{ from: { backgroundSize: 0 } }}
                    startSpring={{
                      to: { backgroundSize: 100 },
                      config: { friction: 50, tension: 90 },
                    }}
                    onApplySpring={styles => ({
                      style: {
                        backgroundSize: styles.backgroundSize.to(v => `${v}%`),
                      },
                    })}
                    visibilityThreshold={0.85}
                    useIsVisible
                  >
                    {text}
                  </AnimationLayer>
                </h2>
              )}

              {idx === LAST_ITEM && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <ArrowDown className="stroke-dark-green-lightest" />
                </div>
              )}
            </ParallaxLayer>
          </React.Fragment>
        ))}
      </Parallax>
    </div>
  )
}

function WavyArrow() {
  return (
    <>
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
          markerUnits="strokeWidth"
        >
          <path
            d="M 0 0 L 10 5 L 0 10 z"
            className="fill-custom-orange-light"
          />
        </marker>
      </defs>
      <path
        d="M 0 50 Q 50 0, 100 50 T 200 50 T 300 50 T 400 50 T 500 50 l 12 0"
        strokeWidth="4"
        strokeDasharray="600"
        markerEnd="url(#arrow)"
        className="fill-none stroke-custom-orange-light"
      />
    </>
  )
}

function AnimationLayer({
  children,
  className,
  element = 'div',
  activeClassName,
  initialSpring,
  startSpring,
  visibilityThreshold,
  useIsVisible = false,
  index,
  currentIndex,
  onApplySpring,
  ...props
}) {
  const DynamicAnimatedElement = animated[element]
  const layerRef = React.useRef(null)
  const isVisible = useVisibility({
    ref: layerRef,
    threshold: visibilityThreshold,
  })

  const [style, api] = useSpring(() => ({
    ...initialSpring,
    reset: !isVisible,
  }))

  if (useIsVisible) {
    if (isVisible) api.start({ ...startSpring })
    else api.start({ ...initialSpring })
  } else {
    if (index === currentIndex) api.start({ ...startSpring })
    else api.start({ ...initialSpring })
  }

  return (
    <DynamicAnimatedElement
      ref={layerRef}
      className={clsx(className, isVisible && activeClassName)}
      {...props}
      {...onApplySpring(style)}
    >
      {children}
    </DynamicAnimatedElement>
  )
}
