'use client'

import * as React from 'react'
import Image from 'next/image'
import { useQueryClient } from '@tanstack/react-query'
import { Check } from 'lucide-react'

export default function ProductColorSelection({ colorsData, ...props }) {
  const queryClient = useQueryClient()
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const activeColorIdCache = queryClient.getQueryData(['active-color-id'])
  const isUndefinedCache = activeColorIdCache === undefined
  if (isUndefinedCache) {
    queryClient.setQueryData(['active-color-id'], colorsData[0].colorId)
  }

  React.useEffect(() => {
    queryClient.setQueryData(['active-color-id'], colorsData[0].colorId)
  }, [queryClient, colorsData])

  function clickThumbnailHandler(colorId, idx) {
    setSelectedIndex(idx)
    queryClient.setQueryData(['active-color-id'], colorId)
  }

  return (
    <div className="mr-6 mt-2 flex flex-col space-y-2 sm:relative" {...props}>
      <ul className="flex gap-4">
        {colorsData.map(({ colorId, filename }, idx) => (
          <li key={colorId} className="flex items-center gap-4">
            <div
              className="relative size-10 shrink-0 cursor-pointer"
              onClick={() => clickThumbnailHandler(colorId, idx)}
            >
              <Image
                src={`/images/sample images/${filename}`}
                alt="تصویر بند انگشتی محصول"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              {selectedIndex === idx && (
                <div className="absolute left-0 top-0 z-[1] grid h-full w-full  place-items-center bg-zinc-500/50">
                  <Check className="align-middle" />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="sm:absolute sm:left-0 sm:right-0 sm:top-full sm:w-112">
        <h4 className="border-b border-b-transparent text-sm transition-[border] sm:text-base">
          {colorsData[selectedIndex].title}
        </h4>
      </div>
    </div>
  )
}
