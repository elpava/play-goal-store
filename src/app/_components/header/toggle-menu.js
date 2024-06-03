'use client'

import * as React from 'react'
import Menu from './menu'
import Popup from '@/_components/ui/popup'
import { Menu as MenuIcon, X } from 'lucide-react'

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
  const [isOpen, setIsOpen] = React.useState(false)

  function clickHandler() {
    setIsOpen(!isOpen)
  }

  return (
    <div onClick={clickHandler}>
      <button
        className="rounded-lg border border-dashed border-zinc-700 p-1"
        onClick={clickHandler}
      >
        {isOpen ? <X /> : <MenuIcon />}
      </button>

      <Popup open={isOpen} onClose={setIsOpen}>
        {children}
      </Popup>
    </div>
  )
}
