'use server'

import deleteOrder from 'database/orders/delete-order'

export default async function deleteOrderAction(orderId, orderProductId) {
  return await deleteOrder(orderId, orderProductId)
}
