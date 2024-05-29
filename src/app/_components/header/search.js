'use client'

import * as React from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import clsx from 'clsx/lite'
import { Search as SearchIcon, Loader } from 'lucide-react'
import { SearchCheck } from 'lucide-react'
import { SearchX } from 'lucide-react'

export default function Search() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const query = searchParams.get('query')
  const state = searchParams.get('state')
  const queries = new URLSearchParams()

  const isSearchPath = pathname === '/search'

  queries.set('query', query || '')

  function focusInputHandler() {
    if (isSearchPath) {
      queries.set('state', '')
      push('/search?' + queries)
    }
  }

  function submitFormHandler(e) {
    e.preventDefault()
    let isRepetitiveQuery

    const searchString = new FormData(e.target).get('search')

    isRepetitiveQuery = searchString === query

    if (!isRepetitiveQuery) {
      queries.set('state', 'pending')
      queries.set('query', searchString)
      push('/search?' + queries)
    }
  }

  return (
    <form
      onSubmit={submitFormHandler}
      className="relative rounded-full border border-dashed border-zinc-500 bg-white pt-0.5 has-[:focus]:border-transparent has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-zinc-600"
    >
      <input
        type="text"
        id="search"
        name="search"
        defaultValue={query ? query : ''}
        placeholder="جستجو"
        className="bg-transparent p-1 pl-10 pr-3 focus:outline-none"
        onFocus={focusInputHandler}
      />

      <SearchButton
        className="absolute left-2 top-1/2 -translate-y-1/2"
        state={state}
      />
    </form>
  )
}

function SearchButton({ state, className, ...props }) {
  let isPending = state === 'pending'
  let isSuccess = state === 'success'
  let isFailure = state === 'failure'

  return (
    <button
      type="submit"
      disabled={isPending}
      className={clsx('stroke-zinc-400', className)}
      {...props}
    >
      {isPending ? (
        <Loader className="animate-spin" />
      ) : isSuccess ? (
        <SearchCheck className="stroke-green-600" />
      ) : isFailure ? (
        <SearchX className="stroke-red-600" />
      ) : (
        <SearchIcon className="stroke-inherit transition-colors hover:stroke-zinc-800" />
      )}
    </button>
  )
}
