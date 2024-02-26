'use client'

import * as React from 'react'
import clsx from 'clsx'
import { ShoppingBag, PackageCheck } from 'lucide-react'

export default function ShoppingButton({ className, addedProducts, ...props }) {
  React.useEffect(() => {
    // TODO read/write from local storage for cart
  }, [])

  return (
    <button
      className={clsx(
        'space-x-2 space-x-reverse rounded-lg p-1',
        {
          'bg-red-900': addedProducts,
          'bg-red-600': !addedProducts,
        },
        className,
      )}
      disabled={addedProducts}
      {...props}
    >
      {addedProducts ? (
        <>
          <span>افزوده</span>
          <PackageCheck className="inline-block w-4 stroke-1" />
        </>
      ) : (
        <>
          <span>افزودن</span>
          <ShoppingBag className="inline-block w-4 stroke-1" />
        </>
      )}
    </button>
  )
}
