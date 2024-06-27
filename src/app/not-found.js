import Link from 'next/link'
import Icon from '@/_components/ui/common/icon'
import { Sticker } from 'lucide-react'
import icons from 'library/icons-name'

const { classicBall } = icons

const data = [
  { text: 'صفحه اصلی', href: '/' },
  { text: 'محصولات', href: '/products' },
  { text: 'سبد خرید', href: '/cart' },
]

export default function RootNotFound() {
  return (
    <main
      style={{
        width: '100%',
        height: '100svh',
        maxHeight: '100svh',
        display: 'grid',
        placeContent: 'center',
        placeItems: 'center',
        gap: '1.5rem',
        backgroundImage: 'linear-gradient(to top, #e4e4e7, #fde047)',
        textAlign: 'center',
      }}
    >
      <div>
        <h2
          style={{
            display: 'inline',
            fontSize: '3rem',
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          404
        </h2>

        <Sticker
          style={{
            display: 'inline',
            fill: '#d4d4d8',
            strokeWidth: 1,
            verticalAlign: 'text-bottom',
          }}
          size={50}
        />

        <p
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            lineHeight: '1.75rem',
          }}
        >
          صفحه مورد نظر یافت نشد!
        </p>
      </div>

      <div>
        <p>می‌توانید از پیوندهای زیر استفاده نمایید:</p>
      </div>

      <div style={{ display: 'flex' }}>
        {data.map(({ text, href }, idx) => (
          <div
            key={text}
            style={{
              width: '8rem',
              height: '8rem',
              overflow: 'hidden',
              borderRadius: '9999px',
              mixBlendMode: 'multiply',
              margin: '-0.25rem',
              ...(idx === 0 && { backgroundColor: 'rgb(239 68 68)' }),
              ...(idx === 1 && { backgroundColor: 'rgb(249 115 22)' }),
              ...(idx === 2 && { backgroundColor: 'rgb(245 158 11)' }),
            }}
          >
            <Link
              href={href}
              style={{
                position: 'relative',
                display: 'inline-block',
                width: '100%',
                height: '100%',
              }}
            >
              <Icon
                name={classicBall}
                size="6rem"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  mixBlendMode: 'multiply',
                  ...(idx === 1 && {
                    transform: 'translate(-50%, -50%) rotate(90deg)',
                  }),
                  ...(idx === 2 && {
                    transform: 'translate(-50%, -50%) rotate(180deg)',
                  }),
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  insetInline: '0',
                  top: '66.666667%',
                  width: '100%',
                  textAlign: 'center',
                  color: 'rgb(244 244 245)',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgb(161 161 170)',
                    mixBlendMode: 'multiply',
                  }}
                ></span>

                <span
                  style={{
                    display: 'absolute',
                    insetInline: 0,
                    top: '33.333333%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  {text}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div
        style={{
          width: '100%',
          height: '1rem',
          borderRadius: '50%',
          backgroundColor: 'rgb(39 39 42 / 0.3)',
          marginInline: 'auto',
          filter: 'blur(4px)',
        }}
      ></div>
    </main>
  )
}
