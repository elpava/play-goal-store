import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
  ObjectId,
} from 'database/connect'

export default async function deleteOrders(orderId) {
  const caller = deleteOrders.name
  let data, client

  try {
    client = await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    await db
      .collection(ORDERS_COLLECTION)
      .deleteOne({ _id: new ObjectId(orderId) })
    data = {
      success: true,
      message: 'The order deleted successfully.',
      order: orderId,
    }
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't delete the orders.\n message: ${error}`,
    )
  } finally {
    await client.close()
  }

  return data
}
