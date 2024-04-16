'use server'

import { getOrders } from 'database/orders/get-orders'

export async function getOrdersAction(userId) {
  return await getOrders(userId)
}
