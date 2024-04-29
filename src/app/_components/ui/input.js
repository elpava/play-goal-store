import clsx from 'clsx'

export default function Input({
  id,
  type,
  name,
  value,
  error,
  className,
  inputClassName,
  placeholder,
  onChange,
  onFocus,
  onBlur,
}) {
  const isError = error && Boolean(error[name])

  return (
    <div
      className={clsx(
        'relative h-fit rounded-md border border-transparent bg-white p-2',
        className,
        { '!border-red-500': isError },
      )}
    >
      {isError && (
        <span className="absolute -bottom-5 right-3 text-xs text-red-500">
          {error[name]}
        </span>
      )}
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={clsx(
          'size-full bg-transparent font-sans caret-blue-700 focus:outline-none',
          inputClassName,
        )}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
}
