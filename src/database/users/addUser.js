import {
  DATABASE_NAME,
  USERS_COLLECTION,
  connectToDatabase,
  client,
} from 'database/connect'

export async function addUser(props) {
  const caller = addUser.name
  const { firstName, lastName, nationalId, email, password, mobile, role } =
    props
  let data

  try {
    await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
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
    throw new Error(`[${caller}]: Couldn't add the user.\n message: ${error}`)
  }

  client.close()
  console.log(`🔒 [${caller}]: close connection.`)

  return data
}
