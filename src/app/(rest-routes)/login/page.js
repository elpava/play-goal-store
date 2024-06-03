import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import Login from '@/_components/ui/login'

export default async function LoginPage({ searchParams }) {
  const authentication = await auth()

  if (authentication?.user.email) {
    redirect('/')
  }

  return (
    <main className="grid min-h-svh justify-items-center pb-10 pt-20 sm:py-20">
      <Login searchParams={searchParams} />
    </main>
  )
}
