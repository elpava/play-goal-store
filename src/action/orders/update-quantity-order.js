'use server'

import { updateQuantityOrder } from 'database/orders/update-quantity-order'

export default async function updateQuantityOrderAction(filter, quantity) {
  return await updateQuantityOrder(filter, quantity)
}
