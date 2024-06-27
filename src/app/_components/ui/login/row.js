import clsx from 'clsx/lite'

export default function Row({ className, children }) {
  return (
    <div
      className={clsx('flex flex-col gap-6 bg-inherit sm:flex-row', className)}
    >
      {children}
    </div>
  )
}
