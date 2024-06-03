import {
  DATABASE_NAME,
  USERS_COLLECTION,
  connectToDatabase,
  client,
} from 'database/connect'

export default async function updateUser(props) {
  const caller = updateUser.name
  const { email, ...formData } = props
  let data

  try {
    await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    data = await db
      .collection(USERS_COLLECTION)
      .updateOne({ email }, { $set: formData })
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't update the user data.\n message: ${error}`,
    )
  }

  await client.close()
  console.log(`🔒 [${caller}]: close connection.`)

  return data
}
