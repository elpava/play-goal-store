import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
  client,
  ObjectId,
} from 'database/connect'

export default async function updateShipmentOrder(
  orderId,
  shipmentForm,
  totalAmountPayment,
) {
  const caller = updateShipmentOrder.name

  try {
    await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    await db
      .collection(ORDERS_COLLECTION)
      .updateOne(
        { _id: new ObjectId(orderId) },
        { $set: { shipment: shipmentForm, totalAmountPayment } },
      )
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't update the order shipment.\n message: ${error}`,
    )
  }

  client.close()
  console.log(`🔒 [${caller}]: close connection.`)

  return {
    success: true,
    message: 'The order shipment updated successfully.',
    orderId,
  }
}
