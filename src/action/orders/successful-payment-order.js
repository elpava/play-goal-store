'use server'

import successfulPaymentOrder from 'database/orders/successful-payment-order'

export default async function successfulPaymentOrderAction(
  orderId,
  paymentDate,
  deliveryDate,
) {
  return await successfulPaymentOrder(orderId, paymentDate, deliveryDate)
}
