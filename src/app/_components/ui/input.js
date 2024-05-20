'use client'

import * as React from 'react'
import clsx from 'clsx'

export default function Input({
  id,
  type,
  name,
  value,
  error,
  className,
  inputClassName,
  labelClassName,
  placeholder,
  disabled,
  onChange,
  onFocus,
  onBlur,
}) {
  const isError = error && Boolean(error[name])
  const inputRef = React.useRef(null)

  function continerClickHandler() {
    inputRef.current.focus()
  }

  return (
    <div
      className={clsx(
        'relative h-fit rounded-md border-[1.5px] border-zinc-400 bg-inherit px-4 py-3 has-[:focus]:border-blue-400',
        className,
        { '!border-red-500': isError },
        { '!border-zinc-300 !bg-zinc-100': disabled },
      )}
      onClick={continerClickHandler}
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
        className={clsx(
          'peer size-full bg-transparent font-sans caret-blue-700 focus:outline-none',
          inputClassName,
          { 'text-zinc-400': disabled },
        )}
        placeholder=""
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
      />

      {!disabled && (
        <label
          className={clsx(
            'absolute right-4 top-2 z-10 -translate-y-4 transform bg-inherit px-2 text-xs font-bold text-zinc-500 duration-300 peer-placeholder-shown:right-4 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:translate-x-2 peer-focus:px-2 peer-focus:text-xs peer-focus:text-blue-600',
            labelClassName,
            { 'border-red-500 !text-red-500': isError },
          )}
        >
          {placeholder}
        </label>
      )}
    </div>
  )
}
