'use client'

import * as React from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import clsx from 'clsx/lite'

useEmblaCarousel.globalOptions = { direction: 'rtl' }

export default function ImageGallery({ slides, options }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ ...options })
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  const onThumbClick = React.useCallback(
    index => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi],
  )

  const onSelect = React.useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  React.useEffect(() => {
    if (!emblaMainApi) return

    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className="bg-zinc-100 ">
      <div className="overflow-hidden" ref={emblaMainRef}>
        <div className="flex touch-pan-y [backface-visibility:hidden]">
          {slides.map((filename, index) => (
            <div
              key={index}
              className="relative aspect-square min-w-full max-w-full sm:aspect-auto sm:h-[36.8rem]"
            >
              <Image
                src={`/images/products/${filename}`}
                alt="عکس توپ فوتبال"
                fill
                sizes="(min-width: 768px) 100vw, (min-width: 640px) 50vw, (min-width: 475px) 33vw, 25vw"
                className="object-contain"
              />
              {filename}
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden p-2" ref={emblaThumbsRef}>
        <div className="flex gap-2">
          {slides.map((filename, idx) => (
            <div
              key={idx}
              className={clsx(
                'relative aspect-square h-[6rem] cursor-pointer sm:h-[6.15rem]',
                idx === selectedIndex &&
                  'border-2 border-solid [border-image:url(/shapes/small-black-square.svg)_15_/_6px_/_0px] sm:[border-image:url(/shapes/small-black-square.svg)_15_/_10px_/_0px]',
              )}
              onClick={() => onThumbClick(idx)}
            >
              <Image
                src={`/images/products/${filename}`}
                alt="عکس توپ فوتبال"
                fill
                sizes="(min-width: 768px) 100vw, (min-width: 640px) 50vw, (min-width: 475px) 33vw, 25vw"
                className={clsx(
                  'object-cover',
                  idx === selectedIndex && 'opacity-50',
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
