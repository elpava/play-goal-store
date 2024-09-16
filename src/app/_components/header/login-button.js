'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import clsx from 'clsx/lite'
import { signIn } from 'next-auth/react'
import { User } from 'lucide-react'

export default function LoginButton({ className, isAuthurized, props }) {
  const { push } = useRouter()
  const pathname = usePathname()

  const isHomePath = pathname === '/'
  const isProductsPath = pathname.startsWith('/products')
  const isDark = isHomePath || isProductsPath

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
        !isDark && 'bg-white md:hover:text-zinc-600',
        isHomePath && 'bg-black md:hover:text-zinc-400',
        isProductsPath && 'bg-zinc-700',
        isAuthurized && 'rounded-full border-green-600',
        isAuthurized && isProductsPath && 'border',
        isAuthurized && !isProductsPath && 'border-[1.75px]',
        className,
      )}
      {...props}
    >
      {isAuthurized && (
        <span
          className={clsx(
            'absolute -inset-0.5 -z-10 animate-spin [animation-duration:18s]',
            "before:absolute before:left-0 before:top-0 before:rounded-full before:bg-green-600 before:blur-sm before:content-['']",
            "after:absolute after:left-0 after:top-0 after:rounded-full after:bg-green-600 after:blur-sm after:content-['']",
            isProductsPath && 'before:h-2 before:w-2 after:h-5 after:w-5',
            !isProductsPath && 'before:h-4 before:w-4 after:h-7 after:w-7',
          )}
        />
      )}
      <User
        className={clsx(
          'relative',
          isProductsPath && 'h-5 w-5 stroke-1 md:h-6 md:w-6',
        )}
      />
    </button>
  )
}
