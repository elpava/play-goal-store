import { auth } from '@/auth'
import Header from './header'
import ToggleMenu from './toggle-menu'
import Menu from './menu'
import Search from './search'
import LoginButton from './login-button'

export default async function MainHeader() {
  const authentication = await auth()

  let isAuthurized

  if (authentication?.user.email) {
    isAuthurized = true
  } else {
    isAuthurized = false
  }

  return (
    <Header className="absolute inset-x-0 top-0 z-50">
      <nav className="relative flex items-center justify-between gap-6 px-4 py-2 md:justify-normal md:px-8 md:py-5">
        <ToggleMenu className="md:hidden" />

        <Menu className="hidden items-center gap-6 text-base md:flex md:basis-5/12 md:justify-between lg:basis-3/12 lg:justify-normal" />

        <Search className="basis-10/12 md:basis-6/12 lg:basis-8/12" />

        <LoginButton className="mr-auto" isAuthurized={isAuthurized} />
      </nav>
    </Header>
  )
}
