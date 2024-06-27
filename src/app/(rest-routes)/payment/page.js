import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import PaymentPreview from '@/_components/ui/products/payment-preview'

export default async function PaymentPage() {
  const authentication = await auth()

  let isAuthurized = authentication?.user.email

  if (!isAuthurized) {
    redirect('/login')
  }

  return (
    <section>
      <PaymentPreview />
    </section>
  )
}
