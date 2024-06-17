import clsx from 'clsx/lite'
import EmbedMap from '@/_components/ui/embed-map'
import Form from '@/_components/ui/form'
import Input from '@/_components/ui/input'
import Button from '@/_components/ui/button'
import Icon from '@/_components/ui/icon'
import icons from 'library/icons-name'

const { instagram, telegram, youtube, pinterest } = icons
const contact = [
  {
    id: 1,
    title: 'خط ثابت',
    by: ['021-22214545', '021-22214546', '021-22214547'],
  },
  {
    id: 2,
    title: 'تلفن همراه',
    by: ['09121183536', '09121183435'],
  },
  {
    id: 3,
    title: 'شبکه‌های مجازی',
    by: [
      { id: 1, href: 'https://www.youtube.com', iconName: youtube },
      { id: 2, href: 'https://www.pinterest.com', iconName: pinterest },
      { id: 3, href: 'https://www.instagram.com', iconName: instagram },
      { id: 4, href: 'https://www.telegram.com', iconName: telegram },
    ],
  },
]
const ADDRESS =
  'تهران خیابان ولیعصر نرسیده به توانیر کوچه شمس پلاک 4 ساختمان هما'

export default function ContactUsPage() {
  return (
    <main className="flex min-h-svh flex-col gap-4 px-4 pb-20 pt-20 sm:pt-28 sm:text-lg lg:px-40">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="basis-1/2 rounded-md rounded-se-none rounded-ss-none bg-zinc-50 shadow-md shadow-zinc-400">
          <div className="bg-zinc-950 p-4 text-lg text-zinc-50">
            کانال‌های ارتباطی
          </div>
          <div className="divide-y divide-zinc-300 p-6">
            {contact.map(({ id, title, by }, idx) => (
              <div
                key={id}
                className={clsx(
                  'flex py-4',
                  idx === 0 && 'pt-0',
                  idx === contact.length - 1 && 'pb-0',
                )}
              >
                <div className="basis-2/5 sm:basis-2/6">{title}</div>
                <div className="basis-3/5 sm:basis-4/6">
                  <ul
                    className={clsx(
                      typeof by[0] === 'object' && 'flex items-center gap-4',
                    )}
                  >
                    {by.map(item =>
                      typeof item !== 'object' ? (
                        <li key={item}>{item}</li>
                      ) : (
                        <li key={item.id}>
                          <Icon
                            href={item.href}
                            name={item.iconName}
                            className="fill-zinc-700"
                            size="large"
                          />
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="basis-1/2 rounded-md rounded-se-none rounded-ss-none bg-zinc-50 shadow-md shadow-zinc-400">
          <div className="bg-zinc-950 p-4 text-lg text-zinc-50">آدرس</div>
          <div className="p-6">{ADDRESS}</div>
          <div className="h-60">
            <EmbedMap />
          </div>
        </div>
      </div>

      <div className="rounded-md rounded-se-none rounded-ss-none bg-zinc-50 shadow-md shadow-zinc-400">
        <div className="bg-zinc-950 p-4 text-lg text-zinc-50">پیام شما</div>
        <div className="p-6">
          <Form className="bg-white">
            <Input name="fullName" placeholder="نام" />
            <Input name="email" placeholder="ایمیل" />
            <Input name="message" type="textarea" placeholder="پیام" />

            <Button label="ارسال پیام" />
          </Form>
        </div>
      </div>
    </main>
  )
}
