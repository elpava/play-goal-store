'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()

  const isHomePath = pathname === '/'

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
        'relative rounded-full p-0.5',
        isHomePath && 'bg-black md:hover:text-zinc-400',
        !isHomePath && 'bg-white md:hover:text-zinc-600',
        isAuthurized && 'rounded-full border-[1.75px] border-green-600',
        className,
      )}
      {...props}
    >
      <span className="absolute -inset-0.5 -z-10 animate-spin [animation-duration:18s] before:absolute before:left-0 before:top-0 before:h-4 before:w-4 before:rounded-full before:bg-green-600 before:blur-sm before:content-[''] after:absolute after:left-0 after:top-0 after:h-7 after:w-7 after:rounded-full after:bg-green-600 after:blur-sm after:content-['']"></span>
      <User className={clsx('relative', iconClassName)} />
    </button>
  )
}
