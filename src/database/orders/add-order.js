import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
} from 'database/connect'

export default async function addOrder(newOrder) {
  const caller = addOrder.name
  let client

  try {
    client = await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    await db.collection(ORDERS_COLLECTION).insertOne({ ...newOrder })
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't add the order data.\n message: ${error}`,
    )
  } finally {
    await client.close()
  }

  return {
    success: true,
    message: 'The order added successfully.',
    order: newOrder,
  }
}
