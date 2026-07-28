import { supabase } from './supabase'

function mapCategory(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    createdAt: row.created_at,
  }
}

export async function fetchCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, description, created_at')
    .order('name')

  if (error) throw error

  return data.map(mapCategory)
}

export async function createCategory(category) {
  const { data, error } = await supabase
    .from('categories')
    .insert({
      name: category.name,
      description: category.description,
    })
    .select('id, name, description, created_at')
    .single()

  if (error) throw error

  return mapCategory(data)
}

export async function updateCategory(category) {
  const { data, error } = await supabase
    .from('categories')
    .update({
      name: category.name,
      description: category.description,
    })
    .eq('id', category.id)
    .select('id, name, description, created_at')
    .single()

  if (error) throw error

  return mapCategory(data)
}

export async function deleteCategory(categoryId) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId)

  if (error) throw error
}