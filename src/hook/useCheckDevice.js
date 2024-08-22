import * as React from 'react'

export default function useCheckDevice(keywords = []) {
  const [isDevice, setIsDevice] = React.useState()

  React.useEffect(() => {
    let userAgent
    if (navigator !== undefined) {
      userAgent = navigator.userAgent
    }
    const regexPattern = new RegExp(keywords.join('|'), 'i')

    setIsDevice(regexPattern.test(userAgent))
  }, [keywords])

  return { is: isDevice }
}
