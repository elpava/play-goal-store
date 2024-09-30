import Link from 'next/link'
import clsx from 'clsx/lite'
import FadeInOut from '@/_components/ui/animation/fade-in-out'
import SignInForm from './signin-form'
import SignUpForm from './signup-form'
import { MoveLeft } from 'lucide-react'

const tabs = [
  { id: 1, name: 'ورود', query: 'sign-in' },
  { id: 2, name: 'ثبت نام', query: 'sign-up' },
]
const DEFAULT_FORM = 'sign-in'

export default function Login({ searchParams = {} }) {
  const queries = new URLSearchParams(searchParams)
  const loginQuery = queries.get('login')

  const isQueryNull = loginQuery === null
  const isSignInForm = isQueryNull || loginQuery === DEFAULT_FORM

  return (
    <div
      className={clsx(
        'z-50 flex h-auto flex-col gap-6 rounded-md border-2 border-slate-200 bg-white/20 px-6 py-4 backdrop-blur-sm md:w-112 md:transition-[height,min-height] md:duration-500',
        isSignInForm && 'md:h-[430px] md:min-h-0',
        !isSignInForm && 'md:h-0 md:min-h-[535px]',
      )}
    >
      {tabs.map(({ id, name, query }) => {
        queries.set('login', query)
        const queryString = '?' + queries.toString()
        const isActiveTab = isQueryNull
          ? query === DEFAULT_FORM
          : query === loginQuery

        return (
          <Link
            key={id}
            href={queryString}
            className={clsx(
              'inline-flex w-max items-center gap-2 border-b border-b-transparent py-2 transition-[border] hover:border-b-[1.5px] hover:border-zinc-400',
              isActiveTab && '!hidden',
            )}
          >
            <span>{name}</span>
            <MoveLeft size={14} />
          </Link>
        )
      })}

      <div className="h-full">
        <FadeInOut>{isSignInForm ? <SignInForm /> : <SignUpForm />}</FadeInOut>
      </div>
    </div>
  )
}
