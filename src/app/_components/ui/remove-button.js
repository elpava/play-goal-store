'use client'

import * as React from 'react'
import clsx from 'clsx/lite'
import { useQueryClient } from '@tanstack/react-query'
import deleteOrderAction from 'action/orders/delete-order'
import { Trash2 } from 'lucide-react'

export default function RemoveButton({
  label,
  orderId,
  itemId,
  icon,
  className,
  ...props
}) {
  const queryClient = useQueryClient()

  async function removeProductFromCartHandler() {
    await deleteOrderAction(orderId, itemId)
    queryClient.invalidateQueries({ queryKey: ['cart'] })
  }

  return (
    <button
      className={clsx(
        'flex items-center space-x-2 space-x-reverse rounded-md border border-red-500 px-2 text-xs text-red-500 md:text-base',
        className,
        !icon && 'py-0.5',
      )}
      {...props}
      onClick={removeProductFromCartHandler}
    >
      {icon && <Trash2 className="w-3 text-red-500" />}
      <span>{label}</span>
    </button>
  )
}
