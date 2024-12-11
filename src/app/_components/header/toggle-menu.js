'use client'

import * as React from 'react'
import { animated, useTransition } from '@react-spring/web'
import Menu from './menu'
import Popup from '@/_components/ui/common/popup'
import { Menu as MenuIcon, X } from 'lucide-react'

export default function ToggleMenu({ className }) {
  const popupRef = React.useRef()
  const [showMenu, setShowMenu] = React.useState(false)
  const [disable, setDisable] = React.useState(false)
  const transitions = useTransition(showMenu, {
    from: v => ({
      opacity: 0,
      transform: `translateY(${v ? -40 : 40}px) scale(0.85)`,
    }),
    enter: {
      opacity: 1,
      transform: 'translateY(0px) scale(1)',
    },
    leave: v => ({
      opacity: 0,
      transform: `translateY(${v ? 40 : -40}px) scale(0.85)`,
    }),
    exitBeforeEnter: true,
    config: { mass: 0.5, friction: 11, tension: 400 },
    onStart: () => setDisable(true),
    onRest: () => setDisable(false),
  })

  React.useEffect(() => {
    const handleClick = e => {
      const isClickOutsidePopup =
        popupRef.current && !popupRef.current.contains(e.target)
      if (isClickOutsidePopup) {
        clickPopupHandler()
      }
    }

    if (showMenu) {
      document.addEventListener('click', handleClick)

      return () => {
        document.removeEventListener('click', handleClick)
      }
    }
  }, [showMenu])

  function clickPopupHandler() {
    setShowMenu(prev => !prev)
  }

  return (
    <div className={className}>
      <button
        className="relative z-50 touch-none select-none overflow-hidden rounded-lg border border-dashed border-zinc-700 p-1"
        disabled={disable}
        onClick={clickPopupHandler}
      >
        {transitions((style, toggle) =>
          toggle ? (
            <animated.div style={style}>
              <X />
            </animated.div>
          ) : (
            <animated.div style={style}>
              <MenuIcon />
            </animated.div>
          ),
        )}
      </button>

      <Popup
        ref={popupRef}
        className="w-full"
        show={showMenu}
        onShow={clickPopupHandler}
      >
        <Menu
          className="flex flex-col items-start divide-y-2 p-6 text-4xl font-bold *:w-full"
          itemClassName="p-6"
          isVisible={showMenu}
        />
      </Popup>
    </div>
  )
}
