import Link from 'next/link'
import Image from 'next/image'
import Logo from '/public/play-goal.png'

const menu = [
  { name: 'محصولات', href: '/products' },
  { name: 'سبد خرید', href: '/cart' },
  { name: 'تماس', href: '/contact-us' },
]

export default function Menu({ className, ...props }) {
  return (
    <div className={` ${className}`} {...props}>
      <Link href="/">
        <Image src={Logo} alt="لوگو" className="hidden w-7 sm:block" priority />
        <span className="sm:hidden">صفحه اصلی</span>
      </Link>
      {menu.map(({ name, href }) => (
        <Link key={name} href={href} className="">
          {name}
        </Link>
      ))}
    </div>
  )
}
