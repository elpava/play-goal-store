'use server'

import { addOrder } from 'database/orders/add-order'

export async function addOrderAction(document, filter) {
  return await addOrder(document, filter)
}
