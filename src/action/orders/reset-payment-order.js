'use server'

import resetPaymentOrder from 'database/orders/reset-payment-order'

export default async function resetPaymentOrderAction(orderId) {
  return await resetPaymentOrder(orderId)
}
