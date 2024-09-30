import PageTransition from '@/_components/ui/animation/page-transition'
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
        height: '100svh',
        maxHeight: '100svh',
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
        gap: '1.5rem',
        backgroundImage: 'linear-gradient(to top, #e4e4e7, #fde047)',
        textAlign: 'center',
        margin: '-0.5rem',
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
              display: 'grid',
              width: '8rem',
              height: '8rem',
              overflow: 'hidden',
              borderRadius: '9999px',
              mixBlendMode: 'multiply',
              marginInline: '-0.25rem',
              ...(idx === 0 && { backgroundColor: 'rgb(239 68 68)' }),
              ...(idx === 1 && { backgroundColor: 'rgb(249 115 22)' }),
              ...(idx === 2 && { backgroundColor: 'rgb(245 158 11)' }),
              position: 'relative',
            }}
          >
            <Icon
              name={classicBall}
              size="6rem"
              style={{
                position: 'absolute',
                placeSelf: 'center',
                ...(idx === 1 && { transform: 'rotate(90deg)' }),
                ...(idx === 2 && { transform: 'rotate(180deg)' }),
                mixBlendMode: 'multiply',
              }}
            />

            <PageTransition
              href={href}
              style={{
                position: 'absolute',
                justifySelf: 'center',
                alignSelf: 'end',
                display: 'grid',
                width: '100%',
                textDecoration: 'none',
                paddingBlock: '0.5rem 1.25rem',
                marginBlockEnd: '-0.25rem',
                color: 'rgb(244 244 245)',
                border: '1.5px solid blue',
                backgroundColor: 'rgb(161 161 170 / 0.75)',
              }}
            >
              {text}
            </PageTransition>
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
