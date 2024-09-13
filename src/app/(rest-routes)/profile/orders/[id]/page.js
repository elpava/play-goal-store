import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@/auth'
import getOrderAction from 'action/orders/get-order'
import getProductsAction from 'action/products/get-products'
import getUserAction from 'action/users/get-user'
import { formatNumberToPersian } from 'library/helper-functions'
import { DOLLAR_RATE } from 'library/fix-values'
import { getDate } from 'util/date'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const aliasName = {
  firstName: { value: 'نام', group: 'info', order: 1 },
  lastName: { value: 'نام خانوادگی', group: 'info', order: 2 },
  nationalId: { value: 'کد ملی', group: 'info', order: 3 },
  email: { value: 'ایمیل', group: 'info', order: 4 },
  mobile: { value: 'موبایل', group: 'info', order: 5 },
  shipment: { value: 'is object', group: 'shipment', order: 0 },
  shipmentType: {
    value: 'is object',
    name: { value: 'ارسال توسط', group: 'shipment', order: 6 },
    price: { value: 'هزینه ارسال', group: 'invoice', order: 19 },
    group: 'shipment',
    order: 0,
  },
  address: { value: 'آدرس', group: 'shipment', order: 7 },
  zipCode: { value: 'کد پستی', group: 'shipment', order: 8 },
  description: { value: 'یادداشت خریدار', group: 'shipment', order: 9 },
  orders: { value: 'محصولات', group: 'invoice', order: 16 },
  isPaid: {
    value: 'وضعیت پرداخت',
    group: 'status',
    true: 'پرداخت شده',
    false: 'پرداخت نشده',
    order: 10,
  },
  isDelivered: {
    value: 'وضعیت تحویل',
    group: 'status',
    true: 'تحویل داده شده',
    false: 'تحویل داده نشده',
    order: 11,
  },
  tax: { value: 'مالیات', group: 'invoice', order: 18 },
  totalAmountPayment: { value: 'مبلغ نهایی', group: 'invoice', order: 20 },
  orderDate: { value: 'تاریخ سفارش', group: 'status', order: 12 },
  paymentDate: { value: 'تاریخ پرداخت', group: 'status', order: 13 },
  deliveryDate: { value: 'تاریخ تحویل', group: 'status', order: 14 },
  trackingCode: { value: 'کد پیگیری', group: 'status', order: 15 },
}

export default async function OrderDetailsPage({ params }) {
  const { id } = params
  const authentication = await auth()
  const order = await getOrderAction(id)
  const products = await getProductsAction()
  const userInfo = await getUserAction(authentication?.user?.email)
  const combinedData = { ...order, tax: 9, ...userInfo }
  const organizedData = Object.entries(combinedData)
    .reduce((acc, [key, value]) => {
      if (aliasName[key]) {
        const result =
          typeof value === 'object' && value !== null
            ? key === 'orders'
              ? {
                  title: aliasName[key].value,
                  value: value.map(item => {
                    const product = products.find(
                      ({ _id }) => _id === item.productId,
                    )
                    const size = product.attributes.sizes.find(
                      ({ sizeId }) => sizeId === item.sizeId,
                    )
                    const color = product.attributes.colors.find(
                      ({ colorId }) => colorId === item.colorId,
                    )

                    return {
                      ...item,
                      slug: product.slug,
                      thumbnail: color.filename,
                      productName: product.name,
                      size: size.size,
                      color: color.title,
                      price: formatNumberToPersian(item.price * DOLLAR_RATE),
                      totalPrice: formatNumberToPersian(
                        item.price * item.quantity * DOLLAR_RATE,
                      ),
                    }
                  }),
                  group: aliasName[key].group,
                  order: aliasName[key].order,
                }
              : key === 'shipment'
                ? Object.entries(value).reduce((acc, [key, value]) => {
                    if (aliasName[key]) {
                      if (aliasName[key].value === 'is object') {
                        Object.entries(value).forEach(([subKey, subValue]) => {
                          if (aliasName[key][subKey]) {
                            acc.push({
                              title: aliasName[key][subKey].value,
                              value:
                                subKey === 'price'
                                  ? formatNumberToPersian(subValue)
                                  : subValue,
                              group: aliasName[key][subKey].group,
                              order: aliasName[key][subKey].order,
                            })
                          }
                        })
                      } else {
                        acc.push({
                          title: aliasName[key].value,
                          value,
                          group: aliasName[key].group,
                          order: aliasName[key].order,
                        })
                      }
                    }
                    return acc
                  }, [])
                : undefined
            : {
                title: aliasName[key].value,
                value:
                  value === null
                    ? '-'
                    : key === 'totalAmountPayment'
                      ? formatNumberToPersian(value)
                      : value,
                group: aliasName[key].group,
                order: aliasName[key].order,
                ...((value === true || value === false) && {
                  [value.toString()]: aliasName[key][value.toString()],
                }),
              }

        if (Array.isArray(result)) {
          return acc.concat(result)
        } else {
          acc.push(result)
        }
      }
      return acc
    }, [])
    .sort((a, b) => (a.order < b.order ? -1 : 1))
  const groupedByInfo = organizedData.filter(({ group }) => group === 'info')
  const groupedByShipment = organizedData.filter(
    ({ group }) => group === 'shipment',
  )
  const groupedByStatus = organizedData
    .filter(({ group }) => group === 'status')
    .map(item =>
      typeof item.value === 'number'
        ? {
            ...item,
            value: getDate(item.value, { dateStyle: 'medium' }),
          }
        : item,
    )
  const groupedByInvoice = organizedData.filter(
    ({ group }) => group === 'invoice',
  )

  return (
    <section>
      <div className="mb-4 sm:flex sm:items-center sm:gap-2">
        <Link href="/profile/orders" className="hidden sm:block">
          <ArrowRight />
        </Link>
        <span className="hidden sm:block">/</span>
        <div className="font-bold">فاکتور</div>
      </div>

      <div className="space-y-8 rounded-md bg-stone-100 p-4">
        <DisplayData title="خریدار" groupedData={groupedByInfo} />
        <DisplayData title="نحوه ارسال" groupedData={groupedByShipment} />
        <DisplayData title="وضعیت" groupedData={groupedByStatus} />

        <DisplayData title="جزئیات">
          {groupedByInvoice.map(({ title, value }) => (
            <div key={title} className="flex gap-4">
              <div className="basis-2/6 sm:basis-1/5">{title}</div>
              <div className="basis-4/6 divide-y divide-zinc-400 sm:basis-4/5">
                {Array.isArray(value)
                  ? value.map(
                      ({
                        id,
                        slug,
                        thumbnail,
                        productName,
                        color,
                        size,
                        price,
                        quantity,
                        totalPrice,
                      }) => (
                        <div
                          key={id}
                          className="relative space-y-2 !border-b border-b-zinc-400 px-2
                          py-4 text-sm sm:grid sm:grid-cols-7 sm:justify-items-center"
                        >
                          <div className="relative size-14 w-full">
                            <Image
                              src={`/images/products/${thumbnail}`}
                              alt="توپ"
                              fill
                              sizes="(min-width: 768px) 100vw, (min-width: 640px) 50vw, (min-width: 475px) 33vw, 85vw"
                              className="object-contain"
                            />
                          </div>
                          <div className="text-center xs:text-right">
                            <div>مدل {productName}</div>
                          </div>
                          <div>رنگ {color}</div>
                          <div>اندازه {size}</div>
                          <div className="text-left">{price} تومان</div>
                          <div className="text-left">{quantity} عدد</div>
                          <div className="text-left">{totalPrice} تومان</div>
                          <Link
                            href={`/products/${slug}`}
                            className="absolute right-0 top-0"
                          >
                            <ArrowUpRight
                              size={20}
                              className="inline-block text-zinc-400"
                            />
                          </Link>
                        </div>
                      ),
                    )
                  : `${value} ${title === 'مالیات' ? 'درصد' : 'تومان'}`}
              </div>
            </div>
          ))}
        </DisplayData>
      </div>
    </section>
  )
}

function DisplayData({ title = '', groupedData = [], children }) {
  return (
    <div>
      <fieldset className="border-t-2 border-black">
        <legend className="pl-4">
          <h4 className="font-bold">{title}</h4>
        </legend>
      </fieldset>

      <div className="space-y-4 p-4">
        {children
          ? children
          : groupedData.map(({ title, value, ...props }, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="basis-2/6 sm:basis-1/5">{title}</div>
                <div className="basis-4/6 sm:basis-4/5">
                  {value === true || value === false
                    ? props[value.toString()]
                    : value}
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
