'use client'

import * as React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Check } from 'lucide-react'

export default function ProductSizeSelection({ sizesData, ...props }) {
  const queryClient = useQueryClient()
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const activeSizeIdCache = queryClient.getQueryData(['active-size-id'])
  const isUndefinedCache = activeSizeIdCache === undefined
  if (isUndefinedCache) {
    queryClient.setQueryData(['active-size-id'], sizesData[0].sizeId)
  }

  React.useEffect(() => {
    queryClient.setQueryData(['active-size-id'], sizesData[0].sizeId)
  }, [queryClient, sizesData])

  function clickSizeHandler(sizeId, idx) {
    setSelectedIndex(idx)
    queryClient.setQueryData(['active-size-id'], sizeId)
  }

  return (
    <ul
      className="mr-6 mt-2 flex justify-center gap-2 xs:justify-start"
      {...props}
    >
      {sizesData.map(({ sizeId, size }, idx) => (
        <li
          key={sizeId}
          className="relative cursor-pointer rounded-md border border-zinc-500 bg-zinc-700 px-8 py-1.5 text-xl"
          onClick={() => clickSizeHandler(sizeId, idx)}
        >
          {size}
          {selectedIndex === idx && (
            <div className="absolute left-0 top-0 z-[1] grid h-full w-full place-items-center bg-zinc-500/50">
              <Check className="align-middle" />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
