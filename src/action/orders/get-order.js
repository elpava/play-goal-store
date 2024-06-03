'use server'

import getOrder from 'database/orders/get-order'

export default async function getOrderAction(orderId) {
  return await getOrder(orderId)
}
