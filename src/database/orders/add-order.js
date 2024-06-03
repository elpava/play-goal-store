import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
  client,
} from 'database/connect'

export default async function addOrder(newOrder) {
  const caller = addOrder.name

  try {
    await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    await db.collection(ORDERS_COLLECTION).insertOne({ ...newOrder })
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't add the order data.\n message: ${error}`,
    )
  }

  client.close()
  console.log(`🔒 [${caller}]: close connection.`)

  return {
    success: true,
    message: 'The order added successfully.',
    order: newOrder,
  }
}
