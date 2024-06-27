'use client'

import * as React from 'react'
import clsx from 'clsx/lite'
import useClickOutsideElement from 'hook/useClickOutsideElement'

export default function Popup({
  className,
  open,
  onClose,
  children,
  ...props
}) {
  const { ref } = useClickOutsideElement(onClose)

  return (
    <div className={clsx('contents', className)} ref={ref} {...props}>
      {open && children}
    </div>
  )
}
