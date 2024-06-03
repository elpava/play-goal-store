'use server'

import failurePaymentOrder from 'database/orders/failure-payment-order'

export default async function failurePaymentOrderAction(orderId) {
  return await failurePaymentOrder(orderId)
}
