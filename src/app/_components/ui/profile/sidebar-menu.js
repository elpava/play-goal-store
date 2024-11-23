'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import useLogout from 'hook/useLogout'
import { startPageTransition, endPageTransition } from 'library/dom-helper'
import { LogOut } from 'lucide-react'

const sidebarMenu = [
  { title: 'مشخصات', href: '/' },
  { title: 'سفارشات', href: '/orders' },
  { title: 'ویرایش', href: '/edit' },
]

export default function SidebarMenu({ className }) {
  const pathname = usePathname()
  const { logout } = useLogout()

  async function signOutButtonHandler() {
    await startPageTransition()
    logout()
    await endPageTransition()
  }

  return (
    <aside className={clsx('sticky top-10 ml-8 py-2', className)}>
      <ul className="space-y-4">
        {sidebarMenu.map(({ title, href }) => (
          <li
            key={title}
            className={clsx('w-max rounded-md px-1.5 py-1', {
              'bg-lime-500':
                (pathname.endsWith('profile') && href === '/') ||
                pathname.endsWith(href) ||
                pathname.includes(`${href}/`),
            })}
          >
            <Link href={`/profile${href}`}>{title}</Link>
          </li>
        ))}
        <li className="!mt-14 border-t-2 border-t-zinc-300 pt-2">
          <div
            onClick={signOutButtonHandler}
            className="flex cursor-pointer items-center justify-between rounded-md bg-red-400 px-1.5 py-1"
          >
            خروج
            <LogOut size={16} />
          </div>
        </li>
      </ul>
    </aside>
  )
}
