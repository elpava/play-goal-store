'use client'

import * as React from 'react'
import Input from './input'
import GoToButton from '@/_components/ui/go-to-button'
import { signInFormSchema } from 'library/inputs-schema'
import { loginAction } from 'action/auth/login'
import { MessageCircleWarning } from 'lucide-react'

export default function SignInForm() {
  const [signInForm, setSignInForm] = React.useState({
    email: '',
    password: '',
  })
  const focusedInputRef = React.useRef(null)
  const isEmptyFormRef = React.useRef({
    email: false,
    password: false,
  })
  const signInResultRef = React.useRef(null)
  const inputsError = {
    email: '',
    password: '',
  }

  const validation = signInFormSchema.safeParse({
    ...(signInForm.email && { email: signInForm.email }),
    ...(signInForm.password && { password: signInForm.password }),
  })

  validation.error?.issues.forEach(issue => {
    const { path, message } = issue
    const name = path[0]
    const isEmptyInput = isEmptyFormRef.current[name] && signInForm[name] === ''

    if (isEmptyInput) {
      inputsError[name] = message
    } else {
      if (signInForm[name] !== '') {
        if (focusedInputRef.current !== 'email') {
          inputsError[name] = message
        }
      }
    }
  })

  function changeInputHandler(e) {
    const { name, value } = e.target

    setSignInForm(prevState => ({
      ...prevState,
      [name]: value.trim(),
    }))
  }

  function refresh(e) {
    changeInputHandler(e)
  }

  function focusInputHandler(e) {
    const { name } = e.target
    focusedInputRef.current = name
    isEmptyFormRef.current[name] = false
    signInResultRef.current = null

    refresh(e)
  }

  async function submitFormHandler(e) {
    e.preventDefault()

    for (const input in signInForm) {
      isEmptyFormRef.current[input] = signInForm[input] === ''
    }

    if (isEmptyFormRef.current) {
      refresh({ ...e, target: e.target[0] })
    }

    const formData = { ...signInForm, state: 'sign-in' }

    const result = await loginAction(formData)
    if (result?.error === 'invalid email') {
      signInResultRef.current = 'ایمیل یا رمز عبور اشتباه است'
      refresh({ ...e, target: e.target[0] })
    }
  }

  return (
    <form className="flex h-full flex-col gap-6" onSubmit={submitFormHandler}>
      <Input
        id="email"
        type="text"
        name="email"
        value={signInForm.email}
        placeholder="ایمیل"
        error={inputsError}
        onChange={changeInputHandler}
        onFocus={focusInputHandler}
      />
      <Input
        id="password"
        type="password"
        name="password"
        value={signInForm.password}
        placeholder="رمز عبور"
        error={inputsError}
        onChange={changeInputHandler}
        onFocus={focusInputHandler}
      />

      {signInResultRef.current && (
        <label className="flex gap-4 rounded-md border-2 border-blue-900 bg-blue-100 px-4 py-2">
          <MessageCircleWarning className="w-5" />
          {signInResultRef.current}
        </label>
      )}

      <GoToButton
        label="ورود به حساب کاربری"
        className="text-blue-9.0 mt-auto !bg-blue-600 text-zinc-100"
      />
    </form>
  )
}
