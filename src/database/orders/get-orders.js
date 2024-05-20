import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
  client,
} from 'database/connect'

export async function getOrders(userId) {
  const caller = getOrders.name
  let data

  try {
    await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    data = await db.collection(ORDERS_COLLECTION).find({ userId }).toArray()
    data = JSON.parse(JSON.stringify(data))
    await client.close()
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't find the orders data.\n message: ${error}`,
    )
  }

  console.log(`🔒 [${caller}]: close connection.`)

  return data
}
