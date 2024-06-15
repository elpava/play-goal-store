import * as React from 'react'

export default function useScreenSize() {
  const [screenSize, setScreenSize] = React.useState(getScreenSize())

  React.useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize())
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return screenSize
}

function getScreenSize() {
  const width = window.innerWidth
  if (width < 501) return 'mobile'
  if (width < 901) return 'tablet'
  return 'desktop'
}
