'use client'

import { useRouter } from 'next/navigation'
import clsx from 'clsx'
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
      className={clsx('rounded-full p-0.5', className, {
        'border border-green-600': isAuthurized,
      })}
      {...props}
    >
      <User
        className={clsx('md:hover:stroke-zinc-700', iconClassName, {
          'text-green-600': isAuthurized,
        })}
      />
    </button>
  )
}
