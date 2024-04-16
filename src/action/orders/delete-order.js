'use server'

import { deleteOrder } from 'database/orders/delete-order'

export async function deleteOrderAction(orderId, orderProductId) {
  return await deleteOrder(orderId, orderProductId)
}
