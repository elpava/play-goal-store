import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
  client,
  ObjectId,
} from 'database/connect'

export async function addOrder(document, filter = 0) {
  const caller = addOrder.name

  try {
    await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    await db
      .collection(ORDERS_COLLECTION)
      .updateOne(
        { _id: new ObjectId(filter) },
        { $set: document },
        { upsert: true },
      )
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't add/update the order data.\n message: ${error}`,
    )
  }

  client.close()
  console.log(`🔒 [${caller}]: close connection.`)

  return {
    success: true,
    message: 'The product added successfully.',
    product: document.productId,
  }
}
