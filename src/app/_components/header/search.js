'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { searchQuery } from 'action/products/search'
import { Search as SearchIcon, Loader } from 'lucide-react'

const initialState = { message: '' }

export default function Search() {
  const [state, formAction] = useFormState(searchQuery, initialState)

  return (
    <form action={formAction}>
      <div className="relative w-full">
        <input
          type="text"
          id="search"
          name="field-search"
          placeholder="جستجو"
          className="rounded-full p-1 pl-10 pr-3 focus:outline-green-600"
        />

        <SearchButton className="absolute left-2 top-1/2 -translate-y-1/2" />
      </div>
    </form>
  )
}

function SearchButton({ className, ...props }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className}`}
      {...props}
    >
      {pending ? (
        <Loader className="animate-spin" />
      ) : (
        <SearchIcon className="stroke-zinc-400 transition-colors hover:stroke-zinc-800" />
      )}
    </button>
  )
}
