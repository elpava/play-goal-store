const crypto = require('crypto')
import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
  client,
  ObjectId,
} from 'database/connect'

export default async function successfulPaymentOrder(
  orderId,
  paymentDate,
  deliveryDate,
) {
  const caller = successfulPaymentOrder.name

  try {
    await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    await db.collection(ORDERS_COLLECTION).updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          isPaid: true,
          isFailured: null,
          paymentDate,
          deliveryDate,
          trackingCode: crypto.randomBytes(4).toString('hex'),
        },
      },
    )
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't update the order payment successful state.\n message: ${error}`,
    )
  }

  client.close()
  console.log(`🔒 [${caller}]: close connection.`)

  return {
    success: true,
    message: 'The order is paid successfully.',
    orderId,
  }
}
