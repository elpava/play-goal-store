import Link from 'next/link'
import { User } from 'lucide-react'
import ToggleMenu from './toggle-menu'
import Menu from './menu'
import Search from './search'

export default function MainHeader() {
  return (
    <header className="absolute left-0 top-0 w-full">
      <nav className="relative flex items-center justify-between px-4 py-2 md:px-8 md:py-5">
        <ToggleMenu className="md:hidden" />

        <Menu className="hidden items-center gap-6 text-base font-normal md:flex" />

        <Search />

        <Link href={'/login'} className="justify-self-end">
          <User className="md:hover:stroke-zinc-700" />
        </Link>
      </nav>
    </header>
  )
}
