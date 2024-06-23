import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import Login from '@/_components/ui/login'

export default async function LoginPage({ searchParams }) {
  const authentication = await auth()

  if (authentication?.user.email) {
    redirect('/')
  }

  return (
    <section className="grid h-full justify-items-center">
      <Login searchParams={searchParams} />
    </section>
  )
}
