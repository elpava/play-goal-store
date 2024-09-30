import FadeInOut from '@/_components/ui/animation/fade-in-out'
import { MessageCircleWarning } from 'lucide-react'
import { errorMessages } from 'library/form-messages'

export default function FormErrorMessage({ type }) {
  return (
    <FadeInOut>
      <label className="flex gap-4 rounded-md border-[1.5px] border-blue-900 bg-blue-100/20 bg-[url('/images/noise.png')] bg-[length:800%_100%] p-2">
        <MessageCircleWarning size={24} className="shrink-0 stroke-[1.5px]" />
        {errorMessages[type]}
      </label>
    </FadeInOut>
  )
}
