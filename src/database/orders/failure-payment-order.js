import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
  ObjectId,
} from 'database/connect'

export default async function failurePaymentOrder(orderId) {
  const caller = failurePaymentOrder.name
  let client

  try {
    client = await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    await db.collection(ORDERS_COLLECTION).updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          isFailured: true,
          isPaid: null,
          paymentDate: null,
          trackingCode: null,
        },
      },
    )
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't update the order payment failure state.\n message: ${error}`,
    )
  } finally {
    await client.close()
  }

  return {
    success: true,
    message: 'The order is not paid.',
    orderId,
  }
}
