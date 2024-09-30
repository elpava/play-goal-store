import Link from 'next/link'
import { auth } from '@/auth'
import getOrdersAction from 'action/orders/get-orders'
import getProductsAction from 'action/products/get-products'
import Empty from '@/_components/ui/common/empty'
import { formatNumberToPersian } from 'library/helper-functions'
import { getDate } from 'util/date'
import { ArrowUpRight } from 'lucide-react'

export const metadata = {
  title: 'سفارشات',
}

export default async function OrdersPage() {
  const authentication = await auth()
  const orders = await getOrdersAction(authentication?.user.id)
  const products = await getProductsAction()

  let isOrders

  const filteredOrders = orders.filter(item => item.isPaid)
  filteredOrders.forEach(({ orders }) => {
    orders.forEach(item => {
      const product = products.find(({ _id }) => _id === item.productId)
      const size = product.attributes.sizes.find(
        ({ sizeId }) => sizeId === item.sizeId,
      )
      item.slug = product.slug
      item.productName = product.name
      item.size = size.size
    })
  })

  isOrders = filteredOrders.length > 0

  return (
    <section className="flex h-full flex-col">
      <h2>کل سفارشات</h2>

      {isOrders ? (
        <div className="overflow-auto scrollbar scrollbar-w-2 scrollbar-thumb-zinc-400 scrollbar-track-zinc-700 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg focus:outline-none">
          <table className="bg-stone-50">
            <thead className="bg-zinc-800 text-xs text-zinc-100 xs:w-full xs:text-sm">
              <tr className="*:text-nowrap *:px-5 *:py-4">
                <th>تاریخ سفارش</th>
                <th>محصولات</th>
                <th>نحوه ارسال</th>
                <th>وضعیت پرداخت</th>
                <th>وضعیت تحویل</th>
                <th>کل پرداخت</th>
                <th>کد پیگیری</th>
                <th>مشاهده</th>
              </tr>
            </thead>
            <tbody className="text-center text-xs [&>*:nth-child(even)]:bg-slate-200">
              {filteredOrders.map(
                ({
                  _id,
                  orders,
                  isPaid,
                  isDelivered,
                  isFailured,
                  shipment,
                  totalAmountPayment,
                  orderDate,
                  paymentDate,
                  trackingCode,
                }) => (
                  <tr key={_id} className="*:px-4 *:py-2">
                    <td>
                      {getDate(orderDate, {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                      })}
                    </td>
                    <td className="">
                      {orders.map(({ id, slug, productName, size }, idx) => (
                        <div
                          key={id}
                          className="my-4 flex w-40 items-start gap-2"
                        >
                          <span className="text-sm">{idx + 1}.</span>

                          <div className="grow">
                            <h4 className="mb-1 font-bold">{productName}</h4>
                            <span className="relative">
                              اندازه {size}
                              <Link
                                href={`/products/${slug}`}
                                className="absolute -left-5 top-0"
                              >
                                <ArrowUpRight size={16} />
                              </Link>
                            </span>
                          </div>
                        </div>
                      ))}
                    </td>
                    <td>{shipment.shipmentType.name}</td>
                    <td className="text-nowrap">
                      {isPaid ? (
                        <div className="space-y-2">
                          <div>پرداخت شده</div>
                          <div>
                            {getDate(paymentDate, {
                              year: 'numeric',
                              month: 'long',
                              day: '2-digit',
                            })}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div>پرداخت نشده</div>
                          {isFailured && (
                            <div className="text-red-500">پرداخت ناموفق</div>
                          )}
                        </div>
                      )}
                    </td>
                    <td>
                      {isDelivered ? 'تحویل داده شده' : 'تحویل داده نشده'}
                    </td>
                    <td>{formatNumberToPersian(totalAmountPayment)} تومان </td>
                    <td className="font-sans uppercase">{trackingCode}</td>
                    <td>
                      <Link
                        href={`/profile/orders/${_id}`}
                        className="font-bold"
                      >
                        مشاهده فاکتور{' '}
                        <ArrowUpRight size={16} className="inline-block" />
                      </Link>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <Empty type="orders" />
      )}
    </section>
  )
}
