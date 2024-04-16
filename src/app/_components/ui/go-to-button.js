'use client'

import { useRouter } from 'next/navigation'
import clsx from 'clsx'

export default function GoToButton({
  className,
  label,
  href,
  disabled,
  ...props
}) {
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
        { 'bg-zinc-300 text-zinc-400': disabled },
      )}
      onClick={href ? clickButtonHandler : undefined}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  )
}
