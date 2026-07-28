import { ref } from 'vue'
import { defineStore } from 'pinia'

import { initialTransactions } from '@/data/transactions'

import {
  createCategory as createCategoryRecord,
  deleteCategory as deleteCategoryRecord,
  fetchCategories,
  updateCategory as updateCategoryRecord,
} from '@/services/categoryService'

import {
  createSupplier as createSupplierRecord,
  deleteSupplier as deleteSupplierRecord,
  fetchSuppliers,
  updateSupplier as updateSupplierRecord,
} from '@/services/supplierService'


import {
  createProduct as createProductRecord,
  deleteProduct as deleteProductRecord,
  fetchProducts,
  updateProduct as updateProductRecord,
} from '@/services/productService'

export const useInventoryStore = defineStore('inventory', () => {
  const products = ref([])
  const categories = ref([])
  const suppliers = ref([])
  const transactions = ref([...initialTransactions])

  //categories
  async function loadCategories() {
    categories.value = await fetchCategories()
  }
  
  async function addCategory(categoryData) {
    const category = await createCategoryRecord(categoryData)
  
    categories.value.push(category)
    categories.value.sort((a, b) => a.name.localeCompare(b.name))
  
    return category
  }
  
  async function editCategory(categoryData) {
    const updatedCategory = await updateCategoryRecord(categoryData)
  
    const categoryIndex = categories.value.findIndex(
      (category) => category.id === updatedCategory.id,
    )
  
    if (categoryIndex !== -1) {
      categories.value[categoryIndex] = updatedCategory
    }
  
    categories.value.sort((a, b) => a.name.localeCompare(b.name))
  
    return updatedCategory
  }
  
  async function removeCategory(categoryId) {
    await deleteCategoryRecord(categoryId)
  
    categories.value = categories.value.filter(
      (category) => category.id !== categoryId,
    )
  }


  //suppliers
  async function loadSuppliers() {
    suppliers.value = await fetchSuppliers()
  }
  
  async function addSupplier(supplierData) {
    const supplier = await createSupplierRecord(supplierData)
  
    suppliers.value.push(supplier)
    suppliers.value.sort((a, b) =>
      a.companyName.localeCompare(b.companyName),
    )
  
    return supplier
  }
  
  async function editSupplier(supplierData) {
    const updatedSupplier = await updateSupplierRecord(supplierData)
  
    const supplierIndex = suppliers.value.findIndex(
      (supplier) => supplier.id === updatedSupplier.id,
    )
  
    if (supplierIndex !== -1) {
      suppliers.value[supplierIndex] = updatedSupplier
    }
  
    suppliers.value.sort((a, b) =>
      a.companyName.localeCompare(b.companyName),
    )
  
    return updatedSupplier
  }
  
  async function removeSupplier(supplierId) {
    await deleteSupplierRecord(supplierId)
  
    suppliers.value = suppliers.value.filter(
      (supplier) => supplier.id !== supplierId,
    )
  }

  //product
  async function loadProducts() {
    products.value = await fetchProducts()
  }
  
  function resolveProductRelationships(productData) {
    const category = categories.value.find(
      (item) => item.name === productData.category,
    )
  
    const supplier = suppliers.value.find(
      (item) => item.companyName === productData.supplier,
    )
  
    if (!category) {
      throw new Error('The selected category could not be found.')
    }
  
    if (!supplier) {
      throw new Error('The selected supplier could not be found.')
    }
  
    return {
      categoryId: category.id,
      supplierId: supplier.id,
    }
  }
  
  async function addProduct(productData) {
    const relationships = resolveProductRelationships(productData)
  
    const product = await createProductRecord({
      ...productData,
      ...relationships,
    })
  
    products.value.push(product)
    products.value.sort((a, b) => a.name.localeCompare(b.name))
  
    return product
  }
  
  async function editProduct(productData) {
    const relationships = resolveProductRelationships(productData)
  
    const existingProduct = products.value.find(
      (product) => product.id === productData.id,
    )
  
    const updatedProduct = await updateProductRecord({
      ...productData,
      ...relationships,
      imagePath:
        productData.imagePath ?? existingProduct?.imagePath ?? null,
    })
  
    const productIndex = products.value.findIndex(
      (product) => product.id === updatedProduct.id,
    )
  
    if (productIndex !== -1) {
      products.value[productIndex] = updatedProduct
    }
  
    products.value.sort((a, b) => a.name.localeCompare(b.name))
  
    return updatedProduct
  }
  
  async function removeProduct(productId) {
    await deleteProductRecord(productId)
  
    products.value = products.value.filter(
      (product) => product.id !== productId,
    )
  }


  function recordTransaction(transactionData) {
    const product = products.value.find(
      (item) => item.id === transactionData.productId,
    )

    if (!product) {
      throw new Error('The selected product could not be found.')
    }

    const quantity = Number(transactionData.quantity)

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Quantity must be a positive whole number.')
    }

    if (
      transactionData.type === 'stock-out' &&
      quantity > product.stock
    ) {
      throw new Error(
        `Only ${product.stock} units are available for stock-out.`,
      )
    }

    if (transactionData.type === 'stock-in') {
      product.stock += quantity
    } else if (transactionData.type === 'stock-out') {
      product.stock -= quantity
    } else {
      throw new Error('Invalid transaction type.')
    }

    const nextId =
      Math.max(
        ...transactions.value.map((transaction) => transaction.id),
        0,
      ) + 1

    const transaction = {
      id: nextId,
      reference: `TXN-2026-${String(nextId).padStart(4, '0')}`,
      productId: product.id,
      type: transactionData.type,
      quantity,
      note: transactionData.note.trim(),
      performedBy: 'Admin User',
      createdAt: new Date().toISOString(),
    }

    transactions.value.unshift(transaction)

    return transaction
  }

  return {
    products,
    categories,
    suppliers,
    transactions,
    loadCategories,
    addCategory,
    editCategory,
    removeCategory,
    loadSuppliers,
    addSupplier,
    editSupplier,
    removeSupplier,
    loadProducts,
    addProduct,
    editProduct,
    removeProduct,
    recordTransaction,
  }
})