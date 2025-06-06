'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { startPageTransition, endPageTransition } from 'library/dom-helper'

export default function PageTransition({ children, href, onClick, ...props }) {
  const { push } = useRouter()
  const pathname = usePathname()

  async function clickHandler(e) {
    e.preventDefault()

    if (onClick) {
      onClick()
    }

    if (pathname === href) return

    await startPageTransition()
    push(href)
  }

  React.useEffect(() => {
    async function handleTransition() {
      await endPageTransition()
    }

    handleTransition()
  }, [pathname])

  return (
    <Link {...props} href={href} onClick={clickHandler}>
      {children}
    </Link>
  )
}
