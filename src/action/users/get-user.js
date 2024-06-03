'use server'

import getUser from 'database/users/get-user'

export default async function getUserAction(email, password) {
  let data

  try {
    data = await getUser(email, password)
  } catch (error) {
    data = {}
  }

  return data
}
