'use client'

import { useRouter } from 'next/navigation'
import clsx from 'clsx/lite'
import { signIn } from 'next-auth/react'
import { User } from 'lucide-react'

export default function LoginButton({
  className,
  isAuthurized,
  props,
  iconClassName,
}) {
  const { push } = useRouter()

  function clickSignInButtonHandler() {
    if (isAuthurized) {
      push('/profile')
    } else {
      signIn()
    }
  }

  return (
    <button
      onClick={clickSignInButtonHandler}
      className={clsx(
        'rounded-full p-0.5',
        isAuthurized && 'border-[1.75px] border-green-600',
        className,
      )}
      {...props}
    >
      <User className={clsx('md:hover:stroke-zinc-700', iconClassName)} />
    </button>
  )
}
