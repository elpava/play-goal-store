'use client'

import { usePathname } from 'next/navigation'
import clsx from 'clsx/lite'

export default function Header({ children, className }) {
  const pathname = usePathname()

  const isRootPath = pathname === '/'

  return (
    <header className={clsx(isRootPath && 'text-zinc-50', className)}>
      {children}
    </header>
  )
}
