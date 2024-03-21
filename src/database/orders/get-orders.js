import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
  client,
} from 'database/connect'

export async function getOrders() {
  const caller = getOrders.name
  let data

  try {
    await connectToDatabase(caller)
    const db = await client.db(DATABASE_NAME)
    data = await db.collection(ORDERS_COLLECTION).find({}).toArray()
    data = JSON.parse(JSON.stringify(data))
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't find the orders data.\n message: ${error}`,
    )
  }

  client.close()
  console.log(`🔒 [${caller}]: close connection.`)

  return data
}
