'use server'

export async function searchQuery(state, formData) {
  const data = { search: formData.get('field-search') }
}
