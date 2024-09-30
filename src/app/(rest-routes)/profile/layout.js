import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import SidebarMenu from '@/_components/ui/profile/sidebar-menu'
import FloatMenu from '@/_components/ui/profile/float-menu'

export const metadata = {
  title: {
    template: 'حساب کاربری | %s',
    default: 'حساب کاربری',
  },
  description: 'حساب کاربری',
}

export default async function ProfileLayout({ children }) {
  const authentication = await auth()

  let isAuthurized = authentication?.user.email

  if (!isAuthurized) {
    redirect('/login')
  }

  return (
    <main className="grid grid-cols-1 sm:grid-cols-[auto_1fr] sm:items-start sm:divide-x-2 sm:divide-x-reverse sm:text-lg">
      <SidebarMenu className="hidden sm:block" />
      <section className="grid h-full grid-cols-1 sm:pr-8">{children}</section>
      <FloatMenu className="sm:hidden" />
    </main>
  )
}
