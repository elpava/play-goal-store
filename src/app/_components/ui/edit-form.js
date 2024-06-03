'use client'

import * as React from 'react'
import { useSession } from 'next-auth/react'
import updateUserAction from 'action/users/update-user'
import {
  editProfileFormSchema,
  NUMBERS_LENGTH,
  ON_FOCUS_HIDDEN_ERRORS,
  VALUES_WITHOUT_TRIMMING,
} from 'library/inputs-schema'
import Form from './form'
import Row from './row'
import Input from '@/_components/ui/input'
import FormErrorMessage from './form-error-message'
import FormSuccessMessage from './form-success-message'
import Button from '@/_components/ui/button'

export default function EditForm() {
  const { data } = useSession()
  const [editForm, setEditForm] = React.useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  })
  const isEmptyFormRef = React.useRef(null)
  const focusedInputRef = React.useRef(null)
  const editResultRef = React.useRef(null)
  const inputsError = {
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  }

  const validation = editProfileFormSchema.safeParse({ ...editForm })

  validation.error?.issues.forEach(issue => {
    const { path, message } = issue
    const name = path[0]

    if (editForm[name] !== '') {
      inputsError[name] = message
      if (ON_FOCUS_HIDDEN_ERRORS[focusedInputRef.current]) {
        inputsError[focusedInputRef.current] = ''
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
      setEditForm(prevState => ({
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
    isEmptyFormRef.current = null
    editResultRef.current = null

    refresh()
  }

  async function submitFormHandler(e) {
    e.preventDefault()
    let emptyform = true
    let formData = { email: data?.user.email }

    for (const input in editForm) {
      if (editForm[input] !== '') {
        emptyform = false
        formData[input] = editForm[input]
      }
    }
    if (emptyform) {
      isEmptyFormRef.current = 'empty form'
      refresh({ target: e.target[0] })
      return
    }

    await updateUserAction(formData)
    editResultRef.current = 'updated successfully'
    refresh({ ...e, target: e.target[0] })
  }

  return editResultRef.current === 'updated successfully' ? (
    <FormSuccessMessage type="updated successfully" />
  ) : (
    <Form className="!bg-white" onSubmit={submitFormHandler}>
      <Input
        id="firstName"
        type="text"
        name="firstName"
        value={editForm.firstName}
        placeholder="نام"
        error={inputsError}
        onChange={changeInputHandler}
        onFocus={focusInputHandler}
      />
      <Input
        id="lastName"
        type="text"
        name="lastName"
        value={editForm.lastName}
        placeholder="نام خانوادگی"
        error={inputsError}
        onChange={changeInputHandler}
        onFocus={focusInputHandler}
      />
      <Row>
        <Input
          id="password"
          type="password"
          name="password"
          value={editForm.password}
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
          value={editForm.confirmPassword}
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
        value={editForm.mobile}
        placeholder="موبایل"
        error={inputsError}
        onChange={changeInputHandler}
        onFocus={focusInputHandler}
      />

      {isEmptyFormRef.current && (
        <FormErrorMessage type={isEmptyFormRef.current} />
      )}

      <Button
        label="ثبت ویرایش"
        className="mt-auto bg-green-600 text-zinc-100"
      />
    </Form>
  )
}
