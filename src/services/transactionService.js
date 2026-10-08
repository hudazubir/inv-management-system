import { api } from './api'
import { mapProduct } from './productService'

function mapTransaction(row) {
  return {
    id: row.id,
    reference: row.reference,
    productId: row.product_id,
    type: row.type,
    quantity: row.quantity,
    note: row.note ?? '',
    performedBy: row.performed_by ?? '',
    createdAt: row.created_at,
  }
}

export async function fetchTransactions() {
  const { data } = await api.get('/transactions')

  return data.map(mapTransaction)
}

export async function createTransaction(transaction) {
  const { data, product } = await api.post('/transactions', {
    product_id: transaction.productId,
    type: transaction.type,
    quantity: transaction.quantity,
    note: transaction.note,
  })

  return {
    transaction: mapTransaction(data),
    product: mapProduct(product),
  }
}
