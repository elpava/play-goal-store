'use server'

import updateShipmentOrder from 'database/orders/update-shipment-order'

export default async function updateShipmentOrderAction(
  orderId,
  shipmentForm,
  totalAmountPayment,
) {
  return await updateShipmentOrder(orderId, shipmentForm, totalAmountPayment)
}
