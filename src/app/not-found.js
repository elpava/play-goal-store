import Link from 'next/link'
import clsx from 'clsx'
import { Sticker } from 'lucide-react'
import Icon from '@/_components/ui/icon'
import icons from 'library/icons-name'

const { classicBall } = icons

const data = [
  { text: 'صفحه اصلی', href: '/' },
  { text: 'محصولات', href: '/products' },
  { text: 'سبد خرید', href: '/cart' },
]

export default function RootNotFound() {
  return (
    <main className="grid h-svh max-h-svh w-full place-content-center place-items-center space-y-6 bg-gradient-to-t from-zinc-200 to-yellow-300 text-center">
      <div>
        <h2 className="inline text-5xl font-bold">404</h2>

        <Sticker
          className="inline fill-zinc-300 stroke-1 align-text-bottom"
          size={50}
        />

        <p className="text-xl font-bold">صفحه مورد نظر یافت نشد!</p>
      </div>

      <div className="">
        <p>می‌توانید از پیوندهای زیر استفاده نمایید:</p>
      </div>

      <div className="flex">
        {data.map(({ text, href }, idx) => (
          <div
            key={text}
            className={clsx(
              '-m-1 h-32 w-32 overflow-hidden rounded-full mix-blend-multiply',
              {
                'bg-red-500': idx === 0,
                'bg-orange-500': idx === 1,
                'bg-amber-500': idx === 2,
              },
            )}
          >
            <Link href={href} className="relative inline-block h-full w-full">
              <Icon
                name={classicBall}
                alt="توپ فوتبال"
                size="6rem"
                className={clsx(
                  'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply',
                  {
                    'rotate-90': idx === 1,
                    'rotate-180': idx === 2,
                  },
                )}
              />

              <div className="absolute inset-x-0 top-2/3 h-1/3 w-full text-center text-zinc-100">
                <span className="absolute inset-0 h-full w-full bg-zinc-400 mix-blend-multiply"></span>

                <span className="absolute inset-x-0 top-1/3 -translate-y-1/2">
                  {text}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mx-auto h-4 w-full rounded-[50%] bg-zinc-800/30 blur-sm"></div>
    </main>
  )
}
