import clsx from 'clsx/lite'

export default function Form({ className, onSubmit, children }) {
  return (
    <form
      className={clsx('flex h-full flex-col gap-y-6 bg-inherit', className)}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  )
}
