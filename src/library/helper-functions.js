export function formatNumberToPersian(number) {
  return Intl.NumberFormat('fa').format(number)
}

export function isEmptyObject(obj) {
  for (const key in obj) {
    return false
  }
  return true
}

export function convertToShortDescription(str, maxlength) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + '…' : str
}

export function isOnlyAlphabet(text) {
  return /^[a-zA-Z\u0600-\u06FF\s]+$/.test(text)
}

export function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
