import ToggleMenu from './toggle-menu'
import Menu from './menu'
import Search from './search'
import LoginButton from './login-button'
import { auth } from '@/auth'

export default async function MainHeader() {
  const authentication = await auth()

  let isAuthurized

  if (authentication?.user.email) {
    isAuthurized = true
  } else {
    isAuthurized = false
  }

  return (
    <header className="absolute left-0 top-0 w-full">
      <nav className="relative flex items-center justify-between px-4 py-2 md:px-8 md:py-5">
        <ToggleMenu className="md:hidden" />

        <Menu className="hidden items-center gap-6 text-base font-normal md:flex" />

        <Search />

        <LoginButton className="justify-self-end" isAuthurized={isAuthurized} />
      </nav>
    </header>
  )
}
