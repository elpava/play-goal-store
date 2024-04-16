'use client'

import Link from 'next/link'
import Icon from './icon'
import icons from 'library/icons-name'

const { emptyBag } = icons

export default function EmptyCart() {
  return (
    <div className="py-4 text-center sm:grid sm:h-[80svh] sm:place-items-center">
      <div className="space-y-2">
        <div className="mb-6">
          <Icon name={emptyBag} className="w-52 sm:w-72" />
        </div>

        <h3 className="text-lg sm:text-3xl">سبد خرید شما خالی است.</h3>
        <p className="mx-auto w-10/12 text-sm text-zinc-500 sm:w-8/12 sm:text-base">
          به نظر می رسد هیچ توپی به سبد خرید خود اضافه نکرده اید. می‌توانید وارد{' '}
          <Link
            href="/products"
            className="relative mx-0.5 border-b-2 border-b-lime-400 font-bold"
          >
            محصولات
          </Link>{' '}
          شده و توپ مورد علاقه خود را انتخاب نمایید.
        </p>
      </div>
    </div>
  )
}
