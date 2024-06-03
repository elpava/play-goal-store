'use client'

import { useRouter } from 'next/navigation'
import clsx from 'clsx/lite'

export default function Button({ className, label, href, disabled, ...props }) {
  const { push } = useRouter()

  function clickButtonHandler() {
    push(href)
  }
  // TODO define load state

  return (
    <button
      className={clsx(
        'w-full rounded-lg bg-lime-500 p-2 text-base font-semibold text-lime-950 md:text-lg',
        className,
        disabled && 'bg-zinc-300 text-zinc-400',
      )}
      onClick={href ? clickButtonHandler : undefined}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  )
}
