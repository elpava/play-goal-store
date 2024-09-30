'use client'

import clsx from 'clsx/lite'

export default function Header({ children, className }) {
  return <header className={clsx(className)}>{children}</header>
}
