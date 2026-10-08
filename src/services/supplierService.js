import { api } from './api'

function mapSupplier(row) {
  return {
    id: row.id,
    companyName: row.company_name,
    contactName: row.contact_name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    status: row.status,
  }
}

function toPayload(supplier) {
  return {
    company_name: supplier.companyName,
    contact_name: supplier.contactName,
    email: supplier.email,
    phone: supplier.phone,
    address: supplier.address,
    status: supplier.status,
  }
}

export async function fetchSuppliers() {
  const { data } = await api.get('/suppliers')

  return data.map(mapSupplier)
}

export async function createSupplier(supplier) {
  const { data } = await api.post('/suppliers', toPayload(supplier))

  return mapSupplier(data)
}

export async function updateSupplier(supplier) {
  const { data } = await api.put(
    `/suppliers/${supplier.id}`,
    toPayload(supplier),
  )

  return mapSupplier(data)
}

export async function deleteSupplier(supplierId) {
  await api.delete(`/suppliers/${supplierId}`)
}
