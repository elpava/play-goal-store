import { CredentialsError } from '@/auth'
import {
  DATABASE_NAME,
  USERS_COLLECTION,
  connectToDatabase,
} from 'database/connect'

export default async function userExists(email) {
  const caller = userExists.name
  let data, client

  try {
    client = await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    data = await db.collection(USERS_COLLECTION).findOne({ email })
    data = data._id.toString('hex')
  } catch (error) {
    throw new CredentialsError(
      'EmailExists',
      `[${caller}]: The user doesn't exist.\n message: ${error}`,
    )
  } finally {
    await client.close()
  }

  return data
}
