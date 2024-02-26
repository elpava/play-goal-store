import Image from 'next/image'
import Link from 'next/link'
import Logo from '/public/play-goal.png'
import E_Namad from '/public/logo/e-nemad.png'
import Namad from '/public/logo/namad.png'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import Icon from '@/_components/ui/icon'
import icons from 'library/icons-name'

const {
  classicBall,
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
  productLink('برند آدیداس', 'adidas', adidas),
  productLink('برند نایک', 'nike', nike),
  productLink('برند میکاسا', 'mikasa', mikasa),
  productLink('برند ویلسون', 'wilson', wilson),
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
      <div className="mb-8 grid gap-8 px-4 text-center md:grid-cols-4 md:items-center">
        <div>
          <Image src={Logo} alt="logo" className="mx-auto mb-2 w-16 md:w-24" />

          <h3 className="text-2xl">
            پلی‌گل عرضه کننده توپ‌های فوتبال برندهای معتبر دنیا
          </h3>
        </div>

        <NeonDivider className="md:hidden" />

        <div className="flex gap-20 text-right md:mr-4">
          <div>
            <div className="mb-8 flex gap-2 md:mb-4 md:border-b md:border-b-yellow-200 md:pb-4">
              <h4 className="text-xl">
                <Link href="/prodcuts">محصولات</Link>
              </h4>
              <Icon name={classicBall} size={20} />
            </div>

            <ul className="space-y-4">
              {productsLink.map(({ name, href, icon }) => (
                <li key={href}>
                  <Link
                    href={`/prodcuts?query=${href}`}
                    className="flex gap-2 pr-2"
                  >
                    <span className="inline-block w-10 rounded-full bg-zinc-200">
                      <Icon name={icon} className="mr-2" />
                    </span>

                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-8 flex gap-2 md:mb-4 md:border-b md:border-b-yellow-200 md:pb-4">
              <h4 className="text-xl">
                <Link href="/prodcuts">لینک‌های مرتبط</Link>
              </h4>
              <ExternalLink size={20} />
            </div>

            <ul className="space-y-4">
              {usefulLinks.map(({ name, href }) => (
                <li key={href}>
                  <Link href={`/${href}`} className="flex gap-2 pr-2">
                    <ArrowUpRight
                      size={15}
                      className="inline align-top text-zinc-200"
                    />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <NeonDivider className="md:hidden" />

        <div className="md:grid md:grid-cols-2 md:grid-rows-2 md:gap-2 md:place-self-center">
          {socialLinks.map(({ href, icon }) => (
            <span
              key={href}
              className="mx-2 inline-block size-12 rounded-lg bg-cyan-500 shadow-lg shadow-cyan-300 md:bg-zinc-200 md:shadow-md md:shadow-zinc-400"
            >
              <Icon name={icon} href={href} size={41} />
            </span>
          ))}
        </div>

        <div className="space-x-4 space-x-reverse">
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
