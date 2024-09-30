'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/auth'

export async function loginAction(formData) {
  let result = { error: null }

  try {
    await signIn('credentials', { ...formData })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'EmailRegistered':
          result.error = 'email registered'
          break
        case 'EmailNotExists':
          result.error = 'email not exists'
          break
        case 'InvalidPassword':
          result.error = 'invalid password'
          break
        case 'CallbackRouteError':
          result.error = 'callback error'
          break
        case 'CredentialsSignin':
          result.error = 'invalid credentials'
          break
        default:
          result.error = 'unknown error'
      }
    }
  }

  return result
}
