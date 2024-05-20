import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
  client,
  ObjectId,
} from 'database/connect'

export async function getOrder(orderId) {
  const caller = getOrder.name
  let data

  try {
    await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    data = await db
      .collection(ORDERS_COLLECTION)
      .findOne({ _id: new ObjectId(orderId) })
    data = { ...data, _id: data._id.toString('hex') }
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't find the order data.\n message: ${error}`,
    )
  }

  await client.close()
  console.log(`🔒 [${caller}]: close connection.`)

  return data
}
