'use server'

import updateQuantityOrder from 'database/orders/update-quantity-order'

export default async function updateQuantityOrderAction(
  orderId,
  orderProductId,
  quantity,
) {
  return await updateQuantityOrder(orderId, orderProductId, quantity)
}
