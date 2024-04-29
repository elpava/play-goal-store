'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/auth'

export async function loginAction(formData) {
  try {
    await signIn('credentials', { ...formData, redirectTo: '/products' })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'invalid email' }
        default:
          return { error: 'unknown error' }
      }
    }
  }
}
