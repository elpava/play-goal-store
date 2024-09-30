'use client'

import * as React from 'react'
import clsx from 'clsx/lite'

export default function Input({
  id,
  type,
  name,
  value,
  error,
  icon,
  className,
  inputClassName,
  labelClassName,
  placeholder,
  variant = 'standard',
  disabled,
  onChange,
  onFocus,
  onBlur,
}) {
  const isTextarea = type === 'textarea'
  const Tag = isTextarea ? 'textarea' : 'input'
  const isNotTextField = !type.startsWith('text') || name === 'email'
  const isError = error && Boolean(error[name])
  const isOutlined = variant === 'outlined'
  const isStandard = variant === 'standard'
  const inputRef = React.useRef(null)

  function containerClickHandler() {
    inputRef.current.focus()
  }

  return (
    <div
      className={clsx(
        'relative mb-2 flex items-center gap-2 border-zinc-400 bg-inherit stroke-zinc-600 py-3 has-[:focus]:border-blue-400',
        isOutlined && 'border-b-[1.5px] px-1',
        isStandard && 'rounded-md border-[1.5px] px-4',
        className,
        isError && '!border-red-500',
        disabled && '!border-zinc-300 !bg-zinc-100',
      )}
      onClick={containerClickHandler}
    >
      <Tag
        id={id}
        type={type}
        name={name}
        value={value}
        className={clsx(
          'peer size-full bg-transparent caret-blue-700 focus:outline-none',
          inputClassName,
          isTextarea && 'resize-none',
          disabled && 'text-zinc-400',
        )}
        style={{ ...(isNotTextField && { direction: 'ltr' }) }}
        placeholder=""
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
        rows={isTextarea ? 8 : undefined}
      />
      {!disabled && (
        <label
          className={clsx(
            'absolute -top-1 right-1 bg-inherit text-xs text-zinc-500 duration-300', // position apply after typing/blur
            isStandard && '-top-2.5 px-1.5 font-bold',
            isOutlined && '-top-1 px-1.5',
            'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal',
            isStandard && 'peer-placeholder-shown:right-2',
            isOutlined && 'peer-placeholder-shown:right-1',
            'peer-focus-within:text-xs peer-focus-within:text-blue-600',
            isStandard &&
              'peer-focus-within:-top-1 peer-focus-within:right-2 peer-focus-within:font-bold',
            isOutlined && 'peer-focus-within:-top-1 peer-focus-within:right-1',
            labelClassName,
            isTextarea && 'peer-placeholder-shown:top-6',
            isError && 'border-red-500 !text-red-500',
          )}
        >
          {placeholder}
        </label>
      )}
      {icon}

      {isError && (
        <div className="absolute -bottom-5 right-3 text-xs text-red-500">
          {error[name]}
        </div>
      )}
    </div>
  )
}
