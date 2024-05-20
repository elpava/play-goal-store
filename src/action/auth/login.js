'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/auth'

export async function loginAction(formData) {
  try {
    await signIn('credentials', { ...formData })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'EmailRegistered':
          return { error: 'email registered' }
        case 'EmailExists':
          return { error: 'email exists' }
        case 'InvalidPassword':
          return { error: 'invalid password' }
        case 'CallbackRouteError':
          return { error: 'callback error' }
        case 'CredentialsSignin':
          return { error: 'invalid credentials' }
        default:
          return { error: 'unknown error' }
      }
    }
  }
}
