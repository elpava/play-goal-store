import EditForm from '@/_components/ui/profile/edit-form'

export const metadata = {
  title: 'ویرایش',
}

export default function EditPage() {
  return (
    <section className="flex h-full flex-col">
      <h2>ویرایش مشخصات</h2>

      <EditForm />
    </section>
  )
}
