import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Logo from '/public/play-goal.png'
import Icon from '@/_components/ui/common/icon'
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

const certificatesImage = [
  { src: E_Namad, alt: 'اینماد' },
  { src: Namad, alt: 'عضو اتحادیه کشوری کسب و کارهای مجازی' },
]

export default function Footer() {
  return (
    <footer className="bg-blue-950 pt-6 text-gray-100 md:pt-10">
      <div className="mb-8 flex flex-col justify-evenly gap-0 px-4 text-center md:flex-row md:items-center md:gap-0">
        <div className="md:basis-3/12">
          <Image src={Logo} alt="logo" className="mx-auto mb-2 w-16 md:w-24" />

          <div className="text-2xl">
            پلی‌گل عرضه کننده توپ‌های فوتبال برندهای معتبر دنیا
          </div>
        </div>

        <NeonDivider className="md:hidden" />

        <div className="flex justify-evenly text-right md:mr-4 md:basis-5/12 md:justify-around">
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

        <div className="flex flex-col items-center gap-8 md:flex-row">
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

          <div className="flex justify-center gap-2 md:basis-3/12 md:flex-col lg:flex-row">
            {certificatesImage.map(({ src, alt }) => (
              <div
                key={alt}
                className="relative size-20 rounded-lg border-[10px] border-zinc-200 bg-zinc-200 lg:size-36"
              >
                <Image src={src} alt={alt} className="object-contain" fill />
              </div>
            ))}
          </div>
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
      className={`my-8 h-5 border-cyan-500 ${className}`}
      style={{ boxShadow: '0 10px 10px -10px rgb(6 182 212) inset' }}
      {...props}
    />
  )
}
