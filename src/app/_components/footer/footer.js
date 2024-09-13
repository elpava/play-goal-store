import Link from 'next/link'
import clsx from 'clsx/lite'
import Ball3D from '@/_components/ui/home/ball-3d'

const generateItem = (name, href, icon) => ({
  ...(name && { name }),
  ...(href && { href }),
  ...(icon && { icon }),
})
const productsLink = [
  generateItem('برند آدیداس', '/products/#brand-adidas'),
  generateItem('برند نایک', '/products/#brand-nike'),
  generateItem('برند میکاسا', '/products/#brand-mikasa'),
  generateItem('برند ویلسون', '/products/#brand-wilson'),
]
const usefulLinks = [
  generateItem('صفحه اصلی', '/'),
  generateItem('سبد خرید', '/cart'),
  generateItem('تماس با ما', '/contact-us'),
  generateItem('نحوه ارسال', '#'),
]
const socialLinks = [
  generateItem('تلگرام', 'https://www.telegram.com'),
  generateItem('اینستاگرام', 'https://www.instagram.com'),
  generateItem('پینترست', 'https://www.pinterest.com'),
  generateItem('یوتیوب', 'https://www.youtube.com'),
]

export default function Footer() {
  return (
    <footer className="relative flex flex-col gap-16 bg-gradient-to-b from-slate-900 to-black pt-16 text-gray-100">
      <div className="flex flex-col items-center gap-y-14 md:flex-row md:gap-y-0">
        <div className="h-[40svh] basis-2/6 text-center">
          <Ball3D />
        </div>

        <div className="grid w-full grid-cols-1 gap-y-10 md:w-auto md:grid-cols-3 md:gap-y-0">
          <CurvyNavigation data={productsLink} className="z-[3]" />
          <CurvyNavigation data={usefulLinks} className="z-[2]" />
          <CurvyNavigation data={socialLinks} className="z-[1]" />
        </div>
      </div>

      <Copyright />
    </footer>
  )
}

function CurvyNavigation({ data, className }) {
  return (
    <div className={clsx('relative w-56 shrink-0 flex-center', className)}>
      <ul
        className={clsx(
          '[--items-rotation:30deg] [--quantity:11]',
          'relative isolate grid aspect-square size-full -rotate-90 list-none rounded-full',
          '*:absolute *:grid *:h-[0.01px] *:w-full *:place-self-center',
        )}
      >
        <div
          className="!size-full rounded-full border border-slate-500 position-center"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 28%, 50% 50%)',
          }}
        />
        {data.map(({ name, href }, idx) => (
          <li
            key={idx}
            className={clsx(
              'bg-slate-50/10 text-slate-100 transition-[color] ease-in-out sm:text-slate-500 sm:hover:text-slate-50 sm:hover:before:size-4 sm:hover:before:border-2 sm:hover:before:bg-slate-100',
              'before:size-2 before:rounded-full before:border before:border-slate-500 before:bg-slate-500 before:transition-[background-color,width,height,border] before:duration-500 before:ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] before:content-[""] before:position-center',
            )}
            style={{
              transform: `rotate(calc(var(--items-rotation) * -1)) rotate(calc(360deg / var(--quantity) * ${idx} * -1)) translateX(50%)`,
            }}
          >
            <div
              className={clsx(
                'absolute grid w-1 place-self-center text-nowrap pr-9 hover:before:delay-150 md:hover:before:scale-x-100',
                'before:absolute before:h-[0.3px] before:w-1/2 before:origin-right before:scale-x-0 before:bg-slate-100 before:transition-transform before:content-[""] before:[place-self:center_end]',
              )}
              style={{
                transform: `rotate(calc(360deg / var(--quantity) * ${idx} * 1 + calc(90deg + var(--items-rotation))))`,
              }}
            >
              <Link href={href}>{name}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Copyright() {
  return (
    <div className="mt-auto bg-black px-4 py-2 text-center text-xs md:text-sm">
      تمام حقوق این سایت متعلق به شرکت بازرگانی تجاری پلی‌گل می‌باشد.
      2024-1403©
    </div>
  )
}
