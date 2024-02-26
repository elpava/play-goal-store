'use client'

import * as React from 'react'
import Link from 'next/link'
import { VTF_REDZONE_CLASSIC } from 'util/share-font'
import { useParams } from 'next/navigation'
import clsx from 'clsx'

export default function ProductsTabelContent({ brandsAnchors }) {
  const params = useParams()
  const [currentHash, setCurrentHash] = React.useState('')

  React.useEffect(() => {
    const { hash } = window.location
    if (currentHash !== hash) {
      setCurrentHash(hash)
    }
  }, [currentHash, params])

  return (
    <nav
      className={`text-1xl fixed left-0 ml-4 flex h-svh flex-col items-center justify-center space-y-2 md:z-40 md:text-6xl ${VTF_REDZONE_CLASSIC.className}`}
    >
      {brandsAnchors.map(({ name, href }, idx) => (
        <React.Fragment key={name}>
          <Link
            href={`/products${href}`}
            className={clsx(
              'border-b-2 border-transparent transition-[border] hover:border-b-2 hover:border-lime-400',
              { 'border-lime-400': currentHash === href },
            )}
          >
            {name.toUpperCase()}
          </Link>

          {idx !== brandsAnchors.length - 1 && (
            <span
              className={`h-20 w-0.5 rounded-md bg-zinc-700 bg-gradient-to-b from-zinc-200 to-zinc-200 bg-[length:100%_80%] bg-no-repeat transition-[background-size]`}
            />
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
