import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
} from 'database/connect'

export default async function getOrders(userId) {
  const caller = getOrders.name
  let data, client

  try {
    client = await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    data = await db.collection(ORDERS_COLLECTION).find({ userId }).toArray()
    data = JSON.parse(JSON.stringify(data))
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't find the orders data.\n message: ${error}`,
    )
  } finally {
    await client.close()
  }

  return data
}
