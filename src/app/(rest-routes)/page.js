import Image from 'next/image'
import clsx from 'clsx'
import Adidas1 from '/public/images/adidas-1.jpg'
import Adidas2 from '/public/images/adidas-2.jpg'
import Adidas3 from '/public/images/adidas-3.jpg'
import Adidas4 from '/public/images/adidas-4.jpg'
import Nike1 from '/public/images/nike-1.jpg'
import Nike2 from '/public/images/nike-2.jpg'
import Nike4 from '/public/images/nike-4.jpg'
import Nike5 from '/public/images/nike-5.jpg'
import SoccerField1 from '/public/images/soccer-field-1.jpg'
import SoccerStadium2 from '/public/images/soccer-stadium-2.jpg'
import Icon from '@/_components/ui/icon'
import icons from 'library/icons-name'

const gridImages = [
  { id: 1, image: Adidas1, alt: 'توپ' },
  { id: 2, image: Adidas2, alt: 'توپ' },
  { id: 3, image: Nike2, alt: 'توپ' },
  { id: 4, image: Adidas3, alt: 'توپ' },
  { id: 5, image: Nike1, alt: 'توپ' },
  { id: 6, image: Adidas4, alt: 'توپ' },
  { id: 7, image: Nike4, alt: 'توپ' },
  { id: 8, image: Nike5, alt: 'توپ' },
]

export default function Home() {
  return (
    <main className="min-h-svh">
      <HeroBanner />
      <GridImages />
      <ImageAndText />
      <ImageWithText />
      <Brands />
    </main>
  )
}

function HeroBanner({ className, ...props }) {
  return (
    <section
      className={`flex h-svh flex-col justify-end bg-green-400 ${className}`}
      {...props}
    >
      <div className="p-2 text-zinc-100">
        <h1 className="mb-4 text-5xl">توپ فوتبال</h1>
        <h2 className="text-2xl">جادویی که همه را به بازی دعوت می‌کند!</h2>
      </div>
    </section>
  )
}

function GridImages({ className, ...props }) {
  return (
    <section className={`bg-zinc-950 p-1 ${className}`} {...props}>
      <div className="grid auto-rows-[130px] grid-cols-2 gap-1 bg-zinc-700 p-1 md:h-svh md:grid-cols-4 md:grid-rows-3">
        {gridImages.map(({ id, image, alt }) => (
          <Image
            key={id}
            src={image}
            alt={alt}
            className={clsx('h-full object-cover', {
              // mobile
              'row-span-3': id === 3 || id === 6,

              // desktop
              'md:col-span-2': id === 1 || id === 2 || id === 5,
              'md:col-span-1 md:row-span-2': id === 3,
              'md:col-span-1 md:row-span-1': id === 6 || id === 7 || id === 8,
            })}
          />
        ))}
      </div>
    </section>
  )
}

function ImageAndText({ className, ...props }) {
  return (
    <section
      className={`grid h-svh grid-rows-2 bg-blue-400 md:grid-cols-2 md:grid-rows-1 ${className}`}
      {...props}
    >
      <div className="relative">
        <Image
          src={SoccerField1}
          alt="استادیوم"
          className="object-cover mix-blend-multiply"
          fill
        />
      </div>

      <div className="flex flex-col place-content-center gap-5 px-8 text-blue-900 md:gap-16 md:p-14 md:text-center">
        <h2 className="text-3xl font-bold md:text-6xl">فوتبال و احساسات</h2>
        <div className="text-justify md:text-3xl">
          هیچ ورزشی مانند فوتبال، نمی‌تواند مردم را به شور و هیجان بیاورد. این
          بازی، مردم را در کافه‌ها، مکان‌های عمومی و حتی جلوی تلویزیون جمع
          می‌کند. هیجانات مثبت و منفی تماشای فوتبال، یکی از عواملی است که این
          ورزش را به یک تجربه فراتر از مسابقه‌های ورزشی تبدیل می‌کند. از
          هیجان‌زده شدن در زمان گل‌زنی تیم مورد علاقه تا افسردگی پس از باخت،
          فوتبال همچون یک دریا از احساسات است که ما را در خود غرق می‌کند.
        </div>
      </div>
    </section>
  )
}

function ImageWithText({ className, ...props }) {
  return (
    <section
      className={`relative h-[36.15vh] bg-amber-800 md:h-72 ${className}`}
      {...props}
    >
      <Image
        src={SoccerStadium2}
        alt="استادیوم"
        className="object-contain mix-blend-multiply md:object-cover"
        fill
      />

      <h2 className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-zinc-200 md:text-6xl">
        تجربه سرعت، دقت، هیجان با{' '}
        <span className="rounded-xl bg-zinc-900 p-2 text-amber-300 md:rounded-2xl md:px-4 md:py-2">
          پلی‌گل
        </span>
      </h2>
    </section>
  )
}

function Brands({ className, ...props }) {
  return (
    <section className={`${className}`} {...props}>
      <div className={`flex justify-evenly gap-4 *:w-16 md:*:w-36`} {...props}>
        <Icon name={icons.nike} />
        <Icon name={icons.adidas} />
        <Icon name={icons.wilson} />
        <Icon name={icons.mikasa} />
      </div>

      <div className="h-4 bg-emerald-700"></div>
    </section>
  )
}
