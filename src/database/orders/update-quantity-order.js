import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
  client,
  ObjectId,
} from 'database/connect'

export default async function updateQuantityOrder(
  orderId,
  orderProductId,
  quantity,
) {
  const caller = updateQuantityOrder.name

  try {
    await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    await db
      .collection(ORDERS_COLLECTION)
      .updateOne(
        { _id: new ObjectId(orderId), 'orders.id': orderProductId },
        { $set: { 'orders.$.quantity': quantity } },
      )
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't update the order quantity.\n message: ${error}`,
    )
  }

  client.close()
  console.log(`🔒 [${caller}]: close connection.`)

  return {
    success: true,
    message: 'The order quantity updated successfully.',
    orderId,
  }
}
