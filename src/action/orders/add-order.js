'use server'

import addOrder from 'database/orders/add-order'

export default async function addOrderAction(newOrder) {
  return await addOrder(newOrder)
}
