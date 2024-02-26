'use client'

import * as React from 'react'
import useClickOutsideElement from 'hook/useClickOutsideElement'

export default function Popup({ open, onClose, children }) {
  const { ref } = useClickOutsideElement(onClose)

  return <div ref={ref}>{open && children}</div>
}
