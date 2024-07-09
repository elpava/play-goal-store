import * as React from 'react'
import useWindowReady from './useWindowReady'

export default function useScreenSize() {
  const { isWindowReady } = useWindowReady()
  const [screenSize, setScreenSize] = React.useState()

  React.useLayoutEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize())
    }
    if (isWindowReady) {
      if (!screenSize) setScreenSize(getScreenSize())

      window.addEventListener('resize', handleResize)
    }
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isWindowReady, screenSize])

  return screenSize
}

function getScreenSize() {
  const width = window.innerWidth

  return {
    desktop: width > 900 ? true : false,
    tablet: width <= 900 ? true : false,
    mobile: width <= 500 ? true : false,
    sm: width >= 640 ? true : false,
    md: width >= 768 ? true : false,
    lg: width >= 1024 ? true : false,
    xl: width >= 1280 ? true : false,
  }
}
