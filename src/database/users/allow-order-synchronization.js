import getOrders from 'database/orders/get-orders'

export default async function allowOrderSynchronization(userId) {
  const orders = await getOrders(userId)
  const lastOrder = orders?.at(-1)
  const isEmptyOrders = orders?.length === 0
  const isEmptyOrder = lastOrder?.orders.length === 0
  const isPaidOrder = lastOrder?.isPaid
  const isOrderWithoutProduct = !isPaidOrder && isEmptyOrder
  const orderId = isOrderWithoutProduct && lastOrder._id

  return { allow: isEmptyOrders || isEmptyOrder || isPaidOrder, orderId }
}
