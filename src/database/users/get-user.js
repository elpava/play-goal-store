import { CredentialsError } from '@/auth'
import {
  DATABASE_NAME,
  USERS_COLLECTION,
  connectToDatabase,
} from 'database/connect'

export default async function getUser(email, password) {
  const caller = getUser.name
  let data, client

  try {
    client = await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    data = await db
      .collection(USERS_COLLECTION)
      .findOne({ email, ...(password && { password }) })
    data._id = data._id.toString('hex')
    delete data.password
  } catch (error) {
    throw new CredentialsError(
      'InvalidPassword',
      `[${caller}]: Couldn't find the user.\n message: ${error}`,
    )
  } finally {
    await client.close()
  }

  return data
}
