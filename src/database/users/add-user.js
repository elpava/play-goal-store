import { CredentialsError } from '@/auth'
import {
  DATABASE_NAME,
  USERS_COLLECTION,
  connectToDatabase,
} from 'database/connect'

export default async function addUser(props) {
  const caller = addUser.name
  const { firstName, lastName, nationalId, email, password, mobile, role } =
    props
  let data, client

  try {
    client = await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    const emailRegistered = await db
      .collection(USERS_COLLECTION)
      .findOne({ email })
    if (emailRegistered) {
      throw new Error('email registered')
    }

    data = await db.collection(USERS_COLLECTION).insertOne({
      firstName,
      lastName,
      nationalId,
      email,
      password,
      mobile,
      registerDate: new Date().getTime(),
      role,
    })
  } catch (error) {
    if (error.message === 'email registered') {
      throw new CredentialsError(
        'EmailRegistered',
        `[${caller}]: The email is already registered.\n message: ${error}`,
      )
    }
    throw new Error(`[${caller}]: Couldn't add the user.\n message: ${error}`)
  } finally {
    await client.close()
  }

  return data
}
