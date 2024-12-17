import { signOut } from 'next-auth/react'
import useLocalStorage from './useLocalStorage'
import { USER_ID_KEY, USER_ID_INIT_KEY } from 'library/constants'

export default function useLogout() {
  const [_, setUserId] = useLocalStorage(USER_ID_KEY)
  const [userIdInitilization] = useLocalStorage(USER_ID_INIT_KEY)

  function handleLogout() {
    signOut().then(() => setUserId(userIdInitilization))
    setUserId(userIdInitilization)
  }

  return { logout: handleLogout }
}
