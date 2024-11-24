import { delay } from './helper-functions'

export async function startPageTransition() {
  const body = document?.querySelector('body')
  const main = document?.querySelector('main')

  body.style.overflow = 'hidden'
  main.style.opacity = 0
  main.style.transform = 'translateY(32px)'
  main.style.filter = 'blur(8px)'
  await delay(600)
}

export async function endPageTransition() {
  const body = document?.querySelector('body')
  const main = document?.querySelector('main')

  await delay(500)
  body.style.removeProperty('overflow')
  main.style.removeProperty('opacity')
  main.style.removeProperty('transform')
  main.style.removeProperty('filter')
}
