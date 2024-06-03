'use server'

import getOrders from 'database/orders/get-orders'

export default async function getOrdersAction(userId) {
  return await getOrders(userId)
}
