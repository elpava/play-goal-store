import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
  client,
  ObjectId,
} from 'database/connect'

export async function deleteOrder(filter) {
  const caller = deleteOrder.name
  let data

  try {
    await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    await db
      .collection(ORDERS_COLLECTION)
      .deleteOne({ _id: new ObjectId(filter) })
    data = {
      success: true,
      message: 'The product deleted successfully.',
      order: filter,
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
