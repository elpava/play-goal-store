import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
  ObjectId,
} from 'database/connect'

export default async function updateProductsOrder(orderId, products) {
  const caller = updateProductsOrder.name
  let client

  try {
    client = await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    await db.collection(ORDERS_COLLECTION).updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: { orders: products, updatedOrderAt: new Date().getTime() },
      },
    )
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't update the order products.\n message: ${error}`,
    )
  } finally {
    await client.close()
  }

  return {
    success: true,
    message: 'The order products updated successfully.',
    product: products,
  }
}
