'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import clsx from 'clsx'
import useLogout from 'hook/useLogout'
import { startPageTransition, endPageTransition } from 'library/dom-helper'
import { ArrowRight, LogOut } from 'lucide-react'

const floatMenu = [
  { title: 'مشخصات', href: '/' },
  { title: 'سفارشات', href: '/orders' },
  { title: 'ویرایش', href: '/edit' },
]

export default function FloatMenu({ className }) {
  const { back } = useRouter()
  const pathname = usePathname()
  const { logout } = useLogout()
  const isInvoicePath = /.*\/orders\/.*/.test(pathname)

  async function backButtonHandler() {
    await startPageTransition()
    back()
    await endPageTransition()
  }

  async function signOutButtonHandler() {
    await startPageTransition()
    logout()
    await endPageTransition()
  }

  return (
    <div
      className={clsx(
        'fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md bg-zinc-500 p-1 text-sm',
        className,
      )}
    >
      <ul className="flex items-center rounded-md bg-zinc-700 p-1.5">
        <li
          onClick={backButtonHandler}
          className={clsx('hidden', isInvoicePath && '!block cursor-pointer')}
        >
          <ArrowRight className="text-lime-500" />
        </li>
        {floatMenu.map(({ title, href }) => (
          <li key={title} className="px-1">
            <Link
              href={`/profile${href}`}
              className={clsx(
                'inline-block text-nowrap rounded-md border border-zinc-600 px-1.5 py-1 text-zinc-400 transition',
                {
                  '!border-lime-500 bg-zinc-800 !text-lime-500':
                    (pathname.endsWith('profile') && href === '/') ||
                    pathname.endsWith(href) ||
                    pathname.includes(`${href}/`),
                },
              )}
            >
              {title}
            </Link>
          </li>
        ))}
        <li className="mx-2 h-full w-[1px] select-none bg-zinc-600">&nbsp;</li>
        <li className="cursor-pointer" onClick={signOutButtonHandler}>
          <LogOut className="text-red-500" />
        </li>
      </ul>
    </div>
  )
}
