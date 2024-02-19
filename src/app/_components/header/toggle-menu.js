'use client'

import * as React from 'react'
import Menu from './menu'
import { Menu as MenuIcon, X } from 'lucide-react'
import useClickOutsideElement from 'hook/useClickOutsideElement'

export default function ToggleMenu({ className, ...props }) {
  return (
    <div className={`${className}`} {...props}>
      <MenuContainer>
        <Menu className="absolute inset-x-0 top-full z-50 flex flex-col items-start divide-y-2 bg-zinc-100 text-4xl font-bold text-zinc-700 *:w-full *:px-5 *:py-4" />
      </MenuContainer>
    </div>
  )
}

function MenuContainer({ children }) {
  const [state, setState] = React.useState(false)
  const { ref } = useClickOutsideElement(setState)

  function clickHandler() {
    setState(!state)
  }

  return (
    <div ref={ref}>
      <button
        className="rounded-lg border border-dashed border-zinc-700 p-1"
        onClick={clickHandler}
      >
        {state ? <X /> : <MenuIcon />}
      </button>

      {state && children}
    </div>
  )
}
