import { signOut } from 'next-auth/react'
import useWindowReady from './useWindowReady'

export default function useLogout() {
  const { isWindowReady } = useWindowReady()

  function handleLogout() {
    if (isWindowReady) {
      localStorage.setItem('pg-user-id', '')
    }
    signOut()
  }

  return { logout: handleLogout }
}
