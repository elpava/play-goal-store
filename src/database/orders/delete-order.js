import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
  client,
  ObjectId,
} from 'database/connect'

export async function deleteOrder(orderId, orderProductId) {
  const caller = deleteOrder.name
  let data

  try {
    await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    await db
      .collection(ORDERS_COLLECTION)
      .updateOne(
        { _id: new ObjectId(orderId) },
        { $pull: { orders: { id: orderProductId } } },
      )
    data = {
      success: true,
      message: 'The order product deleted successfully.',
      orderProduct: orderProductId,
    }
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't delete the order.\n message: ${error}`,
    )
  } finally {
    client.close()
    console.log(`🔒 [${caller}]: close connection.`)
  }

  return data
}
