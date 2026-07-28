import { supabase } from './supabase'

const productSelection = `
  id,
  name,
  sku,
  unit_price,
  current_stock,
  reorder_level,
  image_path,
  created_at,
  category_id,
  supplier_id,
  categories (
    name
  ),
  suppliers (
    company_name
  )
`

function mapProduct(row) {
  return {
    id: row.id,
    name: row.name,
    sku: row.sku,
    categoryId: row.category_id,
    category: row.categories?.name ?? '',
    supplierId: row.supplier_id,
    supplier: row.suppliers?.company_name ?? '',
    price: Number(row.unit_price),
    stock: row.current_stock,
    reorderLevel: row.reorder_level,
    imagePath: row.image_path,
    createdAt: row.created_at,
  }
}

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(productSelection)
    .order('name')

  if (error) throw error

  return data.map(mapProduct)
}

export async function createProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert({
      name: product.name,
      sku: product.sku,
      category_id: product.categoryId,
      supplier_id: product.supplierId,
      unit_price: product.price,
      current_stock: product.stock,
      reorder_level: product.reorderLevel,
      image_path: product.imagePath || null,
    })
    .select(productSelection)
    .single()

  if (error) throw error

  return mapProduct(data)
}

export async function updateProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .update({
      name: product.name,
      sku: product.sku,
      category_id: product.categoryId,
      supplier_id: product.supplierId,
      unit_price: product.price,
      current_stock: product.stock,
      reorder_level: product.reorderLevel,
      image_path: product.imagePath || null,
    })
    .eq('id', product.id)
    .select(productSelection)
    .single()

  if (error) throw error

  return mapProduct(data)
}

export async function deleteProduct(productId) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)

  if (error) throw error
}