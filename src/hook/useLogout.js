import { signOut } from 'next-auth/react'
import { v4 as uuidv4 } from 'uuid'
import useLocalStorage from './useLocalStorage'
import { USER_ID_KEY } from 'library/constants'

const ID = uuidv4()

export default function useLogout() {
  const [_, setUserId] = useLocalStorage(USER_ID_KEY)

  function handleLogout() {
    signOut().then(() => setUserId(ID))
    setUserId(ID)
  }

  return { logout: handleLogout }
}
