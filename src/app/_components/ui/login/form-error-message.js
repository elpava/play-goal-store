import { MessageCircleWarning } from 'lucide-react'
import { errorMessages } from 'library/form-messages'

export default function FormErrorMessage({ type }) {
  return (
    <label className="flex gap-4 rounded-md border-2 border-blue-900 bg-blue-100 px-4 py-2">
      <MessageCircleWarning size={23} className="shrink-0" />
      {errorMessages[type]}
    </label>
  )
}
