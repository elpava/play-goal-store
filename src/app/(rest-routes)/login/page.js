import { redirect } from 'next/navigation'
import Login from '@/_components/ui/login'
import { auth } from '@/auth'

export default async function LoginPage({ searchParams }) {
  const { user } = await auth()

  if (user.email) {
    redirect('/products')
  }

  return (
    <main className="grid min-h-svh justify-items-center pb-10 pt-20 sm:py-20">
      <Login searchParams={searchParams} />
    </main>
  )
}
