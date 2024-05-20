import {
  DATABASE_NAME,
  USERS_COLLECTION,
  connectToDatabase,
  client,
} from 'database/connect'
import { CredentialsError } from '@/auth'

export async function getUser(email, password) {
  const caller = getUser.name
  let data

  try {
    await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    data = await db
      .collection(USERS_COLLECTION)
      .findOne({ email, ...(password && { password }) })
    data._id = data._id.toString('hex')
    delete data.password
    await client.close()
  } catch (error) {
    throw new CredentialsError(
      'InvalidPassword',
      `[${caller}]: Couldn't find the user.\n message: ${error}`,
    )
  }

  console.log(`🔒 [${caller}]: close connection.`)

  return data
}
