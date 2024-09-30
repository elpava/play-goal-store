'use client'

import * as React from 'react'
import { useMutation } from '@tanstack/react-query'
import { loginAction } from 'action/auth/login'
import {
  signUpFormSchema,
  NUMBERS_LENGTH,
  ON_FOCUS_HIDDEN_ERRORS,
  VALUES_WITHOUT_TRIMMING,
} from 'library/inputs-schema'
import Form from '@/_components/ui/common/form'
import Row from '@/_components/ui/login/row'
import Input from '@/_components/ui/common/input'
import Button from '@/_components/ui/common/button'
import FormErrorMessage from './form-error-message'
import { IdCard, Mail, LockKeyhole, Smartphone } from 'lucide-react'

export default function SignUpForm() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['pending-form'],
    mutationFn: formData => loginAction(formData),
  })

  const [signUpForm, setSignUpForm] = React.useState({
    firstName: '',
    lastName: '',
    nationalId: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  })
  const inputsError = {
    firstName: '',
    lastName: '',
    nationalId: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  }
  const isEmptyFormRef = React.useRef({
    firstName: false,
    lastName: false,
    nationalId: false,
    email: false,
    password: false,
    confirmPassword: false,
    mobile: false,
  })
  const focusedInputRef = React.useRef(null)
  const signUpResultRef = React.useRef(null)

  const validation = signUpFormSchema.safeParse({
    ...(signUpForm.firstName && { firstName: signUpForm.firstName }),
    ...(signUpForm.lastName && { lastName: signUpForm.lastName }),
    ...(signUpForm.nationalId && { nationalId: signUpForm.nationalId }),
    ...(signUpForm.email && { email: signUpForm.email }),
    ...(signUpForm.password && { password: signUpForm.password }),
    ...(signUpForm.confirmPassword && {
      confirmPassword: signUpForm.confirmPassword,
    }),
    ...(signUpForm.mobile && { mobile: signUpForm.mobile }),
  })

  validation.error?.issues.forEach(issue => {
    const { path, message } = issue
    const name = path[0]

    const isEmptyInput = isEmptyFormRef.current[name] && signUpForm[name] === ''
    if (isEmptyInput) {
      inputsError[name] = message
    } else {
      if (signUpForm[name] !== '') {
        inputsError[name] = message
        if (ON_FOCUS_HIDDEN_ERRORS[focusedInputRef.current]) {
          inputsError[focusedInputRef.current] = ''
        }
      }
    }
  })

  function changeInputHandler(e) {
    if (!e) return

    let { name, value } = e.target

    if (!VALUES_WITHOUT_TRIMMING.includes(name)) {
      value = value.trim()
    }
    if (value.length > NUMBERS_LENGTH[name]) {
      return
    }

    if (name)
      setSignUpForm(prevState => ({
        ...prevState,
        [name]: value,
      }))
  }

  function refresh(e) {
    changeInputHandler(e)
  }

  function focusInputHandler(e) {
    const { name } = e.target
    focusedInputRef.current = name
    isEmptyFormRef.current[name] = false
    signUpResultRef.current = null

    refresh()
  }

  async function submitFormHandler(e) {
    e.preventDefault()
    let isEmptyForm = false

    for (const input in signUpForm) {
      isEmptyFormRef.current[input] = signUpForm[input] === ''

      if (!isEmptyForm) isEmptyForm = signUpForm[input] === ''
    }

    if (isEmptyForm) {
      refresh({ target: e.target[0] })
      return
    }

    const formData = {
      ...signUpForm,
      firstName: signUpForm.firstName.trim(),
      lastName: signUpForm.lastName.trim(),
      state: 'sign-up',
      role: 'user',
    }

    const result = await mutateAsync(formData)
    if (result?.error) {
      const { error } = result
      signUpResultRef.current = error
      refresh()
    } else {
      setTimeout(() => {
        window.location.replace('/')
      }, 3000)
    }
  }

  return (
    <Form onSubmit={submitFormHandler}>
      <Row>
        <Input
          id="firstName"
          type="text"
          name="firstName"
          value={signUpForm.firstName}
          placeholder="نام"
          variant="outlined"
          error={inputsError}
          className="grow"
          onChange={changeInputHandler}
          onFocus={focusInputHandler}
        />
        <Input
          id="lastName"
          type="text"
          name="lastName"
          value={signUpForm.lastName}
          placeholder="نام خانوادگی"
          variant="outlined"
          error={inputsError}
          className="grow"
          onChange={changeInputHandler}
          onFocus={focusInputHandler}
        />
      </Row>
      <Input
        id="nationalId"
        type="number"
        name="nationalId"
        value={signUpForm.nationalId}
        placeholder="کد ملی"
        variant="outlined"
        error={inputsError}
        icon={<IdCard className="stroke-inherit" />}
        onChange={changeInputHandler}
        onFocus={focusInputHandler}
      />
      <Row>
        <Input
          id="password"
          type="password"
          name="password"
          value={signUpForm.password}
          placeholder="رمز عبور"
          variant="outlined"
          error={inputsError}
          icon={<LockKeyhole className="stroke-inherit" />}
          className="grow"
          onChange={changeInputHandler}
          onFocus={focusInputHandler}
        />
        <Input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={signUpForm.confirmPassword}
          placeholder="تکرار رمز عبور"
          variant="outlined"
          error={inputsError}
          icon={<LockKeyhole className="stroke-inherit" />}
          className="grow"
          onChange={changeInputHandler}
          onFocus={focusInputHandler}
        />
      </Row>
      <Row>
        <Input
          id="email"
          type="text"
          name="email"
          value={signUpForm.email}
          placeholder="ایمیل"
          variant="outlined"
          error={inputsError}
          icon={<Mail className="stroke-inherit" />}
          className="grow"
          onChange={changeInputHandler}
          onFocus={focusInputHandler}
        />
        <Input
          id="mobile"
          type="number"
          name="mobile"
          value={signUpForm.mobile}
          placeholder="موبایل"
          variant="outlined"
          error={inputsError}
          icon={<Smartphone className="stroke-inherit" />}
          className="grow"
          onChange={changeInputHandler}
          onFocus={focusInputHandler}
        />
      </Row>

      {signUpResultRef.current && (
        <FormErrorMessage type={signUpResultRef.current} />
      )}

      <Button
        label="ثبت نام"
        disabled={isPending}
        className="mt-auto bg-green-600 text-zinc-100"
      />
    </Form>
  )
}
