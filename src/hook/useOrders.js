import { useQuery } from '@tanstack/react-query'
import useLocalStorage from './useLocalStorage'
import getOrdersAction from 'action/orders/get-orders'
import { USER_ID_KEY } from 'library/constants'

export default function useOrders() {
  const [userId] = useLocalStorage(USER_ID_KEY)

  let {
    data: ordersData,
    isSuccess,
    isLoading,
  } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['cart'],
    queryFn: () => getOrdersAction(userId),
    enabled: Boolean(userId),
  })

  return { ordersData, isSuccess, isLoading }
}
