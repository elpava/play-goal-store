import clsx from 'clsx/lite'
import { DOLLAR_RATE } from 'library/constants'
import { formatNumberToPersian } from 'library/helper-functions'

export default function Price({ className, price }) {
  return (
    <div
      className={clsx(
        'relative rounded-md bg-lime-300 p-1.5 md:basis-auto',
        className,
      )}
    >
      <div className="text-sm font-bold text-zinc-800 md:text-lg">
        {formatNumberToPersian(price * DOLLAR_RATE)}
      </div>
      <div className="absolute -top-3 left-0 rounded-md bg-zinc-900 px-0.5 pb-0.5 text-xs">
        تومان
      </div>
    </div>
  )
}
