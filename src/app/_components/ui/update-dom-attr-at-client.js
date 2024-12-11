'use client'

import * as React from 'react'

export default function UpdateDomAttrAtClient({
  searchByDataAttr,
  searchByClass,
  newAttribute,
  newAttributeValue = '',
  delay,
}) {
  React.useEffect(() => {
    const el = document.querySelector(searchByDataAttr || searchByClass)

    if (delay) {
      let timeout
      timeout = setTimeout(() => {
        el.setAttribute(newAttribute, newAttributeValue)
      }, delay)

      return () => clearTimeout(timeout)
    } else {
      el.setAttribute(newAttribute, newAttributeValue)
    }
  }, [delay, newAttribute, newAttributeValue, searchByClass, searchByDataAttr])
}
