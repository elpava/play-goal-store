import { delay } from './helper-functions'
import { START_TRANSITION_DELAY, END_TRANSITION_DELAY } from './constants'

export async function startPageTransition() {
  const body = document?.querySelector('body')
  const main = document?.querySelector('main')

  body.style.overflow = 'hidden'
  main.style.opacity = 0
  main.style.transform = 'translateY(32px)'
  main.style.filter = 'blur(8px)'
  await delay(START_TRANSITION_DELAY)
}

export async function endPageTransition() {
  const body = document?.querySelector('body')
  const main = document?.querySelector('main')

  await delay(END_TRANSITION_DELAY)
  body.style.removeProperty('overflow')
  main.style.removeProperty('opacity')
  main.style.removeProperty('transform')
  main.style.removeProperty('filter')
}
