import { api } from './api'

export function mapProduct(row) {
  return {
    id: row.id,
    name: row.name,
    sku: row.sku,
    categoryId: row.category_id,
    category: row.category_name ?? '',
    supplierId: row.supplier_id,
    supplier: row.supplier_name ?? '',
    price: Number(row.unit_price),
    stock: row.current_stock,
    reorderLevel: row.reorder_level,
    imagePath: row.image_path,
    createdAt: row.created_at,
  }
}

function toPayload(product) {
  return {
    name: product.name,
    sku: product.sku,
    category_id: product.categoryId,
    supplier_id: product.supplierId,
    unit_price: product.price,
    current_stock: product.stock,
    reorder_level: product.reorderLevel,
    image_path: product.imagePath || null,
  }
}

export async function fetchProducts() {
  const { data } = await api.get('/products')

  return data.map(mapProduct)
}

export async function createProduct(product) {
  const { data } = await api.post('/products', toPayload(product))

  return mapProduct(data)
}

export async function updateProduct(product) {
  const { data } = await api.put(
    `/products/${product.id}`,
    toPayload(product),
  )

  return mapProduct(data)
}

export async function deleteProduct(productId) {
  await api.delete(`/products/${productId}`)
}
