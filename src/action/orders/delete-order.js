'use server'

import { deleteOrder } from 'database/orders/delete-order'

export async function deleteOrderAction(filter) {
  return await deleteOrder(filter)
}
