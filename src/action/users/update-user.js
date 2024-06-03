'use server'

import { revalidatePath } from 'next/cache'
import updateUser from 'database/users/update-user'

export default async function updateUserAction(formData) {
  const data = await updateUser(formData)
  revalidatePath('/profile')

  return data
}
