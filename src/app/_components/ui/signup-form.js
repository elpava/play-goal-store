'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import Input from './input'
import GoToButton from './go-to-button'
import FormErrorMessage from './form-error-message'
import FormSuccessMessage from './form-success-message'
import {
  signUpFormSchema,
  NUMBERS_LENGTH,
  ON_FOCUS_HIDDEN_ERRORS,
  VALUES_WITHOUT_TRIMMING,
} from 'library/inputs-schema'
import { loginAction } from 'action/auth/login'
import Row from './row'
import Form from './form'

export default function SignUpForm() {
  const { push } = useRouter()
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

    refresh(e)
  }

  async function submitFormHandler(e) {
    e.preventDefault()

    for (const input in signUpForm) {
      isEmptyFormRef.current[input] = signUpForm[input] === ''
    }

    if (isEmptyFormRef.current) {
      refresh({ target: e.target[0] })
    }

    const formData = {
      ...signUpForm,
      firstName: signUpForm.firstName.trim(),
      lastName: signUpForm.lastName.trim(),
      state: 'sign-up',
      role: 'user',
    }

    const result = await loginAction(formData)
    if (result?.error) {
      const { error } = result
      signUpResultRef.current = error
      refresh({ target: e.target[0] })
    } else {
      signUpResultRef.current = 'signup successfully'
      refresh({ target: e.target[0] })
      setTimeout(() => {
        push('/')
      }, 3000)
    }
  }

  return signUpResultRef.current === 'signup successfully' ? (
    <FormSuccessMessage type={signUpResultRef.current} icon />
  ) : (
    <Form onSubmit={submitFormHandler}>
      <Row>
        <Input
          id="firstName"
          type="text"
          name="firstName"
          value={signUpForm.firstName}
          placeholder="نام"
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
        error={inputsError}
        onChange={changeInputHandler}
        onFocus={focusInputHandler}
      />
      <Input
        id="email"
        type="text"
        name="email"
        value={signUpForm.email}
        placeholder="ایمیل"
        error={inputsError}
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
          error={inputsError}
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
          error={inputsError}
          className="grow"
          onChange={changeInputHandler}
          onFocus={focusInputHandler}
        />
      </Row>
      <Input
        id="mobile"
        type="number"
        name="mobile"
        value={signUpForm.mobile}
        placeholder="موبایل"
        error={inputsError}
        onChange={changeInputHandler}
        onFocus={focusInputHandler}
      />

      {signUpResultRef.current && (
        <FormErrorMessage type={signUpResultRef.current} />
      )}

      <GoToButton
        label="ثبت حساب کاربری جدید"
        className="mt-auto bg-green-600 text-zinc-100"
      />
    </Form>
  )
}
