'use client'

import * as React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getOrdersAction } from 'action/orders/get-orders'
import updateShipmentOrderAction from 'action/orders/update-shipment-order'
import GoToButton from './go-to-button'
import clsx from 'clsx'
import { Loader, SquarePen } from 'lucide-react'
import Empty from './empty'
import successfulPaymentOrderAction from 'action/orders/successful-payment-order'
import failurePaymentOrderAction from 'action/orders/failure-payment-order'
import resetPaymentOrderAction from 'action/orders/reset-payment-order'
import Icon from './icon'
import icons from 'library/icons-name'

const ONE_HOUR = 60 * 60 * 1000
const ONE_DAY = 24 * ONE_HOUR

const { post, tipax, motorcycleCourier, snapp } = icons
const shipping = [
  {
    id: 'post',
    icon: post,
    name: 'پست',
    deliveryDay: ONE_DAY,
    sender: null,
    price: 30_000,
  },
  {
    id: 'tipax',
    icon: tipax,
    name: 'تیپاکس',
    deliveryDay: ONE_DAY * 2,
    sender: null,
    price: 45_000,
  },
  {
    id: 'motorcycle-courier',
    icon: motorcycleCourier,
    name: 'پیک موتوری',
    deliveryDay: null,
    sender: 'seller',
    price: 80_000,
  },
  {
    id: 'snapp-box',
    icon: snapp,
    name: 'اسنپ باکس',
    deliveryDay: null,
    sender: 'user',
    price: null,
  },
]
const TAX_RATE = 9
const DOLLAR_RATE = 56_000

export default function PaymentPreview() {
  const [unknownUserId, setUnknownUserId] = React.useState(null)
  const queryClient = useQueryClient()
  const {
    data: ordersData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getOrdersAction(unknownUserId),
    enabled: Boolean(unknownUserId),
  })
  const {
    mutate: mutateToRegisterShipmentForm,
    isSuccess: isRegisteredSuccessfully,
  } = useMutation({
    mutationFn: ({ orderId, shipmentForm, totalAmountPayment }) =>
      updateShipmentOrderAction(orderId, shipmentForm, totalAmountPayment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
  const { mutate: mutateToSuccessfulPayment } = useMutation({
    mutationFn: ({ orderId, paymentDate, deliveryDate }) =>
      successfulPaymentOrderAction(orderId, paymentDate, deliveryDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
  const { mutate: mutateToFailurePayment } = useMutation({
    mutationFn: ({ orderId }) => failurePaymentOrderAction(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
  const { mutate: mutateToResetPayment } = useMutation({
    mutationFn: ({ orderId }) => resetPaymentOrderAction(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
  const [shipmentForm, setShipmentForm] = React.useState({
    shipmentType: shipping[0],
    address: '',
    zipCode: '',
    description: '',
  })
  const [shippingTypeIdx, setShippingTypeIdx] = React.useState(0)
  const [isShipmentData, setIsShipmentData] = React.useState(false)
  const [paymentState, setPaymentState] = React.useState('idle')
  let lastOrderData
  let ordersTotalAmount
  let totalAmountPayment

  let isLastOrderData
  let isLoadingShipmentForm = true

  if (isSuccess) {
    isLoadingShipmentForm = isLoading
    lastOrderData = ordersData?.at(-1)
    isLastOrderData = lastOrderData?.orders.length > 0 && !lastOrderData.isPaid

    if (isLastOrderData) {
      ordersTotalAmount = lastOrderData.orders.reduce(
        (acc, { price, quantity }) => {
          return acc + price * quantity
        },
        0,
      )
      ordersTotalAmount *= DOLLAR_RATE
      totalAmountPayment = ordersTotalAmount
      totalAmountPayment += ordersTotalAmount * (TAX_RATE / 100)
      totalAmountPayment += shipping[shippingTypeIdx].price
    }
  }

  React.useEffect(() => {
    if (window !== undefined) {
      const userId = localStorage.getItem('pg-user-id')
      setUnknownUserId(userId)
    }

    // TODO read/write from local storage for cart
  }, [])

  React.useEffect(() => {
    if (isLastOrderData) {
      if (!isEmptyObject(lastOrderData.shipment)) {
        setIsShipmentData(true)
        setShipmentForm(lastOrderData.shipment)
      }
    }
    // TODO read/write from local storage for cart
  }, [isLastOrderData, isRegisteredSuccessfully, lastOrderData])

  function changeShippingFormHandler(e) {
    const isZipCode = e.target.name === 'zipCode'
    let zipCodeValue
    const shippingIdx = shipping.findIndex(item => item.name === e.target.value)
    const isShipping = shippingIdx > -1

    if (isZipCode) {
      if (e.target.value.length < 11) {
        zipCodeValue = e.target.value
      } else {
        return
      }
    }

    if (isShipping) {
      setShippingTypeIdx(shippingIdx)
      setShipmentForm({
        ...shipmentForm,
        [e.target.name]: shipping[shippingIdx],
      })
    } else {
      setShipmentForm({
        ...shipmentForm,
        [e.target.name]: isZipCode ? zipCodeValue : e.target.value,
      })
    }
  }

  function clickEditButtonHandler() {
    setIsShipmentData(false)
  }

  function submitShippingFormHandler(e) {
    e.preventDefault()

    const formattedShipmentForm = {
      ...shipmentForm,
      address: shipmentForm.address,
      description: shipmentForm.description,
    }

    mutateToRegisterShipmentForm({
      orderId: lastOrderData._id,
      shipmentForm: formattedShipmentForm,
      totalAmountPayment,
    })
  }

  function clickResetPaymentStateHandler() {
    mutateToResetPayment({ orderId: lastOrderData._id })
    setPaymentState('idle')
    backToTop()
  }

  function clickSuccessfulPaymentHandler() {
    const now = new Date().getTime()
    const deliveryDay = shipmentForm.shipmentType.deliveryDay
      ? shipmentForm.shipmentType.deliveryDay
      : ONE_HOUR * 4

    mutateToSuccessfulPayment({
      orderId: lastOrderData._id,
      paymentDate: now,
      deliveryDate: now + deliveryDay,
    })
    setPaymentState('success')
    backToTop()
  }

  function clickFailPaymentHandler() {
    mutateToFailurePayment({ orderId: lastOrderData._id })
    setPaymentState('failure')
    backToTop()
  }

  return (
    <section className="p-2">
      <div className="px-2 pb-2 pt-20 sm:px-40">
        {paymentState === 'idle' ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="rounded-lg bg-gray-100 p-2 shadow-md shadow-gray-300 sm:basis-9/12 sm:p-4">
              {isLoadingShipmentForm ? (
                <div className="h-[80svh]">در حال بارگذاری...</div>
              ) : isLastOrderData ? (
                <>
                  <div className="m-2 text-2xl sm:text-4xl">
                    <h2>پرداخت</h2>
                  </div>

                  <hr className="my-4 sm:my-6" />

                  <form
                    className="space-y-8"
                    onSubmit={submitShippingFormHandler}
                  >
                    <div>
                      <h2 className="m-2 text-xl sm:text-2xl">
                        نحوه ارسال{' '}
                        <span className="text-base text-red-500">*</span>
                        <span className="mr-2 text-sm font-bold text-zinc-500">
                          (روزهای اداری)
                        </span>
                      </h2>

                      <ul className="mb-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                        {shipping.map(
                          ({ id, icon, name, price, deliveryDay }, idx) => (
                            <li
                              key={name}
                              className={clsx(
                                'grow cursor-pointer rounded-lg border *:cursor-pointer sm:m-0 sm:basis-1/3',
                                {
                                  'border-zinc-400': idx !== shippingTypeIdx,
                                  'border-blue-500 outline outline-2 outline-offset-2 outline-blue-600':
                                    idx === shippingTypeIdx,
                                  'border-zinc-500 outline outline-2 outline-offset-2 outline-zinc-600':
                                    idx === shippingTypeIdx && isShipmentData,
                                  'cursor-default *:cursor-default':
                                    isShipmentData,
                                },
                              )}
                            >
                              <label
                                htmlFor={id}
                                className="flex w-full items-center gap-2 p-2 pr-4"
                              >
                                <input
                                  className="hidden h-4"
                                  id={id}
                                  type="radio"
                                  value={name}
                                  name="shipmentType"
                                  checked={idx === shippingTypeIdx}
                                  onChange={changeShippingFormHandler}
                                  disabled={isShipmentData}
                                />
                                <div className="basis-2/12">
                                  <Icon name={icon} className="w-full" />
                                </div>

                                <div className="basis-10/12">
                                  <span className="flex items-center">
                                    {name} -{' '}
                                    {price
                                      ? `${formateNumber(price)} تومان`
                                      : 'ارسال توسط خریدار'}
                                  </span>

                                  <span className="text-sm text-zinc-500">
                                    {deliveryDay
                                      ? `دریافت ${
                                          new Intl.DateTimeFormat('fa-IR', {
                                            weekday: 'long',
                                          }).format(
                                            new Date().getTime() + deliveryDay,
                                          ) === 'جمعه'
                                            ? (deliveryDay + ONE_DAY) / ONE_DAY
                                            : deliveryDay / ONE_DAY
                                        } روز بعد در تاریخ ${
                                          new Intl.DateTimeFormat('fa-IR', {
                                            weekday: 'long',
                                          }).format(
                                            new Date().getTime() + deliveryDay,
                                          ) === 'جمعه'
                                            ? new Intl.DateTimeFormat('fa-IR', {
                                                month: 'long',
                                                day: 'numeric',
                                                weekday: 'long',
                                              }).format(
                                                new Date().getTime() +
                                                  deliveryDay +
                                                  ONE_DAY,
                                              )
                                            : new Intl.DateTimeFormat('fa-IR', {
                                                month: 'long',
                                                day: 'numeric',
                                                weekday: 'long',
                                              }).format(
                                                new Date().getTime() +
                                                  deliveryDay,
                                              )
                                        }`
                                      : 'بین ساعت 9:00 تا 16:00'}
                                  </span>
                                </div>
                              </label>
                            </li>
                          ),
                        )}
                      </ul>

                      <div className="text-sm text-zinc-600">
                        توجه: ارسال سفارش در روزهای تعطیل، در اولین روز اداری
                        بعد از تعطیلی انجام خواهد شد.
                      </div>
                    </div>

                    <div>
                      <h2 className="m-2 text-xl sm:text-2xl">
                        آدرس پستی{' '}
                        <span className="text-base text-red-500">*</span>
                      </h2>

                      <textarea
                        className="w-full resize-none rounded-lg border-transparent p-3 focus:outline-blue-600 disabled:bg-zinc-200 sm:text-lg"
                        name="address"
                        cols="30"
                        rows="4"
                        value={shipmentForm.address}
                        required
                        placeholder="استان، شهر..."
                        disabled={isShipmentData}
                        onChange={changeShippingFormHandler}
                      />
                    </div>

                    <div>
                      <h2 className="m-2 text-xl sm:text-2xl">
                        کد پستی{' '}
                        <span className="text-base text-red-500">*</span>
                      </h2>

                      <input
                        className="w-full rounded-lg p-3 focus:outline-blue-600 disabled:bg-zinc-200"
                        type="number"
                        name="zipCode"
                        value={shipmentForm.zipCode}
                        required
                        disabled={isShipmentData}
                        onChange={changeShippingFormHandler}
                      />
                    </div>

                    <div>
                      <h2 className="m-2 text-xl sm:text-2xl">توضیحات</h2>

                      <textarea
                        className="w-full resize-none rounded-lg border-transparent p-3 focus:outline-blue-600 sm:text-lg"
                        name="description"
                        cols="30"
                        rows="4"
                        value={shipmentForm.description}
                        disabled={isShipmentData}
                        placeholder="توضیحات مورد نظر خود را می‌توانید در اینجا وارد نمایید"
                        onChange={changeShippingFormHandler}
                      />
                    </div>

                    <div
                      className={clsx('sm:text-left', {
                        'font-bold ': isShipmentData,
                        'font-bold text-lime-500': isRegisteredSuccessfully,
                      })}
                    >
                      {isShipmentData ? (
                        <div className="flex cursor-pointer justify-between">
                          {isRegisteredSuccessfully ? (
                            <span>✓ فرم با موفقیت ثبت شد.</span>
                          ) : (
                            <span>آخرین اطلاعات ثبت شده.</span>
                          )}

                          <span onClick={clickEditButtonHandler}>
                            ویرایش
                            <SquarePen className="mr-1 inline-block w-4" />
                          </span>
                        </div>
                      ) : (
                        <GoToButton
                          type="submit"
                          label="ثبت"
                          className="sm:w-2/12"
                        />
                      )}
                    </div>
                  </form>
                </>
              ) : (
                <Empty />
              )}
            </div>

            <div
              className={clsx(
                'rounded-lg bg-slate-100 p-2 shadow-md shadow-slate-300 sm:sticky sm:left-0 sm:top-4 sm:basis-3/12 ',
                { '[&>:last-child]:mt-10': !isLoading },
              )}
            >
              {isLoading ? (
                <div className="grid h-72 place-items-center">
                  <Loader className="animate-spin" />
                </div>
              ) : (
                <>
                  <div className="divide-y-2 divide-slate-300 rounded-lg border-2 border-slate-300 *:p-2">
                    <div className="flex justify-between">
                      <span>مبلغ کل: </span>

                      <span>
                        {isLastOrderData ? (
                          <Tag>{formateNumber(ordersTotalAmount)} تومان</Tag>
                        ) : (
                          <span>—</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>مالیات: </span>
                      {isLastOrderData ? (
                        <Tag>٪{TAX_RATE}</Tag>
                      ) : (
                        <span>—</span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span>کرایه: </span>

                      {isLastOrderData ? (
                        <Tag>
                          {shipping[shippingTypeIdx].price !== null
                            ? formateNumber(shipping[shippingTypeIdx].price)
                            : '-'}
                        </Tag>
                      ) : (
                        <span>—</span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span>مبلغ نهایی: </span>

                      {isLastOrderData ? (
                        <Tag>{formateNumber(totalAmountPayment)} تومان</Tag>
                      ) : (
                        <span>—</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <GoToButton
                      label="پرداخت موفق"
                      disabled={!isShipmentData}
                      onClick={clickSuccessfulPaymentHandler}
                    />
                    <GoToButton
                      className="bg-red-500"
                      label="پرداخت ناموفق"
                      disabled={!isShipmentData}
                      onClick={clickFailPaymentHandler}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ) : paymentState === 'success' ? (
          <div className="space-y-4">
            <SuccessPayment orderData={lastOrderData} />

            <GoToButton
              className="bg-blue-400"
              label="برگشت به حالت پرداخت"
              onClick={clickResetPaymentStateHandler}
            />
          </div>
        ) : paymentState === 'failure' ? (
          <div className="space-y-4">
            <FailurePayment orderData={lastOrderData} />

            <GoToButton
              className="bg-blue-400"
              label="برگشت به حالت پرداخت"
              onClick={clickResetPaymentStateHandler}
            />
          </div>
        ) : (
          <div>وضعیت تعریف نشده</div>
        )}
      </div>
    </section>
  )
}

function Tag({ children }) {
  return <span className="font-bold">{children}</span>
}

function SuccessPayment({ orderData }) {
  if (!orderData) {
    return (
      <div className="h-[80svh] space-y-40 rounded-lg bg-gray-200 p-4 sm:h-[50svh]">
        <h2 className="text-lg">مثلاً در حال پرداخت 😁</h2>

        <div className="animate-pulse text-center text-9xl">💰</div>
      </div>
    )
  }

  const {
    totalAmountPayment,
    shipment,
    paymentDate,
    deliveryDate,
    trackingCode,
  } = orderData
  const { shipmentType, address, description } = shipment
  const { name, sender } = shipmentType

  const formattedPaymentDate = new Intl.DateTimeFormat('fa-IR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(paymentDate))

  const formattedDeliveryDate = new Intl.DateTimeFormat('fa-IR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(new Date(deliveryDate))

  return (
    <div className="rounded-lg border-4 border-dashed border-lime-500 p-4 text-center">
      <h2 className="mb-6 rounded-lg border-2 border-lime-500 bg-lime-300 p-4 text-lg font-bold text-lime-800">
        $علی$ عزیز
        <br />
        خرید شما با موفقیت ثبت گردید.
        <br />
        <span className="mt-4 inline-block text-xl font-bold">
          کد پیگیری:{' '}
          <span className="font-sans uppercase underline">{trackingCode}</span>
        </span>
      </h2>

      <div className="rounded-lg border-2 border-slate-500 bg-slate-200 p-4">
        <p>
          {`سفارش شما به مبلغ ${formateNumber(totalAmountPayment)} تومان
        در ${formattedPaymentDate.replace('، ', '، ساعت ')} ثبت گردید.`}
        </p>
        <p className="sm:mx-auto sm:w-1/2">
          {sender === 'seller'
            ? `این سفارش توسط ${name} بین ساعت 10:00 تا 16:00 به آدرس ${address} ارسال خواهد شد.`
            : sender === 'user'
              ? `برای دریافت سفارش خود می‌توانید با استفاده از سرویس ${name} بین ساعت 9:00 تا 16:00 اقدام نمایید.`
              : `ارسال سفارش اگر تا قبل از ساعت 16 ثبت شده باشد تا تاریخ ${formattedDeliveryDate} توسط ${shipmentType.name} تحویل شما داده خواهد شد، در غیر اینصورت یک روز به زمان قید شده اضافه خواهد شد.`}
        </p>
        <p>
          یادداشت شما:{' '}
          {description ? (
            <span className="rounded-md bg-slate-300 px-1 italic">
              {description}
            </span>
          ) : (
            'یادداشتی برای ما ارسال نشده است.'
          )}
        </p>

        <hr className="my-4 border-t-2 border-dashed border-t-slate-400 sm:mx-auto sm:w-1/2" />

        <p className="text-sm">
          با تشکر از خرید شما 🙏🏼 و به امید دیدار دوباره 🌹
        </p>
      </div>
    </div>
  )
}

function FailurePayment({ orderData }) {
  if (!orderData) {
    return (
      <div className="h-[80svh] space-y-40 rounded-lg bg-gray-200 p-4 sm:h-[50svh]">
        <h2 className="text-lg">مثلاً خطا در پرداخت 😐</h2>

        <div className="animate-pulse text-center text-9xl">❌</div>
      </div>
    )
  }

  const { totalAmountPayment } = orderData

  return (
    <div className="rounded-lg border-4 border-dashed border-red-500 p-4 text-center">
      <h2 className="mb-6 rounded-lg border-2 border-red-500 bg-red-300 p-4 text-lg font-bold text-red-800">
        $علی$ عزیز
        <br />
        خطایی در پرداخت شما رخ داده است.
      </h2>

      <div className="rounded-lg border-2 border-slate-500 bg-slate-200 p-4">
        <p>{`در پرداخت سفارش به مبلغ ${formateNumber(totalAmountPayment)} تومان خطایی ایجاد شده است. در صورت کسر از حساب، طی 72 ساعت آینده مبلغ کسر شده به حساب شما برگشت داده خواهد شد.`}</p>
      </div>
    </div>
  )
}

function formateNumber(number) {
  return Intl.NumberFormat('fa').format(number)
}

function isEmptyObject(obj) {
  for (const key in obj) {
    return false
  }

  return true
}

function backToTop() {
  if (window !== undefined) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
