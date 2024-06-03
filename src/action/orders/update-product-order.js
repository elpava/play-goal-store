'use server'

import updateProductOrder from 'database/orders/update-product-order'

export default async function updateProductOrderAction(
  orderId,
  existOrderProductId,
  product,
) {
  return await updateProductOrder(orderId, existOrderProductId, product)
}
