'use client'

import * as React from 'react'
import clsx from 'clsx'
import { Plus, Minus } from 'lucide-react'

export default function ChangeQuantityProduct({
  className,
  initialQuantity,
  maxQuantity,
  ...props
}) {
  const [quantity, setQuantity] = React.useState(initialQuantity || 1)

  const isMinimumQty = quantity < 2
  const isMaximumQty = quantity === maxQuantity

  React.useEffect(() => {
    // TODO read/write from local storage for cart
  }, [])

  function clickIncreaseButton() {
    setQuantity(prevState => prevState + 1)
  }

  function clickDecreaseButton() {
    setQuantity(prevState => prevState - 1)
  }

  return (
    <div className={clsx('flex gap-1.5', className)} {...props}>
      <button
        onClick={clickIncreaseButton}
        className={clsx({ 'text-zinc-500': isMaximumQty })}
        disabled={isMaximumQty}
      >
        <Plus className="w-3 md:w-5" />
      </button>

      <div className="inline-block w-7 select-none rounded-md border border-zinc-900 text-center font-bold shadow-inner shadow-zinc-500 md:text-lg">
        {quantity}
      </div>

      <button
        onClick={clickDecreaseButton}
        className={clsx({ 'text-zinc-500': isMinimumQty })}
        disabled={isMinimumQty}
      >
        <Minus className="w-3 md:w-5" />
      </button>
    </div>
  )
}
