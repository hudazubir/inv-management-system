import { api } from './api'

function mapCategory(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    createdAt: row.created_at,
  }
}

function toPayload(category) {
  return {
    name: category.name,
    description: category.description,
  }
}

export async function fetchCategories() {
  const { data } = await api.get('/categories')

  return data.map(mapCategory)
}

export async function createCategory(category) {
  const { data } = await api.post('/categories', toPayload(category))

  return mapCategory(data)
}

export async function updateCategory(category) {
  const { data } = await api.put(
    `/categories/${category.id}`,
    toPayload(category),
  )

  return mapCategory(data)
}

export async function deleteCategory(categoryId) {
  await api.delete(`/categories/${categoryId}`)
}
