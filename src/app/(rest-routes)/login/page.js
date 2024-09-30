import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import Image from 'next/image'
import FormStateAnimation from '@/_components/ui/animation/login/form-state-animation'
import Login from '@/_components/ui/login/login'
import LoginWallpaper from '/public/images/login-wallpaper.jpg'

export default async function LoginPage({ searchParams }) {
  const authentication = await auth()

  if (authentication?.user.email) {
    redirect('/')
  }

  return (
    <section className="ignore relative grid h-full content-center justify-items-start px-8">
      <Image
        src={LoginWallpaper}
        alt="پس زمینه صفحه ورود"
        fill
        sizes="(min-width: 768px) 100vw, (min-width: 640px) 50vw, (min-width: 475px) 33vw, 85vw"
        className="object-contain object-bottom md:object-cover md:object-top"
      />

      <div className="relative">
        <FormStateAnimation className="position-center" />
        <Login searchParams={searchParams} />
      </div>
    </section>
  )
}
