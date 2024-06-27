import * as React from 'react'
import { successMessages } from 'library/form-messages'
import { Loader } from 'lucide-react'

export default function FormSuccessMessage({ type, icon }) {
  return (
    <div className="grid h-full grow place-items-center rounded-md border border-lime-500 p-10 text-center font-bold italic text-lime-700">
      {successMessages[type]}{' '}
      {React.isValidElement(icon) ? (
        icon
      ) : icon ? (
        <Loader className="animate-spin" />
      ) : null}
    </div>
  )
}
