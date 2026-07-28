import { supabase } from './supabase'

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

export async function fetchSuppliers() {
  const { data, error } = await supabase
    .from('suppliers')
    .select(`
      id,
      company_name,
      contact_name,
      email,
      phone,
      address,
      status
    `)
    .order('company_name')

  if (error) throw error

  return data.map(mapSupplier)
}

export async function createSupplier(supplier) {
  const { data, error } = await supabase
    .from('suppliers')
    .insert({
      company_name: supplier.companyName,
      contact_name: supplier.contactName,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      status: supplier.status,
    })
    .select(`
      id,
      company_name,
      contact_name,
      email,
      phone,
      address,
      status
    `)
    .single()

  if (error) throw error

  return mapSupplier(data)
}

export async function updateSupplier(supplier) {
  const { data, error } = await supabase
    .from('suppliers')
    .update({
      company_name: supplier.companyName,
      contact_name: supplier.contactName,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      status: supplier.status,
    })
    .eq('id', supplier.id)
    .select(`
      id,
      company_name,
      contact_name,
      email,
      phone,
      address,
      status
    `)
    .single()

  if (error) throw error

  return mapSupplier(data)
}

export async function deleteSupplier(supplierId) {
  const { error } = await supabase
    .from('suppliers')
    .delete()
    .eq('id', supplierId)

  if (error) throw error
}