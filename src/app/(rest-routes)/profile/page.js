import { auth } from '@/auth'
import getUserAction from 'action/users/get-user'
import getOrdersAction from 'action/orders/get-orders'

const aliasName = {
  firstName: 'نام',
  lastName: 'نام خانوادگی',
  nationalId: 'کد ملی',
  email: 'ایمیل',
  mobile: 'موبایل',
  registerDate: 'ثبت نام',
}
const report = [
  { title: 'کل خریدهای انجام شده', value: 0 },
  { title: 'سفارش در حال پردازش', value: 0 },
  { title: 'سفارش‌های ناموفق', value: 0 },
]

export default async function ProfilePage() {
  const authentication = await auth()
  const userInfo = await getUserAction(authentication?.user.email)
  const orders = await getOrdersAction(authentication?.user.id)
  let form = []

  for (let [key, value] of Object.entries(userInfo)) {
    if (aliasName[key]) {
      form.push({
        title: [aliasName[key]],
        content:
          key === 'registerDate'
            ? new Intl.DateTimeFormat('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).format(value)
            : value,
      })
    }
  }

  orders.forEach(({ isPaid, orders, isFailured }) => {
    isPaid && report[0].value++
    orders.length > 0 && !isPaid && report[1].value++
    isFailured && report[2].value++
  })

  return (
    <div className="space-y-20">
      <div>
        <h2 className="mb-8 text-3xl xs:mb-10">مشخصات کاربر</h2>

        <div className="grid grid-cols-1 gap-x-4 gap-y-4 px-6 xs:gap-x-20 xs:gap-y-8 xs:px-4 md:grid-cols-2">
          {form.map(({ title, content }) => (
            <Field key={title} title={title}>
              {content}
            </Field>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-8 text-3xl xs:mb-10">وضعیت سفارش‌ها</h2>

        <div className="grid grid-cols-3 divide-x-2 divide-x-reverse overflow-hidden rounded-lg border border-zinc-400 text-center *:p-2 xs:*:py-6 [&>*:nth-child(1)]:bg-green-300 [&>*:nth-child(2)]:bg-blue-300 [&>*:nth-child(3)]:bg-red-300">
          {report.map(({ title, value }) => (
            <div key={title}>
              {title} : <b>{value}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Field({ title, children }) {
  return (
    <div className="flex items-center gap-2">
      <div className="basis-1/4 whitespace-nowrap xs:basis-2/6">{title}</div>
      <div className="grow basis-3/4 rounded-md border border-zinc-300 bg-zinc-100 px-4 py-2 text-zinc-400 xs:basis-4/6">
        {children}
      </div>
    </div>
  )
}
