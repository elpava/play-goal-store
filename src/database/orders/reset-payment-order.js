import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
  ObjectId,
} from 'database/connect'

export default async function resetPaymentOrder(orderId) {
  const caller = resetPaymentOrder.name
  let client

  try {
    client = await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    await db.collection(ORDERS_COLLECTION).updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          isPaid: null,
          isFailured: null,
          paymentDate: null,
          deliveryDate: null,
          trackingCode: null,
        },
      },
    )
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't update the order payment reset state.\n message: ${error}`,
    )
  } finally {
    await client.close()
  }

  return {
    success: true,
    message: 'The order payment state is reset successfully.',
    orderId,
  }
}
