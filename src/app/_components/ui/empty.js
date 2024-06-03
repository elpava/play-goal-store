import Link from 'next/link'
import Icon from './icon'
import icons from 'library/icons-name'

const { emptyBag, emptySearch } = icons
const content = {
  cart: {
    icon: emptyBag,
    title: 'سبد خرید شما خالی است.',
    hint: 'به نظر می رسد هیچ توپی به سبد خرید خود اضافه نکرده اید. می‌توانید وارد [محصولات] شده و توپ مورد علاقه خود را انتخاب نمایید.',
    links: [{ title: 'محصولات', href: '/products' }],
  },
  search: {
    icon: emptySearch,
    title: 'نتیجه‌ای یافت نشد.',
    hint: 'لطفاً نام یا برند محصول مورد نظر را در قسمت جستجو وارد نمایید.',
  },
}

export default function Empty({ type = 'cart' }) {
  let { icon, title, hint, links } = content[type]

  if (links) {
    hint = addLinkToStr(hint, links)
  }

  return (
    <div className="py-4 text-center sm:grid sm:h-[80svh] sm:place-items-center">
      <div className="space-y-2">
        <div className="mb-6">
          <Icon name={icon} className="w-52 sm:w-72" />
        </div>

        <h3 className="text-lg sm:text-3xl">{title}</h3>
        <p className="mx-auto w-8/12 text-sm text-zinc-500 sm:w-10/12 sm:text-base">
          {hint}
        </p>
      </div>
    </div>
  )
}

function addLinkToStr(str, links) {
  const splittedStr = str.split(/\[(.*?)\]/g)
  let findLink = {}

  for (let i = 1; i < splittedStr.length; i += 2) {
    findLink = links.find(link => link.title === splittedStr[i])
    splittedStr[i] = (
      <Link
        href={findLink.href}
        className="relative mx-0.5 border-b-2 border-b-lime-400 font-bold"
      >
        {splittedStr[i]}
      </Link>
    )
  }

  return splittedStr
}
