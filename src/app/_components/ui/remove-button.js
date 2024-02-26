'use client'

import * as React from 'react'
import clsx from 'clsx'
import { Trash2 } from 'lucide-react'

export default function RemoveButton({
  label,
  productId,
  icon,
  className,
  ...props
}) {
  React.useEffect(() => {
    // TODO read/write from local storage for cart
  }, [])

  function removeProductFromCartHandler() {
    console.log(productId)
  }

  return (
    <button
      className={clsx(
        'flex items-center space-x-2 space-x-reverse rounded-md border border-red-500 px-2 text-xs text-red-500 md:text-base',
        className,
        { 'py-0.5': !icon },
      )}
      {...props}
      onClick={removeProductFromCartHandler}
    >
      {icon && <Trash2 className="w-3 text-red-500" />}
      <span>{label}</span>
    </button>
  )
}
