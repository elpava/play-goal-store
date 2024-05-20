'use server'

import { getOrder } from 'database/orders/get-order'

export async function getOrderAction(orderId) {
  return await getOrder(orderId)
}
