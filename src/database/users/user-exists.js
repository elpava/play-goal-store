import {
  DATABASE_NAME,
  USERS_COLLECTION,
  connectToDatabase,
  client,
} from 'database/connect'
import { CredentialsError } from '@/auth'

export async function userExists({ email }) {
  const caller = userExists.name
  let data

  try {
    await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    data = await db.collection(USERS_COLLECTION).findOne({ email })
    data = data._id.toString('hex')
  } catch (error) {
    throw new CredentialsError(
      'EmailExists',
      `[${caller}]: The user doesn't exist.\n message: ${error}`,
    )
  }

  await client.close()
  console.log(`🔒 [${caller}]: close connection.`)

  return data
}
