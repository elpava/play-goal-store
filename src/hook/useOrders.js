import { useQuery } from '@tanstack/react-query'
import useUserId from './useUserId'
import getOrdersAction from 'action/orders/get-orders'

function useOrders() {
  const { userId } = useUserId()
  let {
    data: ordersData,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getOrdersAction(userId),
    enabled: Boolean(userId),
  })

  return { ordersData, isSuccess, isLoading }
}

export default useOrders
