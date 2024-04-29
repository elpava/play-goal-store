import clsx from 'clsx'
import SignInForm from './signin-form'
import SignUpForm from './signup-form'
import Link from 'next/link'

const tabs = [
  { id: 1, name: 'ورود', query: 'sign-in' },
  { id: 2, name: 'ثبت نام', query: 'sign-up' },
]

export default function Login({ searchParams = {} }) {
  const queries = new URLSearchParams(searchParams)
  const loginQuery = queries.get('login')

  const isShowFirstForm = loginQuery === null
  const isSignIn = isShowFirstForm || loginQuery === 'sign-in'

  return (
    <div className="flex w-11/12 flex-col rounded-lg border-2 border-zinc-300 p-2 sm:w-1/3">
      <div className="flex divide-x-2 divide-x-reverse overflow-hidden rounded-se-lg rounded-ss-lg bg-gray-100 text-center">
        {tabs.map(({ id, name, query }) => {
          queries.set('login', query)
          const queryString = '?' + queries.toString()

          return (
            <Link
              key={id}
              href={queryString}
              className={clsx('grow p-2', {
                'bg-blue-300': id === 1,
                'bg-green-300': id === 2,
                '!bg-blue-600 text-zinc-100': id === 1 && isSignIn,
                'bg-green-600 text-zinc-100': id === 2 && !isSignIn,
              })}
            >
              {name}
            </Link>
          )
        })}
      </div>

      <div
        className={clsx('grow rounded-ee-lg rounded-es-lg p-4 pt-12', {
          'bg-blue-50': isSignIn,
          'bg-green-50': !isSignIn,
        })}
      >
        {isSignIn ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  )
}
