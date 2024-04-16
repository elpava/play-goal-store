'use server'

import { addOrder } from 'database/orders/add-order'

export async function addOrderAction(newOrder) {
  return await addOrder(newOrder)
}
