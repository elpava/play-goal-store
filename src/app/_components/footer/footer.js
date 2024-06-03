import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Logo from '/public/play-goal.png'
import Icon from '@/_components/ui/icon'
import icons from 'library/icons-name'
import E_Namad from '/public/logo/e-nemad.png'
import Namad from '/public/logo/namad.png'

const {
  adidas,
  nike,
  mikasa,
  wilson,
  youtube,
  pinterest,
  instagram,
  telegram,
} = icons

const productLink = (name, href, icon) => ({ name, href, icon })
const productsLink = [
  productLink('برند آدیداس', '#adidas', adidas),
  productLink('برند نایک', '#nike', nike),
  productLink('برند میکاسا', '#mikasa', mikasa),
  productLink('برند ویلسون', '#wilson', wilson),
]

const usefulLink = (name, href) => ({ name, href })
const usefulLinks = [
  usefulLink('صفحه اصلی', '/'),
  usefulLink('سبد خرید', '/cart'),
  usefulLink('تماس با ما', '/contact-us'),
  usefulLink('نحوه ارسال', '#'),
]

const socialLink = (href, icon) => ({ href, icon })
const socialLinks = [
  socialLink('https://www.telegram.com', telegram),
  socialLink('https://www.instagram.com', instagram),
  socialLink('https://www.pinterest.com', pinterest),
  socialLink('https://www.youtube.com', youtube),
]

export default function Footer() {
  return (
    <footer className="bg-blue-950 pt-6 text-gray-100 md:pt-10">
      <div className="mb-8 flex flex-col gap-8 px-4 text-center md:flex-row md:items-center md:gap-0">
        <div className="md:basis-3/12">
          <Image src={Logo} alt="logo" className="mx-auto mb-2 w-16 md:w-24" />

          <h3 className="text-2xl">
            پلی‌گل عرضه کننده توپ‌های فوتبال برندهای معتبر دنیا
          </h3>
        </div>

        <NeonDivider className="md:hidden" />

        <div className="flex gap-20 text-right md:mr-4 md:basis-5/12 md:justify-evenly">
          <div>
            <div className="mb-8 flex gap-2 md:mb-4 md:border-b md:border-b-yellow-200 md:pb-4">
              <h4 className="text-xl">محصولات</h4>
            </div>

            <ul className="space-y-4">
              {productsLink.map(({ name, href, icon }) => (
                <li key={href} className="flex items-center gap-2">
                  <div className="rounded-full bg-zinc-200 px-2.5 py-0.5">
                    <Icon name={icon} size={24} />
                  </div>
                  <Link href={`/products${href}`}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-8 flex gap-2 md:mb-4 md:border-b md:border-b-yellow-200 md:pb-4">
              <h4 className="text-xl">لینک‌های مرتبط</h4>
            </div>

            <ul className="space-y-6">
              {usefulLinks.map(({ name, href }) => (
                <li key={href} className="flex gap-2">
                  <Link href={`/${href}`} className="relative">
                    <ArrowUpRight
                      size={12}
                      className="absolute -right-3 -top-0.5 text-zinc-200"
                    />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <NeonDivider className="md:hidden" />

        <div className="flex justify-center gap-2 md:basis-1/12 md:flex-col md:items-end md:place-self-center">
          {socialLinks.map(({ href, icon }) => (
            <div
              key={href}
              className="rounded-lg bg-cyan-500 p-1 shadow-lg shadow-cyan-300 md:bg-zinc-200 md:shadow-md md:shadow-zinc-400"
            >
              <Icon name={icon} href={href} className="w-10 md:w-5" />
            </div>
          ))}
        </div>

        <div className="space-x-4 space-x-reverse md:basis-3/12">
          <span className="relative inline-block size-28 rounded-lg bg-zinc-200 p-2 md:size-40">
            <Image src={E_Namad} alt="اینماد" className="mx-auto w-11/12" />
          </span>
          <span className="relative inline-block size-28 rounded-lg bg-zinc-200 p-2 md:size-40">
            <Image src={Namad} alt="اینماد" className="mx-auto w-11/12" />
          </span>
        </div>
      </div>

      <div className="bg-black px-4 py-2 text-center text-xs md:text-sm">
        تمام حقوق این سایت متعلق به شرکت بازرگانی تجاری پلی‌گل می‌باشد.
        2024-1403©
      </div>
    </footer>
  )
}

function NeonDivider({ className, ...props }) {
  return (
    <hr
      className={`h-5 border-cyan-500 ${className}`}
      style={{ boxShadow: '0 10px 10px -10px rgb(6 182 212) inset' }}
      {...props}
    />
  )
}
