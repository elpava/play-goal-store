import Link from 'next/link'
import { User } from 'lucide-react'
import ToggleMenu from './toggle-menu'
import Menu from './menu'
import Search from './search'

export default function Header() {
  return (
    <header className="absolute left-0 top-0 w-full">
      <nav className="relative flex items-center justify-between px-4 py-2 sm:px-8 sm:py-5">
        <ToggleMenu className="sm:hidden" />

        <Menu className="hidden items-center gap-6 text-base font-normal sm:flex" />

        <Search />

        <Link href={'/login'} className="justify-self-end">
          <User className="sm:hover:stroke-zinc-700" />
        </Link>
      </nav>
    </header>
  )
}
