'use client'

import * as React from 'react'
import { useMutation } from '@tanstack/react-query'
import useOrders from 'hook/useOrders'
import { loginAction } from 'action/auth/login'
import { signInFormSchema } from 'library/inputs-schema'
import Form from '@/_components/ui/common/form'
import Input from '@/_components/ui/common/input'
import Button from '@/_components/ui/common/button'
import FormErrorMessage from './form-error-message'
import { Mail, LockKeyhole } from 'lucide-react'

export default function SignInForm() {
  const { ordersData } = useOrders()
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['pending-form'],
    mutationFn: formData => loginAction(formData),
  })

  const [signInForm, setSignInForm] = React.useState({
    email: '',
    password: '',
  })
  const inputsError = {
    email: '',
    password: '',
  }
  const isEmptyFormRef = React.useRef({
    email: false,
    password: false,
  })
  const focusedInputRef = React.useRef(null)
  const signInResultRef = React.useRef(null)

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
    if (!e) return

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

    refresh()
  }

  async function submitFormHandler(e) {
    e.preventDefault()
    let isEmptyForm = false

    for (const input in signInForm) {
      isEmptyFormRef.current[input] = signInForm[input] === ''

      if (!isEmptyForm) isEmptyForm = signInForm[input] === ''
    }

    if (isEmptyForm) {
      refresh({ target: e.target[0] })
      return
    }

    const lastOrderData = JSON.stringify(ordersData?.at(-1))

    const formData = {
      ...signInForm,
      orderBeforeLogin: lastOrderData,
      state: 'sign-in',
    }

    const result = await mutateAsync(formData)
    if (result?.error) {
      const { error } = result
      signInResultRef.current = error
      refresh()
    } else {
      setTimeout(() => {
        window.location.replace('/')
      }, 3000)
    }
  }

  return (
    <Form onSubmit={submitFormHandler}>
      <Input
        id="email"
        type="text"
        name="email"
        value={signInForm.email}
        placeholder="ایمیل"
        variant="outlined"
        error={inputsError}
        icon={<Mail className="stroke-inherit" />}
        onChange={changeInputHandler}
        onFocus={focusInputHandler}
      />
      <Input
        id="password"
        type="password"
        name="password"
        value={signInForm.password}
        placeholder="رمز عبور"
        variant="outlined"
        error={inputsError}
        icon={<LockKeyhole className="stroke-inherit" />}
        onChange={changeInputHandler}
        onFocus={focusInputHandler}
      />

      {signInResultRef.current && (
        <FormErrorMessage type={signInResultRef.current} />
      )}

      <Button
        label="ورود به حساب کاربری"
        disabled={isPending}
        className="mt-auto !bg-blue-600 text-zinc-100"
      />
    </Form>
  )
}
