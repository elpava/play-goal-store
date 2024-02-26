'use client'

import { useRouter } from 'next/navigation'

export default function GoToButton({ label, href }) {
  const { push } = useRouter()

  function clickButtonHandler() {
    push(href)
  }

  // TODO define load state

  return (
    <button
      className="w-full rounded-lg bg-lime-500 p-2 font-semibold text-lime-950 md:text-lg"
      onClick={clickButtonHandler}
    >
      {label}
    </button>
  )
}
