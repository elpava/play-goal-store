import addOrder from './add-order'
import updateProductsOrder from './update-products-order'
import deleteOrders from './delete-orders'

export default async function syncGuestOrderWithUserOrder(
  orderBeforeLogin,
  loggedInUserId,
  existEmptyOrderId,
) {
  const orderBeforeLogin_id = orderBeforeLogin._id
  orderBeforeLogin.userId = loggedInUserId
  delete orderBeforeLogin._id

  if (existEmptyOrderId) {
    await updateProductsOrder(existEmptyOrderId, orderBeforeLogin.orders)
  } else {
    await addOrder(orderBeforeLogin)
  }

  await deleteOrders(orderBeforeLogin_id)
}
