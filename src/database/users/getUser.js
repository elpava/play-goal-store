import {
  DATABASE_NAME,
  USERS_COLLECTION,
  connectToDatabase,
  client,
} from 'database/connect'

export async function getUser(props) {
  const caller = getUser.name
  const { email, password } = props
  let data

  try {
    await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    data = await db.collection(USERS_COLLECTION).findOne({ email, password })
  } catch (error) {
    throw new Error(`[${caller}]: Couldn't find the user.\n message: ${error}`)
  }

  client.close()
  console.log(`🔒 [${caller}]: close connection.`)

  return data
}
