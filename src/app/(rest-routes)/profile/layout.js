import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import SidebarMenu from '@/_components/ui/sidebar-menu'
import FloatMenu from '@/_components/ui/float-menu'

export const metadata = {
  title: 'پلی گل | حساب کاربری',
  description: 'حساب کاربری',
}

export default async function ProfileLayout({ children }) {
  const authentication = await auth()

  let isAuthurized = authentication?.user.email

  if (!isAuthurized) {
    redirect('/login')
  }

  return (
    <main className="grid min-h-svh grid-cols-1 px-4 pb-20 pt-20 sm:grid-cols-[auto_1fr] sm:items-start sm:divide-x-2 sm:divide-x-reverse sm:pt-28 sm:text-lg lg:px-40">
      <SidebarMenu className="hidden sm:block" />
      <section className="grid h-full grid-cols-1 sm:pr-8">{children}</section>
      <FloatMenu className="sm:hidden" />
    </main>
  )
}
