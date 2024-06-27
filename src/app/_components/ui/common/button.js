'use client'

import clsx from 'clsx/lite'

export default function Button({
  className,
  label,
  disabled,
  onClick,
  ...props
}) {
  return (
    <button
      className={clsx(
        'w-full rounded-lg bg-lime-500 p-2 font-semibold text-lime-950 transition-colors hover:bg-lime-600 md:text-lg',
        className,
        disabled && 'bg-zinc-300 text-zinc-400',
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  )
}
