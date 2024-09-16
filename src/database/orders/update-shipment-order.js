import {
  DATABASE_NAME,
  ORDERS_COLLECTION,
  connectToDatabase,
  ObjectId,
} from 'database/connect'

export default async function updateShipmentOrder(
  orderId,
  shipmentForm,
  totalAmountPayment,
) {
  const caller = updateShipmentOrder.name
  let client

  try {
    client = await connectToDatabase(caller)
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
  } finally {
    await client.close()
  }

  return {
    success: true,
    message: 'The order shipment updated successfully.',
    orderId,
  }
}
